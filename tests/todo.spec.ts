import { test, expect } from '@playwright/test';
import { TodoPage } from '../Pom/Pages/todoPage';

test.describe('ToDo app tests', () => {
  let todoPage: TodoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();
  });

  test('HW-19-1 Create one ToDo item', async () => {
    await expect(todoPage.todoItems).toHaveCount(0);
    await todoPage.addTodo('test todo item');
    await expect(todoPage.todoItems).toHaveCount(1);
  });

  test('HW-19-2 Create two todo items', async () => {
    await todoPage.addTodo('test todo item');
    await todoPage.addTodo('test todo item2');
    await expect(todoPage.todoCount).toContainText('2');

    /*
    const countText = await itemCountSpan.innerText();
    const splitResult = countText.split(' ');
    const countNumber = Number(splitResult[0]);
    expect(countNumber).toBe(2);

    expect(countText.includes('2')).toBeTruthy();
     */
  });

  test('HW-19-3 Create two ToDo items and click "clear completed"', async () => {
    await todoPage.addTodo('test todo item 1');
    await todoPage.addTodo('test todo item 2');
    await expect(todoPage.todoItems).toHaveCount(2);

    await todoPage.toggleItem(0);
    await todoPage.clearCompleted();

    await expect(todoPage.todoItems).toHaveCount(1);
    await expect(todoPage.todoCount).toContainText('1');
  });

  test('HW-19-4 Create two ToDo items then set active filter then check 1 on completed filter', async () => {
    await todoPage.addTodo('activated');
    await todoPage.addTodo('not activated');
    await expect(todoPage.todoItems).toHaveCount(2);

    await todoPage.openFilter('Active');
    await todoPage.toggleItem(0);
    await expect(todoPage.todoItems).toHaveCount(1);
    await expect(todoPage.todoItems).toHaveText('not activated');

    await todoPage.openFilter('Completed');
    await expect(todoPage.todoItems).toHaveCount(1);
    await expect(todoPage.todoItems).toHaveText('activated');
  });

  test('HW-19-5 Create one element and activate', async () => {
    await todoPage.addTodo('activated');
    await todoPage.toggleItem(0);
    await expect(todoPage.todoItems.first()).toHaveClass(/completed/);
  });

  test('HW-19-6 Create one element and delete', async () => {
    await todoPage.addTodo('One element');
    await expect(todoPage.todoItems).toHaveCount(1);
    await todoPage.deleteItem(0);
    await expect(todoPage.todoItems).toHaveCount(0);
  });
});
import { Page, Locator } from '@playwright/test';
import { Button } from '../Atoms/Button';
import { Checkbox } from '../Atoms/Checkbox';
import { TextInput } from '../Atoms/TextInput';

export class TodoPage {
    readonly page: Page;
    readonly todoInput: TextInput;
    readonly clearCompletedButton: Button;
    readonly todoItems: Locator;
    readonly todoCount: Locator;

    constructor(page: Page) {
        this.page = page;
        this.todoInput = new TextInput(page.getByTestId('text-input'));
        this.clearCompletedButton = new Button(page.locator('.clear-completed'));
        this.todoItems = page.getByTestId('main').getByTestId('todo-item');
        this.todoCount = page.locator('.todo-count');
    }

    async goto() {
        await this.page.goto('/');
    }

    async addTodo(text: string) {
        await this.todoInput.fillAndSubmit(text);
    }

    async toggleItem(index: number) {
        const checkbox = new Checkbox(this.todoItems.nth(index).getByTestId('todo-item-toggle'));
        await checkbox.toggle();
    }

    async deleteItem(index: number) {
        const item = this.todoItems.nth(index);
        await item.hover();
        const deleteButton = new Button(item.getByTestId('todo-item-button'));
        await deleteButton.click();
    }

    async clearCompleted() {
        await this.clearCompletedButton.click();
    }

    async openFilter(name: 'All' | 'Active' | 'Completed') {
        await this.page.getByRole('link', { name }).click();
    }
}
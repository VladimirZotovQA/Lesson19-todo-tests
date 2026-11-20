import { Locator } from '@playwright/test';

export class Button {
    constructor(readonly root: Locator) {}

    async click() {
        await this.root.click();
    }
}
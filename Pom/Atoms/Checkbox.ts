import { Locator } from '@playwright/test';

export class Checkbox {
    constructor(readonly root: Locator) {}

    async toggle() {
        await this.root.click();
    }
}
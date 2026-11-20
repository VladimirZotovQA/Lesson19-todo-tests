import { Locator } from '@playwright/test';

export class TextInput {
    constructor(readonly root: Locator) {}

    async fillAndSubmit(text: string) {
        await this.root.fill(text);
        await this.root.press('Enter');
    }
}
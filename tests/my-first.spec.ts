import {test, expect } from '@playwright/test';

test('user can add a todo item', async ({ page }) => {
// Step 1 : Open the app
await page.goto('https://demo.playwright.dev/todomvc/.');

// Step 2: Type a todo and press Enter
await page.getByPlaceholder('What needs to be done?').fill('Buy milk');
await page.getByPlaceholder('What needs to be done?').press('Enter');

// Expected: the todo appears in the list
await expect(page.getByTestId('todo-title')).toHaveText('Buy milk');

});
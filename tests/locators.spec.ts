import { test, expect} from '@playwright/test'

test('user can complete a todo', async ({page}) => {
await page.goto('https://demo.playwright.dev/todomvc/');
    // Add 2 todos

    const input = page.getByPlaceholder('What needs to be done?');
    await input.fill('Buy milk');
    await input.press('Enter');
    await input.fill('Buy eggs');
    await input.press('Enter');
    await input.fill('Walk the dog');
    await input.press('Enter');

    //Find the Buy milk and click on checkbox

    const milkItem = page.getByTestId('todo-item').filter({ hasText: 'Buy milk'});
    await milkItem.getByRole('checkbox').check();

    // Expected: the item is marked completed, and 1 item is left

    await expect(milkItem).toHaveClass(/completed/);
    await expect(page.getByTestId('todo-count')).toContainText('1 item left');

}
)
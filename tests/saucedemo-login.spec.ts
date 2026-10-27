// Import the two main tools from Playwright:
// "test" defines a test, "expect" checks that something is true
import { test, expect } from '@playwright/test';

// Sauce Demo uses data-test (not the default data-testid) for its test ids,
// so we tell Playwright which attribute getByTestId() should look for
test.use({ testIdAttribute: 'data-test' });

// beforeEach runs before EVERY test in this file, so each test starts clean
test.beforeEach(async ({ page }) => {
  // Open the Sauce Demo login page
  await page.goto('https://www.saucedemo.com/');
});

// First test: the happy path (everything goes right)
test('user can log in with valid credentials', async ({ page }) => {
  // Find the field by its placeholder text and type the username into it
  await page.getByPlaceholder('Username').fill('standard_user');
  // Find the password field and type the password
  await page.getByPlaceholder('Password').fill('secret_sauce');
  // Find the button by its role (button) and its text (Login), then click it
  await page.getByRole('button', { name: 'Login' }).click();

  // Expected: products page is shown
  // The URL must contain "inventory.html" (the products page)
  await expect(page).toHaveURL(/inventory\.html/);
  // The text "Products" must be visible on the page
  await expect(page.getByText('Products')).toBeVisible();
  // Find all elements with test id "inventory-item" and check there are exactly 6
  await expect(page.getByTestId('inventory-item')).toHaveCount(6);
});

// Second test: the unhappy path (something goes wrong on purpose)
test('user sees an error with a wrong password', async ({ page }) => {
  // Type a valid username
  await page.getByPlaceholder('Username').fill('standard_user');
  // Type a WRONG password on purpose
  await page.getByPlaceholder('Password').fill('wrong_password');
  // Click the Login button
  await page.getByRole('button', { name: 'Login' }).click();

  // Expected: stays on login page with an error message
  // The URL must still be the login page (we were not let in)
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  // The error box (test id "error") must contain this message text
  await expect(page.getByTestId('error')).toContainText(
    'Username and password do not match'
  );
});

// "test" defines a test, "expect" checks that something is true
import { test, expect, Page } from '@playwright/test';

// Sauce Demo uses data-test (not the default data-testid) for its test ids,
// so we tell Playwright which attribute getByTestId() should look for
test.use({ testIdAttribute: 'data-test' });

// Small helper: fill in the "Your Information" form (empty string = leave empty)
async function fillInfo(page: Page, first: string, last: string, zip: string) {
  await page.getByPlaceholder('First Name').fill(first);
  await page.getByPlaceholder('Last Name').fill(last);
  await page.getByPlaceholder('Zip/Postal Code').fill(zip);
}

// Small helper: from the products page, open the cart and start checkout
async function goToInformationPage(page: Page) {
  await page.getByTestId('shopping-cart-link').click();
  await page.getByRole('button', { name: 'Checkout' }).click();
  await expect(page).toHaveURL(/checkout-step-one\.html/);
}

// beforeEach runs before EVERY test: log in as standard_user
test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  // Precondition: we are on the Products page
  await expect(page).toHaveURL(/inventory\.html/);
});

test('TC-CHECKOUT-001: complete checkout with one item', async ({ page }) => {
  await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
  await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');
  await goToInformationPage(page);
  await fillInfo(page, 'Jane', 'Doe', '12345');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('button', { name: 'Finish' }).click();

  // Expected: order complete page, thank-you text, cart badge gone
  await expect(page).toHaveURL(/checkout-complete\.html/);
  await expect(page.getByText('Thank you for your order!')).toBeVisible();
  await expect(page.getByTestId('shopping-cart-badge')).toHaveCount(0);
});

test('TC-CHECKOUT-002: complete checkout with multiple items', async ({ page }) => {
  await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
  await page.getByTestId('add-to-cart-sauce-labs-bike-light').click();
  await goToInformationPage(page);
  await fillInfo(page, 'Jane', 'Doe', '12345');
  await page.getByRole('button', { name: 'Continue' }).click();

  // Expected: overview lists both items
  await expect(page).toHaveURL(/checkout-step-two\.html/);
  await expect(page.getByTestId('inventory-item')).toHaveCount(2);
  await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
  await expect(page.getByText('Sauce Labs Bike Light')).toBeVisible();

  await page.getByRole('button', { name: 'Finish' }).click();
  await expect(page.getByText('Thank you for your order!')).toBeVisible();
});

test('TC-CHECKOUT-003: first name is required', async ({ page }) => {
  await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
  await goToInformationPage(page);
  await fillInfo(page, '', 'Doe', '12345');
  await page.getByRole('button', { name: 'Continue' }).click();

  await expect(page.getByTestId('error')).toHaveText('Error: First Name is required');
  await expect(page).toHaveURL(/checkout-step-one\.html/);
});

test('TC-CHECKOUT-004: last name is required', async ({ page }) => {
  await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
  await goToInformationPage(page);
  await fillInfo(page, 'Jane', '', '12345');
  await page.getByRole('button', { name: 'Continue' }).click();

  await expect(page.getByTestId('error')).toHaveText('Error: Last Name is required');
  await expect(page).toHaveURL(/checkout-step-one\.html/);
});

test('TC-CHECKOUT-005: postal code is required', async ({ page }) => {
  await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
  await goToInformationPage(page);
  await fillInfo(page, 'Jane', 'Doe', '');
  await page.getByRole('button', { name: 'Continue' }).click();

  await expect(page.getByTestId('error')).toHaveText('Error: Postal Code is required');
  await expect(page).toHaveURL(/checkout-step-one\.html/);
});

test('TC-CHECKOUT-006: overview totals are correct', async ({ page }) => {
  await page.getByTestId('add-to-cart-sauce-labs-backpack').click(); // $29.99
  await page.getByTestId('add-to-cart-sauce-labs-bike-light').click(); // $9.99
  await goToInformationPage(page);
  await fillInfo(page, 'Jane', 'Doe', '12345');
  await page.getByRole('button', { name: 'Continue' }).click();

  // Item total 29.99 + 9.99 = 39.98; tax 8% = 3.1984 -> 3.20; total = 43.18
  await expect(page.getByTestId('subtotal-label')).toHaveText('Item total: $39.98');
  await expect(page.getByTestId('tax-label')).toHaveText('Tax: $3.20');
  await expect(page.getByTestId('total-label')).toHaveText('Total: $43.18');
});

test('TC-CHECKOUT-007: cancel from the information page returns to the cart', async ({ page }) => {
  await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
  await goToInformationPage(page);
  await page.getByRole('button', { name: 'Cancel' }).click();

  // Expected: back on the cart page, item still there
  await expect(page).toHaveURL(/cart\.html/);
  await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
  await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');
});

test('TC-CHECKOUT-008: cancel from the overview returns to products', async ({ page }) => {
  await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
  await goToInformationPage(page);
  await fillInfo(page, 'Jane', 'Doe', '12345');
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page).toHaveURL(/checkout-step-two\.html/);
  await page.getByRole('button', { name: 'Cancel' }).click();

  // Expected: Products page, item still in the cart
  await expect(page).toHaveURL(/inventory\.html/);
  await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');
  await expect(page.getByTestId('remove-sauce-labs-backpack')).toBeVisible();
});

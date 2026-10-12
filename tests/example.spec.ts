import { test, expect } from '@playwright/test';
//This brings in two tools from Playwright: test creates a test, and expect checks results. Every test file starts with this line.

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');
// This defines one test case.
//'has title' is the test’s name, which is what you see in the report. Think of it as a test case title in your test management tool.
// async means the test contains steps that take time, like loading pages. Just always write it.
// ({ page }) gives you a fresh browser tab called page. You use it to do everything: open URLs, click, type.
// Everything between { and } is the test steps.
//This opens the URL in the browser. await means “wait until this step finishes before going to the next one”. Almost every Playwright line starts with await. Forgetting it is the most common beginner bug.

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});
//  This is the assertion, your “expected result”. It checks that the page title contains “Playwright”. The /.../ slashes mean “contains this text” rather than “is exactly this text”.

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

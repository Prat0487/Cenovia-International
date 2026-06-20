const { test, expect } = require('@playwright/test');

test('homepage has correct title and main components', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Cenovia International/);
  await expect(page.locator('top-ribbon')).toBeVisible();
  await expect(page.locator('main-nav')).toBeVisible();
  await expect(page.locator('a[href="product-menswear.html"]')).toBeVisible();
});

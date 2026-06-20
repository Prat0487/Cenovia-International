const { test, expect } = require('@playwright/test');

test('homepage has correct title and main components', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Cenovia International/);
  await expect(page.locator('top-ribbon')).toBeVisible();
  await expect(page.locator('main-nav')).toBeVisible();
  // Use an accessible, unique link in the hero for a strict single-element locator
  await expect(page.getByRole('link', { name: 'Menswear Catalog', exact: true })).toBeVisible();
});

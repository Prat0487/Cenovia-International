const { test, expect } = require('@playwright/test');

test('homepage has correct title and main components', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Cenovia International/);
  await expect(page.locator('top-ribbon')).toBeVisible();
  await expect(page.locator('main-nav')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Menswear Catalog', exact: true })).toBeVisible();
});

test('menswear catalog shows buyer filters and product grid', async ({ page }) => {
  await page.goto('/product-menswear.html');
  await expect(page.getByRole('heading', { name: "Men's Sports Apparel" })).toBeVisible();
  await expect(page.locator('#productGrid')).toBeVisible();
  await expect(page.locator('#categoryFilter')).toBeVisible();
  await expect(page.locator('#clearFilters')).toBeVisible();
  await expect(page.locator('#productGrid .product-card').first()).toBeVisible({ timeout: 10000 });
});

// @ts-check
const { test, expect } = require('@playwright/test');

test('writing index links through to a post', async ({ page }) => {
  await page.goto('/writing');
  await expect(page.getByRole('heading', { level: 1, name: 'Writing' })).toBeVisible();

  const firstPost = page.locator('a[href^="/writing/"]').first();
  const title = (await firstPost.getByRole('heading', { level: 2 }).textContent())?.trim() ?? '';
  expect(title).not.toBe('');

  await firstPost.click();
  await expect(page).toHaveURL(/\/writing\/.+/);
  await expect(page.getByRole('heading', { level: 1, name: title })).toBeVisible();
  await expect(page.getByRole('link', { name: '← Back to Writing' })).toBeVisible();
});

// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('home', () => {
  test('lists every section', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1, name: 'Niko Rekhviashvili' })).toBeVisible();
    for (const section of ['Work', 'Personal Projects', 'Music', 'Writing']) {
      await expect(page.getByRole('heading', { level: 2, name: section })).toBeVisible();
    }
  });

  test('hovering a project shows its preview modal', async ({ page, isMobile }) => {
    test.skip(isMobile, 'hover preview is desktop only');
    await page.goto('/');
    const preview = page.getByRole('img', { name: 'Drive Pingo' });
    await expect(preview).toBeHidden();

    await page.getByRole('heading', { level: 3, name: 'Drive Pingo' }).hover();
    await expect(preview).toBeVisible();
    await expect(page.getByText('View', { exact: true })).toBeVisible();

    await page.getByRole('heading', { level: 1 }).hover();
    await expect(preview).toBeHidden();
  });

  test('tapping a project opens its card and a second tap closes it', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'accordion is phone only');
    await page.goto('/');
    const project = page.getByRole('heading', { level: 3, name: 'Sous Chef', exact: true });
    const card = page.locator('[class*="projectWrapper"]').filter({ has: project });
    const panel = card.locator('[class*="accordionContent"]');
    const panelHeight = () => panel.evaluate((el) => el.getBoundingClientRect().height);

    await expect.poll(panelHeight).toBe(0);

    await project.tap();
    await expect.poll(panelHeight).toBeGreaterThan(100);
    await expect(card.getByRole('img', { name: 'Sous Chef' })).toBeInViewport();
    await expect(card.getByRole('button', { name: 'apps.apple.com →' })).toBeInViewport();
    // Opening the card must not navigate away; only the visit button does.
    await expect(page).toHaveURL(/\/$/);

    await project.tap();
    await expect.poll(panelHeight).toBe(0);
  });
});

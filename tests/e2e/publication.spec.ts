import { readdirSync } from 'node:fs';
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const routes = [
  '/',
  '/categories/',
  '/desks/clinical-ai/',
  '/desks/health-systems/',
  '/desks/pharma/',
  '/desks/biomedical-foundations/',
  '/desks/safety-policy/',
  '/pulse/',
  '/methodology/',
  '/about/',
  '/contact/',
  '/privacy/',
  '/search/',
];
for (const route of routes)
  test(`${route} is readable and accessible`, async ({ page }) => {
    const response = await page.goto(route);
    expect(response?.ok()).toBeTruthy();
    await expect(page.locator('h1')).toHaveCount(1);
    const result = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(
      result.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical'),
    ).toEqual([]);
  });
for (const width of [320, 375, 960, 1280])
  test(`navigation fits at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
    ).toBeTruthy();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  });
test('publication has honest empty states and search loads', async ({ page, request }) => {
  await page.goto('/');
  if (!readdirSync('src/content/stories').some((name) => name.endsWith('.md'))) {
    await expect(
      page.getByText('No articles have been published yet.', { exact: false }),
    ).toBeVisible();
    expect(await page.locator('a[href^="/stories/"]').count()).toBe(0);
  }
  await page.goto('/search/');
  await expect(page.getByRole('textbox')).toBeVisible();
  expect((await request.get('/rss.xml')).ok()).toBeTruthy();
});

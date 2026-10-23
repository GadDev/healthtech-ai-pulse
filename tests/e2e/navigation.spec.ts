import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

for (const width of [320, 375, 650, 651, 960, 1280])
  test(`open category navigation fits without moving content at ${width}px`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const navigation = page.getByRole('navigation', { name: 'Publication navigation' });
    const mainBefore = await page.locator('main').boundingBox();
    await navigation.locator('summary').click();
    const mainAfter = await page.locator('main').boundingBox();
    expect(mainAfter?.y).toBe(mainBefore?.y);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
    ).toBeTruthy();

    const links = navigation.getByRole('link');
    await expect(links).toHaveCount(10);
    for (const link of await links.all()) {
      const box = await link.boundingBox();
      expect(box).not.toBeNull();
      expect(box!.x).toBeGreaterThanOrEqual(0);
      expect(box!.x + box!.width).toBeLessThanOrEqual(width);
      expect(box!.height).toBeGreaterThanOrEqual(44);
    }
    const result = await new AxeBuilder({ page })
      .include('.desk-nav')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(result.violations).toEqual([]);
    if (width === 375 || width === 1280)
      await page.screenshot({ path: testInfo.outputPath(`categories-${width}.png`) });
  });

test('category disclosure supports keyboard opening, traversal and dismissal', async ({ page }) => {
  await page.goto('/');
  const trigger = page.locator('.desk-nav__summary');
  const disclosure = page.locator('.desk-nav__categories');
  const overview = page
    .locator('#category-navigation')
    .getByRole('link', { name: 'All categories' });
  await expect(overview).not.toBeVisible();
  await trigger.focus();
  await page.keyboard.press('Enter');
  await page.keyboard.press('Tab');
  await expect(overview).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(
    page.locator('#category-navigation').getByRole('link', { name: 'Clinical AI', exact: true }),
  ).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(overview).not.toBeVisible();
  await expect(trigger).toBeFocused();

  await page.keyboard.press('Space');
  await expect(overview).toBeVisible();
  await page.keyboard.press('Shift+Tab');
  await expect(
    page
      .getByRole('navigation', { name: 'Publication navigation' })
      .getByRole('link', { name: 'Latest' }),
  ).toBeFocused();
  await expect(disclosure).not.toHaveAttribute('open');

  await trigger.click();
  await page.locator('#category-navigation a').last().focus();
  await page.keyboard.press('Tab');
  await expect(
    page
      .getByRole('navigation', { name: 'Publication navigation' })
      .getByRole('link', { name: 'Editions' }),
  ).toBeFocused();
  await expect(overview).not.toBeVisible();

  await trigger.click();
  await page.getByRole('heading', { level: 1 }).click();
  await expect(overview).not.toBeVisible();
});

test('category links identify the current destination and keep the section active', async ({
  page,
}) => {
  for (const [route, title] of [
    ['/categories/', 'All categories'],
    ['/desks/clinical-ai/', 'Clinical AI'],
  ]) {
    await page.goto(route);
    const trigger = page.locator('.desk-nav__summary');
    await expect(trigger).toHaveAttribute('data-active');
    await expect(trigger).not.toHaveAttribute('aria-current');
    await trigger.click();
    const current = page.locator('#category-navigation a[aria-current="page"]');
    await expect(current).toHaveCount(1);
    await expect(current).toHaveText(title);
  }
  await page.goto('/');
  await expect(page.locator('.desk-nav__summary')).not.toHaveAttribute('data-active');
});

test('category navigation opens and follows links on a touch screen', async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    baseURL,
    viewport: { width: 375, height: 812 },
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();
  try {
    await page.goto('/');
    await page.locator('.desk-nav__summary').tap();
    await page
      .locator('#category-navigation')
      .getByRole('link', { name: 'Biomedical foundations' })
      .tap();
    await expect(page).toHaveURL(/\/desks\/biomedical-foundations\/$/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Biomedical foundations');
  } finally {
    await context.close();
  }
});

test('category navigation remains usable without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({
    baseURL,
    javaScriptEnabled: false,
    viewport: { width: 320, height: 568 },
  });
  const page = await context.newPage();
  try {
    await page.goto('/');
    await page.locator('.desk-nav__summary').click();
    await expect(page.locator('#category-navigation a')).toHaveCount(6);
    await page.getByRole('link', { name: 'All categories', exact: true }).click();
    await expect(page).toHaveURL(/\/categories\/$/);
  } finally {
    await context.close();
  }
});

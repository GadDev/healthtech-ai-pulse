import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('research route is navigable, descriptive and fixture only', async ({ page, request }) => {
  const remoteRequests: string[] = [];
  page.on('request', (req) => {
    if (!req.url().startsWith('http://127.0.0.1:4321/')) remoteRequests.push(req.url());
  });
  const res = await page.goto('/research/');
  expect(res?.ok()).toBeTruthy();
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
  await expect(
    page
      .getByRole('navigation', { name: 'Publication navigation' })
      .getByRole('link', { name: 'Research' }),
  ).toHaveAttribute('aria-current', 'page');
  await expect(
    page.getByRole('heading', { name: "You're exploring a fixture-only demonstration." }),
  ).toBeVisible();
  await expect(page.getByRole('article')).toHaveCount(4);
  await expect(page.getByRole('button', { name: /Generate evidence brief/ })).toBeDisabled();
  expect(remoteRequests).toEqual([]);
  expect((await request.get('/rss.xml')).ok()).toBeTruthy();
  expect((await request.get('/sitemap-index.xml')).ok()).toBeTruthy();
  await page.goto('/stories/2026-10-19-oncology-ai-ehr-handoff/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
  await page.goto('/search/');
  await expect(page.getByRole('textbox')).toBeVisible();
});

test('fixture filter, empty state, select and remove work offline', async ({ page }) => {
  await page.goto('/research/');
  const search = page.getByRole('searchbox', { name: 'Filter this local catalogue' });
  await search.fill('workflow');
  await expect(page.getByRole('article')).toHaveCount(1);
  await page.getByRole('button', { name: 'Select example' }).click();
  await expect(page.getByText('1 of 10 allowed')).toBeVisible();
  await search.fill('nothing-could-match-this');
  await expect(page.getByRole('heading', { name: 'No matching examples' })).toBeVisible();
  await page.getByRole('button', { name: 'Clear filter' }).click();
  await expect(page.getByRole('article')).toHaveCount(4);
  await page.getByRole('button', { name: /Remove Example: documenting/ }).click();
  await expect(page.getByText('0 of 10 allowed')).toBeVisible();
});

test('malformed and valid deep links never call a remote service', async ({ page }) => {
  await page.goto('/research/?doi=10.1000%2Fx&pmid=123');
  await expect(page.getByText(/invalid or conflicting public identifier/)).toBeVisible();
  await page.goto('/research/?doi=10.1038%2Fs41591-026-04680-4');
  await expect(
    page.getByText(/bibliographic verification and live lookup are not connected/),
  ).toBeVisible();
  await expect(page.getByRole('article')).toHaveCount(4);
});

for (const width of [320, 375, 960, 1280]) {
  test(`research layout at ${width}px has no overflow or serious accessibility errors`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/research/');
    await expect(
      page.getByRole('searchbox', { name: 'Filter this local catalogue' }),
    ).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    const axe = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(axe.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')).toEqual(
      [],
    );
  });
}

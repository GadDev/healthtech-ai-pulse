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

test('edition ribbon follows Luxembourg calendar date without a rebuild', async ({ page }) => {
  await page.clock.install({ time: new Date('2026-10-20T21:59:00Z') });
  await page.goto('/');
  const ribbonDate = page.locator('.edition-ribbon [data-current-date]');
  await expect(ribbonDate).toHaveText('Tuesday, 20 October 2026');

  await page.clock.runFor(120_000);
  await expect(ribbonDate).toHaveText('Wednesday, 21 October 2026');
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

test('article connects evidence, sources and corrections to their destinations', async ({
  page,
}) => {
  await page.goto('/stories/2026-10-19-oncology-ai-ehr-handoff/');
  await expect(page.getByRole('navigation', { name: 'In this article' })).toBeVisible();
  await page
    .getByRole('navigation', { name: 'In this article' })
    .getByRole('link', { name: 'Evidence' })
    .click();
  await expect(page.locator('#evidence-title')).toBeVisible();
  await page
    .getByRole('navigation', { name: 'In this article' })
    .getByRole('link', { name: 'Sources' })
    .click();
  await expect(page.locator('#sources')).toBeVisible();
  await expect(page.locator('#sources + ul a').first()).toHaveAttribute('href', /^https:\/\//);
  await page
    .getByRole('navigation', { name: 'In this article' })
    .getByRole('link', { name: 'Corrections' })
    .click();
  await expect(page).toHaveURL(/\/methodology\/#corrections$/);
  await expect(page.locator('#corrections')).toBeVisible();
});

test('retrospective edition dates are not presented as publication timestamps', async ({
  page,
  request,
}) => {
  await page.goto('/stories/2026-10-12-clinical-ai-language-evidence/');
  await expect(page.locator('.story-meta')).toContainText('Edition date');
  await expect(page.locator('.story-meta')).not.toContainText('Published');

  const rssResponse = await request.get('/rss.xml');
  expect(rssResponse.ok()).toBeTruthy();
  const rss = await rssResponse.text();
  expect(rss).toContain('Edition date: 2026-10-12.');
  expect(rss).not.toContain('<pubDate>');
});

for (const width of [375, 1280]) {
  test(`current lead image and disclosure survive real placements at ${width}px`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/');
    const lead = page.locator('.lead-story');
    const leadImage = lead.locator('img');
    await expect(leadImage).toBeVisible();
    await expect(leadImage).toHaveAttribute('src', /^\/images\/stories\/.+\.webp$/);
    const imageSrc = await leadImage.getAttribute('src');
    const articlePath = await lead.locator('h1 a').getAttribute('href');
    expect(articlePath).toMatch(/^\/stories\/.+\/$/);

    await page.goto(articlePath!);
    const categoryLink = page.locator('.breadcrumbs a[href^="/desks/"]');
    await expect(categoryLink).toHaveAttribute('href', /^\/desks\/.+\/$/);
    const categoryPath = await categoryLink.getAttribute('href');

    for (const [name, path, selector] of [
      ['home', '/', '.lead-story'],
      ['article', articlePath!, '.article-page'],
      ['listing', categoryPath!, '.story-row--visual'],
    ]) {
      await page.goto(path);
      const placement = page.locator(selector).first();
      const image = placement.locator('figure img');
      await expect(image).toBeVisible();
      await expect(image).toHaveAttribute('src', imageSrc!);
      await expect(image).toHaveAttribute('alt', /\S/);
      expect(
        await image.evaluate(async (el) => {
          await (el as HTMLImageElement).decode();
          return (el as HTMLImageElement).naturalWidth;
        }),
      ).toBe(1536);
      await expect(placement.locator('figcaption')).toContainText(
        'Generated editorial illustration.',
      );
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      ).toBeTruthy();
      await page.screenshot({ path: testInfo.outputPath(`current-lead-${name}-${width}.png`) });
    }
  });

  test(`scientific pilot article retains its image and microscopy disclaimer at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/stories/2026-10-23-dynavelo-b-cell-rescue-predictions/');
    await expect(page.locator('.article-image img')).toHaveAttribute('src', /dynavelo/);
    await expect(page.locator('.article-image img')).toBeVisible();
    await expect(page.locator('.article-image figcaption')).toContainText(
      'Generated editorial illustration.',
    );
    await expect(page.locator('.article-image figcaption')).toContainText('not microscopy');
  });
}

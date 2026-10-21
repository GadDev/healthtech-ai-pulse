import { expect, test } from '@playwright/test';

const eligible: Array<[string, string]> = [
  ['2026-10-12-clinical-ai-language-evidence', '10.1038/s44528-026-00042-1'],
  ['2026-10-13-epilepsy-feedback-replay', '10.1038/s41591-026-04680-4'],
  ['2026-10-19-oncology-ai-ehr-handoff', '10.1038/s41746-026-03396-6'],
  ['2026-10-21-expertise-automation-bias-neonatal-imaging', '10.1038/s41746-026-03399-3'],
];

for (const [storyId, doi] of eligible) {
  test(`verified paper link for ${storyId}`, async ({ page }) => {
    await page.goto(`/stories/${storyId}/`);
    const link = page.getByRole('link', { name: 'Open this paper identifier in Research (demo)' });
    await expect(link).toHaveCount(1);
    await expect(link).toHaveAttribute('href', `/research/?doi=${encodeURIComponent(doi)}`);
    await link.click();
    await expect(page).toHaveURL(`http://127.0.0.1:4321/research/?doi=${encodeURIComponent(doi)}`);
    await expect(
      page.getByText(/bibliographic verification and live lookup are not connected/),
    ).toBeVisible();
  });
}

for (const storyId of [
  '2026-10-20-astrazeneca-oracle-trials-agreement',
  '2026-10-21-fda-ai-device-change-plan-examples',
]) {
  test(`non-paper story ${storyId} does not invent a paper link`, async ({ page }) => {
    await page.goto(`/stories/${storyId}/`);
    await expect(
      page.getByRole('link', { name: 'Open this paper identifier in Research (demo)' }),
    ).toHaveCount(0);
    await expect(page.getByRole('link', { name: 'Research', exact: true })).toHaveCount(1);
  });
}

test('offline backend cannot affect article, research destination or RSS', async ({
  page,
  request,
}) => {
  const external: string[] = [];
  page.on('request', (req) => {
    if (!req.url().startsWith('http://127.0.0.1:4321/')) external.push(req.url());
  });
  await page.goto('/stories/2026-10-13-epilepsy-feedback-replay/');
  await page.getByRole('link', { name: 'Open this paper identifier in Research (demo)' }).click();
  await expect(
    page.getByRole('heading', { name: "You're exploring a fixture-only demonstration." }),
  ).toBeVisible();
  expect(external).toEqual([]);
  const rss = await request.get('/rss.xml');
  expect(rss.ok()).toBe(true);
  expect(await rss.text()).not.toContain('/research/?doi=');
});

import assert from 'node:assert/strict';
import test from 'node:test';
import { previewDeploymentConfig } from '../scripts/lib/deployment.ts';

const env = {
  FIREBASE_PROJECT_ID: 'healthtech-ai-pulse',
  FIREBASE_SITE_ID: 'healthtech-ai-pulse',
  FIREBASE_WIF_PROVIDER:
    'projects/293427463899/locations/global/workloadIdentityPools/github/providers/github',
  FIREBASE_SERVICE_ACCOUNT:
    'healthtech-preview-deployer@healthtech-ai-pulse.iam.gserviceaccount.com',
};
test('preview configuration resolves only the adopted project and account', () => {
  assert.deepEqual(previewDeploymentConfig(env), {
    project: 'healthtech-ai-pulse',
    site: 'https://healthtech-ai-pulse.web.app',
  });
});
for (const [key, value] of [
  ['FIREBASE_PROJECT_ID', 'another-publication'],
  ['FIREBASE_SITE_ID', 'another-site'],
  ['FIREBASE_SITE_ID', 'healthtech-ai-pulse/../live'],
  [
    'FIREBASE_SERVICE_ACCOUNT',
    'healthtech-prod-deployer@healthtech-ai-pulse.iam.gserviceaccount.com',
  ],
  [
    'FIREBASE_WIF_PROVIDER',
    'projects/999/locations/global/workloadIdentityPools/github/providers/github',
  ],
  [
    'FIREBASE_WIF_PROVIDER',
    'projects/293427463899/locations/global/workloadIdentityPools/other/providers/github',
  ],
]) {
  test(`preview rejects unexpected ${key}: ${value}`, () => {
    assert.throws(() => previewDeploymentConfig({ ...env, [key]: value }));
  });
}
test('preview configuration requires every identity variable', () => {
  for (const key of Object.keys(env)) {
    const missing = { ...env };
    delete missing[key];
    assert.throws(() => previewDeploymentConfig(missing));
  }
});
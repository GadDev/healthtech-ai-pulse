export function deploymentConfig(env) {
  const required = [
    'FIREBASE_PROJECT_ID',
    'FIREBASE_SITE_URL',
    'FIREBASE_WIF_PROVIDER',
    'FIREBASE_SERVICE_ACCOUNT',
  ];
  for (const name of required) if (!env[name]) throw new Error(`Missing ${name}`);
  const project = env.FIREBASE_PROJECT_ID;
  if (project !== 'healthtech-ai-pulse')
    throw new Error(
      'Use the adopted healthtech-ai-pulse project; other projects are not accepted.',
    );
  const site = new URL(env.FIREBASE_SITE_URL);
  if (site.href !== `https://${project}.web.app/`)
    throw new Error('Initial Hosting origin must match the dedicated Firebase project.');
  if (!env.FIREBASE_SERVICE_ACCOUNT.endsWith(`@${project}.iam.gserviceaccount.com`))
    throw new Error('Deployment service account must belong to the dedicated target project.');
  if (
    !/^projects\/293427463899\/locations\/global\/workloadIdentityPools\/[a-z0-9-]+\/providers\/[a-z0-9-]+$/.test(
      env.FIREBASE_WIF_PROVIDER,
    )
  )
    throw new Error('WIF provider must belong to target project number 293427463899.');
  return { project, site: site.origin };
}

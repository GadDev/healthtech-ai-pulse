import { deploymentConfig } from './lib/deployment.ts';
const { project, site } = deploymentConfig(process.env);
console.log(
  `Target deployment configuration passed for ${project} (${site}). Cloud permissions still require a live OIDC test.`,
);

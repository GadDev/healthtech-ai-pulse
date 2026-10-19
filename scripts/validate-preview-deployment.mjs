import { previewDeploymentConfig } from './lib/deployment.mjs';
const { project, site } = previewDeploymentConfig(process.env);
console.log(`Isolated preview configuration passed for ${project} (${site}).`);

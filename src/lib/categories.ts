import { deskKeys as keys } from './editorial-schema.ts';
export const deskKeys = keys as readonly [
  'clinical-ai',
  'health-systems',
  'pharma',
  'biomedical-foundations',
  'safety-policy',
];
export type Desk = (typeof deskKeys)[number];
export const desks: Record<Desk, { title: string; description: string }> = {
  'clinical-ai': {
    title: 'Clinical AI',
    description: 'Diagnostics, imaging and decision support — with the studied setting in view.',
  },
  'health-systems': {
    title: 'Health systems',
    description: 'Digital health, devices and the practical work of implementation.',
  },
  pharma: {
    title: 'Pharma',
    description: 'AI across discovery, development, clinical trials and medicines safety.',
  },
  'biomedical-foundations': {
    title: 'Biomedical foundations',
    description: 'Models, data, methods and reusable scientific tools.',
  },
  'safety-policy': {
    title: 'Safety & policy',
    description: 'Safety evidence, regulation, governance and accountability.',
  },
};

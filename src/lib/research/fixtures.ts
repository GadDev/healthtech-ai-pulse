/**
 * Fabricated examples, not bibliographic records or scientific conclusions.
 * Never expose these as Europe PMC results or as sources for a clinical claim.
 */
export interface ResearchFixture {
  id: string;
  label: string;
  topic: string;
  title: string;
  method: string;
  preview: string;
  limitation: string;
  tags: readonly string[];
}

export const researchFixtures: readonly ResearchFixture[] = [
  {
    id: 'example-a',
    label: 'Illustrative record 01',
    topic: 'Clinical AI',
    title: 'Example: evaluating a prediction model across hospital settings',
    method: 'Hypothetical retrospective model evaluation',
    preview: 'A sample abstract card designed to illustrate how study setting and evaluation method can be separated from clinical benefit.',
    limitation: 'No actual participants, measurements, performance numbers or patient outcomes are represented.',
    tags: ['model evaluation', 'external validation', 'clinical'],
  },
  {
    id: 'example-b',
    label: 'Illustrative record 02',
    topic: 'Health systems',
    title: 'Example: documenting the handoff between an AI summary and an electronic record',
    method: 'Hypothetical workflow observation',
    preview: 'A sample record showing how an evidence reader might inspect workflow boundaries and data-integrity questions.',
    limitation: 'This is not a real safety report or evidence that a deployed system failed.',
    tags: ['workflow', 'electronic health records', 'safety'],
  },
  {
    id: 'example-c',
    label: 'Illustrative record 03',
    topic: 'Pharma research',
    title: 'Example: distinguishing molecular screening from experimental validation',
    method: 'Hypothetical preclinical methods comparison',
    preview: 'A sample literature item that separates computational predictions, laboratory assays and clinical effectiveness.',
    limitation: 'No molecule, trial, efficacy result or verified paper is associated with this example.',
    tags: ['drug discovery', 'preclinical', 'biomedical'],
  },
  {
    id: 'example-d',
    label: 'Illustrative record 04',
    topic: 'Safety & policy',
    title: 'Example: mapping reporting requirements to an AI evaluation plan',
    method: 'Hypothetical methodology commentary',
    preview: 'A sample record for exploring how documentation, provenance and uncertainty might be presented to researchers.',
    limitation: 'Not an official regulator notice, guideline or legal interpretation.',
    tags: ['governance', 'reporting', 'evaluation'],
  },
] as const;

export function searchResearchFixtures(query: string): ResearchFixture[] {
  const term = query.trim().toLocaleLowerCase('en');
  if (!term) return [...researchFixtures];
  return researchFixtures.filter((item) =>
    [item.title, item.topic, item.method, item.preview, ...item.tags]
      .join(' ')
      .toLocaleLowerCase('en')
      .includes(term),
  );
}

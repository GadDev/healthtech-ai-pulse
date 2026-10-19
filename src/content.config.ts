import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { deskKeys } from './lib/categories';

const stories = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/stories' }),
  schema: z
    .object({
      title: z.string().min(1),
      description: z.string().min(1),
      date: z.coerce.date(),
      updatedAt: z.coerce.date().optional(),
      draft: z.boolean().default(true),
      category: z.enum(deskKeys),
      tags: z.array(z.string()).default([]),
      type: z.enum(['pulse', 'briefing', 'deep-dive']),
      depth: z.enum(['general', 'specialist']),
      sources: z
        .array(z.object({ label: z.string().min(1), url: z.url({ protocol: /^https?$/ }) }))
        .min(1),
      illustration: z.discriminatedUnion('mode', [
        z.object({ mode: z.literal('none') }).strict(),
        z
          .object({
            mode: z.literal('generated'),
            image: z.string().startsWith('/images/stories/'),
            alt: z.string().min(1),
            reviewPath: z.string().min(1),
          })
          .strict(),
      ]),
      corrections: z
        .array(z.object({ date: z.coerce.date(), note: z.string().min(1) }))
        .default([]),
    })
    .strict(),
});
const pulse = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pulse' }),
  schema: z
    .object({
      date: z.coerce.date(),
      title: z.string().min(1),
      summary: z.string().min(1),
      featured: z.string().optional(),
      mustKnow: z.string().optional(),
      sections: z
        .array(
          z.object({
            key: z.string().min(1),
            label: z.string().min(1),
            stories: z.array(z.string()).min(1),
          }),
        )
        .min(1),
    })
    .strict(),
});
export const collections = { stories, pulse };

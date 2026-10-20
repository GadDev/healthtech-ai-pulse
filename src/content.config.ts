import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { storySchema } from './lib/editorial-schema.ts';

const stories = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/stories' }),
  schema: storySchema,
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

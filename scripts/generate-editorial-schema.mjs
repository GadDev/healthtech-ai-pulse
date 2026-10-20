import { writeFileSync, readFileSync } from 'node:fs';
import { z } from 'astro/zod';
import { ledgerSchema } from '../src/lib/editorial-schema.ts';
const text = JSON.stringify(z.toJSONSchema(ledgerSchema), null, 2) + '\n';
const path = 'docs/editorial/ledger.schema.json';
if (process.argv.includes('--check')) {
  if (readFileSync(path, 'utf8') !== text)
    throw new Error('ledger.schema.json is stale; run npm run schema:generate');
} else writeFileSync(path, text);

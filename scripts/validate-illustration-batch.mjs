import { checkEditorial } from './lib/editorial.mjs';
// Shared healthcare validation checks every ledger, story and declared asset.
if (process.argv.length > 3) throw new Error('Expected at most one explicit ledger path.');
const result = checkEditorial(process.cwd(), process.argv[2]);
console.log('Illustration and publication mappings passed:', result);

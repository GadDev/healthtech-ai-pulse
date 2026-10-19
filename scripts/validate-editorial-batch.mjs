import { checkEditorial } from './lib/editorial.mjs';
// Always inspect all ledgers for cross-file integrity; an explicit path must exist too.
if (process.argv[2]) checkEditorial(process.cwd(), process.argv[2]);
console.log('Editorial checks passed:', checkEditorial());

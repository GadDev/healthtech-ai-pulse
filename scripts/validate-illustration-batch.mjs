import { checkEditorial } from './lib/editorial.mjs';
if (process.argv[2]) checkEditorial(process.cwd(), process.argv[2]);
console.log('Illustration and publication mappings passed:', checkEditorial());

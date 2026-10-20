// Issue/story integrity lives in the shared healthcare content library.
import { checkContent } from './lib/content.ts';
if (process.argv.length > 2) throw new Error('Content validation takes no arguments.');
console.log('Content integrity passed:', checkContent());

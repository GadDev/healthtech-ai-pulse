import { readFileSync, readdirSync } from 'node:fs';
import { parse } from 'yaml';

type ContentDocument<T> = { id: string; data: T; body: string };
type IssueFrontmatter = {
  date: string | Date;
  sections: { key: string; stories: string[] }[];
  featured?: string;
  mustKnow?: string;
};

export function markdown(text: string): { data: unknown; body: string } {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match) throw new Error('Missing YAML frontmatter');
  return { data: parse(match[1], { uniqueKeys: true }), body: text.slice(match[0].length) };
}
export function documents<T = unknown>(directory: string): ContentDocument<T>[] {
  return readdirSync(directory)
    .filter((name) => name.endsWith('.md'))
    .map((name) => ({
      id: name.slice(0, -3),
      ...markdown(readFileSync(`${directory}/${name}`, 'utf8')),
    })) as ContentDocument<T>[];
}
export function checkContent(root = process.cwd()) {
  const stories = documents<{ draft: boolean }>(`${root}/src/content/stories`);
  const byId = new Map(stories.map((story) => [story.id, story]));
  for (const issue of documents<IssueFrontmatter>(`${root}/src/content/pulse`)) {
    const ids = issue.data.sections.flatMap((section) => section.stories);
    if (new Set(ids).size !== ids.length) throw new Error(`${issue.id}: repeated story reference`);
    if (new Set(issue.data.sections.map((s) => s.key)).size !== issue.data.sections.length)
      throw new Error(`${issue.id}: repeated section key`);
    if (!ids.length) throw new Error(`${issue.id}: empty issue`);
    for (const id of ids)
      if (!byId.has(id) || byId.get(id)?.data.draft !== false)
        throw new Error(`${issue.id}: missing or draft story ${id}`);
    for (const key of ['featured', 'mustKnow'] as const)
      if (issue.data[key] && !ids.includes(issue.data[key]))
        throw new Error(`${issue.id}: invalid ${key}`);
    if (String(issue.data.date).slice(0, 10) !== issue.id)
      throw new Error(`${issue.id}: date must match filename`);
  }
  return { stories: stories.length };
}

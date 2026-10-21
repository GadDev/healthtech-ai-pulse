/**
 * research-link-v1: parse public bibliographic IDs only.
 * This parser validates syntax, not existence in a publisher database.
 * It must never trigger an API lookup on its own.
 */
export type PublicPaperId =
  | { kind: 'doi'; value: string }
  | { kind: 'pmid'; value: string }
  | { kind: 'pmcid'; value: string };

export type ResearchLink =
  | { state: 'neutral' }
  | { state: 'invalid' }
  | { state: 'identifier'; paper: PublicPaperId };

export function parseResearchLink(search: string): ResearchLink {
  if (!search || search === '?') return { state: 'neutral' };

  const raw = search.startsWith('?') ? search.slice(1) : search;
  // URLSearchParams silently tolerates malformed %-escapes; fail closed first.
  if (/%(?![\da-fA-F]{2})/.test(raw)) return { state: 'invalid' };

  const pairs = [...new URLSearchParams(raw).entries()];
  if (pairs.length !== 1) return { state: 'invalid' };
  const [kind, value] = pairs[0];
  if (!value || value.length > 200 || value !== value.trim() || /[\u0000-\u001f\u007f\ufffd]/.test(value)) {
    return { state: 'invalid' };
  }

  if (kind === 'doi') {
    if (!/^10\.\d{4,9}\/[A-Za-z0-9._;()/:+-]+$/.test(value)) return { state: 'invalid' };
    return { state: 'identifier', paper: { kind, value } };
  }

  if (kind === 'pmid') {
    if (value.length > 12 || !/^\d+$/.test(value) || !/[1-9]/.test(value)) {
      return { state: 'invalid' };
    }
    return { state: 'identifier', paper: { kind, value } };
  }

  if (kind === 'pmcid') {
    const normalized = value.toUpperCase();
    if (normalized.length > 16 || !/^PMC[1-9]\d*$/.test(normalized)) {
      return { state: 'invalid' };
    }
    return { state: 'identifier', paper: { kind, value: normalized } };
  }

  return { state: 'invalid' };
}

/** Optional, explicitly authorised supplement; absence retains every legacy identity. */
export type Edition = 'evening';
export const exceptionalEveningDate = '2026-10-24';

export function editionKey(date: string | Date, edition?: Edition) {
  const day = date instanceof Date ? date.toISOString().slice(0, 10) : date;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day) || Number.isNaN(Date.parse(`${day}T00:00:00Z`)))
    throw new Error('Invalid editorial date');
  if (new Date(`${day}T00:00:00Z`).toISOString().slice(0, 10) !== day)
    throw new Error('Invalid editorial date');
  if (edition !== undefined && (edition !== 'evening' || day !== exceptionalEveningDate))
    throw new Error('Evening edition is authorised only for 2026-10-24');
  return edition ? `${day}-${edition}` : day;
}

export const editionLabel = (edition?: Edition) =>
  edition === 'evening' ? 'Evening edition' : 'Daily edition';

/** Evening precedes the ordinary edition, without pretending midnight is publication time. */
export function newestEditionFirst(
  a: { data: { date: Date; edition?: Edition } },
  b: { data: { date: Date; edition?: Edition } },
) {
  return (
    b.data.date.valueOf() - a.data.date.valueOf() ||
    Number(b.data.edition === 'evening') - Number(a.data.edition === 'evening')
  );
}

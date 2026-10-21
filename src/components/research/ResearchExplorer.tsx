import { useEffect, useMemo, useState } from 'react';
import { researchFixtures, searchResearchFixtures } from '../../lib/research/fixtures.ts';
import { parseResearchLink, type ResearchLink } from '../../lib/research/parse-public-id.ts';

const MAX_SELECTION = 10;

export default function ResearchExplorer() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [link, setLink] = useState<ResearchLink>({ state: 'neutral' });

  // Static HTML must be identical regardless of the reader's query string.
  // Interpret public IDs after hydration, without making any network request.
  useEffect(() => {
    setLink(parseResearchLink(window.location.search));
  }, []);

  const matches = useMemo(() => searchResearchFixtures(query), [query]);
  const selectedPapers = useMemo(
    () => researchFixtures.filter((paper) => selected.includes(paper.id)),
    [selected],
  );

  const toggle = (id: string) => {
    setSelected((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : previous.length < MAX_SELECTION
          ? [...previous, id]
          : previous,
    );
  };

  return (
    <div className="research-explorer">
      {link.state === 'invalid' && (
        <p className="research-notice" role="status">
          The research link contains an invalid or conflicting public identifier. No lookup was
          made. You can explore the demonstration records below.
        </p>
      )}
      {link.state === 'identifier' && (
        <p className="research-notice" role="status">
          <strong>Public {link.paper.kind.toUpperCase()} received:</strong>{' '}
          <code>{link.paper.value}</code>. Its format is valid, but bibliographic verification and
          live lookup are not connected in this preview. The examples below are unrelated fixtures.
        </p>
      )}

      <div className="research-workbench">
        <section className="research-catalogue" aria-labelledby="research-catalogue-title">
          <div className="research-section-heading">
            <div>
              <p className="eyebrow">01 / Explore</p>
              <h2 id="research-catalogue-title">Explore example records</h2>
            </div>
            <span className="research-count">4 fictional examples</span>
          </div>

          <div className="research-search-field">
            <label htmlFor="research-query">Filter this local catalogue</label>
            <input
              id="research-query"
              type="search"
              placeholder="Try: workflow, validation, pharma…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              autoComplete="off"
            />
            <p>Filters synthetic records on this page only. No search is sent to an API.</p>
          </div>

          <p className="research-results-count" role="status">
            {matches.length} {matches.length === 1 ? 'example' : 'examples'} shown
          </p>

          {matches.length === 0 ? (
            <div className="research-empty">
              <h3>No matching examples</h3>
              <p>
                This fixture catalogue is intentionally small. A missing match is not a finding
                about published research.
              </p>
              <button type="button" onClick={() => setQuery('')}>
                Clear filter
              </button>
            </div>
          ) : (
            <div className="research-results">
              {matches.map((paper) => {
                const isSelected = selected.includes(paper.id);
                return (
                  <article className="research-record" key={paper.id} aria-label={paper.title}>
                    <div className="research-record-meta">
                      <span>{paper.label} · Synthetic</span>
                      <span>{paper.topic}</span>
                    </div>
                    <h3>{paper.title}</h3>
                    <p className="research-record-method">{paper.method}</p>
                    <p>{paper.preview}</p>
                    <details>
                      <summary>Scope and limitations</summary>
                      <p>{paper.limitation}</p>
                    </details>
                    <button
                      type="button"
                      className="research-select"
                      aria-pressed={isSelected}
                      disabled={!isSelected && selected.length >= MAX_SELECTION}
                      onClick={() => toggle(paper.id)}
                    >
                      {isSelected ? 'Remove from selection' : 'Select example'}
                      <span aria-hidden="true">{isSelected ? '−' : '+'}</span>
                    </button>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        <aside className="research-selection" aria-labelledby="research-selection-title">
          <p className="eyebrow">02 / Review scope</p>
          <h2 id="research-selection-title">Your reading set</h2>
          <p className="research-selection-count" aria-live="polite">
            <strong>{selected.length}</strong> of {MAX_SELECTION} allowed
          </p>
          {selectedPapers.length === 0 ? (
            <p className="research-selection-empty">
              Choose an example to see how a future evidence workspace could collect papers for
              review.
            </p>
          ) : (
            <ul className="research-selected-items">
              {selectedPapers.map((paper) => (
                <li key={paper.id}>
                  <span>{paper.title}</span>
                  <button
                    type="button"
                    onClick={() => toggle(paper.id)}
                    aria-label={`Remove ${paper.title}`}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div className="research-next">
            <button type="button" disabled>
              Generate evidence brief · not available
            </button>
            <p>
              Evidence extraction, synthesis, saving, export and clinical review are not
              implemented. No accounts or model calls are used.
            </p>
          </div>
          <div className="research-guide">
            <h3>What to look for later</h3>
            <ol>
              <li>Provenance and access rights for each source</li>
              <li>Exact quoted evidence span IDs</li>
              <li>Study limits, contradictions and uncertainty</li>
              <li>Human-reviewed status before sharing</li>
            </ol>
          </div>
        </aside>
      </div>
    </div>
  );
}

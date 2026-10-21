# When an AI-written patient message sounds right, is it actually good?

_Editorial preview — not for publication. Based on the accessible accepted abstract and publication disclosures only. Full methods, subgroup detail and supplementary data require inspection._

A patient asking a doctor about a medical concern needs an answer that is clear, appropriate and safe. For hospitals testing AI-written replies, the obvious temptation is to ask software to grade the software: compare an AI draft with a clinician's answer and calculate how much their wording overlaps.

A study published on **21 October 2026** in _npj Digital Medicine_ suggests that this shortcut can miss the point. A high similarity score may tell you that two messages resemble one another. It does not necessarily tell you whether the patient received a useful answer.

### The drafts doctors saw — and the ones they didn't

Researchers studied a staged rollout of GPT-generated replies to patient-portal messages involving **30 primary-care physicians**, from September 2023 to August 2024.

In one condition, AI drafts were available for doctors to read and edit, covering **21,073 draft responses**. In another, **45,127** drafts were generated but hidden from the physicians, who wrote their own replies. The distinction gave researchers a way to compare AI output with both edited drafts and independently written clinical messages.

The team examined familiar automated text metrics, including BLEU, ROUGE, BERTScore and a readability score. They also compared those numbers with blinded physicians' judgments about effectiveness, the potential for misunderstanding and possible harm.

Only **2,264**, or roughly **11%**, of drafts in the displayed condition were incorporated into final responses with high semantic alignment. These messages scored **0.93 on BERTScore F1**, a measure of meaning-related textual similarity. Independently written physician messages in the hidden-draft condition had a lower, though still substantial, similarity to unseen AI drafts: **0.83**.

Yet the physician ratings did not simply track the similarity numbers. The abstract reports a preference for human-authored messages, rated **4.24 out of 5**. BERTScore tracked physician quality ratings in the displayed-draft condition, but **not** when the physician wrote without seeing the AI output.

### A score can measure the wrong thing

That is the practical finding. When a doctor edits an AI draft, a text-similarity score may help measure how faithfully the draft survives editing. When a doctor writes a response independently, the same measure is a much less reliable proxy for whether the AI's answer would have been clinically appropriate.

This is not a controlled demonstration that AI-written patient messages harm people, nor proof that doctors always write better messages. The abstract does not establish improvements in patient outcomes or describe a safe deployment threshold. The full paper's sampling of physician ratings, subgroup analyses and error definitions still needs editorial verification.

For a health system considering generative AI in its patient portal, the lesson is concrete: define what the evaluation is meant to measure before choosing the metric. Word overlap, physician preference, patient comprehension and the possibility of harm are different questions.

The study's broader claim is about **measurement validity**, not whether AI should be deployed. It is a useful warning against treating a neat dashboard score as a substitute for human evaluation in a clinical context.

### Source and verification

Primary study: Gavin Hui and colleagues, [_Silent evaluation reveals context-dependent validity of automated metrics for AI-generated clinical messages_](https://doi.org/10.1038/s41746-026-03211-2), _npj Digital Medicine_, published 21 October 2026. The accepted article landing record reports no competing interests. A full-text methods and corrections review remains **pending**; this article is therefore a **provisional draft, not a verified publication-ready briefing**.

**Image concept, not approved:** A clearly staged clinician reviewing an unreadable patient-portal reply in a warmly lit working environment. No invented patient message, identifiable person, effectiveness score or real study setting.

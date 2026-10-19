# HealthTech French technical and medical glossary

Use these house terms for reader-facing prose. Preserve literal identifiers,
commands, product/company names, code and bibliographic source labels.
These are editorial choices for the pilot, not universal translations.

| English concept        | French wording                                                                | Usage                                                                                          |
| ---------------------- | ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| deployment             | déploiement                                                                   | Preserve named deployment products                                                             |
| inference              | inférence                                                                     | Distinguish from training                                                                      |
| training               | entraînement                                                                  | Preserve the method and stated results                                                         |
| context window         | fenêtre de contexte                                                           | Keep token counts unchanged                                                                    |
| tool call              | appel d'outil                                                                 | Preserve literal tool/API names                                                                |
| sandbox                | environnement isolé (sandbox)                                                 | Use both on first mention; do not imply complete isolation                                     |
| prompt                 | prompt                                                                        | Explain as model instructions when helpful; preserve literal prompt text                       |
| evaluation / eval      | évaluation                                                                    | Preserve benchmark and metric names                                                            |
| reasoning              | raisonnement                                                                  | Preserve caveats about what was actually measured                                              |
| fine-tuning            | ajustement fin (fine-tuning)                                                  | Use both on first occurrence                                                                   |
| symlink                | lien symbolique                                                               | Keep literal paths and commands unchanged                                                      |
| permission enforcement | application des règles d'autorisation                                         | Do not imply guarantees absent from English                                                    |
| fail open              | poursuivre l'exécution en cas d'échec du contrôle (fail open)                 | Describe the authorization failure; do not suggest that continuing is safe                     |
| fail closed            | bloquer l'exécution lorsque l'autorisation ne peut être évaluée (fail closed) | Preserve the condition that triggers the block                                                 |
| shell wrapper          | wrapper shell                                                                 | Preserve literal `bash -c`, `sh -c` and the inner command                                      |
| permission hook        | hook d'autorisation                                                           | Preserve `PreToolUse` and `PermissionRequest`; do not imply the hook always succeeds           |
| precision / recall     | précision / rappel                                                            | Distinguish valid findings from coverage of known issues; preserve metric names such as F-beta |
| finding                | constat / signalement                                                         | Neither term proves a confirmed defect; preserve reference findings versus generated comments  |
| false positive         | faux positif                                                                  | Do not turn a disputed or low-value finding into a confirmed defect                            |
| severity               | gravité                                                                       | Do not replace severity with priority or business impact                                       |
| addressed rate         | taux de prise en compte (addressed rate)                                      | Do not claim resolution or acceptance when the source does not define the metric               |
| merge gate             | critère bloquant de fusion                                                    | Distinguish an advisory benchmark from a condition that blocks a merge                         |

For the pilot, refer to a literal `deny` rule as une règle `deny` and explain
it as a refusal rule when needed. Refer to a literal `ask` rule as une règle
`ask`, requiring approval, rather than translating its identifier. Preserve
`Read`, Bash, IDE, version strings, UTC and command syntax.

Translate policy precedence contextually as priorité des règles or ordre de
priorité des règles. Do not introduce a universal precedence order absent from
the article. For sandbox auto-allow, explain the mechanism in French while
preserving any literal setting/identifier used in the source.

“Token” requires context: distinguish model text tokens from access tokens.
Keep an established technical English term when a forced French substitute
would obscure meaning. Flag unresolved terminology and propose a glossary
addition for the editor; do not silently change house terms for one article.

Use neutral French, natural sentence order and concise paragraphs. Preserve
meaning before stylistic polish. French punctuation and number formatting may
change prose presentation, never numeric values, code or technical versions.

For metric prose, French decimal commas are allowed when unambiguous (for
example 96.6% → 96,6 %). Keep relative increases/decreases relative: an 8.0%
increase is not an increase of eight percentage points. Keep literal values
inside code, commands and identifiers unchanged. Do not infer a metric's
denominator or operational definition from its translated name.

## Healthcare evidence and regulation

| English concept                           | French wording                                                   | Preserve this distinction                                                   |
| ----------------------------------------- | ---------------------------------------------------------------- | --------------------------------------------------------------------------- |
| preprint                                  | prépublication                                                   | Do not imply peer review                                                    |
| peer-reviewed                             | évalué par les pairs                                             | Does not itself establish clinical utility                                  |
| retrospective / prospective               | rétrospectif / prospectif                                        | Preserve the actual study design                                            |
| randomized controlled trial               | essai contrôlé randomisé                                         | Do not infer randomization from a comparator                                |
| external validation                       | validation externe                                               | Not necessarily an independent team                                         |
| independent validation                    | validation indépendante                                          | Preserve what independence actually means                                   |
| clinical utility                          | utilité clinique                                                 | Distinguish not assessed, uncertain and demonstrated in the studied setting |
| patient benefit / patient outcome         | bénéfice pour les patients / résultat de santé chez les patients | An outcome may be neutral or harmful; do not infer benefit                  |
| endpoint                                  | critère de jugement                                              | Preserve primary, secondary and exploratory status                          |
| surrogate endpoint                        | critère de jugement de substitution                              | Do not substitute a patient outcome                                         |
| sample size / evaluation unit             | taille de l’échantillon / unité d’évaluation                     | Distinguish patients, images, encounters and sites                          |
| sensitivity / specificity                 | sensibilité / spécificité                                        | Preserve metric names and denominators                                      |
| positive predictive value                 | valeur prédictive positive                                       | Not the same as sensitivity                                                 |
| precision (classification metric)         | précision (valeur prédictive positive selon la définition)       | Follow the source definition; do not substitute statistical precision       |
| confidence interval                       | intervalle de confiance                                          | Preserve level and bounds; do not describe individual prognosis             |
| relative risk reduction                   | réduction relative du risque                                     | Not absolute reduction or percentage points                                 |
| adverse event                             | événement indésirable                                            | Does not by itself establish causality                                      |
| safety signal                             | signal de sécurité                                               | Not confirmed incidence or causal harm                                      |
| trial registration                        | enregistrement d’un essai                                        | Not completed recruitment or published results                              |
| preclinical / in silico                   | préclinique / in silico                                          | Not efficacy in humans                                                      |
| intended use / indication                 | usage prévu / indication                                         | Preserve the applicable regulatory wording                                  |
| FDA clearance                             | décision de clearance de la FDA (procédure citée)                | Keep the exact procedure/status; do not substitute approval                 |
| FDA approval                              | approbation de la FDA (approval)                                 | Preserve product, jurisdiction and restrictions                             |
| CE marking                                | marquage CE                                                      | Not EMA approval or proof of clinical benefit                               |
| marketing authorization                   | autorisation de mise sur le marché                               | Keep the actual issuing body and jurisdiction                               |
| conflict of interest                      | conflit d’intérêts                                               | No declaration found does not mean no conflict                              |
| not reported / unavailable / not assessed | non rapporté / indisponible / non évalué                         | Never collapse into absence of effect or absence of risk                    |

Keep DOI, PMID, NCT identifiers, CTIS records, molecule names, versions, doses,
units, effect signs and source URLs unchanged. Do not convert doses or units.
Keep a regulatory English term in parentheses if a French equivalent could
imply a different legal status; preserve the official procedure and document ID.
The glossary is editorial translation guidance, not medical or legal advice.

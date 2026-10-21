# Can an MRI help predict how a brain tumour will respond to radiotherapy?

*Editorial preview — not for publication. The journal's accessible abstract and disclosures were inspected, but the full study methods and supplementary material remain unverified.*

Radiotherapy is an important treatment for people with lower-grade glioma, a type of brain tumour. But tumours do not all respond alike. A tool that could reliably flag an unfavourable response **before** treatment would give clinicians a reason to investigate how best to plan and follow up care.

Researchers reporting in *npj Digital Medicine* on **20 October 2026** describe an AI model called **GUARD-LGG** designed to make such predictions. It is a promising research result, but it is not evidence that patients have already benefited from AI-guided treatment decisions.

### The test beyond the training hospital

According to the accepted article's abstract, researchers trained the model using **963 patients** from a principal centre. They then report testing it in **187 patients from seven external institutions** and in another **328 patients prospectively enrolled in a registered clinical trial**.

The paper reports the model's performance using the **area under the receiver operating characteristic curve**, or AUC. In simple terms, AUC measures how well a prediction score separates cases with different recorded responses. A result of 0.5 is no better than random separation; 1.0 is perfect separation in the test sample.

GUARD-LGG reached an AUC of **0.882** (95% confidence interval **0.830–0.934**) in the external test group and **0.913** (95% confidence interval **0.878–0.949**) in the prospective test group. The researchers also report stronger results in development and internal validation, as is common for models that are tested close to their training data.

The model drew on imaging-derived features and clinical information, including residual tumour, patient age and MRI texture and contrast characteristics. Radiogenomic analyses—work connecting image patterns with tumour biology—also suggested associations with processes related to resistance to radiation treatment. Patients the model classified as likely poor responders had shorter observed overall survival.

### Prediction is not a treatment decision

The important qualification is that **discrimination is not clinical utility**. Even a high AUC does not show that changing a treatment plan on the basis of the model improves survival, reduces adverse effects or produces better decisions.

The presence of a prospective test cohort does not, by itself, establish a randomized trial of AI-guided treatment. The full paper is still needed to understand the enrolled population, labels for treatment response, data handling, segmentation burden, calibration, subgroup results and possible overlap between development and validation datasets.

There is also earlier GUARD work described in a **2025 conference abstract**, with different numbers for the external test cohort. That does not prove inconsistency in the final paper: datasets and analyses may have evolved. It does mean that the changes should be checked before the new 2026 figures are represented as independently reproduced findings.

For a neuro-oncology team, the next step is not to let software decide radiation treatment. It is to ask whether the prediction can be reproduced locally, how often it misclassifies people, what information is required before treatment, and whether using the prediction changes any meaningful outcome.

### Source and verification

Primary study: Zihan Wang and colleagues, [*GUARD-LGG: a glioma upfront AI-driven radiotherapy response decipher for lower-grade glioma*](https://doi.org/10.1038/s41746-026-03112-4), *npj Digital Medicine*, published 20 October 2026. The accessible article record lists public research funding and reports no competing interests. Historical context: [2025 Neuro-Oncology conference abstract](https://academic.oup.com/neuro-oncology/article/27/Supplement_5/v274/8319485). **Full methods, trial design, supplement, correction and source-version reconciliation are pending.** This is a provisional draft.

**Image concept, not approved:** A neurologist and imaging scientist discussing an anonymous, out-of-focus *generic* imaging workflow. No fake radiology diagnosis, patient, GUARD output, AUC dashboard, treatment success or participant reenactment.

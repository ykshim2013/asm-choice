# Antiseizure Medication Formulary

A clinical prescribing reference for antiseizure medications (ASMs), published as a static site
with no build step and no dependencies.

**Live site:** https://ykshim2013.github.io/asm-choice/

## Pages

| Page | What it does |
| --- | --- |
| [`index.html`](index.html) | Start here: the escalation spine from first drug to drug resistance |
| [`choose.html`](choose.html) | Interactive chooser by seizure type and patient circumstances, plus the NICE tables and the agents that worsen seizures |
| [`monographs.html`](monographs.html) | 31 drug monographs, searchable and filterable by mechanism class |
| [`mechanisms.html`](mechanisms.html) | The six molecular targets, drawn, and what they mean for combination therapy |
| [`calculators.html`](calculators.html) | Paediatric weight-based dosing, lamotrigine titration, renal adjustment, interaction checker |
| [`levels.html`](levels.html) | Reference ranges and kinetics, with a blood level interpreter |
| [`safety.html`](safety.html) | HLA genotyping, monitoring, enzyme effects, pregnancy, contraception, withdrawal |
| [`emergency.html`](emergency.html) | Status epilepticus algorithm with weight-based doses calculated |
| [`references.html`](references.html) | Sources, method and limits |

## Interactive tools

- **Paediatric dose calculator** — 20 agents whose labels give weight-based dosing. Enter weight
  and age, get starting dose, increments, target and maximum, with the rule shown underneath.
- **Lamotrigine titration builder** — the schedule differs completely depending on valproate or
  enzyme-inducer co-medication. Paediatric doses round down to achievable 2 mg and 5 mg tablet
  combinations, as the label instructs.
- **Renal adjustment** — Cockcroft-Gault or Schwartz estimation, then per-drug adjustment bands.
- **Interaction checker** — recorded pairwise interactions across the selected regimen, plus a
  warning when the combination shares a mechanism class.
- **Status epilepticus doses** — every agent in the AES algorithm computed for the patient's
  weight, with maximums applied.
- **Blood level interpreter** — places a measured concentration against the published range in
  mg/L or µmol/L, with half-life and time to steady state.

## Structure

```
index.html … references.html    one file per page, no templating
assets/style.css                tokens, components, light and dark themes
assets/data.js                  drug records, kinetics, dosing rules, interaction pairs
assets/site.js                  nav, theme, scroll-spy, calculators
```

## Sources

Dosing is transcribed from United States prescribing information retrieved from
[DailyMed](https://dailymed.nlm.nih.gov/) rather than written from memory. Guidance and outcome
data come from:

- Sills GJ, Rogawski MA. Mechanisms of action of currently used antiseizure drugs. *Neuropharmacology* 2020;168:107966.
- NICE guideline NG217, *Epilepsies in children, young people and adults*, updated January 2025.
- Patsalos PN, Spencer EP, Berry DJ. Therapeutic drug monitoring of antiepileptic drugs in epilepsy: a 2018 update. *Ther Drug Monit* 2018;40:526–548.
- Glauser T, Shinnar S, Gloss D, et al. Evidence-based guideline: treatment of convulsive status epilepticus in children and adults. *Epilepsy Curr* 2016;16:48–61.
- Kwan P, Arzimanoglou A, Berg AT, et al. Definition of drug resistant epilepsy. *Epilepsia* 2010;51:1069–1077.
- Chen Z, Brodie MJ, Liew D, Kwan P. Treatment outcomes in patients with newly diagnosed epilepsy. *JAMA Neurol* 2018;75:279–286.
- Tomson T, Battino D, Bonizzoni E, et al. Comparative risk of major congenital malformations with eight different antiepileptic drugs. *Lancet Neurol* 2018;17:530–538.
- Glauser TA, Cnaan A, Shinnar S, et al. Ethosuximide, valproic acid, and lamotrigine in childhood absence epilepsy. *N Engl J Med* 2010;362:790–799.
- Pressler RM, Abend NS, Auvin S, et al. Treatment of seizures in the neonate. *Epilepsia* 2023;64:2550–2570.

Full list with links on the [references page](references.html).

## Scope and limits

Doses reflect United States labelling and United Kingdom guidance as of 11 September 2026.
Licensed indications, available formulations and approved doses differ by country. Sulthiame has
no FDA label, so no dose is given for it. Cenobamate, fenfluramine, ganaxolone and cannabidiol
post-date the 2018 monitoring review and have no established reference range. The interaction
checker covers antiseizure medications only.

This is a prescribing aid, not a substitute for the current label, the local formulary, or
clinical judgement.

## Local preview

```
python3 -m http.server 8000
```

Then open <http://localhost:8000/>.

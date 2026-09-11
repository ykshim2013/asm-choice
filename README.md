# Antiseizure Medication Formulary

A single-page clinical prescribing reference for antiseizure medications (ASMs), covering
mechanism of action, adult and paediatric dosing, escalation schedules, therapeutic drug
monitoring, safety checks, pregnancy data, and the convulsive status epilepticus algorithm.

The whole site is one self-contained file: [`index.html`](index.html). No build step, no
dependencies.

## Contents

| Section | What it holds |
| --- | --- |
| How to escalate | Sequence from first drug to drug-resistance, with seizure-freedom probabilities |
| Choosing by seizure type | First- and second-line agents by seizure type and by childhood syndrome |
| Drugs that worsen seizures | Agents that aggravate absence, myoclonic and Dravet seizures |
| Where the drugs act | Synapse diagram of the six molecular targets |
| Drug monographs | 31 agents, searchable and filterable by mechanism class |
| Blood levels and kinetics | Reference range, half-life, protein binding, time to steady state |
| Safety before you prescribe | HLA genotyping, baseline and ongoing laboratory checks, enzyme effects |
| Pregnancy and contraception | EURAP malformation rates, valproate restrictions, interaction with contraception |
| Stopping treatment | Withdrawal criteria and taper rates |
| Acute seizures | Status epilepticus algorithm and home rescue medication |

## Sources

Dosing is transcribed from United States prescribing information retrieved from
[DailyMed](https://dailymed.nlm.nih.gov/) rather than written from memory. Guidance and
outcome data come from:

- Sills GJ, Rogawski MA. Mechanisms of action of currently used antiseizure drugs. *Neuropharmacology* 2020;168:107966.
- NICE guideline NG217, *Epilepsies in children, young people and adults*, updated January 2025.
- Patsalos PN, Spencer EP, Berry DJ. Therapeutic drug monitoring of antiepileptic drugs in epilepsy: a 2018 update. *Ther Drug Monit* 2018;40:526–548.
- Glauser T, Shinnar S, Gloss D, et al. Evidence-based guideline: treatment of convulsive status epilepticus in children and adults. *Epilepsy Curr* 2016;16:48–61.
- Kwan P, Arzimanoglou A, Berg AT, et al. Definition of drug resistant epilepsy. *Epilepsia* 2010;51:1069–1077.
- Chen Z, Brodie MJ, Liew D, Kwan P. Treatment outcomes in patients with newly diagnosed epilepsy. *JAMA Neurol* 2018;75:279–286.
- Tomson T, Battino D, Bonizzoni E, et al. Comparative risk of major congenital malformations with eight different antiepileptic drugs. *Lancet Neurol* 2018;17:530–538.
- Glauser TA, Cnaan A, Shinnar S, et al. Ethosuximide, valproic acid, and lamotrigine in childhood absence epilepsy. *N Engl J Med* 2010;362:790–799.
- Pressler RM, Abend NS, Auvin S, et al. Treatment of seizures in the neonate. *Epilepsia* 2023;64:2550–2570.

Full reference list is at the foot of the page.

## Scope and limits

Doses reflect United States labelling and United Kingdom guidance as of 11 September 2026.
Licensed indications, available formulations and approved doses differ by country. Sulthiame
has no FDA label, so no dose is given for it. Cenobamate, fenfluramine, ganaxolone and
cannabidiol post-date the 2018 monitoring review and have no established reference range.

This is a prescribing aid, not a substitute for the current label, the local formulary, or
clinical judgement.

## Local preview

```
python3 -m http.server 8000
```

Then open <http://localhost:8000/>.

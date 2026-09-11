/* Antiseizure Medication Formulary — data layer
   Dosing transcribed from United States prescribing information (DailyMed).
   Kinetics and reference ranges from Patsalos PN, Spencer EP, Berry DJ.
   Ther Drug Monit 2018;40:526-548.
   Status epilepticus doses from Glauser T et al. Epilepsy Curr 2016;16:48-61. */

const CLASS_COLOR = {
  na:"var(--c-na)", ca:"var(--c-ca)", gaba:"var(--c-gaba)",
  glu:"var(--c-glu)", sv2a:"var(--c-sv2a)", multi:"var(--c-multi)"
};
const CLASS_LABEL = {
  na:"Sodium channel", ca:"Calcium channel", gaba:"GABA",
  glu:"Glutamate", sv2a:"SV2A", multi:"Multiple"
};

const DRUGS = [
 {id:"levetiracetam",n:"Levetiracetam",b:"Keppra",c:"sv2a",s:"Broad spectrum",
  t:"Binds <b>synaptic vesicle protein 2A</b>, modulating neurotransmitter release in an activity-dependent way. Also inhibits AMPA-mediated currents and partially blocks N-type calcium current.",
  ind:"Focal, myoclonic and primary generalised tonic-clonic seizures, as monotherapy or add-on.",
  ad:"500 mg twice daily. Increase by 500 mg twice daily every 2 weeks to a target of 1 500 mg twice daily. Maximum 3 000 mg/day; no added benefit above this.",
  pd:"1&ndash;&lt;6 months: 7 mg/kg twice daily, increase by 7 mg/kg twice daily every 2 weeks to 21 mg/kg twice daily. 6 months&ndash;&lt;4 years: 10 &rarr; 25 mg/kg twice daily. 4&ndash;&lt;16 years: 10 &rarr; 30 mg/kg twice daily, maximum 3 000 mg/day. Use oral solution at or below 20 kg.",
  pk:"Half-life 6&ndash;8 h &middot; protein binding 3% &middot; steady state 1&ndash;2 days &middot; reference range 12&ndash;46 mg/L. IV formulation available at the same dose.",
  org:"Renal: CrCl 50&ndash;80 give 500&ndash;1 000 mg every 12 h; 30&ndash;50 give 250&ndash;750 mg; below 30 give 250&ndash;500 mg. Dialysis: 500&ndash;1 000 mg every 24 h plus a 250&ndash;500 mg supplement after each session.",
  w:"<span class='flag'>Behavioural change is the limiting effect</span>: irritability, aggression, mood disturbance, occasionally psychosis. Somnolence and fatigue early. Rarely anaphylaxis, angioedema, Stevens-Johnson syndrome. Blood pressure rises in young children.",
  i:"Very few. Enzyme-inducing drugs lower concentrations by 20&ndash;30%.",
  pr:"2.8% major malformations in EURAP. Concentrations fall markedly in pregnancy; monitor and adjust."},

 {id:"brivaracetam",n:"Brivaracetam",b:"Briviact",c:"sv2a",s:"Focal (broad in practice)",
  t:"Binds <b>SV2A</b> with roughly 20-fold higher affinity and greater selectivity than levetiracetam.",
  ind:"Focal seizures, monotherapy or add-on, from 1 month of age.",
  ad:"50 mg twice daily from the start &mdash; no titration needed. Adjust between 25 and 100 mg twice daily on response and tolerability.",
  pd:"&ge;50 kg: 25&ndash;50 mg twice daily initially, maintenance 25&ndash;100 mg twice daily. 20&ndash;&lt;50 kg: 0.5&ndash;1 mg/kg twice daily, maintenance 0.5&ndash;2 mg/kg. 11&ndash;&lt;20 kg: 0.5&ndash;1.25 &rarr; 0.5&ndash;2.5 mg/kg twice daily. &lt;11 kg: 0.75&ndash;1.5 &rarr; 0.75&ndash;3 mg/kg twice daily.",
  pk:"Half-life 7&ndash;8 h &middot; protein binding 35% &middot; steady state 1&ndash;2 days &middot; reference range 0.2&ndash;2.0 mg/L. IV over 2&ndash;15 minutes at the same dose.",
  org:"Hepatic impairment at any stage: adults start 25 mg twice daily, maximum 75 mg twice daily. No renal adjustment; not recommended in end-stage renal disease.",
  w:"Somnolence, dizziness, fatigue. Irritability and aggression occur but appear less often than with levetiracetam &mdash; switching is a reasonable response to levetiracetam-induced behavioural change. Bronchospasm and angioedema reported.",
  i:"Carbamazepine, phenobarbital and phenytoin lower concentrations. Double the dose with rifampin.",
  pr:"Limited human data."},

 {id:"lamotrigine",n:"Lamotrigine",b:"Lamictal",c:"na",s:"Broad spectrum",
  t:"Blocks <b>voltage-gated sodium channels</b> in the inactivated state and blocks N- and P/Q-type calcium channels on presynaptic terminals, reducing glutamate release.",
  ind:"Focal and primary generalised tonic-clonic seizures; Lennox-Gastaut; a second-line option for absence. Not reliable for myoclonus.",
  ad:"<em>Titration depends entirely on co-medication.</em> With valproate: 25 mg alternate days for 2 weeks, then 25 mg daily for 2 weeks, then increase by 25&ndash;50 mg every 1&ndash;2 weeks; maintenance 100&ndash;200 mg/day. Without valproate or an inducer: 25 mg daily &rarr; 50 mg daily &rarr; increase by 50 mg every 1&ndash;2 weeks; maintenance 225&ndash;375 mg/day. With an enzyme inducer and no valproate: 50 mg daily &rarr; 100 mg daily &rarr; increase by 100 mg every 1&ndash;2 weeks; maintenance 300&ndash;500 mg/day.",
  pd:"2&ndash;12 years, with valproate: 0.15 mg/kg/day for 2 weeks &rarr; 0.3 mg/kg/day for 2 weeks &rarr; increase by 0.3 mg/kg/day every 1&ndash;2 weeks; maintenance 1&ndash;5 mg/kg/day (1&ndash;3 with valproate alone), maximum 200 mg/day. Without valproate or inducer: 0.3 &rarr; 0.6 &rarr; increments of 0.6 mg/kg/day; maintenance 4.5&ndash;7.5 mg/kg/day, maximum 300 mg. With an inducer: 0.6 &rarr; 1.2 &rarr; increments of 1.2 mg/kg/day; maintenance 5&ndash;15 mg/kg/day, maximum 400 mg. Children under 30 kg may need up to 50% more.",
  pk:"Half-life 15&ndash;35 h on monotherapy, roughly doubled by valproate and roughly halved by inducers &middot; protein binding 66% &middot; steady state 3&ndash;8 days &middot; reference range 2.5&ndash;15 mg/L.",
  org:"Hepatic: reduce doses about 25% in moderate and severe impairment, 50% in severe impairment with ascites. Renal: reduced maintenance doses may suffice; use with caution in severe impairment.",
  w:"<span class='flag'>Boxed warning for serious rash</span>, including Stevens-Johnson syndrome and toxic epidermal necrolysis. Risk rises with concomitant valproate, an excessive starting dose, and fast escalation &mdash; which is why the schedules above must be followed exactly. Also haemophagocytic lymphohistiocytosis, multiorgan hypersensitivity, aseptic meningitis, blood dyscrasias, and cardiac conduction effects in structural or ischaemic heart disease. Do not restart after a rash unless the benefit clearly outweighs the risk.",
  i:"Valproate inhibits its glucuronidation and roughly doubles exposure. Carbamazepine, phenytoin, phenobarbital, primidone, rifampin and some protease inhibitors lower it. Estrogen-containing contraceptives roughly halve it.",
  pr:"2.9% major malformations; risk rises above about 325 mg/day. Clearance increases substantially through pregnancy &mdash; monitor levels and plan the postpartum reduction."},

 {id:"valproate",n:"Valproate / divalproex",b:"Depakote, Epilim",c:"multi",s:"Broad spectrum",
  t:"<b>Multiple, none fully established.</b> The most convincing is increased GABA turnover: enhanced glutamic acid decarboxylase expression, increased GABA release, and inhibition of GABA-transaminase. Also blocks sodium channels and T-type calcium currents.",
  ind:"Every seizure type, including absence, myoclonic, tonic-clonic and focal. Still the most effective single agent for generalised epilepsy.",
  ad:"Focal seizures: 10&ndash;15 mg/kg/day, increasing by 5&ndash;10 mg/kg/week. Absence: start 15 mg/kg/day, increasing by 5&ndash;10 mg/kg/day at weekly intervals. Optimal response is usually below 60 mg/kg/day; 60 mg/kg/day is the maximum recommended. Divide doses above 250 mg/day.",
  pd:"Same mg/kg schedule, licensed from 10 years for focal seizures and at any age for absence. <span class='flag'>Hepatotoxicity risk is greatest under 2 years</span>, especially with polytherapy or a suspected metabolic or mitochondrial disorder.",
  pk:"Half-life 12&ndash;16 h &middot; protein binding 74&ndash;93% and concentration-dependent &middot; steady state 2&ndash;4 days &middot; reference range 50&ndash;100 mg/L. Thrombocytopenia becomes significantly more likely above 110 mg/L in women and 135 mg/L in men.",
  org:"Reduce the starting dose and titrate more slowly in the elderly. Contraindicated in hepatic disease and in known mitochondrial disorders caused by <span class='num'>POLG</span> variants.",
  w:"<span class='flag'>Boxed warnings for hepatotoxicity, teratogenicity and pancreatitis.</span> Also hyperammonaemic encephalopathy (worse with topiramate), thrombocytopenia and platelet dysfunction, weight gain, tremor, hair loss, polycystic ovary syndrome, and parkinsonism or cognitive slowing with long use.",
  i:"Broad inhibitor: raises lamotrigine, phenobarbital, rufinamide and the active carbamazepine epoxide. <span class='flag'>Carbapenem antibiotics collapse valproate levels within days</span> &mdash; avoid the combination.",
  pr:"10.3% major malformations, the highest of any agent, with the steepest dose-response, plus reduced IQ and increased autism risk. See the safety page for the current prescribing restrictions."},

 {id:"carbamazepine",n:"Carbamazepine",b:"Tegretol",c:"na",s:"Focal and tonic-clonic only",
  t:"Archetypal <b>voltage-gated sodium channel blocker</b>, binding preferentially to the inactivated state and producing use-dependent suppression of high-frequency firing. Also blocks persistent sodium current.",
  ind:"Focal seizures and generalised tonic-clonic seizures; trigeminal neuralgia. <span class='flag'>Worsens absence and myoclonic seizures.</span>",
  ad:"200 mg twice daily. Increase by up to 200 mg/day at weekly intervals. Maintenance usually 800&ndash;1 200 mg/day. Maximum 1 200 mg/day above 15 years; up to 1 600 mg/day in adults in rare instances.",
  pd:"6&ndash;12 years: 100 mg twice daily, increasing by up to 100 mg/day weekly; maintenance 400&ndash;800 mg/day, maximum 1 000 mg/day. Under 6 years: 10&ndash;20 mg/kg/day, optimal response usually below 35 mg/kg/day, which is the maximum recommended.",
  pk:"Half-life 8&ndash;20 h once autoinduction is complete &middot; protein binding 75% &middot; steady state 2&ndash;4 days &middot; reference range 4&ndash;12 mg/L; the epoxide metabolite up to 2.3 mg/L. <strong>Autoinduction</strong> raises clearance over the first 2&ndash;4 weeks, so re-check the level and expect to raise the dose.",
  org:"Take with meals. Suspension gives higher peaks than tablets at the same dose, so start low and dose more frequently when using it.",
  w:"<span class='flag'>Boxed warnings for serious dermatologic reactions with HLA-B*15:02, and for aplastic anaemia and agranulocytosis.</span> Hyponatraemia and SIADH, particularly in the elderly. Dose-related diplopia, ataxia and nausea. DRESS, associated with HLA-A*31:01.",
  i:"Potent inducer of CYP3A4 and glucuronidation; lowers most co-prescribed drugs including hormonal contraceptives, direct oral anticoagulants and other antiseizure medications. Many inhibitors (macrolides, azoles, fluoxetine, verapamil, grapefruit juice) raise it into toxicity.",
  pr:"5.5% major malformations overall, falling to 3.4% below 400 mg/day."},

 {id:"oxcarbazepine",n:"Oxcarbazepine",b:"Trileptal",c:"na",s:"Focal",
  t:"Prodrug rapidly reduced to the active <b>S-licarbazepine (10-hydroxycarbazepine)</b>, which blocks voltage-gated sodium channels. Bypasses the epoxide metabolite responsible for much of carbamazepine's toxicity.",
  ind:"Focal seizures, monotherapy or add-on, from 2 years (add-on) or 4 years (monotherapy). <span class='flag'>May worsen myoclonic and absence seizures.</span>",
  ad:"Add-on: 600 mg/day in two doses, increasing by up to 600 mg/day weekly to 1 200 mg/day. Starting monotherapy: 600 mg/day, increasing by 300 mg/day every third day to 1 200 mg/day. Converting from another drug: up to 2 400 mg/day.",
  pd:"4&ndash;16 years add-on: 8&ndash;10 mg/kg/day (not more than 600 mg/day) in two doses, reaching target over 2 weeks &mdash; 900 mg/day at 20&ndash;29 kg, 1 200 mg/day at 29&ndash;39 kg, 1 800 mg/day above 39 kg. 2&ndash;&lt;4 years: 8&ndash;10 mg/kg/day, or 16&ndash;20 mg/kg/day under 20 kg; maximum 60 mg/kg/day. Children 2&ndash;4 years may need twice the adult dose per kilogram.",
  pk:"Active metabolite half-life 8&ndash;15 h &middot; protein binding 40% &middot; steady state 2&ndash;3 days &middot; reference range 3&ndash;35 mg/L measured as 10-hydroxycarbazepine.",
  org:"Renal: start at half the usual dose (300 mg/day) when CrCl is below 30 mL/min.",
  w:"<span class='flag'>Hyponatraemia is commoner than with carbamazepine</span> &mdash; check sodium at 2&ndash;4 weeks and after increases. About a quarter to a third of patients with carbamazepine hypersensitivity react to oxcarbazepine too. HLA-B*15:02 caution applies. Dizziness, diplopia, somnolence.",
  i:"A weaker inducer than carbamazepine but still enough to reduce hormonal contraceptive reliability and lower lamotrigine and perampanel. Do not combine with eslicarbazepine.",
  pr:"3.0% major malformations. Levels fall in pregnancy."},

 {id:"eslicarbazepine",n:"Eslicarbazepine acetate",b:"Aptiom, Zebinix",c:"na",s:"Focal",
  t:"Prodrug of <b>S-licarbazepine</b>, which stabilises the inactivated state of voltage-gated sodium channels. Once-daily dosing is its practical advantage.",
  ind:"Focal seizures, monotherapy or add-on, from 4 years.",
  ad:"400 mg once daily, or 800 mg once daily if the need for rapid seizure reduction outweighs the tolerability cost. Increase weekly in steps of 400&ndash;600 mg to a maintenance dose of 800&ndash;1 600 mg once daily.",
  pd:"4&ndash;17 years, once daily by weight. 11&ndash;21 kg: 200 mg start and increment, maintenance 400&ndash;600 mg/day. 22&ndash;31 kg: 300 mg, 500&ndash;800 mg/day. 32&ndash;38 kg: 300 mg, 600&ndash;900 mg/day. Above 38 kg: 400 mg, 800&ndash;1 200 mg/day. No more than one increase per week.",
  pk:"Half-life 13&ndash;20 h &middot; protein binding 44% &middot; steady state 3&ndash;4 days &middot; reference range 3&ndash;35 mg/L (same molecule as the oxcarbazepine metabolite).",
  org:"Renal: reduce initial, titration and maintenance doses by 50% when CrCl is below 50 mL/min. Not recommended in severe hepatic impairment.",
  w:"Hyponatraemia, dizziness, somnolence, diplopia, nausea. Serious skin reactions including DRESS. Drug-induced liver injury, abnormal thyroid function tests, and haematologic effects reported. Adverse effects are more frequent when combined with carbamazepine.",
  i:"<span class='flag'>Do not use with oxcarbazepine.</span> Carbamazepine lowers eslicarbazepine but worsens tolerability; other inducers also lower it. It induces CYP3A4 enough to affect contraceptives and lowers lamotrigine.",
  pr:"Limited human data."},

 {id:"lacosamide",n:"Lacosamide",b:"Vimpat",c:"na",s:"Focal and generalised tonic-clonic",
  t:"Binds very slowly to the <b>inactivated state of voltage-gated sodium channels</b>. The slow time course may confer selectivity for the sustained firing of a seizure over normal action potentials.",
  ind:"Focal seizures from 1 month, monotherapy or add-on; add-on for primary generalised tonic-clonic seizures from 4 years.",
  ad:"Monotherapy 100 mg twice daily; add-on 50 mg twice daily. Increase by 50 mg twice daily each week. Maintenance 150&ndash;200 mg twice daily as monotherapy, 100&ndash;200 mg twice daily as add-on; maximum 400 mg/day. Where speed matters, give a single 200 mg loading dose under supervision, then 100 mg twice daily from 12 hours later.",
  pd:"&ge;50 kg as for adults. 30&ndash;&lt;50 kg: 1 mg/kg twice daily, increasing by 1 mg/kg twice daily weekly, maintenance 2&ndash;4 mg/kg twice daily. 11&ndash;&lt;30 kg: 1 mg/kg twice daily to a maintenance of 3&ndash;6 mg/kg twice daily. &lt;11 kg oral: 1 mg/kg twice daily to 3.75&ndash;7.5 mg/kg twice daily.",
  pk:"Half-life 12&ndash;14 h &middot; protein binding 14% &middot; steady state 2&ndash;3 days &middot; reference range 10&ndash;20 mg/L. IV over 15&ndash;60 minutes; 30 minutes minimum in children.",
  org:"Renal: reduce the maximum by 25% when CrCl is below 30 mL/min or in end-stage disease; supplement up to 50% after haemodialysis. Hepatic: reduce the maximum by 25% in mild or moderate impairment; avoid in severe.",
  w:"Dizziness, ataxia, diplopia and nausea, all dose-related. <span class='flag'>PR interval prolongation, AV block and atrial arrhythmias</span> &mdash; obtain an ECG before starting and at maintenance dose in patients with conduction disease or on conduction-slowing drugs. Syncope.",
  i:"Few. Enzyme inducers modestly lower it. Consider a lower dose with strong CYP3A4 and CYP2C9 inhibitors in renal or hepatic impairment.",
  pr:"Limited human data."},

 {id:"phenytoin",n:"Phenytoin",b:"Dilantin, Epanutin",c:"na",s:"Focal and tonic-clonic only",
  t:"Blocks <b>voltage-gated sodium channels</b> with slow onset and slow dissociation, and blocks persistent sodium current to a greater degree than the transient current.",
  ind:"Focal seizures, generalised tonic-clonic seizures, status epilepticus. <span class='flag'>Worsens absence and myoclonic seizures.</span>",
  ad:"100 mg three times daily initially. Most adults settle on 300&ndash;400 mg/day; up to 600 mg/day may be needed. <strong>Do not change the dose more often than every 7&ndash;10 days.</strong>",
  pd:"5 mg/kg/day in two or three divided doses; maintenance 4&ndash;8 mg/kg/day; maximum 300 mg/day. Children over 6 and adolescents may need the adult dose.",
  pk:"Half-life 30&ndash;100 h and <span class='flag'>saturable</span> &mdash; above the linear range a small dose increase produces a disproportionate concentration rise &middot; protein binding 92% &middot; steady state 6&ndash;21 days &middot; total reference range 10&ndash;20 mg/L, free 1&ndash;2 mg/L.",
  org:"Measure the <strong>free</strong> concentration in renal disease, hepatic disease, hypoalbuminaemia and pregnancy. The free acid (suspension, chewable tablets) contains about 8% more phenytoin than the sodium salt (capsules, injection) &mdash; adjust and re-check levels when switching.",
  w:"Nystagmus, ataxia and dysarthria signal toxicity. Gingival hyperplasia, hirsutism, coarsening of facial features, cerebellar atrophy with long use. Serious dermatologic reactions including with HLA-B*15:02; hepatic injury; blood dyscrasias; osteomalacia and reduced bone density. Rapid IV infusion causes hypotension and arrhythmia; purple glove syndrome at the infusion site.",
  i:"<span class='flag'>More interactions than any other antiseizure medication.</span> Potent enzyme inducer, and its own saturable metabolism is readily inhibited by azoles, macrolides, isoniazid, amiodarone, fluoxetine, omeprazole and many others.",
  pr:"6.4% major malformations. Concentrations fall in pregnancy; monitor the free fraction."},

 {id:"cenobamate",n:"Cenobamate",b:"Xcopri, Ontozry",c:"multi",s:"Focal",
  t:"<b>Dual action</b>: preferentially inhibits the persistent sodium current over the transient current, and acts as a positive allosteric modulator of GABA-A receptors at a site distinct from the benzodiazepine site.",
  ind:"Focal seizures in adults. Notable response rates in treatment-resistant focal epilepsy.",
  ad:"<strong>The slow titration is the whole point &mdash; do not compress it.</strong> 12.5 mg once daily weeks 1&ndash;2; 25 mg weeks 3&ndash;4; 50 mg weeks 5&ndash;6; 100 mg weeks 7&ndash;8; 150 mg weeks 9&ndash;10; then the 200 mg/day maintenance dose from week 11. If needed, increase by 50 mg every 2 weeks to a maximum of 400 mg/day.",
  pd:"Not established in children.",
  pk:"No reference range established. Check transaminases and bilirubin before starting if not measured in the past 3 months.",
  org:"Mild or moderate hepatic impairment (Child-Pugh A&ndash;B): maximum 200 mg/day. Severe impairment: not recommended. Tablets may be crushed and given in water or by nasogastric tube.",
  w:"<span class='flag'>DRESS occurred with rapid titration in early development</span>; the stepped schedule above was designed to prevent it. <span class='flag'>QT shortening</span> &mdash; avoid in familial short QT syndrome. Somnolence, dizziness, diplopia, fatigue. Liver injury. Taper over at least 2 weeks when stopping.",
  i:"Induces CYP3A4 and inhibits CYP2C19. Expect to reduce concomitant phenytoin and phenobarbital, and to see clobazam's active metabolite rise; lamotrigine and carbamazepine fall. Reduces hormonal contraceptive reliability.",
  pr:"No human data; use effective contraception."},

 {id:"topiramate",n:"Topiramate",b:"Topamax",c:"multi",s:"Broad spectrum",
  t:"<b>Several mechanisms at clinical concentrations</b>: sodium channel blockade including the persistent current, AMPA and kainate receptor antagonism, positive modulation of GABA-A receptors, and inhibition of carbonic anhydrase isoenzymes II and IV.",
  ind:"Focal seizures, primary generalised tonic-clonic seizures and Lennox-Gastaut syndrome; also migraine prophylaxis.",
  ad:"Monotherapy: 25 mg twice daily week 1, then 50, 75, 100, 150 and 200 mg twice daily in successive weeks, to a target of 400 mg/day. Add-on: start 25&ndash;50 mg/day and increase by 25&ndash;50 mg/day weekly to 200&ndash;400 mg/day.",
  pd:"2&ndash;9 years monotherapy: 25 mg nightly week 1, 25 mg twice daily week 2, then 25&ndash;50 mg/day increments weekly. Target by weight &mdash; up to 11 kg 150&ndash;250 mg/day; 12&ndash;22 kg 200&ndash;300; 23&ndash;31 kg 200&ndash;350; 32&ndash;38 kg 250&ndash;350; above 38 kg 250&ndash;400 mg/day. 2&ndash;16 years add-on: 5&ndash;9 mg/kg/day in two doses, starting at 25 mg (or 1&ndash;3 mg/kg/day) nightly and increasing by 1&ndash;3 mg/kg/day every 1&ndash;2 weeks, maximum 400 mg/day.",
  pk:"Half-life 20&ndash;30 h &middot; protein binding 20% &middot; steady state 4&ndash;7 days &middot; reference range 5&ndash;20 mg/L.",
  org:"Renal: halve the usual adult dose when CrCl is below 70 mL/min/1.73 m&sup2;. A supplemental dose may be needed on haemodialysis days. Do not break tablets &mdash; they taste bitter; sprinkle capsules can be opened onto soft food.",
  w:"<span class='flag'>Cognitive slowing and word-finding difficulty are the commonest reasons for stopping</span> and are strongly rate- and dose-dependent. Paraesthesia, weight loss, metabolic acidosis, kidney stones, acute myopia with secondary angle-closure glaucoma (an ophthalmic emergency in the first month), oligohidrosis and hyperthermia in children, reduced bone density and slowed growth.",
  i:"Above 200 mg/day it reduces hormonal contraceptive effectiveness. Raises phenytoin; lowers perampanel. Combined with valproate it can cause hyperammonaemia and hypothermia.",
  pr:"3.9% major malformations, with oral clefts and small-for-gestational-age infants reported. Avoid where an alternative exists."},

 {id:"zonisamide",n:"Zonisamide",b:"Zonegran",c:"multi",s:"Broad spectrum",
  t:"<b>Multiple actions</b>: blocks voltage-gated sodium channels and T-type calcium currents, and weakly inhibits carbonic anhydrase.",
  ind:"Licensed in the United States as add-on for focal seizures from 16 years; NICE lists it as a second-line monotherapy option for focal seizures and an option in myoclonic and tonic or atonic seizures.",
  ad:"100 mg once daily. After 2 weeks increase to 200 mg/day for at least 2 weeks, then 300 mg/day and 400 mg/day, holding each step at least 2 weeks. Doses of 100&ndash;600 mg/day are effective but there is no evidence of added response above 400 mg/day, and many adverse effects become commoner at 300 mg/day and above.",
  pd:"Not established below 16 years in the label, though used in paediatric practice. <span class='flag'>Oligohidrosis and heat stroke are specifically a paediatric risk.</span>",
  pk:"Half-life 50&ndash;70 h &mdash; the longest of the common agents, so allow up to 2 weeks to reach steady state after any change &middot; protein binding 40% &middot; steady state 9&ndash;12 days &middot; reference range 10&ndash;40 mg/L. Once-daily dosing is possible.",
  org:"Titrate more slowly and monitor more closely in renal or hepatic disease.",
  w:"A <span class='flag'>sulfonamide</span> &mdash; serious skin reactions occur and it should be avoided in sulfonamide allergy. Oligohidrosis and hyperthermia in children, metabolic acidosis, kidney stones, weight loss, somnolence, cognitive and psychiatric effects. Hyperammonaemia with valproate.",
  i:"Enzyme inducers shorten its half-life substantially. It raises the carbamazepine epoxide metabolite.",
  pr:"Limited data; associated with low birthweight."},

 {id:"perampanel",n:"Perampanel",b:"Fycompa",c:"glu",s:"Focal and generalised tonic-clonic",
  t:"Selective <b>non-competitive AMPA receptor antagonist</b>, binding the extracellular face of the channel away from the glutamate site. The only marketed drug acting primarily on glutamate receptors.",
  ind:"Focal seizures from 4 years, monotherapy or add-on; add-on for primary generalised tonic-clonic seizures from 12 years.",
  ad:"2 mg once daily at bedtime. Increase by 2 mg once daily, no more often than weekly. Maintenance 8&ndash;12 mg once daily for focal seizures, 8 mg for generalised tonic-clonic seizures. <strong>With a moderate or strong CYP3A4 inducer such as carbamazepine, phenytoin or oxcarbazepine, start at 4 mg.</strong>",
  pd:"Same schedule from 4 years (focal) or 12 years (tonic-clonic). Oral suspension available.",
  pk:"Half-life 48 h &middot; protein binding 98% &middot; steady state 10&ndash;19 days &mdash; do not judge response too early &middot; reference range 0.18&ndash;0.98 mg/L. Bedtime dosing mitigates dizziness.",
  org:"Hepatic: maximum 6 mg/day in mild and 4 mg/day in moderate impairment; not recommended in severe. Not recommended in severe renal impairment or on haemodialysis. In the elderly, increase no more often than every 2 weeks.",
  w:"<span class='flag'>Boxed warning for serious psychiatric and behavioural reactions</span>: aggression, hostility, irritability, anger and homicidal ideation, sometimes in people with no psychiatric history, and more likely at 12 mg. Warn the patient and family explicitly and ask at every review. Dizziness, gait disturbance and falls.",
  i:"Enzyme-inducing antiseizure medications substantially lower it. At 12 mg it reduces levonorgestrel exposure.",
  pr:"Limited human data."},

 {id:"clobazam",n:"Clobazam",b:"Onfi, Frisium",c:"gaba",s:"Broad spectrum add-on",
  t:"A <b>1,5-benzodiazepine</b> and positive allosteric modulator of synaptic GABA-A receptors, increasing the frequency of chloride channel opening. Its active metabolite N-desmethylclobazam contributes much of the effect.",
  ind:"Lennox-Gastaut syndrome; widely used as add-on across seizure types and as part of the Dravet regimen with stiripentol.",
  ad:"Over 30 kg: 10 mg/day, rising to 20 mg/day on day 7 and 40 mg/day on day 14. Doses above 5 mg/day are divided twice daily. Do not escalate faster than weekly, because clobazam takes 5 days and its active metabolite 9 days to reach steady state.",
  pd:"30 kg or less: 5 mg/day, rising to 10 mg/day on day 7 and 20 mg/day on day 14.",
  pk:"Half-life 10&ndash;30 h, with N-desmethylclobazam considerably longer &middot; protein binding 90% &middot; steady state 7&ndash;10 days &middot; reference range 0.03&ndash;0.3 mg/L for clobazam and 0.3&ndash;3.0 mg/L for the metabolite.",
  org:"Elderly patients, known CYP2C19 poor metabolisers, and mild to moderate hepatic impairment: start at 5 mg/day and titrate to half the usual doses, with a further increase possible from day 21.",
  w:"Sedation and somnolence; tolerance to the antiseizure effect develops in a proportion of patients. <span class='flag'>Physical dependence and withdrawal seizures</span> &mdash; taper by 5&ndash;10 mg/day each week. Increased risk of respiratory depression with opioids. Drooling, behavioural disinhibition and aggression in children.",
  i:"Cannabidiol inhibits CYP2C19 and raises N-desmethylclobazam 2.5- to 3-fold, which explains much of the sedation seen with that combination and part of its apparent efficacy. Stiripentol and felbamate also raise clobazam; inducers lower it.",
  pr:"Neonatal sedation and withdrawal after third-trimester exposure."},

 {id:"clonazepam",n:"Clonazepam",b:"Klonopin, Rivotril",c:"gaba",s:"Broad spectrum add-on",
  t:"<b>Benzodiazepine</b> positive allosteric modulator at the alpha/gamma-2 interface of synaptic GABA-A receptors.",
  ind:"Myoclonic, atonic and absence seizures; Lennox-Gastaut syndrome; panic disorder.",
  ad:"Not more than 1.5 mg/day in three divided doses initially. Increase by 0.5&ndash;1 mg every 3 days until control or limiting effects. Maximum 20 mg/day.",
  pd:"Up to 10 years or 30 kg: 0.01&ndash;0.03 mg/kg/day (never above 0.05 mg/kg/day) in two or three doses. Increase by no more than 0.25&ndash;0.5 mg every third day to a maintenance dose of 0.1&ndash;0.2 mg/kg/day.",
  pk:"Half-life 17&ndash;56 h &middot; protein binding 90% &middot; steady state 3&ndash;10 days &middot; reference range 0.02&ndash;0.07 mg/L.",
  org:"Start low in the elderly.",
  w:"Sedation, ataxia, behavioural change. <span class='flag'>Hypersalivation and increased bronchial secretions in children</span> can be troublesome. Tolerance, dependence and withdrawal seizures; taper slowly. Respiratory depression with opioids.",
  i:"Inducers lower it; felbamate raises it.",
  pr:"Neonatal sedation and withdrawal after third-trimester exposure."},

 {id:"phenobarbital",n:"Phenobarbital",b:"Luminal, Sezaby",c:"gaba",s:"Broad spectrum",
  t:"<b>Barbiturate</b> positive allosteric modulator of GABA-A receptors, increasing the <em>duration</em> of chloride channel opening (benzodiazepines increase its frequency). Also acts on extrasynaptic delta-subunit receptors and blocks AMPA receptors at higher concentrations.",
  ind:"Focal and generalised tonic-clonic seizures; first-line for neonatal seizures whatever the aetiology; status epilepticus. Still the most-used antiseizure medication worldwide on cost grounds.",
  ad:"60&ndash;200 mg/day orally. In status epilepticus, 15 mg/kg IV as a single dose.",
  pd:"3&ndash;6 mg/kg/day orally. A loading dose of 15&ndash;20 mg/kg in infants and children produces a concentration around 20 mg/L. <strong>Neonatal seizures:</strong> 20 mg/kg IV over 15 minutes; if seizures persist 15 minutes after the first load, a second dose of 20 mg/kg (term) or 10&ndash;20 mg/kg (preterm), to a maximum total of 40 mg/kg; then maintenance 4.5 mg/kg/day in divided doses starting 8&ndash;12 hours after the first load.",
  pk:"Half-life 70&ndash;140 h &mdash; the longest in routine use &middot; protein binding 48% &middot; steady state 15&ndash;30 days &middot; reference range 10&ndash;40 mg/L.",
  org:"Reduce in the elderly, the debilitated, and in renal or hepatic impairment.",
  w:"Sedation, cognitive slowing, and <span class='flag'>paradoxical hyperactivity and behavioural disturbance in children</span>. Respiratory depression, especially with opioids or other sedatives. Dependence and severe withdrawal. Reduced bone density, folate deficiency, Dupuytren's contracture and frozen shoulder with long use. Serious dermatologic reactions.",
  i:"Potent broad enzyme inducer, with the same wide consequences as carbamazepine and phenytoin. Valproate, felbamate, stiripentol and others inhibit its metabolism and raise concentrations.",
  pr:"6.5% major malformations, rising above 80 mg/day."},

 {id:"primidone",n:"Primidone",b:"Mysoline",c:"gaba",s:"Broad spectrum",
  t:"A prodrug: metabolised to <b>phenobarbital</b> and phenylethylmalonamide, both active. Most of the antiseizure effect is barbiturate GABA-A modulation.",
  ind:"Focal and generalised tonic-clonic seizures; essential tremor.",
  ad:"100&ndash;125 mg at bedtime on days 1&ndash;3; twice daily days 4&ndash;6; three times daily days 7&ndash;9; then 250 mg three times daily from day 10. Usual maintenance 750&ndash;1 000 mg/day; maximum 2 000 mg/day.",
  pd:"Under 8 years: 50 mg at bedtime days 1&ndash;3; 50 mg twice daily days 4&ndash;6; 100 mg twice daily days 7&ndash;9; then 125&ndash;250 mg three times daily. Usual maintenance 10&ndash;25 mg/kg/day in divided doses.",
  pk:"Half-life 7&ndash;22 h &middot; protein binding 33% &middot; steady state 2&ndash;5 days &middot; reference range 5&ndash;10 mg/L. <strong>Monitor the derived phenobarbital concentration as well</strong>, since it accumulates far more slowly.",
  org:"Start at 100&ndash;125 mg at bedtime when adding to existing therapy, and take at least 2 weeks over the transition to monotherapy.",
  w:"As for phenobarbital: sedation, ataxia, behavioural change, dependence, enzyme induction. Initial doses are often poorly tolerated, hence the slow stepped start.",
  i:"Potent enzyme inducer through its phenobarbital metabolite.",
  pr:"Treat as for phenobarbital."},

 {id:"ethosuximide",n:"Ethosuximide",b:"Zarontin",c:"ca",s:"Absence only",
  t:"Blocks <b>T-type calcium channels</b> in thalamocortical neurons, preferentially in the inactivated state, dismantling the 3 Hz spike-and-wave oscillation. May also block persistent sodium and calcium-activated potassium currents.",
  ind:"Absence seizures. No activity against tonic-clonic or focal seizures &mdash; a second drug is needed if those coexist.",
  ad:"500 mg/day from 6 years and above, increasing by 250 mg every 4&ndash;7 days. Above 1.5 g/day only under close supervision.",
  pd:"3&ndash;6 years: 250 mg/day. The optimal dose in most children is about 20 mg/kg/day, which gives concentrations in the accepted range.",
  pk:"Half-life 40&ndash;60 h &middot; protein binding 22% &middot; steady state 8&ndash;12 days &middot; reference range 40&ndash;100 mg/L.",
  org:"No specific adjustment stated; monitor in renal or hepatic disease.",
  w:"Nausea, abdominal pain, anorexia and hiccups, reduced by taking with food and titrating slowly. Blood dyscrasias including agranulocytosis and aplastic anaemia; drug-induced immune thrombocytopenia; a systemic lupus erythematosus-like syndrome; behavioural and psychotic reactions.",
  i:"Few. Inducers lower it; stiripentol, isoniazid and possibly valproate raise it.",
  pr:"Limited data."},

 {id:"gabapentin",n:"Gabapentin",b:"Neurontin",c:"ca",s:"Focal add-on only",
  t:"Binds the <b>alpha-2-delta-1 subunit</b> of voltage-gated calcium channels with high affinity. Despite the name it has no GABAergic activity. The downstream consequence remains incompletely defined.",
  ind:"Add-on for focal seizures from 3 years; postherpetic neuralgia. <span class='flag'>May worsen myoclonic and absence seizures.</span>",
  ad:"300 mg three times daily. Maintenance 300&ndash;600 mg three times daily; up to 2 400&ndash;3 600 mg/day has been used. No more than 12 hours between doses.",
  pd:"3&ndash;11 years: start 10&ndash;15 mg/kg/day in three divided doses, reaching maintenance over about 3 days. Maintenance 40 mg/kg/day at 3&ndash;4 years and 25&ndash;35 mg/kg/day at 5&ndash;11 years.",
  pk:"Half-life 5&ndash;9 h &middot; protein binding 0% &middot; reference range 2&ndash;20 mg/L. Absorption is saturable, so proportionality is lost at higher doses.",
  org:"Renal: CrCl 30&ndash;59 give 400&ndash;1 400 mg/day in two doses; 15&ndash;29 give 200&ndash;700 mg once daily; below 15 reduce in proportion. On haemodialysis add a 125&ndash;350 mg supplement after each 4-hour session.",
  w:"Somnolence, dizziness, weight gain, peripheral oedema, ataxia. Neuropsychiatric reactions in children aged 3&ndash;12. <span class='flag'>Fatal respiratory depression has been reported, particularly with opioids or in respiratory disease.</span> Misuse potential. Withdraw over at least a week.",
  i:"Essentially none with other antiseizure medications. Antacids reduce absorption.",
  pr:"Limited data."},

 {id:"pregabalin",n:"Pregabalin",b:"Lyrica",c:"ca",s:"Focal add-on only",
  t:"Binds the <b>alpha-2-delta-1 subunit</b> of voltage-gated calcium channels, like gabapentin but with linear, more predictable absorption.",
  ind:"Add-on for focal seizures from 1 month; neuropathic pain; generalised anxiety disorder in some countries. <span class='flag'>May worsen myoclonic and absence seizures.</span>",
  ad:"150 mg/day in two or three divided doses; maximum 600 mg/day.",
  pd:"30 kg and above as for adults. Below 30 kg: maximum 14 mg/kg/day, given three times daily from 1 month to under 4 years and two or three times daily from 4 years.",
  pk:"Half-life 5&ndash;7 h &middot; protein binding 0% &middot; steady state 1&ndash;2 days &middot; reference range 2&ndash;8 mg/L.",
  org:"Renal: reduce the total daily dose according to creatinine clearance; the extended-release form should not be used below CrCl 30 mL/min.",
  w:"Dizziness, somnolence, weight gain, peripheral oedema, blurred vision. Euphoria and misuse potential; a controlled drug in many countries. Respiratory depression with opioids. Angioedema. PR interval prolongation. Taper over at least a week.",
  i:"Very few. Gabapentin and phenytoin modestly lower it.",
  pr:"Limited data."},

 {id:"vigabatrin",n:"Vigabatrin",b:"Sabril",c:"gaba",s:"Infantile spasms; refractory focal",
  t:"<b>Irreversible inhibitor of GABA-transaminase</b>, the enzyme that degrades GABA. Brain GABA rises and stays raised until new enzyme is synthesised, which is why the effect outlasts the drug and why blood levels are useless.",
  ind:"Infantile epileptic spasms from 1 month &mdash; the drug of choice where tuberous sclerosis is the cause &mdash; and refractory focal seizures from 2 years when other options have failed.",
  ad:"Refractory focal seizures, 17 years and over: 1 000 mg/day (500 mg twice daily), increasing by 500 mg/day weekly to 3 000 mg/day. 6 000 mg/day gives no added benefit and more adverse effects. <strong>Withdraw if there is no substantial benefit within 3 months.</strong>",
  pd:"Infantile spasms: 50 mg/kg/day (25 mg/kg twice daily), increasing by 25&ndash;50 mg/kg/day every 3 days to a maximum of 150 mg/kg/day. <strong>Withdraw if there is no substantial benefit within 2&ndash;4 weeks.</strong> Focal seizures 2&ndash;16 years by weight: 10&ndash;15 kg 350 &rarr; 1 050 mg/day; over 15&ndash;20 kg 450 &rarr; 1 300; over 20&ndash;25 kg 500 &rarr; 1 500; over 25&ndash;60 kg 500 &rarr; 2 000 mg/day. Above 60 kg use adult doses.",
  pk:"Half-life 5&ndash;8 h &middot; protein binding 17%. <strong>Monitoring plasma concentrations does not help</strong>, because the pharmacological effect is disconnected from the concentration.",
  org:"Renal: reduce the dose by 25% in mild, 50% in moderate and 75% in severe impairment.",
  w:"<span class='flag'>Boxed warning: permanent bilateral concentric visual field constriction</span>, in a substantial proportion of patients, sometimes after only months of exposure and often asymptomatic until severe. Requires baseline and at least 3-monthly visual assessment, and a risk management programme. MRI signal abnormalities in infants. Somnolence, weight gain, anaemia, peripheral neuropathy. Taper on withdrawal.",
  i:"Few pharmacokinetic interactions; it lowers phenytoin modestly.",
  pr:"Limited data."},

 {id:"rufinamide",n:"Rufinamide",b:"Banzel, Inovelon",c:"na",s:"Lennox-Gastaut",
  t:"Prolongs the <b>inactivated state of voltage-gated sodium channels</b>, possibly with modest preference for Na<sub>V</sub>1.1 and Na<sub>V</sub>1.6. Its distinctive clinical profile suggests further mechanisms.",
  ind:"Seizures associated with Lennox-Gastaut syndrome from 1 year, particularly the drop attacks.",
  ad:"400&ndash;800 mg/day in two divided doses, increasing by 400&ndash;800 mg every other day to a maximum of 3 200 mg/day. <strong>Take with food</strong> &mdash; absorption depends on it.",
  pd:"1&ndash;&lt;17 years: about 10 mg/kg/day in two divided doses, increasing by about 10 mg/kg every other day to a maximum of 45 mg/kg/day, not exceeding 3 200 mg/day.",
  pk:"Half-life 6&ndash;10 h &middot; protein binding 28% &middot; steady state 1&ndash;2 days &middot; reference range 30&ndash;40 mg/L.",
  org:"Haemodialysis removes about 30%; consider adjusting around sessions. Not recommended in severe hepatic impairment.",
  w:"<span class='flag'>QT shortening &mdash; contraindicated in familial short QT syndrome.</span> Somnolence, vomiting, headache, dizziness, ataxia. Leukopenia. Status epilepticus reported.",
  i:"<strong>Valproate raises rufinamide substantially</strong> &mdash; start below 10 mg/kg/day in children or 400 mg/day in adults when valproate is already established, and start valproate low in patients already on rufinamide. Inducers lower it.",
  pr:"Limited data; reduces hormonal contraceptive reliability."},

 {id:"felbamate",n:"Felbamate",b:"Felbatol",c:"multi",s:"Lennox-Gastaut; refractory focal",
  t:"<b>Multiple</b>: NMDA receptor antagonism (GluN2B-selective), positive modulation of GABA-A receptors, and sodium channel blockade.",
  ind:"Reserved for Lennox-Gastaut syndrome and severe refractory epilepsy where the benefit justifies the haematological and hepatic risk.",
  ad:"1 200 mg/day in three or four divided doses. Increase by 600 mg every 2 weeks to 2 400 mg/day, and to 3 600 mg/day if needed. Reduce concomitant antiseizure medications by 20&ndash;33% when starting.",
  pd:"2&ndash;14 years, add-on in Lennox-Gastaut: 15 mg/kg/day in three or four divided doses, increasing by 15 mg/kg/day weekly to 45 mg/kg/day, while reducing concomitant drugs by 20%.",
  pk:"Half-life 16&ndash;22 h &middot; protein binding 48% &middot; steady state 3&ndash;5 days &middot; reference range 30&ndash;60 mg/L.",
  org:"Renal impairment: halve both starting and maintenance doses.",
  w:"<span class='flag'>Boxed warnings for aplastic anaemia and hepatic failure.</span> Written informed consent and frequent full blood counts and liver function tests are expected. Also insomnia, anorexia, weight loss, headache and nausea.",
  i:"Raises phenytoin, valproate, phenobarbital and the carbamazepine epoxide &mdash; hence the mandatory dose reductions of concomitant drugs.",
  pr:"Limited data."},

 {id:"tiagabine",n:"Tiagabine",b:"Gabitril",c:"gaba",s:"Focal add-on only",
  t:"Potent selective inhibitor of the <b>GAT-1 GABA transporter</b>, prolonging the action of synaptically released GABA at the synapse where it was released.",
  ind:"Add-on for focal seizures from 12 years. <span class='flag'>May worsen generalised epilepsies.</span>",
  ad:"<em>Dosing depends on whether the patient is enzyme-induced.</em> Induced adults: 4 mg once daily, increasing by 4&ndash;8 mg weekly to as much as 56 mg/day, in two to four divided doses; usual maintenance 32&ndash;56 mg/day. Non-induced patients reach more than twice the concentration for a given dose and need lower doses and slower titration. Take with food. No loading dose.",
  pd:"12&ndash;18 years, induced: 4 mg once daily, increase by 4 mg in week 2, then by 4&ndash;8 mg weekly to a maximum of 32 mg/day in two to four divided doses.",
  pk:"Half-life 5&ndash;9 h &middot; protein binding 98% &middot; steady state 1&ndash;2 days &middot; reference range 0.02&ndash;0.2 mg/L.",
  org:"Re-titrate whenever a patient's enzyme-induction status changes, in either direction.",
  w:"<span class='flag'>Non-convulsive status epilepticus</span>, including new-onset seizures in people without epilepsy taking it off-label. Somnolence, dizziness, difficulty concentrating, tremor, weakness and depressed mood.",
  i:"Carbamazepine, phenobarbital, phenytoin and primidone lower it substantially. Valproate displaces it from protein binding.",
  pr:"Limited data."},

 {id:"cannabidiol",n:"Cannabidiol",b:"Epidiolex, Epidyolex",c:"multi",s:"Developmental and epileptic encephalopathies",
  t:"<b>Mechanism not established.</b> Not a CB1 or CB2 agonist. Candidate targets include GPR55 antagonism, TRPV1 desensitisation, inhibition of the equilibrative nucleoside transporter ENT1 raising extracellular adenosine, and non-selective sodium channel blockade.",
  ind:"Seizures in Lennox-Gastaut syndrome and Dravet syndrome from 1 year, and in tuberous sclerosis complex.",
  ad:"Lennox-Gastaut and Dravet: 2.5 mg/kg twice daily; after one week increase to the maintenance dose of 5 mg/kg twice daily; if needed increase in weekly steps of 2.5 mg/kg twice daily to a maximum of 10 mg/kg twice daily. Tuberous sclerosis: 2.5 mg/kg twice daily, increasing by 5 mg/kg/day weekly to 12.5 mg/kg twice daily.",
  pd:"Same weight-based dosing; this is a paediatric drug in practice. Keep administration consistent with respect to meals, because food alters absorption.",
  pk:"No established reference range. Measure transaminases and bilirubin before starting.",
  org:"Hepatic: reduce both starting and maintenance doses in moderate (Child-Pugh B) and severe (Child-Pugh C) impairment, and titrate more slowly.",
  w:"<span class='flag'>Transaminase elevation, markedly more common with concomitant valproate.</span> Somnolence and sedation, largely through the clobazam interaction. Diarrhoea, decreased appetite, weight loss, fatigue, rash.",
  i:"Inhibits CYP2C19 and raises N-desmethylclobazam 2.5- to 3-fold; much of the observed efficacy in trials occurred alongside clobazam. Raises everolimus, which needs a 50% dose reduction and trough monitoring.",
  pr:"Limited data."},

 {id:"stiripentol",n:"Stiripentol",b:"Diacomit",c:"gaba",s:"Dravet syndrome",
  t:"Positive allosteric modulator of <b>all GABA-A receptor isoforms</b>, including delta-subunit-containing extrasynaptic receptors, binding at the same subunit interfaces as barbiturates and prolonging channel opening. Also a potent inhibitor of several cytochrome P450 enzymes, which contributes to its clinical effect.",
  ind:"Dravet syndrome, in combination with clobazam and valproate, from 6 months and 7 kg.",
  ad:"50 mg/kg/day in two or three divided doses (25 mg/kg twice daily or 16.67 mg/kg three times daily). Maximum 3 000 mg/day. Take with a meal; do not open capsules.",
  pd:"Same, from 6 months. Between 6 months and 1 year, and in children of 7 to under 10 kg, give twice daily only.",
  pk:"Half-life 4.5&ndash;13 h and saturable &middot; protein binding 96% &middot; steady state 1&ndash;3 days &middot; reference range 4&ndash;22 mg/L in Dravet syndrome. Check a full blood count before starting.",
  org:"Reduce the dose if somnolence or anorexia appear &mdash; often the partner drugs need reducing instead.",
  w:"Somnolence, decreased appetite and weight loss, ataxia, hypotonia. Neutropenia and thrombocytopenia. Contains phenylalanine in the powder formulation.",
  i:"<span class='flag'>A potent enzyme inhibitor.</span> Expect to reduce clobazam, valproate, phenytoin, carbamazepine and phenobarbital. Much of the added benefit of the Dravet triple regimen reflects raised norclobazam concentrations.",
  pr:"Limited data."},

 {id:"fenfluramine",n:"Fenfluramine",b:"Fintepla",c:"multi",s:"Dravet and Lennox-Gastaut",
  t:"Increases <b>serotonin</b> release and acts at 5-HT receptors, with additional positive modulation of the sigma-1 receptor. Mechanistically unlike any other antiseizure medication.",
  ind:"Seizures in Dravet syndrome and Lennox-Gastaut syndrome from 2 years.",
  ad:"0.1 mg/kg twice daily, increasing weekly as tolerated. Maximum 0.35 mg/kg twice daily, and no more than 26 mg/day. <strong>With concomitant stiripentol plus clobazam, the maximum is 0.2 mg/kg twice daily and 17 mg/day.</strong>",
  pd:"Same weight-based dosing from 2 years. In Lennox-Gastaut, titrate to the full maintenance dose; in Dravet, increase only as needed for seizure control.",
  pk:"No established reference range. Lower maximum doses apply with strong CYP1A2 or CYP2D6 inhibitors, in severe renal impairment, and in hepatic impairment.",
  org:"Severe renal impairment (eGFR 15&ndash;29): maximum 20 mg/day. Hepatic impairment: maximum 20 mg/day in mild and moderate, 17 mg/day in severe; not recommended with stiripentol in moderate or severe impairment.",
  w:"<span class='flag'>Boxed warning for valvular heart disease and pulmonary arterial hypertension.</span> Echocardiogram before starting, every 6 months during treatment, and 3&ndash;6 months after the last dose; supplied only through a risk management programme. Decreased appetite and weight loss that need active monitoring in a growing child. Somnolence, serotonin syndrome with other serotonergic drugs, raised blood pressure, glaucoma.",
  i:"Stiripentol plus clobazam raises exposure, hence the reduced maximum. Avoid monoamine oxidase inhibitors.",
  pr:"No human data."},

 {id:"ganaxolone",n:"Ganaxolone",b:"Ztalmy",c:"gaba",s:"CDKL5 deficiency disorder",
  t:"A synthetic <b>neurosteroid</b> and positive allosteric modulator of both synaptic and extrasynaptic GABA-A receptors, including delta-subunit-containing receptors that benzodiazepines cannot reach.",
  ind:"Seizures associated with CDKL5 deficiency disorder from 2 years.",
  ad:"Over 28 kg: 50 mg three times daily, then 100, 200, 400 and 600 mg three times daily in successive weeks, to a maximum of 1 800 mg/day. Always with food.",
  pd:"28 kg or less: 2 mg/kg three times daily, then 4, 8, 14 and 21 mg/kg three times daily at weekly intervals, to a maximum of 63 mg/kg/day. Increase no more often than every 7 days.",
  pk:"No established reference range. Food markedly increases absorption &mdash; dosing without food underdoses the patient.",
  org:"Severe hepatic impairment (Child-Pugh C): about one third of the usual doses at each step. No adjustment in mild or moderate impairment.",
  w:"Somnolence and sedation, the dominant adverse effect, additive with other central nervous system depressants. Pyrexia, upper respiratory infection, salivary hypersecretion. Taper on withdrawal.",
  i:"Strong CYP3A4 inducers reduce exposure.",
  pr:"No human data."},

 {id:"everolimus",n:"Everolimus",b:"Afinitor Disperz",c:"multi",s:"Tuberous sclerosis complex",
  t:"<b>mTORC1 inhibitor.</b> Binds FKBP12; the complex allosterically inhibits mTORC1, correcting the constitutive mTOR pathway activation caused by <span class='num'>TSC1</span> or <span class='num'>TSC2</span> loss of function. The clearest example of a mechanism-targeted, disease-specific antiseizure therapy.",
  ind:"Treatment-refractory focal seizures associated with tuberous sclerosis complex; also subependymal giant cell astrocytoma and renal angiomyolipoma in the same condition.",
  ad:"5 mg/m&sup2; once daily, then titrated to a whole-blood trough concentration of 5&ndash;15 ng/mL. New dose = current dose &times; (target concentration &divide; current concentration), increasing by no more than 5 mg at a time.",
  pd:"Same body-surface-area dosing. Administer the dispersible tablets as a suspension in water only, within 60 minutes of preparation.",
  pk:"Check the trough 1&ndash;2 weeks after starting, after any dose change, after starting or stopping an interacting drug, and after a change in hepatic function. Then every 3&ndash;6 months while body surface area is changing, and every 6&ndash;12 months when stable.",
  org:"Severe hepatic impairment (Child-Pugh C): 2.5 mg/m&sup2; once daily, adjusted on trough concentrations.",
  w:"Stomatitis, infections including reactivation, non-infectious pneumonitis, myelosuppression, hyperglycaemia and hyperlipidaemia, impaired wound healing, amenorrhoea. Avoid live vaccines.",
  i:"Strong CYP3A4 and P-glycoprotein inducers such as carbamazepine, phenytoin and phenobarbital require the dose to be doubled. <span class='flag'>Cannabidiol raises everolimus &mdash; halve the dose and check the trough.</span> Avoid strong inhibitors.",
  pr:"Embryo-fetal toxicity; effective contraception required."},

 {id:"acetazolamide",n:"Acetazolamide",b:"Diamox",c:"multi",s:"Adjunct",
  t:"Non-selective <b>carbonic anhydrase inhibitor</b>. Reducing the bicarbonate gradient limits paradoxical GABA-A-mediated depolarisation during high-frequency activity.",
  ind:"Add-on therapy, historically most useful in absence and catamenial seizures. Tolerance limits long-term value.",
  ad:"8&ndash;30 mg/kg/day in divided doses; the usual effective range is 375&ndash;1 000 mg/day. When adding to existing therapy, start at 250 mg once daily.",
  pd:"Same mg/kg range in divided doses.",
  pk:"No routine monitoring. Change to or from acetazolamide gradually, as with any antiseizure medication.",
  org:"Avoid in significant renal or hepatic impairment and in hyponatraemia or hypokalaemia.",
  w:"Paraesthesia, metabolic acidosis, electrolyte disturbance, kidney stones, anorexia. A sulfonamide, with the associated hypersensitivity risk. <span class='flag'>Tolerance to the antiseizure effect commonly develops.</span>",
  i:"Raises phenytoin and phenobarbital concentrations; lowers primidone.",
  pr:"Limited data."},

 {id:"sulthiame",n:"Sulthiame",b:"Ospolot",c:"multi",s:"Centrotemporal spike epilepsy",
  t:"<b>Carbonic anhydrase inhibitor</b> with additional effects on sodium currents.",
  ind:"Self-limited epilepsy with centrotemporal spikes, where NICE lists it as a third-line option, and epileptic encephalopathy with spike-and-wave activation in sleep. <span class='flag'>Not approved by the FDA</span>; licensed in parts of Europe, the Middle East and Asia.",
  ad:"Dose according to the local summary of product characteristics; no United States labelling exists to transcribe here.",
  pd:"As above; it is used almost exclusively in children.",
  pk:"Reference range 2&ndash;10 mg/L in children and 1&ndash;3 mg/L in adults on polytherapy (Patsalos 2018).",
  org:"Reduce in renal impairment.",
  w:"Paraesthesia, hyperpnoea, anorexia, weight loss, headache, behavioural change.",
  i:"Raises phenytoin and phenobarbital concentrations.",
  pr:"Limited data."}
];

/* ---------- kinetics and reference ranges (Patsalos 2018, Table 3) ---------- */
const PK = [
 {id:"brivaracetam", n:"Brivaracetam", mg:[0.2,2.0], um:[1,10], t12:"7-8 h", pb:"35%", ss:"1-2 d", meta:"-"},
 {id:"carbamazepine", n:"Carbamazepine", mg:[4,12], um:[17,51], t12:"8-20 h", pb:"75%", ss:"2-4 d", meta:"Carbamazepine-epoxide, to 2.3 mg/L"},
 {id:"clobazam", n:"Clobazam", mg:[0.03,0.3], um:[0.1,1.0], t12:"10-30 h", pb:"90%", ss:"7-10 d", meta:"N-desmethylclobazam, 0.3-3.0 mg/L"},
 {id:"clonazepam", n:"Clonazepam", mg:[0.02,0.07], um:[0.06,0.22], t12:"17-56 h", pb:"90%", ss:"3-10 d", meta:"-"},
 {id:"eslicarbazepine", n:"Eslicarbazepine", mg:[3,35], um:[12,139], t12:"13-20 h", pb:"44%", ss:"3-4 d", meta:"Measured as S-licarbazepine"},
 {id:"ethosuximide", n:"Ethosuximide", mg:[40,100], um:[283,708], t12:"40-60 h", pb:"22%", ss:"8-12 d", meta:"-"},
 {id:"felbamate", n:"Felbamate", mg:[30,60], um:[126,252], t12:"16-22 h", pb:"48%", ss:"3-5 d", meta:"-"},
 {id:"gabapentin", n:"Gabapentin", mg:[2,20], um:[12,117], t12:"5-9 h", pb:"0%", ss:"1-2 d", meta:"-"},
 {id:"lacosamide", n:"Lacosamide", mg:[10,20], um:[40,80], t12:"12-14 h", pb:"14%", ss:"2-3 d", meta:"-"},
 {id:"lamotrigine", n:"Lamotrigine", mg:[2.5,15], um:[10,59], t12:"15-35 h", pb:"66%", ss:"3-8 d", meta:"-"},
 {id:"levetiracetam", n:"Levetiracetam", mg:[12,46], um:[70,270], t12:"6-8 h", pb:"3%", ss:"1-2 d", meta:"-"},
 {id:"oxcarbazepine", n:"Oxcarbazepine", mg:[3,35], um:[12,139], t12:"8-15 h", pb:"40%", ss:"2-3 d", meta:"Measured as 10-hydroxycarbazepine"},
 {id:"perampanel", n:"Perampanel", mg:[0.18,0.98], um:[0.50,2.74], t12:"48 h", pb:"98%", ss:"10-19 d", meta:"-"},
 {id:"phenobarbital", n:"Phenobarbital", mg:[10,40], um:[43,172], t12:"70-140 h", pb:"48%", ss:"15-30 d", meta:"-"},
 {id:"phenytoin", n:"Phenytoin", mg:[10,20], um:[40,79], t12:"30-100 h, saturable", pb:"92%", ss:"6-21 d", meta:"Free phenytoin 1-2 mg/L"},
 {id:"pregabalin", n:"Pregabalin", mg:[2,8], um:[13,50], t12:"5-7 h", pb:"0%", ss:"1-2 d", meta:"-"},
 {id:"primidone", n:"Primidone", mg:[5,10], um:[23,46], t12:"7-22 h", pb:"33%", ss:"2-5 d", meta:"Phenobarbital, 10-40 mg/L"},
 {id:"rufinamide", n:"Rufinamide", mg:[30,40], um:[126,168], t12:"6-10 h", pb:"28%", ss:"1-2 d", meta:"-"},
 {id:"stiripentol", n:"Stiripentol", mg:[4,22], um:[17,94], t12:"4.5-13 h, saturable", pb:"96%", ss:"1-3 d", meta:"-"},
 {id:"sulthiame", n:"Sulthiame", mg:[2,10], um:null, t12:"-", pb:"-", ss:"-", meta:"Children on polytherapy; adults 1-3 mg/L"},
 {id:"tiagabine", n:"Tiagabine", mg:[0.02,0.2], um:[0.05,0.53], t12:"5-9 h", pb:"98%", ss:"1-2 d", meta:"-"},
 {id:"topiramate", n:"Topiramate", mg:[5,20], um:[15,59], t12:"20-30 h", pb:"20%", ss:"4-7 d", meta:"-"},
 {id:"valproate", n:"Valproate", mg:[50,100], um:[346,693], t12:"12-16 h", pb:"74-93%", ss:"2-4 d", meta:"Thrombocytopenia risk above 110 (F) / 135 (M) mg/L"},
 {id:"vigabatrin", n:"Vigabatrin", mg:null, um:null, t12:"5-8 h", pb:"17%", ss:"1-2 d", meta:"Concentrations do not guide therapy"},
 {id:"zonisamide", n:"Zonisamide", mg:[10,40], um:[47,188], t12:"50-70 h", pb:"40%", ss:"9-12 d", meta:"-"}
];

/* ---------- status epilepticus, weight-based (AES 2016) ---------- */
const SE_PHASES = [
 {phase:"Initial (5-20 min)", level:"A", drugs:[
   {n:"Midazolam, intramuscular", band:true, calc:w => w>40 ? "10 mg" : (w>=13 ? "5 mg" : "not defined by weight band below 13 kg"),
    rule:"10 mg if over 40 kg, 5 mg if 13-40 kg. Single dose.", repeat:"Single dose"},
   {n:"Lorazepam, intravenous", perKg:0.1, max:4, unit:"mg",
    rule:"0.1 mg/kg/dose, maximum 4 mg", repeat:"May repeat once"},
   {n:"Diazepam, intravenous", perKgLo:0.15, perKgHi:0.2, max:10, unit:"mg",
    rule:"0.15-0.2 mg/kg/dose, maximum 10 mg", repeat:"May repeat once"},
   {n:"Diazepam, rectal", perKgLo:0.2, perKgHi:0.5, max:20, unit:"mg", alt:true,
    rule:"0.2-0.5 mg/kg, maximum 20 mg (Level B)", repeat:"Single dose"},
   {n:"Phenobarbital, intravenous", perKg:15, unit:"mg", alt:true,
    rule:"15 mg/kg/dose if no benzodiazepine available", repeat:"Single dose"}
 ]},
 {phase:"Second (20-40 min)", level:"U / B", drugs:[
   {n:"Fosphenytoin, intravenous", perKg:20, max:1500, unit:"mg PE",
    rule:"20 mg phenytoin equivalents/kg, maximum 1 500 mg PE", repeat:"Single dose"},
   {n:"Valproic acid, intravenous", perKg:40, max:3000, unit:"mg",
    rule:"40 mg/kg, maximum 3 000 mg (Level B)", repeat:"Single dose"},
   {n:"Levetiracetam, intravenous", perKg:60, max:4500, unit:"mg",
    rule:"60 mg/kg, maximum 4 500 mg", repeat:"Single dose"},
   {n:"Phenobarbital, intravenous", perKg:15, unit:"mg", alt:true,
    rule:"15 mg/kg if none of the above available and not already given (Level B)", repeat:"Single dose"}
 ]}
];

/* ---------- renal dose adjustment rules ---------- */
const RENAL = [
 {id:"levetiracetam", n:"Levetiracetam", f:c =>
   c>80 ? "500-1 500 mg every 12 h" :
   c>=50 ? "500-1 000 mg every 12 h" :
   c>=30 ? "250-750 mg every 12 h" :
   "250-500 mg every 12 h",
  note:"On dialysis: 500-1 000 mg every 24 h plus a 250-500 mg supplement after each session.",
  unitsNote:"CrCl normalised to mL/min/1.73 m&sup2; in the label."},
 {id:"gabapentin", n:"Gabapentin", f:c =>
   c>=60 ? "900-3 600 mg/day, three times daily" :
   c>=30 ? "400-1 400 mg/day, twice daily" :
   c>=15 ? "200-700 mg/day, once daily" :
   "Reduce in proportion to CrCl below 15 mL/min",
  note:"Add a 125-350 mg supplement after each 4-hour haemodialysis session."},
 {id:"topiramate", n:"Topiramate", f:c =>
   c>=70 ? "No adjustment" : "Half the usual adult dose",
  note:"A supplemental dose may be needed on haemodialysis days."},
 {id:"lacosamide", n:"Lacosamide", f:c =>
   c>=30 ? "No adjustment" : "Reduce the maximum dose by 25%",
  note:"After a 4-hour haemodialysis session, consider supplementing up to 50%."},
 {id:"vigabatrin", n:"Vigabatrin", f:c =>
   c>80 ? "No adjustment" :
   c>50 ? "Reduce dose by 25%" :
   c>30 ? "Reduce dose by 50%" :
   c>10 ? "Reduce dose by 75%" :
   "No guidance below CrCl 10 mL/min",
  note:"Dose adjustment applies to adults and children 2 years and over."},
 {id:"eslicarbazepine", n:"Eslicarbazepine", f:c =>
   c>=50 ? "No adjustment" : "Reduce initial, titration and maintenance doses by 50%",
  note:""},
 {id:"oxcarbazepine", n:"Oxcarbazepine", f:c =>
   c>=30 ? "No adjustment" : "Start at 300 mg/day, half the usual starting dose, and increase slowly",
  note:""},
 {id:"perampanel", n:"Perampanel", f:c =>
   c>=30 ? "Use with close monitoring in moderate impairment; consider slower titration" :
   "Not recommended in severe impairment or on haemodialysis",
  note:""},
 {id:"felbamate", n:"Felbamate", f:c =>
   c>=60 ? "No specific adjustment" : "Halve both starting and maintenance doses",
  note:"Concomitant antiseizure medications may warrant further reduction."},
 {id:"pregabalin", n:"Pregabalin", f:c =>
   c>=60 ? "No adjustment" : "Reduce the total daily dose; the label gives a CrCl-banded table",
  note:"Use the immediate-release form rather than extended-release below CrCl 30 mL/min."}
];

/* ---------- paediatric weight-based dosing ---------- */
function tabletRoundDown(mg){
  // Lamotrigine dispersible tablets are 2 mg and 5 mg; every whole number except 1 and 3
  // can be made from them. The label instructs rounding down to the nearest whole tablet.
  let v = Math.floor(mg);
  if(v === 3) v = 2;
  if(v < 2) return null;
  return v;
}
const r1 = n => Math.round(n*10)/10;
const r0 = n => Math.round(n);
const r2 = n => Math.round(n*100)/100;   // millilitre volumes, where 0.1 mL matters

const PED = [
 {id:"levetiracetam", n:"Levetiracetam", minKg:3,
  calc:(w,ageM) => {
    let s,t,inc,band;
    if(ageM < 6){ s=7; t=21; inc=7; band="1 to under 6 months"; }
    else if(ageM < 48){ s=10; t=25; inc=10; band="6 months to under 4 years"; }
    else { s=10; t=30; inc=10; band="4 to under 16 years"; }
    const cap = 3000;
    const tgtDay = Math.min(t*2*w, cap);
    return {band, rows:[
      {k:"Starting dose", v:`${r0(s*w)} mg twice daily`, n:`${s} mg/kg twice daily`},
      {k:"Increment", v:`+${r0(inc*w)} mg twice daily every 2 weeks`, n:`${inc} mg/kg twice daily`},
      {k:"Target dose", v:`${r0(Math.min(t*w, cap/2))} mg twice daily`, n:`${t} mg/kg twice daily`},
      {k:"Target daily total", v:`${r0(tgtDay)} mg/day`, n: t*2*w > cap ? "capped at the 3 000 mg/day adult maximum" : `${t*2} mg/kg/day`}
    ], rule:`${band}: start ${s} mg/kg twice daily, increase by ${inc} mg/kg twice daily every 2 weeks to ${t} mg/kg twice daily. Maximum 3 000 mg/day. Use the oral solution at or below 20 kg.`};
  }},

 {id:"valproate", n:"Valproate", minKg:3,
  calc:(w) => ({band:"All ages (focal seizures licensed from 10 years)", rows:[
      {k:"Starting dose", v:`${r0(10*w)} to ${r0(15*w)} mg/day`, n:"10-15 mg/kg/day in divided doses"},
      {k:"Weekly increment", v:`+${r0(5*w)} to ${r0(10*w)} mg/day`, n:"5-10 mg/kg/week"},
      {k:"Usual ceiling", v:`below ${r0(60*w)} mg/day`, n:"optimal response usually below 60 mg/kg/day"},
      {k:"Maximum", v:`${r0(60*w)} mg/day`, n:"60 mg/kg/day"}
    ], rule:"Start 10-15 mg/kg/day, increase by 5-10 mg/kg/week. Maximum 60 mg/kg/day. Divide doses above 250 mg/day. Absence seizures start at 15 mg/kg/day.",
    warn:"Hepatotoxicity risk is greatest under 2 years, especially on polytherapy or with a suspected metabolic disorder."})},

 {id:"lacosamide", n:"Lacosamide", minKg:3,
  calc:(w) => {
    let start, maintLo, maintHi, inc, band;
    if(w >= 50){ return {band:"50 kg and over — adult dosing", rows:[
        {k:"Starting dose", v:"50 mg twice daily", n:"add-on; 100 mg twice daily for monotherapy"},
        {k:"Increment", v:"+50 mg twice daily each week", n:""},
        {k:"Maintenance", v:"100-200 mg twice daily", n:"maximum 400 mg/day"}
      ], rule:"At or above 50 kg, use adult dosing."};
    }
    if(w >= 30){ start=1; maintLo=2; maintHi=4; inc=1; band="30 to under 50 kg"; }
    else if(w >= 11){ start=1; maintLo=3; maintHi=6; inc=1; band="11 to under 30 kg"; }
    else { start=1; maintLo=3.75; maintHi=7.5; inc=1; band="under 11 kg (oral)"; }
    return {band, rows:[
      {k:"Starting dose", v:`${r1(start*w)} mg twice daily`, n:`${start} mg/kg twice daily`},
      {k:"Increment", v:`+${r1(inc*w)} mg twice daily each week`, n:`${inc} mg/kg twice daily`},
      {k:"Maintenance", v:`${r1(maintLo*w)} to ${r1(maintHi*w)} mg twice daily`, n:`${maintLo}-${maintHi} mg/kg twice daily`},
      {k:"Maintenance daily total", v:`${r1(maintLo*2*w)} to ${r1(maintHi*2*w)} mg/day`, n:`${maintLo*2}-${maintHi*2} mg/kg/day`}
    ], rule:`${band}: start ${start} mg/kg twice daily, increase by ${inc} mg/kg twice daily no more than weekly, to ${maintLo}-${maintHi} mg/kg twice daily.`};
  }},

 {id:"topiramate", n:"Topiramate", minKg:8,
  calc:(w) => ({band:"2 to 16 years, add-on therapy", rows:[
      {k:"Starting dose", v:`25 mg nightly`, n:`or 1-3 mg/kg/day = ${r0(1*w)}-${r0(3*w)} mg/day`},
      {k:"Increment", v:`+${r0(1*w)} to ${r0(3*w)} mg/day every 1-2 weeks`, n:"1-3 mg/kg/day"},
      {k:"Target dose", v:`${r0(5*w)} to ${r0(9*w)} mg/day`, n:"5-9 mg/kg/day in two divided doses"},
      {k:"Do not exceed", v:`${Math.min(r0(9*w),400)} mg/day`, n: 9*w>400 ? "9 mg/kg/day exceeds the 400 mg/day label maximum, so 400 mg/day applies" : "the upper end of the 5-9 mg/kg/day band; the absolute label maximum is 400 mg/day"}
    ], rule:"Add-on 2-16 years: begin 25 mg nightly (or 1-3 mg/kg/day), increase by 1-3 mg/kg/day every 1-2 weeks to 5-9 mg/kg/day. Maximum 400 mg/day."})},

 {id:"oxcarbazepine", n:"Oxcarbazepine", minKg:8,
  calc:(w,ageM) => {
    const startLo = Math.min(8*w, 600), startHi = Math.min(10*w, 600);
    let target;
    if(w >= 39) target = "1 800 mg/day";
    else if(w >= 29.1) target = "1 200 mg/day";
    else if(w >= 20) target = "900 mg/day";
    else target = `weight below 20 kg is outside the add-on target table; the 2 to under 4 years band allows up to ${r0(60*w)} mg/day (60 mg/kg/day)`;
    const young = ageM < 48;
    return {band: young ? "2 to under 4 years, add-on" : "4 to 16 years, add-on", rows:[
      {k:"Starting dose", v:`${r0(startLo)} to ${r0(startHi)} mg/day`, n:"8-10 mg/kg/day in two doses, not more than 600 mg/day"},
      young ? {k:"Alternative start under 20 kg", v:`${r0(16*w)} to ${r0(20*w)} mg/day`, n:"16-20 mg/kg/day may be considered"} : null,
      {k:"Target maintenance", v:target, n: young ? "reach over 2-4 weeks" : "reach over 2 weeks"},
      young ? {k:"Maximum", v:`${r0(60*w)} mg/day`, n:"60 mg/kg/day"} : null
    ].filter(Boolean), rule:"Start 8-10 mg/kg/day in two divided doses (maximum 600 mg/day). Target by weight: 900 mg/day at 20-29 kg, 1 200 mg/day at 29.1-39 kg, 1 800 mg/day above 39 kg."};
  }},

 {id:"clobazam", n:"Clobazam", minKg:5,
  calc:(w) => {
    const small = w <= 30;
    return {band: small ? "30 kg or less" : "Over 30 kg", rows:[
      {k:"Day 1", v: small ? "5 mg/day" : "10 mg/day", n:"5 mg/day may be given as a single dose"},
      {k:"Day 7", v: small ? "10 mg/day" : "20 mg/day", n:"divided twice daily"},
      {k:"Day 14", v: small ? "20 mg/day" : "40 mg/day", n:"divided twice daily; this is the maximum"},
      {k:"Taper to stop", v: small ? "reduce 5 mg/day weekly" : "reduce 5-10 mg/day weekly", n:"pause or step back if withdrawal symptoms appear"}
    ], rule:"Dose by weight band, not mg/kg. Escalate no faster than weekly; clobazam reaches steady state in 5 days and its active metabolite in 9 days.",
    warn:"Elderly patients, CYP2C19 poor metabolisers and mild-to-moderate hepatic impairment start at 5 mg/day and titrate to half these doses."};
  }},

 {id:"vigabatrin", n:"Vigabatrin (infantile spasms)", minKg:2,
  calc:(w) => ({band:"Infantile epileptic spasms, 1 month and over", rows:[
      {k:"Starting dose", v:`${r0(25*w)} mg twice daily`, n:`50 mg/kg/day = ${r0(50*w)} mg/day`},
      {k:"Increment", v:`+${r0(25*w)} to ${r0(50*w)} mg/day every 3 days`, n:"25-50 mg/kg/day steps"},
      {k:"Maximum", v:`${r0(75*w)} mg twice daily`, n:`150 mg/kg/day = ${r0(150*w)} mg/day`},
      {k:"Volume of 50 mg/mL solution", v:`${r2(25*w/50)} mL twice daily at the starting dose`, n:`${r2(75*w/50)} mL twice daily at the maximum dose`}
    ], rule:"50 mg/kg/day in two divided doses, increasing by 25-50 mg/kg/day every 3 days to a maximum of 150 mg/kg/day.",
    warn:"Withdraw if there is no substantial benefit within 2-4 weeks. Baseline and 3-monthly visual assessment is mandatory."})},

 {id:"rufinamide", n:"Rufinamide", minKg:8,
  calc:(w) => ({band:"1 to under 17 years, Lennox-Gastaut", rows:[
      {k:"Starting dose", v:`${r0(5*w)} mg twice daily`, n:`10 mg/kg/day = ${r0(10*w)} mg/day`},
      {k:"Increment", v:`+${r0(10*w)} mg/day every other day`, n:"about 10 mg/kg increments"},
      {k:"Maximum", v:`${r0(Math.min(45*w,3200)/2)} mg twice daily`, n:`45 mg/kg/day = ${r0(Math.min(45*w,3200))} mg/day${45*w>3200?", capped at 3 200 mg/day":""}`}
    ], rule:"10 mg/kg/day in two divided doses, increasing by about 10 mg/kg every other day to 45 mg/kg/day, not exceeding 3 200 mg/day. Give with food.",
    warn:"If valproate is already established, start below 10 mg/kg/day."})},

 {id:"cannabidiol", n:"Cannabidiol", minKg:4,
  calc:(w) => ({band:"Lennox-Gastaut and Dravet syndrome", rows:[
      {k:"Starting dose", v:`${r1(2.5*w)} mg twice daily`, n:`5 mg/kg/day = ${r1(5*w)} mg/day`},
      {k:"After 1 week", v:`${r1(5*w)} mg twice daily`, n:`maintenance 10 mg/kg/day = ${r1(10*w)} mg/day`},
      {k:"Maximum", v:`${r1(10*w)} mg twice daily`, n:`20 mg/kg/day = ${r1(20*w)} mg/day`},
      {k:"Tuberous sclerosis target", v:`${r1(12.5*w)} mg twice daily`, n:`25 mg/kg/day = ${r1(25*w)} mg/day`},
      {k:"Volume of 100 mg/mL solution", v:`${r2(2.5*w/100)} mL twice daily at the starting dose`, n:`${r2(10*w/100)} mL twice daily at 20 mg/kg/day`}
    ], rule:"2.5 mg/kg twice daily, increasing after one week to 5 mg/kg twice daily, then in weekly steps of 2.5 mg/kg twice daily to a maximum of 10 mg/kg twice daily.",
    warn:"Check transaminases and bilirubin before starting. Risk of transaminase elevation is markedly higher with concomitant valproate."})},

 {id:"stiripentol", n:"Stiripentol", minKg:7,
  calc:(w,ageM) => {
    const bidOnly = ageM < 12 || w < 10;
    const total = Math.min(50*w, 3000);
    return {band: bidOnly ? "6 months to 1 year, or 7 to under 10 kg" : "1 year and over, 10 kg and over", rows:[
      {k:"Total daily dose", v:`${r0(total)} mg/day`, n: 50*w>3000 ? "50 mg/kg/day, capped at the 3 000 mg/day maximum" : "50 mg/kg/day"},
      {k:"Twice daily", v:`${r0(total/2)} mg twice daily`, n:"25 mg/kg twice daily"},
      bidOnly ? null : {k:"Three times daily", v:`${r0(total/3)} mg three times daily`, n:"16.67 mg/kg three times daily"}
    ].filter(Boolean), rule:"50 mg/kg/day in two or three divided doses, maximum 3 000 mg/day. Round to the nearest available strength, usually within 50-150 mg of the target.",
    warn: bidOnly ? "Dosing frequency should not exceed twice daily in this group." : "Check a full blood count before starting."};
  }},

 {id:"fenfluramine", n:"Fenfluramine", minKg:8,
  calc:(w) => {
    const capPlain = 26, capStp = 17;
    const maxPlain = Math.min(0.35*w, capPlain/2);
    const maxStp = Math.min(0.2*w, capStp/2);
    return {band:"Dravet and Lennox-Gastaut, 2 years and over", rows:[
      {k:"Starting dose", v:`${r1(0.1*w)} mg twice daily`, n:"0.1 mg/kg twice daily"},
      {k:"Day 7", v:`${r1(0.2*w)} mg twice daily`, n:"0.2 mg/kg twice daily"},
      {k:"Day 14 maximum", v:`${r1(maxPlain)} mg twice daily`, n:`0.35 mg/kg twice daily${0.35*2*w>capPlain?", capped at 26 mg/day":""}`},
      {k:"With stiripentol plus clobazam", v:`${r1(maxStp)} mg twice daily`, n:`0.2 mg/kg twice daily${0.2*2*w>capStp?", capped at 17 mg/day":""}`},
      {k:"Volume of 2.2 mg/mL solution", v:`${r2(0.1*w/2.2)} mL twice daily at the starting dose`, n:"dose in mg &divide; 2.2 = mL"}
    ], rule:"0.1 mg/kg twice daily, increasing weekly. Maximum 0.35 mg/kg twice daily and 26 mg/day; with stiripentol plus clobazam, 0.2 mg/kg twice daily and 17 mg/day.",
    warn:"Echocardiogram before starting, every 6 months, and 3-6 months after the last dose."};
  }},

 {id:"ganaxolone", n:"Ganaxolone", minKg:8,
  calc:(w) => {
    if(w > 28){ return {band:"Over 28 kg", rows:[
        {k:"Week 1", v:"50 mg three times daily", n:"150 mg/day"},
        {k:"Week 2", v:"100 mg three times daily", n:"300 mg/day"},
        {k:"Week 3", v:"200 mg three times daily", n:"600 mg/day"},
        {k:"Week 4", v:"400 mg three times daily", n:"1 200 mg/day"},
        {k:"Week 5 onward", v:"600 mg three times daily", n:"1 800 mg/day maximum"}
      ], rule:"Fixed dosing above 28 kg. Always with food."};
    }
    return {band:"28 kg or less", rows:[
      {k:"Week 1", v:`${r0(2*w)} mg three times daily`, n:`2 mg/kg three times daily = ${r0(6*w)} mg/day`},
      {k:"Week 2", v:`${r0(4*w)} mg three times daily`, n:`12 mg/kg/day`},
      {k:"Week 3", v:`${r0(8*w)} mg three times daily`, n:`24 mg/kg/day`},
      {k:"Week 4", v:`${r0(14*w)} mg three times daily`, n:`42 mg/kg/day`},
      {k:"Week 5 onward", v:`${r0(21*w)} mg three times daily`, n:`63 mg/kg/day maximum`}
    ], rule:"2, 4, 8, 14 then 21 mg/kg three times daily at weekly intervals. Always with food — absorption depends on it.",
    warn:"Severe hepatic impairment: use about one third of these doses at each step."};
  }},

 {id:"gabapentin", n:"Gabapentin", minKg:10,
  calc:(w,ageM) => {
    const y = ageM/12;
    const maint = y < 5 ? [40,40] : [25,35];
    return {band: y < 5 ? "3 to 4 years" : "5 to 11 years", rows:[
      {k:"Starting dose", v:`${r0(10*w)} to ${r0(15*w)} mg/day`, n:"10-15 mg/kg/day in three divided doses"},
      {k:"Maintenance", v:`${r0(maint[0]*w)}${maint[0]!==maint[1] ? " to "+r0(maint[1]*w) : ""} mg/day`, n: y<5 ? "40 mg/kg/day" : "25-35 mg/kg/day"},
      {k:"Per dose", v:`${r0(maint[0]*w/3)}${maint[0]!==maint[1] ? " to "+r0(maint[1]*w/3) : ""} mg three times daily`, n:"no more than 12 hours between doses"}
    ], rule:"Start 10-15 mg/kg/day in three divided doses and reach maintenance over about 3 days. Maintenance is 40 mg/kg/day at 3-4 years and 25-35 mg/kg/day at 5-11 years."};
  }},

 {id:"phenobarbital", n:"Phenobarbital", minKg:1,
  calc:(w) => ({band:"Infants and children", rows:[
      {k:"Loading dose", v:`${r0(15*w)} to ${r0(20*w)} mg`, n:"15-20 mg/kg produces a level near 20 mg/L"},
      {k:"Oral maintenance", v:`${r0(3*w)} to ${r0(6*w)} mg/day`, n:"3-6 mg/kg/day"},
      {k:"Neonatal first load", v:`${r0(20*w)} mg IV over 15 min`, n:"20 mg/kg"},
      {k:"Neonatal maximum total load", v:`${r0(40*w)} mg`, n:"40 mg/kg across first and second loads"},
      {k:"Neonatal maintenance", v:`${r1(1.5*w)} mg every 8 h or ${r1(2.25*w)} mg every 12 h`, n:"4.5 mg/kg/day, starting 8-12 h after the first load"}
    ], rule:"Oral maintenance 3-6 mg/kg/day. Neonatal seizures: 20 mg/kg IV load, a second load if seizures persist after 15 minutes, then 4.5 mg/kg/day for up to 5 days."})},

 {id:"phenytoin", n:"Phenytoin", minKg:3,
  calc:(w) => ({band:"Paediatric oral dosing", rows:[
      {k:"Starting dose", v:`${r0(5*w)} mg/day`, n:"5 mg/kg/day in two or three divided doses"},
      {k:"Maintenance", v:`${r0(4*w)} to ${r0(8*w)} mg/day`, n:"4-8 mg/kg/day"},
      {k:"Maximum", v:`${Math.min(r0(8*w),300)} mg/day`, n:"label maximum 300 mg/day"}
    ], rule:"5 mg/kg/day initially, maintenance 4-8 mg/kg/day, maximum 300 mg/day. Do not change the dose more often than every 7-10 days.",
    warn:"Saturable kinetics — a small dose rise can produce a large concentration rise. Check levels."})},

 {id:"ethosuximide", n:"Ethosuximide", minKg:10,
  calc:(w,ageM) => ({band: ageM < 72 ? "3 to 6 years" : "6 years and over", rows:[
      {k:"Starting dose", v: ageM < 72 ? "250 mg/day" : "500 mg/day", n:"one or two 250 mg capsules"},
      {k:"Increment", v:"+250 mg every 4 to 7 days", n:""},
      {k:"Usual optimal dose", v:`${r0(20*w)} mg/day`, n:"about 20 mg/kg/day"},
      {k:"Supervision threshold", v:"above 1 500 mg/day", n:"only under close supervision"}
    ], rule:"Start 250 mg/day at 3-6 years or 500 mg/day from 6 years, increasing by 250 mg every 4-7 days. The optimal dose in most children is about 20 mg/kg/day."})},

 {id:"clonazepam", n:"Clonazepam", minKg:3,
  calc:(w) => ({band:"Up to 10 years or 30 kg", rows:[
      {k:"Starting dose", v:`${r1(0.01*w)} to ${r1(0.03*w)} mg/day`, n:"0.01-0.03 mg/kg/day in two or three doses"},
      {k:"Never exceed at start", v:`${r1(0.05*w)} mg/day`, n:"0.05 mg/kg/day"},
      {k:"Increment", v:"+0.25 to 0.5 mg every third day", n:"fixed increments, not weight-based"},
      {k:"Maintenance", v:`${r1(0.1*w)} to ${r1(0.2*w)} mg/day`, n:"0.1-0.2 mg/kg/day in three divided doses"}
    ], rule:"0.01-0.03 mg/kg/day to start (never above 0.05), increasing by 0.25-0.5 mg every third day to 0.1-0.2 mg/kg/day."})},

 {id:"carbamazepine", n:"Carbamazepine", minKg:5,
  calc:(w,ageM) => {
    if(ageM >= 72) return {band:"6 to 12 years", rows:[
        {k:"Starting dose", v:"100 mg twice daily", n:"200 mg/day"},
        {k:"Increment", v:"up to +100 mg/day weekly", n:""},
        {k:"Maintenance", v:"400-800 mg/day", n:"maximum 1 000 mg/day"}
      ], rule:"Fixed dosing from 6 years. Under 6 years dosing is weight-based."};
    return {band:"Under 6 years", rows:[
      {k:"Starting dose", v:`${r0(10*w)} to ${r0(20*w)} mg/day`, n:"10-20 mg/kg/day, two to four divided doses"},
      {k:"Usual ceiling", v:`below ${r0(35*w)} mg/day`, n:"optimal response usually below 35 mg/kg/day"},
      {k:"Maximum", v:`${r0(35*w)} mg/day`, n:"35 mg/kg/day"}
    ], rule:"10-20 mg/kg/day initially, increasing weekly. No recommendation exists above 35 mg/kg/day.",
    warn:"Clearance rises over the first 2-4 weeks through autoinduction; expect to increase the dose and re-check the level."};
  }},

 {id:"felbamate", n:"Felbamate", minKg:10,
  calc:(w) => ({band:"2 to 14 years, Lennox-Gastaut add-on", rows:[
      {k:"Starting dose", v:`${r0(15*w)} mg/day`, n:"15 mg/kg/day in three or four divided doses"},
      {k:"Weekly increment", v:`+${r0(15*w)} mg/day`, n:"15 mg/kg/day steps"},
      {k:"Maximum", v:`${r0(45*w)} mg/day`, n:"45 mg/kg/day"}
    ], rule:"15 mg/kg/day, increasing by 15 mg/kg/day weekly to 45 mg/kg/day, while reducing concomitant drugs by 20%.",
    warn:"Boxed warnings for aplastic anaemia and hepatic failure. Written informed consent and frequent blood counts and liver tests are expected."})},

 {id:"primidone", n:"Primidone", minKg:8,
  calc:(w) => ({band:"Under 8 years", rows:[
      {k:"Days 1-3", v:"50 mg at bedtime", n:""},
      {k:"Days 4-6", v:"50 mg twice daily", n:""},
      {k:"Days 7-9", v:"100 mg twice daily", n:""},
      {k:"Day 10 onward", v:"125-250 mg three times daily", n:""},
      {k:"Weight-based maintenance", v:`${r0(10*w)} to ${r0(25*w)} mg/day`, n:"10-25 mg/kg/day in divided doses"}
    ], rule:"Stepped fixed start over 10 days, then maintenance of 10-25 mg/kg/day in divided doses."})}
];

/* ---------- lamotrigine titration schedules ---------- */
const LTG_ADULT = {
  vpa:{label:"Taking valproate",
    weeks:[["Weeks 1-2","25 mg every other day"],["Weeks 3-4","25 mg daily"],
           ["Week 5 onward","increase by 25-50 mg/day every 1-2 weeks"]],
    maint:"100-200 mg/day with valproate alone; 100-400 mg/day with valproate plus an inducer"},
  none:{label:"No valproate, no enzyme inducer",
    weeks:[["Weeks 1-2","25 mg daily"],["Weeks 3-4","50 mg daily"],
           ["Week 5 onward","increase by 50 mg/day every 1-2 weeks"]],
    maint:"225-375 mg/day in two divided doses"},
  ind:{label:"Taking carbamazepine, phenytoin, phenobarbital or primidone, without valproate",
    weeks:[["Weeks 1-2","50 mg daily"],["Weeks 3-4","100 mg/day in two divided doses"],
           ["Week 5 onward","increase by 100 mg/day every 1-2 weeks"]],
    maint:"300-500 mg/day in two divided doses"}
};
const LTG_PED = {
  vpa:{label:"Taking valproate", w1:0.15, w3:0.3, step:0.3,
    maint:"1-5 mg/kg/day, or 1-3 mg/kg/day with valproate alone; maximum 200 mg/day"},
  none:{label:"No valproate, no enzyme inducer", w1:0.3, w3:0.6, step:0.6,
    maint:"4.5-7.5 mg/kg/day; maximum 300 mg/day"},
  ind:{label:"Taking an enzyme inducer, without valproate", w1:0.6, w3:1.2, step:1.2,
    maint:"5-15 mg/kg/day; maximum 400 mg/day"}
};

/* ---------- interaction pairs ---------- */
const IX = [
 {a:"valproate", b:"lamotrigine", sev:"major", txt:"Valproate inhibits lamotrigine glucuronidation and roughly doubles its exposure. Use the valproate-specific lamotrigine titration: 25 mg on alternate days for 2 weeks. This pair also carries the highest risk of serious rash — and is, separately, the best-evidenced synergistic combination."},
 {a:"valproate", b:"carbamazepine", sev:"moderate", txt:"Valproate raises the active carbamazepine-10,11-epoxide metabolite without necessarily raising carbamazepine itself, so typical carbamazepine toxicity can appear with a normal-looking carbamazepine level. Measure the epoxide if available."},
 {a:"valproate", b:"phenobarbital", sev:"major", txt:"Valproate inhibits phenobarbital metabolism and raises its concentration, often producing sedation. Anticipate a phenobarbital dose reduction."},
 {a:"valproate", b:"rufinamide", sev:"major", txt:"Valproate substantially raises rufinamide. If valproate is already established, start rufinamide below 10 mg/kg/day in children or 400 mg/day in adults."},
 {a:"valproate", b:"topiramate", sev:"moderate", txt:"The combination can cause hyperammonaemic encephalopathy and hypothermia, neither of which requires a raised valproate level. Check ammonia if there is unexplained lethargy or confusion."},
 {a:"valproate", b:"cannabidiol", sev:"major", txt:"Concomitant valproate markedly increases the risk of transaminase elevation with cannabidiol. Measure liver enzymes before starting and during treatment."},
 {a:"valproate", b:"felbamate", sev:"moderate", txt:"Felbamate inhibits valproate metabolism and raises its concentration; reduce valproate when felbamate is added."},
 {a:"valproate", b:"phenytoin", sev:"moderate", txt:"Valproate displaces phenytoin from protein binding and inhibits its metabolism. Total phenytoin may look unchanged or low while free phenytoin rises — measure the free concentration."},
 {a:"carbamazepine", b:"lamotrigine", sev:"major", txt:"Carbamazepine induces lamotrigine glucuronidation and roughly halves its concentration. Use the inducer-specific lamotrigine titration and a higher maintenance dose of 300-500 mg/day."},
 {a:"carbamazepine", b:"perampanel", sev:"major", txt:"Carbamazepine is a moderate to strong CYP3A4 inducer and substantially lowers perampanel. Start perampanel at 4 mg rather than 2 mg at bedtime."},
 {a:"carbamazepine", b:"levetiracetam", sev:"minor", txt:"Carbamazepine lowers levetiracetam by roughly 20-30%, which is rarely clinically important but can matter at the margin of control."},
 {a:"carbamazepine", b:"eslicarbazepine", sev:"moderate", txt:"Carbamazepine lowers eslicarbazepine while adverse effects become more frequent when the two are combined. Adjust one or the other on efficacy and tolerability."},
 {a:"carbamazepine", b:"everolimus", sev:"major", txt:"Carbamazepine induces CYP3A4 and P-glycoprotein; the everolimus dose must be doubled and the trough concentration monitored."},
 {a:"carbamazepine", b:"clobazam", sev:"moderate", txt:"Carbamazepine induces clobazam metabolism and lowers both clobazam and its active metabolite."},
 {a:"oxcarbazepine", b:"eslicarbazepine", sev:"major", txt:"Do not combine. Both deliver the same active molecule, S-licarbazepine, so the combination adds toxicity without adding a mechanism."},
 {a:"oxcarbazepine", b:"lamotrigine", sev:"moderate", txt:"Oxcarbazepine induces lamotrigine metabolism and lowers its concentration."},
 {a:"oxcarbazepine", b:"perampanel", sev:"moderate", txt:"Oxcarbazepine lowers perampanel; start perampanel at 4 mg at bedtime."},
 {a:"phenytoin", b:"lamotrigine", sev:"major", txt:"Phenytoin induces lamotrigine glucuronidation and roughly halves its concentration. Use the inducer titration schedule."},
 {a:"phenytoin", b:"perampanel", sev:"major", txt:"Phenytoin substantially lowers perampanel; start at 4 mg at bedtime."},
 {a:"phenytoin", b:"topiramate", sev:"moderate", txt:"Topiramate raises phenytoin concentrations while phenytoin lowers topiramate. Because phenytoin kinetics are saturable, small changes can produce large concentration shifts."},
 {a:"phenytoin", b:"everolimus", sev:"major", txt:"Phenytoin induces CYP3A4 and P-glycoprotein; double the everolimus dose and monitor the trough."},
 {a:"phenobarbital", b:"lamotrigine", sev:"major", txt:"Phenobarbital induces lamotrigine glucuronidation and roughly halves its concentration. Use the inducer titration schedule."},
 {a:"phenobarbital", b:"everolimus", sev:"major", txt:"Phenobarbital induces CYP3A4 and P-glycoprotein; double the everolimus dose and monitor the trough."},
 {a:"primidone", b:"lamotrigine", sev:"major", txt:"Primidone is metabolised to phenobarbital and induces lamotrigine glucuronidation. Use the inducer titration schedule."},
 {a:"cannabidiol", b:"clobazam", sev:"major", txt:"Cannabidiol inhibits CYP2C19 and raises N-desmethylclobazam 2.5- to 3-fold. This explains much of the sedation seen with the pair and part of the apparent efficacy. Anticipate a clobazam dose reduction."},
 {a:"cannabidiol", b:"everolimus", sev:"major", txt:"Cannabidiol raises everolimus. Reduce the everolimus dose by 50% and check the trough concentration two weeks after starting or stopping."},
 {a:"stiripentol", b:"clobazam", sev:"major", txt:"Stiripentol inhibits clobazam metabolism and markedly raises clobazam and N-desmethylclobazam. Much of the benefit of the Dravet triple regimen works through this interaction; reduce clobazam as stiripentol is introduced."},
 {a:"stiripentol", b:"valproate", sev:"moderate", txt:"Stiripentol inhibits valproate metabolism and raises its concentration; anticipate a valproate reduction."},
 {a:"stiripentol", b:"phenytoin", sev:"moderate", txt:"Stiripentol inhibits phenytoin metabolism and raises its concentration. Phenytoin kinetics are saturable, so the rise can be disproportionate."},
 {a:"stiripentol", b:"fenfluramine", sev:"major", txt:"With stiripentol plus clobazam, the fenfluramine maximum falls to 0.2 mg/kg twice daily and 17 mg/day."},
 {a:"felbamate", b:"phenytoin", sev:"major", txt:"Felbamate raises phenytoin substantially. Reduce phenytoin by 20-33% when felbamate is started."},
 {a:"felbamate", b:"carbamazepine", sev:"moderate", txt:"Felbamate lowers carbamazepine but raises its active epoxide metabolite; reduce carbamazepine by 20-33% when starting felbamate."},
 {a:"felbamate", b:"clobazam", sev:"moderate", txt:"Felbamate inhibits clobazam metabolism and raises its concentration."},
 {a:"cenobamate", b:"phenytoin", sev:"major", txt:"Cenobamate inhibits CYP2C19 and raises phenytoin. Expect to reduce the phenytoin dose as cenobamate is titrated."},
 {a:"cenobamate", b:"phenobarbital", sev:"major", txt:"Cenobamate raises phenobarbital through CYP2C19 inhibition; anticipate a phenobarbital reduction."},
 {a:"cenobamate", b:"clobazam", sev:"moderate", txt:"Cenobamate raises N-desmethylclobazam, the active clobazam metabolite; watch for sedation."},
 {a:"cenobamate", b:"lamotrigine", sev:"moderate", txt:"Cenobamate induces CYP3A4 and lowers lamotrigine concentrations."},
 {a:"cenobamate", b:"carbamazepine", sev:"moderate", txt:"Cenobamate lowers carbamazepine through CYP3A4 induction."},
 {a:"topiramate", b:"perampanel", sev:"moderate", txt:"Topiramate lowers perampanel concentrations."},
 {a:"gabapentin", b:"pregabalin", sev:"minor", txt:"Both act on the same alpha-2-delta-1 target, so combining them adds adverse effects without adding a mechanism. Gabapentin also lowers pregabalin modestly."},
 {a:"lacosamide", b:"carbamazepine", sev:"moderate", txt:"Both are sodium-channel blockers. In the lacosamide registration data, adding it to a sodium-channel-blocker background gave less benefit and more adverse effects. Carbamazepine also lowers lacosamide."},
 {a:"lacosamide", b:"phenytoin", sev:"moderate", txt:"Two sodium-channel blockers together give less added benefit and more adverse effects; both also prolong cardiac conduction, so check an ECG."},
 {a:"lacosamide", b:"lamotrigine", sev:"minor", txt:"Both block sodium channels and both can affect cardiac conduction. Expect additive dizziness and diplopia."},
 {a:"zonisamide", b:"topiramate", sev:"moderate", txt:"Both inhibit carbonic anhydrase, so metabolic acidosis, kidney stones, paraesthesia, weight loss and heat intolerance are additive."},
 {a:"zonisamide", b:"acetazolamide", sev:"moderate", txt:"Additive carbonic anhydrase inhibition; metabolic acidosis and stone risk rise."},
 {a:"topiramate", b:"acetazolamide", sev:"moderate", txt:"Additive carbonic anhydrase inhibition; metabolic acidosis and stone risk rise."},
 {a:"acetazolamide", b:"phenytoin", sev:"moderate", txt:"Acetazolamide inhibits phenytoin metabolism and raises its concentration; it also raises phenobarbital and lowers primidone."},
 {a:"clobazam", b:"clonazepam", sev:"moderate", txt:"Two benzodiazepines together give additive sedation, tolerance and dependence without adding a mechanism."},
 {a:"vigabatrin", b:"tiagabine", sev:"moderate", txt:"Both raise GABAergic tone by different routes and both can precipitate non-convulsive status epilepticus. Combining them compounds that risk."},
 {a:"brivaracetam", b:"levetiracetam", sev:"moderate", txt:"Both act at SV2A, so the combination adds no mechanism. Switch rather than combine."},
 {a:"brivaracetam", b:"carbamazepine", sev:"moderate", txt:"Brivaracetam inhibits epoxide hydrolase and raises the active carbamazepine epoxide, which can produce typical carbamazepine toxicity at a normal carbamazepine level. Carbamazepine in turn lowers brivaracetam."},
 {a:"tiagabine", b:"carbamazepine", sev:"moderate", txt:"Carbamazepine halves tiagabine exposure. Induced patients need substantially higher tiagabine doses, and the dose must be re-titrated whenever induction status changes."},
 {a:"rufinamide", b:"carbamazepine", sev:"moderate", txt:"Carbamazepine lowers rufinamide, and rufinamide modestly lowers carbamazepine."}
];

const INDUCERS = ["carbamazepine","phenytoin","phenobarbital","primidone"];
const WEAK_INDUCERS = ["oxcarbazepine","eslicarbazepine","topiramate","rufinamide","cenobamate","clobazam","perampanel"];
const INHIBITORS = ["valproate","stiripentol","cannabidiol","felbamate"];

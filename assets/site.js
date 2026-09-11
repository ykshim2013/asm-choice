/* Antiseizure Medication Formulary — shared behaviour */

const PAGES = [
  {href:"index.html",        key:"home",   label:"Start here"},
  {href:"choose.html",       key:"choose", label:"Choose a drug"},
  {href:"monographs.html",   key:"mono",   label:"Monographs"},
  {href:"mechanisms.html",   key:"mech",   label:"Mechanisms"},
  {href:"calculators.html",  key:"calc",   label:"Calculators"},
  {href:"levels.html",       key:"levels", label:"Blood levels"},
  {href:"safety.html",       key:"safety", label:"Safety"},
  {href:"emergency.html",    key:"emerg",  label:"Emergency"},
  {href:"references.html",   key:"refs",   label:"References"}
];

/* ---------------- chrome ---------------- */
function buildChrome(currentKey){
  const bar = document.createElement("header");
  bar.className = "topbar";
  bar.innerHTML = `
    <div class="topbar-in">
      <a class="brand" href="index.html">ASM <span>Formulary</span></a>
      <nav class="topnav" aria-label="Main">
        ${PAGES.map(p => `<a href="${p.href}"${p.key===currentKey?' aria-current="page"':''}>${p.label}</a>`).join("")}
      </nav>
      <button class="themer" id="themer" type="button" aria-label="Change colour theme">THEME</button>
    </div>`;
  document.body.prepend(bar);

  const i = PAGES.findIndex(p => p.key === currentKey);
  const prev = i > 0 ? PAGES[i-1] : null;
  const next = i > -1 && i < PAGES.length-1 ? PAGES[i+1] : null;
  const main = document.querySelector("main");
  if(main && (prev || next)){
    const pager = document.createElement("div");
    pager.className = "pager";
    pager.innerHTML =
      (prev ? `<a href="${prev.href}"><b>Previous</b>${prev.label}</a>` : `<span></span>`) +
      (next ? `<a class="next" href="${next.href}"><b>Next</b>${next.label}</a>` : `<span></span>`);
    main.appendChild(pager);
  }

  const foot = document.createElement("footer");
  foot.className = "sitefoot";
  foot.innerHTML = `
    <div class="sitefoot-in">
      <div>Compiled 11 September 2026 from FDA prescribing information, NICE NG217, ILAE and AES sources.
      A prescribing aid, not a substitute for the current label or clinical judgement.</div>
      <div><a href="references.html">References and method</a> &middot;
      <a href="https://github.com/ykshim2013/asm-choice">Source on GitHub</a></div>
    </div>`;
  document.body.appendChild(foot);

  const top = document.createElement("button");
  top.className = "totop"; top.type = "button";
  top.setAttribute("aria-label","Back to top");
  top.textContent = "↑";
  top.addEventListener("click", () => window.scrollTo({top:0, behavior:"smooth"}));
  document.body.appendChild(top);
  addEventListener("scroll", () => top.classList.toggle("show", scrollY > 600), {passive:true});

  initTheme();
}

function initTheme(){
  const btn = document.getElementById("themer");
  const order = ["auto","light","dark"];
  let cur = "auto";
  try{ cur = localStorage.getItem("asm-theme") || "auto"; }catch(e){}
  const paint = () => {
    if(cur === "auto") document.documentElement.removeAttribute("data-theme");
    else document.documentElement.setAttribute("data-theme", cur);
    if(btn) btn.textContent = cur.toUpperCase();
  };
  paint();
  if(btn) btn.addEventListener("click", () => {
    cur = order[(order.indexOf(cur)+1) % order.length];
    try{ localStorage.setItem("asm-theme", cur); }catch(e){}
    paint();
  });
}

/* ---------------- scroll spy ---------------- */
function initSpy(){
  const links = [...document.querySelectorAll(".rail nav a[href^='#']")];
  if(!links.length) return;
  const map = new Map();
  links.forEach(a => {
    const el = document.getElementById(a.getAttribute("href").slice(1));
    if(el) map.set(el, a);
  });
  if(!map.size) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if(en.isIntersecting){
        links.forEach(a => a.classList.remove("active"));
        map.get(en.target).classList.add("active");
      }
    });
  }, {rootMargin:"-70px 0px -70% 0px", threshold:0});
  map.forEach((a, el) => obs.observe(el));
}

/* ---------------- drug cross-links ---------------- */
const ALIASES = [
  ["sodium valproate","valproate"],["valproic acid","valproate"],["divalproex","valproate"],
  ["valproate","valproate"],["eslicarbazepine acetate","eslicarbazepine"],["eslicarbazepine","eslicarbazepine"],
  ["carbamazepine","carbamazepine"],["oxcarbazepine","oxcarbazepine"],["lamotrigine","lamotrigine"],
  ["levetiracetam","levetiracetam"],["brivaracetam","brivaracetam"],["lacosamide","lacosamide"],
  ["phenytoin","phenytoin"],["fosphenytoin","phenytoin"],["phenobarbital","phenobarbital"],
  ["primidone","primidone"],["ethosuximide","ethosuximide"],["topiramate","topiramate"],
  ["zonisamide","zonisamide"],["perampanel","perampanel"],["rufinamide","rufinamide"],
  ["cenobamate","cenobamate"],["clobazam","clobazam"],["clonazepam","clonazepam"],
  ["gabapentin","gabapentin"],["pregabalin","pregabalin"],["vigabatrin","vigabatrin"],
  ["felbamate","felbamate"],["tiagabine","tiagabine"],["cannabidiol","cannabidiol"],
  ["stiripentol","stiripentol"],["fenfluramine","fenfluramine"],["ganaxolone","ganaxolone"],
  ["everolimus","everolimus"],["acetazolamide","acetazolamide"],["sulthiame","sulthiame"]
].sort((a,b) => b[0].length - a[0].length);

function linkifyDrugs(root){
  if(!root) return;
  const rx = new RegExp("\\b(" + ALIASES.map(a => a[0]).join("|") + ")\\b", "gi");
  const lookup = new Map(ALIASES);
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node){
      if(!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      let p = node.parentElement;
      while(p && p !== root){
        if(["A","CODE","H1","H2","H3","BUTTON","LABEL","OPTION"].includes(p.tagName))
          return NodeFilter.FILTER_REJECT;
        p = p.parentElement;
      }
      return NodeFilter.FILTER_ACCEPT;
    }
  });
  const targets = [];
  while(walker.nextNode()) targets.push(walker.currentNode);
  targets.forEach(node => {
    const text = node.nodeValue;
    if(!rx.test(text)){ rx.lastIndex = 0; return; }
    rx.lastIndex = 0;
    const frag = document.createDocumentFragment();
    let last = 0, m;
    while((m = rx.exec(text)) !== null){
      const id = lookup.get(m[0].toLowerCase());
      if(!id) continue;
      if(m.index > last) frag.appendChild(document.createTextNode(text.slice(last, m.index)));
      const a = document.createElement("a");
      a.className = "dl";
      a.href = "monographs.html#d-" + id;
      a.textContent = m[0];
      a.title = "Open the " + id + " monograph";
      frag.appendChild(a);
      last = m.index + m[0].length;
    }
    if(last === 0) return;
    if(last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
    node.parentNode.replaceChild(frag, node);
  });
}

/* ---------------- monographs ---------------- */
function monoCard(d){
  const key = (d.n+" "+d.b+" "+d.s+" "+d.t+" "+d.ind+" "+d.w)
    .replace(/<[^>]+>/g,"").toLowerCase().replace(/"/g,"");
  return `<article class="mono" id="d-${d.id}" style="--cc:${CLASS_COLOR[d.c]}" data-c="${d.c}" data-k="${key}">
    <div class="mono-head">
      <span class="mono-name">${d.n}</span>
      <span class="mono-brand">${d.b}</span>
      <span class="tag">${CLASS_LABEL[d.c]}</span>
      <span class="tag spec">${d.s}</span>
      <span class="mono-links">
        <a href="#d-${d.id}" title="Link to this monograph">#</a>
        <a href="calculators.html?drug=${d.id}" title="Open the dose calculator">calc</a>
        <a href="#top" title="Back to top">top</a>
      </span>
    </div>
    <p class="mono-target"><b>Target.</b> ${d.t}</p>
    <div class="fields">
      <div class="field wide"><h5>Indications</h5><p>${d.ind}</p></div>
      <div class="field"><h5>Adult dosing and escalation</h5><p>${d.ad}</p></div>
      <div class="field"><h5>Paediatric dosing</h5><p>${d.pd}</p></div>
      <div class="field"><h5>Kinetics and levels</h5><p>${d.pk}</p></div>
      <div class="field"><h5>Renal, hepatic and practical</h5><p>${d.org}</p></div>
      <div class="field"><h5>Watch for</h5><p>${d.w}</p></div>
      <div class="field"><h5>Interactions</h5><p>${d.i}</p></div>
      <div class="field wide"><h5>Pregnancy</h5><p>${d.pr}</p></div>
    </div>
  </article>`;
}

function initMonographs(){
  const wrap = document.getElementById("monos");
  if(!wrap) return;
  wrap.innerHTML = DRUGS.map(monoCard).join("");

  const idx = document.getElementById("dindex");
  if(idx){
    idx.innerHTML = [...DRUGS].sort((a,b) => a.n.localeCompare(b.n))
      .map(d => `<a href="#d-${d.id}" data-id="${d.id}" style="--dc:${CLASS_COLOR[d.c]}">${d.n}</a>`).join("");
  }
  const jump = document.getElementById("djump");
  if(jump){
    jump.innerHTML = [...DRUGS].sort((a,b) => a.n.localeCompare(b.n))
      .map(d => `<a href="#d-${d.id}" data-id="${d.id}" style="--jc:${CLASS_COLOR[d.c]}">${d.n}</a>`).join("");
  }

  const q = document.getElementById("q");
  const countEl = document.getElementById("count");
  const chipBox = document.getElementById("chips");
  let active = "all";

  function apply(){
    const term = q ? q.value.trim().toLowerCase() : "";
    let shown = 0;
    wrap.querySelectorAll(".mono").forEach(el => {
      const on = (active === "all" || el.dataset.c === active) &&
                 (!term || el.dataset.k.includes(term));
      el.hidden = !on;
      if(on) shown++;
    });
    if(countEl) countEl.textContent = shown === DRUGS.length
      ? `${DRUGS.length} agents` : `${shown} of ${DRUGS.length}`;
    let none = document.getElementById("none");
    if(!shown && !none){
      none = document.createElement("div");
      none.id = "none"; none.className = "empty";
      none.textContent = "No agent matches that filter. Clear the search or choose All.";
      wrap.appendChild(none);
    } else if(shown && none){ none.remove(); }
  }

  function clearFilters(){
    if(q) q.value = "";
    active = "all";
    if(chipBox) chipBox.querySelectorAll(".chip").forEach(c =>
      c.setAttribute("aria-pressed", String(c.dataset.c === "all")));
    apply();
  }

  if(q) q.addEventListener("input", apply);
  if(chipBox) chipBox.addEventListener("click", ev => {
    const b = ev.target.closest(".chip");
    if(!b) return;
    active = b.dataset.c;
    chipBox.querySelectorAll(".chip").forEach(c => c.setAttribute("aria-pressed", String(c === b)));
    apply();
  });

  // A drug link must never land on a hidden card
  document.querySelectorAll("#dindex a, #djump a").forEach(a => {
    a.addEventListener("click", () => {
      clearFilters();
      document.querySelectorAll("#dindex a").forEach(x => x.classList.remove("active"));
      const twin = document.querySelector(`#dindex a[data-id="${a.dataset.id}"]`);
      if(twin) twin.classList.add("active");
    });
  });

  apply();

  if(location.hash.startsWith("#d-")){
    const el = document.querySelector(location.hash);
    if(el) setTimeout(() => el.scrollIntoView(), 60);
  }
}

/* ---------------- calculators ---------------- */
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

function outTable(rows){
  return `<table><tbody>${rows.map(r =>
    `<tr><td style="width:38%">${esc(r.k)}</td><td><span class="dose">${r.v}</span>${
      r.n ? `<br><span class="hint">${r.n}</span>` : ""}</td></tr>`).join("")}</tbody></table>`;
}

function initPedCalc(){
  const sel = document.getElementById("ped-drug");
  if(!sel) return;
  sel.innerHTML = PED.map(p => `<option value="${p.id}">${p.n}</option>`).join("");

  const params = new URLSearchParams(location.search);
  const want = params.get("drug");
  if(want && PED.some(p => p.id === want)) sel.value = want;

  const wIn = document.getElementById("ped-weight");
  const aIn = document.getElementById("ped-age");
  const out = document.getElementById("ped-out");

  function run(){
    const w = parseFloat(wIn.value);
    const ageY = parseFloat(aIn.value);
    const spec = PED.find(p => p.id === sel.value);
    if(!spec || !(w > 0)){
      out.innerHTML = `<div class="placeholder">Enter a body weight to calculate.</div>`;
      return;
    }
    if(w > 200 || (ageY && ageY > 25)){
      out.innerHTML = `<div class="placeholder">Check the weight and age entered.</div>`;
      return;
    }
    const ageM = (isFinite(ageY) && ageY >= 0) ? ageY*12 : 60;
    const res = spec.calc(w, ageM);
    const belowMin = spec.minKg && w < spec.minKg;
    out.innerHTML =
      `<table><thead><tr><th>${esc(spec.n)} &mdash; ${esc(res.band)}</th><th>at ${w} kg</th></tr></thead>
       <tbody>${res.rows.map(r =>
         `<tr><td>${esc(r.k)}</td><td><span class="dose">${r.v}</span>${
           r.n ? `<br><span class="hint">${r.n}</span>` : ""}</td></tr>`).join("")}</tbody></table>` +
      (belowMin ? `<div class="rulebox" style="color:var(--warn)">Weight is below the lowest weight studied for this agent (${spec.minKg} kg). Confirm against the label.</div>` : "") +
      (res.warn ? `<div class="rulebox" style="color:var(--warn)">${res.warn}</div>` : "") +
      `<div class="rulebox">Rule applied: ${esc(res.rule)}</div>`;
  }
  [sel, wIn, aIn].forEach(el => el.addEventListener("input", run));
  run();
}

function initLtgCalc(){
  const ageSel = document.getElementById("ltg-age");
  if(!ageSel) return;
  const comedSel = document.getElementById("ltg-comed");
  const wIn = document.getElementById("ltg-weight");
  const wWrap = document.getElementById("ltg-weight-wrap");
  const out = document.getElementById("ltg-out");

  function run(){
    const ped = ageSel.value === "ped";
    wWrap.style.display = ped ? "" : "none";
    const key = comedSel.value;
    if(!ped){
      const s = LTG_ADULT[key];
      out.innerHTML =
        `<table><thead><tr><th>${esc(s.label)}</th><th>Dose</th></tr></thead><tbody>${
          s.weeks.map(r => `<tr><td>${esc(r[0])}</td><td><span class="dose">${esc(r[1])}</span></td></tr>`).join("")
        }<tr><td>Usual maintenance</td><td><span class="dose">${esc(s.maint)}</span></td></tr></tbody></table>
        <div class="rulebox">Patients older than 12 years. Do not exceed this starting dose or rate of escalation &mdash; rash risk is rate-dependent.</div>`;
      return;
    }
    const w = parseFloat(wIn.value);
    const s = LTG_PED[key];
    if(!(w > 0)){
      out.innerHTML = `<div class="placeholder">Enter a body weight for paediatric dosing.</div>`;
      return;
    }
    const d1 = tabletRoundDown(s.w1*w), d3 = tabletRoundDown(s.w3*w), st = tabletRoundDown(s.step*w);
    const fmt = (v, perKg) => v === null
      ? `<span class="cap">below the smallest usable tablet combination</span>`
      : `${v} mg/day <span class="hint">(${perKg} mg/kg/day = ${r1v(perKg*w)} mg, rounded down to whole tablets)</span>`;
    out.innerHTML =
      `<table><thead><tr><th>${esc(s.label)}, 2 to 12 years</th><th>at ${w} kg</th></tr></thead><tbody>
        <tr><td>Weeks 1-2</td><td><span class="dose">${fmt(d1, s.w1)}</span></td></tr>
        <tr><td>Weeks 3-4</td><td><span class="dose">${fmt(d3, s.w3)}</span></td></tr>
        <tr><td>Week 5 onward</td><td><span class="dose">add ${st === null ? "—" : st + " mg/day"}</span><br><span class="hint">calculate ${s.step} mg/kg/day, round down to whole tablets, add to the current daily dose, every 1-2 weeks</span></td></tr>
        <tr><td>Usual maintenance</td><td><span class="dose">${esc(s.maint)}</span></td></tr>
      </tbody></table>
      <div class="rulebox">Dispersible tablets are 2 mg and 5 mg, so every whole milligram except 1 and 3 is achievable. The label instructs rounding down to the nearest whole tablet. Children under 30 kg may need maintenance doses up to 50% higher.</div>`;
  }
  const r1v = n => Math.round(n*100)/100;
  [ageSel, comedSel, wIn].forEach(el => el.addEventListener("input", run));
  run();
}

function initRenalCalc(){
  const out = document.getElementById("renal-out");
  if(!out) return;
  const mode = document.getElementById("crcl-mode");
  const age = document.getElementById("crcl-age");
  const wt  = document.getElementById("crcl-weight");
  const scr = document.getElementById("crcl-scr");
  const sex = document.getElementById("crcl-sex");
  const ht  = document.getElementById("crcl-height");
  const direct = document.getElementById("crcl-direct");
  const calcOut = document.getElementById("crcl-value");

  function fields(){
    const m = mode.value;
    document.getElementById("f-adult").style.display = m === "cg" ? "" : "none";
    document.getElementById("f-child").style.display = m === "schwartz" ? "" : "none";
    document.getElementById("f-direct").style.display = m === "direct" ? "" : "none";
  }

  function crcl(){
    const m = mode.value;
    if(m === "direct") return parseFloat(direct.value);
    if(m === "cg"){
      const a = parseFloat(age.value), w = parseFloat(wt.value), s = parseFloat(scr.value);
      if(!(a > 0 && w > 0 && s > 0)) return NaN;
      let v = ((140 - a) * w) / (72 * s);
      if(sex.value === "f") v *= 0.85;
      return v;
    }
    const h = parseFloat(ht.value), s2 = parseFloat(scr.value), a2 = parseFloat(age.value);
    if(!(h > 0 && s2 > 0)) return NaN;
    const k = (a2 < 12 && sex.value === "f") ? 0.55 : 0.70;
    return (k * h) / s2;
  }

  function run(){
    fields();
    const c = crcl();
    if(!isFinite(c) || c <= 0){
      calcOut.textContent = "—";
      out.innerHTML = `<div class="placeholder">Enter the values above to estimate creatinine clearance.</div>`;
      return;
    }
    calcOut.textContent = Math.round(c) + " mL/min";
    out.innerHTML =
      `<table><thead><tr><th>Drug</th><th>At CrCl ${Math.round(c)} mL/min</th></tr></thead><tbody>${
        RENAL.map(r => `<tr><td class="drug">${esc(r.n)}</td><td><span class="dose">${r.f(c)}</span>${
          r.note ? `<br><span class="hint">${r.note}</span>` : ""}</td></tr>`).join("")
      }</tbody></table>
      <div class="rulebox">Cockcroft-Gault: CrCl = (140 &minus; age) &times; weight &divide; (72 &times; serum creatinine), &times; 0.85 for female patients. Schwartz for children under 12: CrCl = k &times; height in cm &divide; serum creatinine, k = 0.55 female, 0.70 male. Both formulas are those printed in the labels. Levetiracetam bands are expressed per 1.73 m&sup2;.</div>
      <div class="rulebox">Drugs needing no routine renal adjustment: lamotrigine, valproate, carbamazepine, phenytoin, clobazam, brivaracetam (avoid in end-stage disease), tiagabine, rufinamide, stiripentol, cannabidiol.</div>`;
  }
  [mode, age, wt, scr, sex, ht, direct].forEach(el => el && el.addEventListener("input", run));
  run();
}

function initIxCalc(){
  const box = document.getElementById("ix-picks");
  if(!box) return;
  const out = document.getElementById("ix-out");
  box.innerHTML = [...DRUGS].sort((a,b) => a.n.localeCompare(b.n))
    .map(d => `<label class="tog"><input type="checkbox" value="${d.id}"> ${d.n}</label>`).join("");

  const SEV = {major:{t:"Major", c:"var(--crit)"}, moderate:{t:"Moderate", c:"var(--warn)"}, minor:{t:"Minor", c:"var(--ink-3)"}};

  function run(){
    const picked = [...box.querySelectorAll("input:checked")].map(i => i.value);
    if(picked.length < 2){
      out.innerHTML = `<div class="placeholder">Select two or more drugs to check the combination.</div>`;
      return;
    }
    const name = id => (DRUGS.find(d => d.id === id) || {n:id}).n;
    const hits = IX.filter(x => picked.includes(x.a) && picked.includes(x.b));
    const inducers = picked.filter(p => INDUCERS.includes(p));
    const inhibitors = picked.filter(p => INHIBITORS.includes(p));
    const weak = picked.filter(p => WEAK_INDUCERS.includes(p));
    const classes = [...new Set(picked.map(p => (DRUGS.find(d => d.id === p) || {}).c))];

    let html = "";
    if(hits.length){
      const order = {major:0, moderate:1, minor:2};
      hits.sort((x,y) => order[x.sev] - order[y.sev]);
      html += `<table><thead><tr><th>Pair</th><th>Interaction</th></tr></thead><tbody>${
        hits.map(x => `<tr><td class="drug">${esc(name(x.a))}<br>+ ${esc(name(x.b))}<br>
          <span class="cap" style="color:${SEV[x.sev].c}">${SEV[x.sev].t}</span></td>
          <td>${x.txt}</td></tr>`).join("")}</tbody></table>`;
    } else {
      html += `<div class="placeholder">No specific pairwise interaction is recorded here for that combination. Absence from this list is not proof of safety — check the current labels.</div>`;
    }

    const notes = [];
    if(inducers.length) notes.push(`Strong enzyme inducer${inducers.length>1?"s":""} in this regimen: <strong>${inducers.map(name).join(", ")}</strong>. Expect lower concentrations of most co-prescribed drugs, reduced hormonal contraceptive reliability, and effects on anticoagulants, antiretrovirals and immunosuppressants.`);
    if(weak.length) notes.push(`Partial or weaker inducer${weak.length>1?"s":""}: ${weak.map(name).join(", ")}. Enough induction to matter for contraception and for lamotrigine.`);
    if(inhibitors.length) notes.push(`Enzyme inhibitor${inhibitors.length>1?"s":""}: <strong>${inhibitors.map(name).join(", ")}</strong>. Expect higher concentrations of partner drugs.`);
    if(classes.length === 1 && picked.length > 1)
      notes.push(`<strong>All selected drugs share the same mechanism class (${CLASS_LABEL[classes[0]]}).</strong> Combining agents with the same target tends to add adverse effects without adding efficacy. Prefer a partner from a different class.`);
    else if(picked.length > 1)
      notes.push(`Mechanism classes represented: ${classes.map(c => CLASS_LABEL[c]).join(", ")}. Mechanistic diversity is the usual basis for a rational combination.`);

    if(notes.length) html += `<div class="rulebox">${notes.join("<br><br>")}</div>`;
    out.innerHTML = html;
  }
  box.addEventListener("change", run);
  const clear = document.getElementById("ix-clear");
  if(clear) clear.addEventListener("click", () => {
    box.querySelectorAll("input").forEach(i => i.checked = false); run();
  });
  run();
}

/* ---------------- status epilepticus ---------------- */
function initSeCalc(){
  const wIn = document.getElementById("se-weight");
  if(!wIn) return;
  const out = document.getElementById("se-out");

  function dose(d, w){
    if(d.band) return d.calc(w);
    if(d.perKgLo !== undefined){
      const lo = Math.min(d.perKgLo*w, d.max), hi = Math.min(d.perKgHi*w, d.max);
      const capped = d.perKgHi*w > d.max;
      return `${Math.round(lo*10)/10} to ${Math.round(hi*10)/10} ${d.unit}` + (capped ? ` <span class="cap">(capped at ${d.max} ${d.unit})</span>` : "");
    }
    const raw = d.perKg*w;
    const v = d.max ? Math.min(raw, d.max) : raw;
    const capped = d.max && raw > d.max;
    return `${Math.round(v)} ${d.unit}` + (capped ? ` <span class="cap">(capped at ${d.max} ${d.unit})</span>` : "");
  }

  function run(){
    const w = parseFloat(wIn.value);
    if(!(w > 0) || w > 250){
      out.innerHTML = `<div class="placeholder">Enter the patient's weight in kilograms.</div>`;
      return;
    }
    out.innerHTML = SE_PHASES.map(ph =>
      `<table><thead><tr><th>${esc(ph.phase)}</th><th>Dose at ${w} kg</th><th>Repeat</th></tr></thead><tbody>${
        ph.drugs.map(d => `<tr><td class="drug">${esc(d.n)}${d.alt ? `<br><span class="hint">if the above are unavailable</span>` : ""}</td>
          <td><span class="dose">${dose(d, w)}</span><br><span class="hint">${esc(d.rule)}</span></td>
          <td>${esc(d.repeat)}</td></tr>`).join("")}</tbody></table>`
    ).join("") +
    `<div class="rulebox">Doses from the American Epilepsy Society guideline algorithm (Glauser et al., Epilepsy Curr 2016;16:48-61). Give the initial benzodiazepine as one adequate full dose rather than several small ones. Third phase, 40-60 minutes: repeat second-line therapy or move to anaesthetic doses of thiopental, midazolam, pentobarbital or propofol with continuous EEG.</div>`;
  }
  wIn.addEventListener("input", run);
  run();
}

/* ---------------- blood level interpreter ---------------- */
function initLevelCalc(){
  const sel = document.getElementById("lvl-drug");
  if(!sel) return;
  const val = document.getElementById("lvl-value");
  const unit = document.getElementById("lvl-unit");
  const out = document.getElementById("lvl-out");

  sel.innerHTML = PK.filter(p => p.mg).map(p => `<option value="${p.id}">${p.n}</option>`).join("");

  function run(){
    const p = PK.find(x => x.id === sel.value);
    const v = parseFloat(val.value);
    if(!p || !isFinite(v) || v < 0){
      out.innerHTML = `<div class="placeholder">Choose a drug and enter a measured concentration.</div>`;
      return;
    }
    const useUm = unit.value === "um";
    const range = useUm ? p.um : p.mg;
    if(!range){
      out.innerHTML = `<div class="placeholder">No micromolar range is published for ${esc(p.n)}. Switch to mg/L.</div>`;
      return;
    }
    const u = useUm ? "&micro;mol/L" : "mg/L";
    let verdict, colour;
    if(v < range[0]){ verdict = "Below the population reference range"; colour = "var(--warn)"; }
    else if(v > range[1]){ verdict = "Above the population reference range"; colour = "var(--crit)"; }
    else { verdict = "Within the population reference range"; colour = "var(--ok)"; }

    const pct = Math.max(0, Math.min(100, ((v - range[0]) / (range[1] - range[0])) * 100));
    out.innerHTML =
      `<table><tbody>
        <tr><td style="width:38%">Measured</td><td><span class="dose">${v} ${u}</span></td></tr>
        <tr><td>Reference range</td><td><span class="dose">${range[0]} to ${range[1]} ${u}</span></td></tr>
        <tr><td>Interpretation</td><td><span class="dose" style="color:${colour}">${verdict}</span>
          <br><span class="hint">Position within range: ${Math.round(pct)}%</span></td></tr>
        <tr><td>Half-life</td><td><span class="num">${esc(p.t12)}</span></td></tr>
        <tr><td>Time to steady state</td><td><span class="num">${esc(p.ss)}</span></td></tr>
        <tr><td>Protein binding</td><td><span class="num">${esc(p.pb)}</span></td></tr>
        ${p.meta !== "-" ? `<tr><td>Also consider</td><td>${esc(p.meta)}</td></tr>` : ""}
      </tbody></table>
      <div class="rulebox">The reference range is a population range, not a therapeutic target. Patients do well below it and some need concentrations above it. Sample immediately before the morning dose at steady state, and record the interval since the last dose. Treat the patient, not the number.</div>`;
  }
  [sel, val, unit].forEach(el => el.addEventListener("input", run));
  run();
}

/* ---------------- seizure-type chooser ---------------- */
const CHOOSER = {
  focal:{label:"Focal seizures",
    first:["lamotrigine","levetiracetam"],
    second:["carbamazepine","oxcarbazepine","zonisamide"],
    third:["lacosamide"],
    addon:["carbamazepine","lacosamide","lamotrigine","levetiracetam","oxcarbazepine","topiramate","zonisamide"],
    note:"SANAD II found lamotrigine superior to levetiracetam and zonisamide for time to 12-month remission in newly diagnosed focal epilepsy."},
  gtc:{label:"Generalised tonic-clonic seizures",
    first:["lamotrigine","levetiracetam","valproate"],
    second:[], third:[],
    addon:["clobazam","lamotrigine","levetiracetam","perampanel","valproate","topiramate","brivaracetam","lacosamide","phenobarbital","primidone","zonisamide"],
    note:"SANAD II found valproate more effective than levetiracetam in generalised and unclassified epilepsy."},
  absence:{label:"Absence seizures",
    first:["ethosuximide"],
    second:["lamotrigine","levetiracetam","valproate"],
    third:[], addon:[],
    note:"Ethosuximide and valproate both beat lamotrigine for freedom from treatment failure at 12 months, and ethosuximide caused less attentional impairment than valproate (Glauser, NEJM 2010)."},
  myoclonic:{label:"Myoclonic seizures",
    first:["levetiracetam","valproate"],
    second:["brivaracetam","clobazam","clonazepam","lamotrigine","phenobarbital","topiramate","zonisamide"],
    third:[], addon:[],
    note:"Lamotrigine occasionally worsens myoclonus even while it controls tonic-clonic seizures."},
  tonic:{label:"Tonic or atonic seizures",
    first:["lamotrigine","valproate"],
    second:["clobazam","rufinamide","topiramate"],
    third:[], addon:[],
    note:"These seizure types usually sit within a developmental and epileptic encephalopathy; treat the syndrome."}
};

const FACTORS = {
  childbearing:{label:"Childbearing potential",
    flags:{valproate:["danger","10.3% major malformations, reduced IQ and increased autism risk. Must not be started under 55 years unless two specialists independently document that nothing else works."],
           topiramate:["warn","3.9% malformations with oral clefts and growth restriction; also reduces hormonal contraceptive reliability above 200 mg/day."],
           carbamazepine:["warn","5.5% malformations overall, and an enzyme inducer that reduces contraceptive reliability."],
           phenobarbital:["warn","6.5% malformations, rising above 80 mg/day."],
           phenytoin:["warn","6.4% malformations and a potent enzyme inducer."],
           lamotrigine:["good","2.9% malformations, among the lowest. Note that clearance rises sharply in pregnancy and estrogen halves the level."],
           levetiracetam:["good","2.8% malformations, the lowest in the EURAP cohort."],
           oxcarbazepine:["good","3.0% malformations, though it still reduces contraceptive reliability."]}},
  under2:{label:"Child under 2 years",
    flags:{valproate:["danger","Hepatotoxicity risk is greatest under 2 years, especially on polytherapy or with a suspected metabolic or mitochondrial disorder."],
           carbamazepine:["warn","Dosing is weight-based under 6 years, with autoinduction over the first 2-4 weeks."],
           zonisamide:["warn","Oligohidrosis and hyperthermia are specifically a paediatric risk; not established below 16 years in the label."],
           topiramate:["warn","Oligohidrosis, hyperthermia, reduced bone density and slowed growth in children."]}},
  renal:{label:"Renal impairment",
    flags:{levetiracetam:["warn","Dose bands by creatinine clearance; supplement after dialysis."],
           gabapentin:["warn","Substantial dose reduction required; supplement after dialysis."],
           pregabalin:["warn","Dose reduction required; use immediate-release below CrCl 30."],
           topiramate:["warn","Halve the dose below CrCl 70 mL/min/1.73 m²."],
           vigabatrin:["warn","Reduce by 25 to 75% according to impairment."],
           perampanel:["danger","Not recommended in severe renal impairment or on haemodialysis."],
           lamotrigine:["good","No routine renal adjustment, though use caution in severe impairment."],
           valproate:["good","No routine renal adjustment."]}},
  hepatic:{label:"Hepatic impairment",
    flags:{valproate:["danger","Contraindicated in hepatic disease and in POLG-related mitochondrial disorders."],
           felbamate:["danger","Boxed warning for hepatic failure."],
           cannabidiol:["warn","Dose reduction needed in moderate and severe impairment; transaminase monitoring required."],
           perampanel:["warn","Maximum 6 mg in mild and 4 mg in moderate impairment; avoid in severe."],
           lacosamide:["warn","Reduce the maximum by 25% in mild or moderate impairment; avoid in severe."],
           cenobamate:["warn","Maximum 200 mg/day in mild or moderate impairment; avoid in severe."],
           levetiracetam:["good","No hepatic adjustment needed."]}},
  cardiac:{label:"Cardiac conduction disease",
    flags:{lacosamide:["danger","PR prolongation, AV block and atrial arrhythmias. Obtain an ECG before starting and at maintenance dose."],
           lamotrigine:["warn","Cardiac conduction effects in structural or ischaemic heart disease."],
           rufinamide:["warn","QT shortening; contraindicated in familial short QT syndrome."],
           cenobamate:["warn","QT shortening; avoid in familial short QT syndrome."],
           carbamazepine:["warn","Can affect cardiac conduction; caution with AV block."]}},
  psych:{label:"Psychiatric history",
    flags:{levetiracetam:["danger","Irritability, aggression, mood disturbance and occasionally psychosis are its limiting adverse effects."],
           perampanel:["danger","Boxed warning for serious psychiatric and behavioural reactions including aggression and homicidal ideation."],
           topiramate:["warn","Cognitive slowing and depression are common reasons for stopping."],
           zonisamide:["warn","Cognitive and psychiatric adverse effects reported."],
           brivaracetam:["good","Behavioural effects appear less often than with levetiracetam; a reasonable switch."],
           lamotrigine:["good","Generally mood-neutral or mood-stabilising."]}},
  weight:{label:"Weight is a concern",
    flags:{valproate:["warn","Weight gain is common and often substantial."],
           gabapentin:["warn","Weight gain and peripheral oedema."],
           pregabalin:["warn","Weight gain and peripheral oedema."],
           vigabatrin:["warn","Weight gain."],
           carbamazepine:["warn","Modest weight gain."],
           topiramate:["good","Weight loss, which may be desirable, but watch growth in children."],
           zonisamide:["good","Weight loss."],
           fenfluramine:["warn","Decreased appetite and weight loss needing active monitoring in a growing child."]}},
  elderly:{label:"Older adult",
    flags:{carbamazepine:["warn","Hyponatraemia is commoner with age; enzyme induction complicates polypharmacy."],
           oxcarbazepine:["warn","Hyponatraemia risk is higher still, particularly with diuretics."],
           valproate:["warn","Reduce the starting dose; greater sensitivity to somnolence."],
           clobazam:["warn","Start at 5 mg/day and titrate to half the usual dose."],
           perampanel:["warn","Increase no more often than every 2 weeks."],
           lamotrigine:["good","Well tolerated in older adults; few interactions."],
           levetiracetam:["good","No hepatic metabolism and minimal interactions, though renal dosing applies."]}}
};

function initChooser(){
  const typeSel = document.getElementById("ch-type");
  if(!typeSel) return;
  const facBox = document.getElementById("ch-factors");
  const out = document.getElementById("ch-out");

  typeSel.innerHTML = Object.entries(CHOOSER).map(([k,v]) => `<option value="${k}">${v.label}</option>`).join("");
  facBox.innerHTML = Object.entries(FACTORS).map(([k,v]) =>
    `<label class="tog"><input type="checkbox" value="${k}"> ${v.label}</label>`).join("");

  const TONE = {danger:{c:"var(--crit)", t:"Avoid or use with great care"},
                warn:{c:"var(--warn)", t:"Caution"},
                good:{c:"var(--ok)", t:"Favourable"}};

  function run(){
    const spec = CHOOSER[typeSel.value];
    const facs = [...facBox.querySelectorAll("input:checked")].map(i => i.value);
    const name = id => (DRUGS.find(d => d.id === id) || {n:id}).n;

    function line(id){
      const notes = [];
      facs.forEach(f => {
        const hit = FACTORS[f].flags[id];
        if(hit) notes.push(`<span class="cap" style="color:${TONE[hit[0]].c}">${FACTORS[f].label}: ${TONE[hit[0]].t}.</span> ${hit[1]}`);
      });
      return `<tr>
        <td class="drug"><a class="dl" href="monographs.html#d-${id}">${esc(name(id))}</a></td>
        <td>${notes.length ? notes.join("<br>") : `<span class="hint">No specific flag for the factors selected.</span>`}</td></tr>`;
    }

    const block = (title, ids) => ids.length
      ? `<table><thead><tr><th>${esc(title)}</th><th>Notes for this patient</th></tr></thead><tbody>${ids.map(line).join("")}</tbody></table>`
      : "";

    out.innerHTML =
      block("First line", spec.first) +
      block("Second line", spec.second) +
      block("Third line", spec.third) +
      block("Add-on options", spec.addon) +
      `<div class="rulebox">Ordering follows NICE NG217, updated January 2025. ${esc(spec.note)}</div>
       <div class="rulebox">Flags come from the drugs' own labelling and the EURAP registry. They annotate the guideline ordering; they do not re-rank it. The choice remains yours.</div>`;
  }
  typeSel.addEventListener("change", run);
  facBox.addEventListener("change", run);
  run();
}

/* ---------------- boot ---------------- */
function initPage(key){
  buildChrome(key);
  initMonographs();
  initPedCalc();
  initLtgCalc();
  initRenalCalc();
  initIxCalc();
  initSeCalc();
  initLevelCalc();
  initChooser();
  document.querySelectorAll("[data-linkify]").forEach(linkifyDrugs);
  initSpy();
}

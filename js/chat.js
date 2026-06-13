/*
  BharatVoice — Chat Engine
  
  v1.0 — Rule-based scheme matcher (no API needed, works offline)
  v2.0 — TODO: Replace matchSchemes() with Claude API call
          (see config.js — set useClaudeAPI: true when ready)

  Flow:
    User types → extractProfile() → matchSchemes() → render cards

  To upgrade to AI matching in v2:
    1. Set CONFIG.useClaudeAPI = true in config.js
    2. Replace the body of matchSchemes() with the commented
       API call below the function
*/

// shorthand selectors — I use these a lot
const chatEl  = document.getElementById("chatBox");
const inputEl = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

// conversation state — reset between searches
let state = {
  profile: {},
  turns:   0,
};


// ─── boot greeting ──────────────────────────────────────────────
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    botMsg(
      "Namaste! 🙏 I'm <b>BharatVoice</b> — tell me about yourself and I'll " +
      "find every government scheme you're eligible for.<br><br>" +
      "<b>Include:</b> occupation, age, category (SC/ST/OBC/General/BPL), " +
      "state, and any specific situation.<br><br>" +
      "<b>Examples:</b><br>" +
      "• <em>Main 21 saal ka B.Tech student hoon, General, Bihar se</em><br>" +
      "• <em>Kisan hoon UP se, SC category, 3 acre zameen, 80,000 income</em><br>" +
      "• <em>30 year old BPL woman, village, UP</em><br>" +
      "• <em>Street vendor, Delhi, need business loan</em>"
    );
  }, 500);
});


// ─── keyboard shortcut ──────────────────────────────────────────
inputEl.addEventListener("keydown", e => {
  if (e.key === "Enter") sendMessage();
});


// ─── main send function ─────────────────────────────────────────
function sendMessage() {
  const txt = inputEl.value.trim();
  if (!txt) return;

  userMsg(txt);
  inputEl.value = "";
  inputEl.disabled = true;
  sendBtn.disabled = true;

  // random delay so it doesn't feel instant (more natural)
  const delay = CONFIG.typingDelayMin + Math.random() * (CONFIG.typingDelayMax - CONFIG.typingDelayMin);

  showTyping();
  setTimeout(() => {
    removeTyping();
    handleInput(txt);
    inputEl.disabled = false;
    sendBtn.disabled = false;
    inputEl.focus();
  }, delay);
}


// ─── handle each user message ───────────────────────────────────
function handleInput(txt) {
  const t = txt.toLowerCase();
  state.turns++;

  // quick commands
  if (/^(reset|nayi|new|start over|phir se|clear)/.test(t)) {
    state = { profile: {}, turns: 0 };
    botMsg("Done! Fresh start. What would you like to search for?");
    return;
  }

  if (/^(help|\?)/.test(t)) {
    botMsg(
      "<b>How to get the best results:</b><br>" +
      "Mention as many of these as possible:<br><br>" +
      "✅ <b>Occupation</b> — kisan / student / business / vendor / worker<br>" +
      "✅ <b>Age</b> — '21 saal' or '45 years old'<br>" +
      "✅ <b>Category</b> — SC / ST / OBC / General / BPL / Minority / Disabled<br>" +
      "✅ <b>State</b> — Bihar / UP / Maharashtra etc.<br>" +
      "✅ <b>Location</b> — village / city<br><br>" +
      "Type <b>reset</b> to start a new search."
    );
    return;
  }

  if (/\b(thanks|thank you|shukriya|dhanyavad|perfect|great)\b/.test(t)) {
    botMsg("Glad I could help! 🙏 Type <b>reset</b> to search for different schemes.");
    return;
  }

  // extract from this message and merge into running profile
  const extracted = extractProfile(txt);
  mergeProfile(extracted);

  if (CONFIG.debug) {
    console.log("[BV] Profile after merge:", state.profile);
  }

  // find matching schemes
  const results = matchSchemes(state.profile);

  if (results.length === 0) {
    askForMoreInfo();
    return;
  }

  // group results by category for cleaner display
  const grouped = groupByCategory(results);

  // header message
  const profileSummary = buildSummary(state.profile);
  botMsg(
    `<b>✅ Found ${results.length} scheme${results.length > 1 ? "s" : ""} for you!</b><br>` +
    `<small style="color:#6B7280;">Based on: ${profileSummary}</small>`
  );

  // render each group
  const catNames = {
    student: "🎓 Education & Scholarships",
    farmer: "🌾 Farmer & Agriculture",
    women: "👩 Women & Girl Child",
    health: "🏥 Health",
    housing: "🏠 Housing",
    employment: "💼 Employment & Business",
    senior: "👴 Senior Citizens",
    disabled: "♿ Divyang / Disabled",
    financial: "💰 Financial Inclusion",
    energy: "⚡ Energy",
    food: "🍚 Food & Ration",
    sc_st: "🎯 SC/ST Special Schemes",
    digital: "📱 Digital Services",
    water: "🚰 Water & Sanitation",
    state_bihar: "📍 Bihar State Schemes",
    state_up: "📍 Uttar Pradesh Schemes",
    disaster: "🌊 Disaster Relief",
    infrastructure: "🛣️ Infrastructure",
  };

  for (const [cat, schemes] of Object.entries(grouped)) {
    if (Object.keys(grouped).length > 1) {
      botMsg(`<b>${catNames[cat] || cat} — ${schemes.length} scheme${schemes.length > 1 ? "s" : ""}:</b>`);
    }
    schemes.forEach(s => renderSchemeCard(s));
  }

  // closing message
  botMsg(
    "📋 <b>Next steps:</b><br>" +
    "1. Click <em>Apply / Info</em> on each scheme above<br>" +
    "2. Keep your Aadhaar Card ready — needed for all schemes<br>" +
    "3. Visit nearest CSC center if you need help applying<br><br>" +
    "<small>Want to search more? Type <b>reset</b> for a fresh search.</small>"
  );
}


// ─── merge extracted profile into running state ─────────────────
function mergeProfile(extracted) {
  const p = state.profile;

  for (const key of ["occupation","categories","gender","location","health"]) {
    if (extracted[key]?.length) {
      p[key] = [...new Set([...(p[key] || []), ...extracted[key]])];
    }
  }

  if (extracted.age  !== null)  p.age  = extracted.age;
  if (extracted.income !== null) p.income = extracted.income;
  if (extracted.hasLand)         p.hasLand = true;
  if (extracted.educationLevel)  p.educationLevel = extracted.educationLevel;
  if (extracted.isGeneral)       p.isGeneral = true;
}


// ─── build a short profile summary for display ──────────────────
function buildSummary(p) {
  const parts = [];
  if (p.age) parts.push("Age " + p.age);
  if (p.educationLevel === "higher") parts.push("College/University");
  if (p.educationLevel === "school") parts.push("School");
  if (p.educationLevel === "phd")    parts.push("PhD");

  const occShow = (p.occupation || []).find(o =>
    ["farmer","student","business","vendor","fisherman","dairy","artisan"].includes(o)
  );
  if (occShow) parts.push(occShow.charAt(0).toUpperCase() + occShow.slice(1));

  const catShow = (p.categories || []).filter(c =>
    ["sc","st","obc","bpl","minority","disabled"].includes(c)
  );
  if (catShow.length) parts.push(catShow.join("/").toUpperCase());
  if (p.isGeneral) parts.push("General Category");
  if ((p.gender||[]).includes("female")) parts.push("Female");
  if ((p.location||[]).includes("rural")) parts.push("Rural");
  if ((p.location||[]).includes("bihar")) parts.push("Bihar");
  if ((p.location||[]).includes("up")) parts.push("UP");

  return parts.length ? parts.join(" · ") : "Your details";
}


// ─── hint messages when we don't have enough info ───────────────
function askForMoreInfo() {
  const p = state.profile;
  const hasOcc = (p.occupation || []).length > 0;
  const hasCat = (p.categories || []).length > 0 || p.isGeneral;

  if (!hasOcc && !hasCat) {
    botMsg(
      "Thoda aur batayein — <b>aap kya karte hain?</b> 🤔<br><br>" +
      "<b>Occupation:</b> Kisan · Student · Business · Vendor · Daily Worker<br>" +
      "<b>Category:</b> SC · ST · OBC · General · BPL · Minority · Disabled"
    );
  } else if (hasOcc && !hasCat) {
    botMsg(
      "Aapki <b>social category</b> kya hai? This unlocks more schemes.<br><br>" +
      "<em>SC / ST / OBC / General / BPL / Minority / Disabled</em>"
    );
  } else if (p.isGeneral && (p.occupation||[]).includes("student") && !p.educationLevel) {
    botMsg(
      "Aap <b>kahan padh rahe hain?</b><br><br>" +
      "• <em>B.Tech / BA / BSc / College / University</em> — higher education<br>" +
      "• <em>Class 10 / Class 12 / School</em> — school level<br>" +
      "• <em>PhD / Research</em>"
    );
  } else {
    botMsg(
      "Koi exact match nahi mila abhi. Try adding more details:<br>" +
      "<em>Income · State name · Land info · Specific situation</em><br><br>" +
      "Or type <b>reset</b> to start fresh."
    );
  }
}


// ═══════════════════════════════════════════════════════════════════
//  SCHEME MATCHER
//  This is the core logic. Each rule is a filter that removes
//  schemes the user doesn't qualify for.
//
//  Rules are ordered from most to least restrictive.
//  If a rule removes a scheme, we skip it (continue).
// ═══════════════════════════════════════════════════════════════════

function matchSchemes(profile) {

  // sets for quick lookup
  const uOcc = new Set(profile.occupation || []);
  const uCat = new Set(profile.categories || []);
  const uGen = new Set(profile.gender     || []);
  const uLoc = new Set(profile.location   || []);
  const uHlt = new Set(profile.health     || []);
  const uAge = profile.age;
  const uEdu = profile.educationLevel;
  const uInc = profile.income;

  // derived flags — computed once, used in rules below
  const isFarmer   = hasAny(uOcc, ["farmer","kisan","agriculture","fisherman","matsya","dairy","animal_husbandry","beekeeping","agri_startup"]);
  const isBusiness = hasAny(uOcc, ["business","entrepreneur","startup","vendor","street_vendor","hawker","msme","artisan","craft","vishwakarma","shg","self_help_group","mahila_mandal"]);
  const isInformal = hasAny(uOcc, ["unorganised","informal","mazdoor"]);
  const isStudent  = uOcc.has("student");
  const isWoman    = hasAny(uGen, ["female","woman","mahila"]);
  const isPregnant = uGen.has("pregnant");
  const isSenior   = uAge !== null && uAge >= 60;
  const isDisabled = hasAny(uCat, ["disabled","divyang"]);
  const isRural    = hasAny(uLoc, ["village","gaon","rural"]);
  const isUrban    = hasAny(uLoc, ["city","urban","town","shahar"]);
  const isBPL      = hasAny(uCat, ["bpl","poor"]);
  const isSC       = uCat.has("sc");
  const isST       = uCat.has("st");
  const isSCST     = isSC || isST;
  const isBihar    = uLoc.has("bihar");
  const isUP       = hasAny(uLoc, ["up","uttar_pradesh","uttar pradesh"]);

  // employment schemes open to everyone (skill training etc)
  const openEmpIds = new Set(["skill_india", "national_apprenticeship"]);

  // schemes that only make sense if the user mentioned rural
  const ruralOnlyIds = new Set([
    "jal_jeevan", "swachh_bharat_odf", "pm_gram_sadak",
    "pm_awas_gramin", "mgnregs", "ddu_gky", "pmgdisha",
    "pm_kusum", "paramparagat_krishi", "nrlm_shg",
    "swachh_bharat_toilet",
  ]);

  const seen = new Set();

  return SCHEMES.filter(s => {

    // deduplicate (shouldn't happen, but just in case)
    if (seen.has(s.id)) return false;
    seen.add(s.id);

    const e = s.eligibility || {};

    // ── Rule 1: Occupation must match if scheme requires it ────
    if (e.occupation?.length) {
      if (!e.occupation.some(o => uOcc.has(o))) return false;
    }

    // ── Rule 2: Category STRICTLY enforced ────────────────────
    // If a scheme targets SC/ST/OBC/BPL/minority etc., user MUST have that category.
    // No exceptions — this is the main fix for the false positives.
    if (e.categories?.length) {
      if (!e.categories.some(c => uCat.has(c))) return false;
    }

    // ── Rule 3: Gender must match ─────────────────────────────
    if (e.gender?.length) {
      if (!e.gender.some(g => uGen.has(g))) return false;
    }

    // ── Rule 4: Age bounds (strict) ───────────────────────────
    if (uAge !== null) {
      if (e.minAge && uAge < e.minAge) return false;
      if (e.maxAge && uAge > e.maxAge) return false;
    }

    // ── Rule 5: Education level ───────────────────────────────
    // "school" schemes are blocked for college/PhD students
    if (e.educationLevel === "school" && (uEdu === "higher" || uEdu === "phd")) return false;
    // "higher" schemes are blocked for school students
    if (e.educationLevel === "higher" && uEdu === "school") return false;

    // ── Rule 6: Income cap ────────────────────────────────────
    if (e.maxIncome && uInc && uInc > e.maxIncome) return false;

    // ── Rule 7: Land required ─────────────────────────────────
    if (e.hasLand && !profile.hasLand) return false;

    // ── Rule 8: Category-level exclusions ─────────────────────
    // These prevent entire category groups from showing
    // when the user's profile clearly doesn't belong

    if (s.category === "farmer"   && !isFarmer)   return false;
    if (s.category === "women"    && !isWoman)    return false;
    if (s.category === "sc_st"    && !isSCST)     return false;
    if (s.category === "disabled" && !isDisabled) return false;
    if (s.category === "senior"   && !isSenior)   return false;
    if (s.category === "food"     && !isBPL)      return false;
    if (s.category === "state_bihar" && !isBihar) return false;
    if (s.category === "state_up"    && !isUP)    return false;

    // housing — only for BPL/SC/ST (they need it most)
    if (s.category === "housing" && !isBPL && !isSCST) return false;

    // water/infrastructure — only if user mentioned rural
    if (s.category === "water"          && !isRural) return false;
    if (s.category === "infrastructure" && !isRural) return false;

    // employment — only for business/informal workers
    // except openEmpIds (PMKVY, apprenticeship) which everyone benefits from
    if (s.category === "employment" && !openEmpIds.has(s.id)) {
      if (!isBusiness && !isInformal) return false;
    }

    // ── Rule 9: Health condition schemes ─────────────────────
    if (e.health?.length) {
      if (!e.health.some(h => uHlt.has(h))) return false;
    }

    // ── Rule 10: Rural-only schemes ──────────────────────────
    if (ruralOnlyIds.has(s.id) && !isRural) return false;

    // ── Rule 11: Urban-specific ──────────────────────────────
    if (s.id === "pm_awas_urban"  && !isUrban) return false;
    if (s.id === "pm_svanidhi"    && !isUrban) return false;

    // ── Rule 12: Northeast-only ──────────────────────────────
    if (s.id === "ishan_uday" && !uLoc.has("northeast")) return false;

    return true;

  });  // end filter

  /*
  ── v2 TODO: Replace above with Claude API call ──────────────────
  
  When CONFIG.useClaudeAPI is true, call this instead:
  
  async function matchSchemesAI(profile) {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: CONFIG.claude.model,
        max_tokens: CONFIG.claude.maxTokens,
        messages: [{
          role: "user",
          content: `Given this user profile: ${JSON.stringify(profile)}
                    And this schemes list: ${JSON.stringify(SCHEMES.map(s => ({ id: s.id, name: s.name, eligibility: s.eligibility })))}
                    Return ONLY a JSON array of scheme IDs the user qualifies for.
                    Be strict — only include schemes where ALL eligibility criteria match.`
        }]
      })
    });
    const data = await res.json();
    const ids = JSON.parse(data.content[0].text);
    return SCHEMES.filter(s => ids.includes(s.id));
  }
  */
}


// ─── group schemes by category ──────────────────────────────────
function groupByCategory(schemes) {
  const groups = {};
  for (const s of schemes) {
    if (!groups[s.category]) groups[s.category] = [];
    groups[s.category].push(s);
  }
  return groups;
}


// ─── helper: does a Set contain any of these values? ────────────
function hasAny(set, values) {
  return values.some(v => set.has(v));
}


// ═══════════════════════════════════════════════════════════════════
//  DOM HELPERS
// ═══════════════════════════════════════════════════════════════════

function userMsg(text) {
  const el = document.createElement("div");
  el.className = "msg user";
  el.innerHTML = `<div class="av">👤</div><div class="bubble">${escHtml(text)}</div>`;
  chatEl.appendChild(el);
  scrollDown();
}

function botMsg(html) {
  const el = document.createElement("div");
  el.className = "msg bot";
  el.innerHTML = `<div class="av">🤖</div><div class="bubble">${html}</div>`;
  chatEl.appendChild(el);
  scrollDown();
}

function renderSchemeCard(s) {
  const tags  = (s.tags || []).map(t => `<span class="pill">${t}</span>`).join("");
  const docs  = (s.documents || []).join(" · ");

  const el = document.createElement("div");
  el.className = "msg bot";
  el.innerHTML = `
    <div class="av">🤖</div>
    <div class="bubble">
      <div class="scheme-card">
        <h4>${s.name}</h4>
        <p>💰 <strong>Benefit:</strong> ${s.benefit}</p>
        <p>⏰ <strong>Deadline:</strong> ${s.deadline}</p>
        <p class="docs-line">📋 <strong>Documents:</strong> ${docs}</p>
        <p style="margin-top:7px;">
          <a href="${s.applyLink}" target="_blank" rel="noopener"
             style="color:#028090;font-weight:700;font-size:0.82rem;">
            ➤ Apply / More Info
          </a>
        </p>
        <div style="margin-top:5px;">${tags}</div>
      </div>
    </div>`;
  chatEl.appendChild(el);
  scrollDown();
}

function showTyping() {
  const el = document.createElement("div");
  el.className = "msg bot typing";
  el.id = "typingDot";
  el.innerHTML = `<div class="av">🤖</div><div class="bubble">Searching schemes…</div>`;
  chatEl.appendChild(el);
  scrollDown();
}

function removeTyping() {
  document.getElementById("typingDot")?.remove();
}

function scrollDown() {
  chatEl.scrollTop = chatEl.scrollHeight;
}

function escHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

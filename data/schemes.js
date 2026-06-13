/*
  BharatVoice — Government Schemes Database
  
  Data sourced from:
    - myscheme.gov.in
    - scholarships.gov.in
    - india.gov.in
    - Various state government portals
  
  Structure of each scheme:
  {
    id            : unique string key
    name          : full official scheme name
    category      : broad category for grouping
    benefit       : what the user actually gets
    eligibility   : object with filter rules
    documents     : array of required docs
    applyLink     : official portal URL
    deadline      : when to apply by
    tags          : short labels shown on card
  }

  Adding a new scheme?
  → Copy any existing entry, change the id, fill in details, done.
  → Pick a category from: farmer, student, women, health, housing,
    employment, senior, disabled, financial, energy, food, sc_st,
    digital, water, infrastructure, disaster, state_bihar, state_up
*/

// ─────────────────────────────────────────────────────────────────
const SCHEMES = [

  // ═══════════════════════════════════════════
  //  FARMER / AGRICULTURE  (17 schemes)
  // ═══════════════════════════════════════════

  {
    id: "pm_kisan",
    name: "PM Kisan Samman Nidhi",
    category: "farmer",
    benefit: "Rs. 6,000/year direct to bank account (3 installments of Rs. 2,000)",
    eligibility: {
      occupation: ["farmer","kisan","agriculture"],
      hasLand: true,
    },
    documents: ["Aadhaar Card", "Land Records (Khasra/Khatauni)", "Bank Passbook", "Mobile Number"],
    applyLink: "https://pmkisan.gov.in/",
    deadline: "Rolling — apply anytime",
    tags: ["Central", "Farmer", "Direct Cash"],
  },
  {
    id: "pm_fasal_bima",
    name: "PM Fasal Bima Yojana",
    category: "farmer",
    benefit: "Crop insurance — full loss covered at very low premium (2% for Kharif, 1.5% for Rabi)",
    eligibility: {
      occupation: ["farmer","kisan","agriculture"],
      hasLand: true,
    },
    documents: ["Aadhaar Card", "Land Records", "Bank Account", "Sowing Certificate"],
    applyLink: "https://pmfby.gov.in/",
    deadline: "Kharif: July 31 | Rabi: December 31",
    tags: ["Central", "Farmer", "Crop Insurance"],
  },
  {
    id: "kisan_credit_card",
    name: "Kisan Credit Card (KCC)",
    category: "farmer",
    benefit: "Loan up to Rs. 3 lakh at just 4% interest for farming expenses",
    eligibility: {
      occupation: ["farmer","kisan","agriculture"],
      hasLand: true,
    },
    documents: ["Aadhaar Card", "Land Records", "Passport Photo", "Bank Account"],
    applyLink: "https://www.nabard.org/",
    deadline: "Rolling — apply at nearest bank",
    tags: ["Central", "Farmer", "Low Interest Loan"],
  },
  {
    id: "pm_sinchai",
    name: "PM Krishi Sinchai Yojana",
    category: "farmer",
    benefit: "Subsidy up to 55% on drip/sprinkler irrigation equipment (SC/ST: 60%)",
    eligibility: {
      occupation: ["farmer","kisan","agriculture"],
      hasLand: true,
    },
    documents: ["Aadhaar Card", "Land Records", "Bank Account"],
    applyLink: "https://pmksy.gov.in/",
    deadline: "Check state agriculture portal",
    tags: ["Central", "Farmer", "Irrigation Subsidy"],
  },
  {
    id: "pm_kusum",
    name: "PM KUSUM Yojana",
    category: "farmer",
    benefit: "60% subsidy on solar irrigation pumps — save on electricity permanently",
    eligibility: {
      occupation: ["farmer","kisan","agriculture"],
      hasLand: true,
    },
    documents: ["Aadhaar Card", "Land Records", "Bank Account", "Electricity Bill"],
    applyLink: "https://mnre.gov.in/",
    deadline: "Check state energy department",
    tags: ["Central", "Farmer", "Solar Pump"],
  },
  {
    id: "soil_health_card",
    name: "Soil Health Card Scheme",
    category: "farmer",
    benefit: "Free soil testing + personalised fertilizer recommendation for your land",
    eligibility: {
      occupation: ["farmer","kisan","agriculture"],
    },
    documents: ["Aadhaar Card", "Land Details"],
    applyLink: "https://soilhealth.dac.gov.in/",
    deadline: "Rolling — contact local Krishi Vigyan Kendra",
    tags: ["Central", "Farmer", "Free Service"],
  },
  {
    id: "e_nam",
    name: "e-NAM (National Agriculture Market)",
    category: "farmer",
    benefit: "Sell crops online at best prices — access to 1000+ mandis across India",
    eligibility: {
      occupation: ["farmer","kisan","agriculture"],
    },
    documents: ["Aadhaar Card", "Bank Account", "Land Records"],
    applyLink: "https://enam.gov.in/",
    deadline: "Rolling — register at local mandi",
    tags: ["Central", "Farmer", "Online Market"],
  },
  {
    id: "kisan_vikas_patra",
    name: "Kisan Vikas Patra",
    category: "farmer",
    benefit: "Savings investment that doubles in ~115 months — 100% government backed",
    eligibility: {
      occupation: ["farmer","kisan"],
    },
    documents: ["Aadhaar Card", "PAN Card", "Address Proof"],
    applyLink: "https://www.indiapost.gov.in/",
    deadline: "Rolling — buy at any post office",
    tags: ["Central", "Farmer", "Safe Investment"],
  },
  {
    id: "pm_kisan_maan_dhan",
    name: "PM Kisan Maan-Dhan Yojana",
    category: "farmer",
    benefit: "Rs. 3,000/month pension for small/marginal farmers after age 60",
    eligibility: {
      occupation: ["farmer","kisan"],
      minAge: 18,
      maxAge: 40,
      hasLand: true,
    },
    documents: ["Aadhaar Card", "Land Records", "Bank Account", "Age Proof"],
    applyLink: "https://maandhan.in/",
    deadline: "Enroll before age 40 at any CSC center",
    tags: ["Central", "Farmer", "Pension After 60"],
  },
  {
    id: "agri_infra_fund",
    name: "Agriculture Infrastructure Fund",
    category: "farmer",
    benefit: "Loan up to Rs. 2 crore with 3% interest subvention for farm infrastructure",
    eligibility: {
      occupation: ["farmer","kisan","agriculture"],
    },
    documents: ["Aadhaar Card", "PAN Card", "Business Plan", "Land Records", "Bank Statement (6 months)"],
    applyLink: "https://agriinfra.dac.gov.in/",
    deadline: "Rolling",
    tags: ["Central", "Farmer", "Infrastructure Loan"],
  },
  {
    id: "pm_matsya",
    name: "PM Matsya Sampada Yojana",
    category: "farmer",
    benefit: "Subsidy up to 60% on fisheries boats, equipment, and fish farming infrastructure",
    eligibility: {
      occupation: ["fisherman","machhli","fishing","matsya"],
    },
    documents: ["Aadhaar Card", "Fishing License", "Bank Account", "Caste Certificate (if SC/ST)"],
    applyLink: "https://pmmsy.dof.gov.in/",
    deadline: "Check state fisheries department",
    tags: ["Central", "Fisherman", "Subsidy"],
  },
  {
    id: "animal_husbandry_fund",
    name: "Animal Husbandry Infrastructure Development Fund",
    category: "farmer",
    benefit: "Loan up to Rs. 2 crore at 3% interest for dairy and poultry business",
    eligibility: {
      occupation: ["farmer","kisan","dairy","pashu","animal_husbandry"],
    },
    documents: ["Aadhaar Card", "Business Plan", "Land Records", "Bank Statement"],
    applyLink: "https://ahidf.udyamimitra.in/",
    deadline: "Rolling",
    tags: ["Central", "Dairy", "Poultry", "Loan"],
  },
  {
    id: "paramparagat_krishi",
    name: "Paramparagat Krishi Vikas Yojana",
    category: "farmer",
    benefit: "Rs. 50,000/hectare for 3 years to convert to organic farming",
    eligibility: {
      occupation: ["farmer","kisan","agriculture"],
      hasLand: true,
    },
    documents: ["Aadhaar Card", "Land Records", "Group Formation Certificate", "Bank Account"],
    applyLink: "https://pgsindia-ncof.gov.in/",
    deadline: "Check state agriculture dept",
    tags: ["Central", "Farmer", "Organic Farming"],
  },
  {
    id: "rkvy",
    name: "Rashtriya Krishi Vikas Yojana (RKVY)",
    category: "farmer",
    benefit: "Grants for agri development projects and agri-startups",
    eligibility: {
      occupation: ["farmer","kisan","agriculture","agri_startup"],
    },
    documents: ["Aadhaar Card", "Project Proposal", "Land Records", "Bank Account"],
    applyLink: "https://rkvy.nic.in/",
    deadline: "Check state agriculture department",
    tags: ["Central", "Farmer", "Agri Grant"],
  },
  {
    id: "beekeeping",
    name: "National Beekeeping & Honey Mission",
    category: "farmer",
    benefit: "Free beekeeping training + equipment subsidy up to 80%",
    eligibility: {
      occupation: ["farmer","kisan","beekeeping"],
    },
    documents: ["Aadhaar Card", "Bank Account", "Land Records"],
    applyLink: "https://nbb.gov.in/",
    deadline: "Check state horticulture dept",
    tags: ["Central", "Farmer", "Beekeeping", "Subsidy"],
  },

  // ═══════════════════════════════════════════
  //  STUDENT / EDUCATION  (18 schemes)
  // ═══════════════════════════════════════════

  {
    id: "central_sector_scholarship",
    name: "Central Sector Scholarship (Merit-based)",
    category: "student",
    benefit: "Rs. 10,000–20,000/year for top 0.1% in Class 12 — for college students",
    eligibility: {
      occupation: ["student","padhai","college"],
      educationLevel: "higher",
      maxIncome: 800000,
    },
    documents: ["Aadhaar Card", "Class 12 Marksheet (above 80%)", "Income Certificate", "College Admission Letter", "Bank Account"],
    applyLink: "https://scholarships.gov.in/",
    deadline: "October 31 every year",
    tags: ["Central", "Merit Scholarship", "Open Category", "College"],
  },
  {
    id: "education_loan_subsidy",
    name: "Central Scheme — Education Loan Interest Subsidy",
    category: "student",
    benefit: "Full interest subsidy on education loan during study period + 1 year (no EMI during studies)",
    eligibility: {
      occupation: ["student","padhai","college","engineering","btech"],
      educationLevel: "higher",
      maxIncome: 450000,
    },
    documents: ["Aadhaar Card", "Bank Loan Sanction Letter", "Income Certificate", "College Admission Letter"],
    applyLink: "https://www.vidyalakshmi.co.in/",
    deadline: "Apply within 6 months of course completion",
    tags: ["Central", "Education Loan", "Interest Subsidy"],
  },
  {
    id: "nsp_prematric",
    name: "NSP Pre-Matric Scholarship (SC/ST/OBC/Minority)",
    category: "student",
    benefit: "Rs. 1,000–4,500/year for students in Classes 1–10",
    eligibility: {
      occupation: ["student","padhai"],
      maxAge: 16,
      maxIncome: 100000,
      categories: ["sc","st","obc","minority","disabled"],
      educationLevel: "school",
    },
    documents: ["Aadhaar Card", "Income Certificate", "Caste Certificate", "Mark Sheet", "Bank Account"],
    applyLink: "https://scholarships.gov.in/",
    deadline: "October 31",
    tags: ["Central", "School Scholarship", "SC/ST/OBC"],
  },
  {
    id: "nsp_postmatric",
    name: "NSP Post-Matric Scholarship (SC/ST/OBC/Minority)",
    category: "student",
    benefit: "Rs. 5,000–20,000/year for Class 11+ and college — full fee reimbursement for SC/ST",
    eligibility: {
      occupation: ["student","padhai"],
      maxIncome: 250000,
      categories: ["sc","st","obc","minority","disabled"],
    },
    documents: ["Aadhaar Card", "Income Certificate", "Caste Certificate", "Mark Sheet", "Bank Account"],
    applyLink: "https://scholarships.gov.in/",
    deadline: "November 30",
    tags: ["Central", "Post-Matric", "SC/ST/OBC"],
  },
  {
    id: "pm_yasasvi",
    name: "PM YASASVI Scholarship",
    category: "student",
    benefit: "Rs. 75,000–1,25,000/year for OBC/EBC/DNT students in Class 9 to degree",
    eligibility: {
      occupation: ["student","padhai"],
      maxIncome: 250000,
      categories: ["obc","ebc","dnt"],
    },
    documents: ["Aadhaar Card", "Income Certificate", "Caste Certificate", "School/College ID"],
    applyLink: "https://yet.nta.ac.in/",
    deadline: "Check NTA website",
    tags: ["Central", "OBC/EBC/DNT", "Scholarship"],
  },
  {
    id: "nmms",
    name: "National Means-cum-Merit Scholarship (NMMS)",
    category: "student",
    benefit: "Rs. 12,000/year from Class 9 to Class 12 for meritorious students",
    eligibility: {
      occupation: ["student","padhai"],
      maxAge: 18,
      maxIncome: 150000,
      educationLevel: "school",
    },
    documents: ["Aadhaar Card", "Income Certificate", "Class 8 Marksheet", "Bank Account"],
    applyLink: "https://scholarships.gov.in/",
    deadline: "September 30",
    tags: ["Central", "School Merit", "Class 9-12"],
  },
  {
    id: "inspire_science",
    name: "INSPIRE Scholarship for Higher Education",
    category: "student",
    benefit: "Rs. 80,000/year for BSc/Integrated MSc in pure science — for top 1% in Class 12",
    eligibility: {
      occupation: ["bsc","msc","science_student"],
      educationLevel: "higher",
    },
    documents: ["Aadhaar Card", "Class 12 Marksheet (top 1%)", "College Admission Letter (BSc/MSc)", "Bank Account"],
    applyLink: "https://online-inspire.gov.in/",
    deadline: "November 30",
    tags: ["Central", "Science Student", "BSc/MSc Only"],
  },
  {
    id: "pm_scholarship_defense",
    name: "PM Scholarship Scheme (Defence/Police Wards)",
    category: "student",
    benefit: "Rs. 2,500–3,000/month for wards of Ex-Servicemen or police martyrs",
    eligibility: {
      occupation: ["student","padhai"],
      categories: ["police_ward","defense_ward"],
    },
    documents: ["Aadhaar Card", "Parent Service Certificate", "Admission Letter", "Bank Account"],
    applyLink: "https://scholarships.gov.in/",
    deadline: "October 31",
    tags: ["Central", "Defence/Police Ward", "Scholarship"],
  },
  {
    id: "swanath",
    name: "Swanath Scholarship (Orphans — Technical Education)",
    category: "student",
    benefit: "Rs. 50,000/year for orphan students in AICTE-approved institutions",
    eligibility: {
      occupation: ["student","padhai","engineering","diploma"],
      categories: ["orphan"],
    },
    documents: ["Aadhaar Card", "Death Certificate of Parent(s)", "Admission Letter", "Bank Account"],
    applyLink: "https://scholarships.gov.in/",
    deadline: "October 31",
    tags: ["Central", "Orphan Students", "Technical Education"],
  },
  {
    id: "maulana_azad_fellowship",
    name: "Maulana Azad National Fellowship (Minority PhD)",
    category: "student",
    benefit: "Rs. 31,000–35,000/month for minority community PhD students",
    eligibility: {
      occupation: ["student","phd","research"],
      categories: ["minority"],
    },
    documents: ["Aadhaar Card", "Minority Certificate", "PhD Admission Letter", "NET/JRF Scorecard", "Bank Account"],
    applyLink: "https://maef.nic.in/",
    deadline: "Check UGC website",
    tags: ["Central", "Minority PhD", "Fellowship"],
  },
  {
    id: "pm_research_fellowship",
    name: "PM Research Fellowship (PMRF)",
    category: "student",
    benefit: "Rs. 70,000–80,000/month for PhD at IITs/IISc — for top B.Tech/M.Tech students",
    eligibility: {
      occupation: ["student","phd","engineering","btech","mtech","research"],
      educationLevel: "higher",
    },
    documents: ["Aadhaar Card", "B.Tech/M.Tech Marksheets", "GATE Score", "IIT/IISc Admission Letter"],
    applyLink: "https://www.pmrf.in/",
    deadline: "Check PMRF portal — twice a year",
    tags: ["Central", "PhD Fellowship", "IIT/IISc", "Top Engineers"],
  },
  {
    id: "gate_fellowship",
    name: "GATE Scholarship (M.Tech Students)",
    category: "student",
    benefit: "Rs. 12,400/month stipend for M.Tech students with valid GATE score at govt institutions",
    eligibility: {
      occupation: ["student","mtech","engineering","college"],
      educationLevel: "higher",
    },
    documents: ["Aadhaar Card", "GATE Scorecard", "M.Tech Admission Letter (AICTE institution)", "Bank Account"],
    applyLink: "https://www.aicte-india.org/",
    deadline: "Apply through institution at admission time",
    tags: ["Central", "M.Tech", "GATE", "Monthly Stipend"],
  },
  {
    id: "national_apprenticeship",
    name: "National Apprenticeship Promotion Scheme (NAPS)",
    category: "student",
    benefit: "Government pays 25% of your apprenticeship stipend (up to Rs. 1,500/month) directly",
    eligibility: {
      minAge: 14,
    },
    documents: ["Aadhaar Card", "Educational Certificates", "Bank Account", "Apprenticeship Contract"],
    applyLink: "https://apprenticeshipindia.org/",
    deadline: "Rolling — register on portal",
    tags: ["Central", "Apprenticeship", "All Ages", "Industry Training"],
  },
  {
    id: "ishan_uday",
    name: "Ishan Uday — Northeast Students Scholarship",
    category: "student",
    benefit: "Rs. 5,400–7,800/month for students from Northeast states in central universities",
    eligibility: {
      occupation: ["student","padhai"],
      location: ["northeast","assam","meghalaya","manipur","nagaland","tripura","mizoram","arunachal","sikkim"],
    },
    documents: ["Aadhaar Card", "NE State Domicile Certificate", "Admission Letter", "Bank Account"],
    applyLink: "https://scholarships.gov.in/",
    deadline: "October 31",
    tags: ["Central", "Northeast Students", "Scholarship"],
  },
  {
    id: "pmgdisha",
    name: "PM Gramin Digital Saksharta Abhiyan (PMGDISHA)",
    category: "student",
    benefit: "Free digital literacy training at nearest CSC — learn to use internet, UPI, govt services",
    eligibility: {
      location: ["village","gaon","rural"],
    },
    documents: ["Aadhaar Card", "Mobile Number"],
    applyLink: "https://www.pmgdisha.in/",
    deadline: "Rolling — visit CSC center",
    tags: ["Central", "Free Training", "Rural", "Digital Literacy"],
  },
  {
    id: "begum_hazrat_mahal",
    name: "Begum Hazrat Mahal Scholarship (Muslim Girls)",
    category: "student",
    benefit: "Rs. 5,000–6,000/year for Muslim girl students in Class 9–12",
    eligibility: {
      occupation: ["student","padhai"],
      gender: ["female","girl","ladki"],
      categories: ["minority","muslim"],
      educationLevel: "school",
    },
    documents: ["Aadhaar Card", "Minority Certificate", "Income Certificate", "Mark Sheet", "Bank Account"],
    applyLink: "https://www.maef.nic.in/",
    deadline: "September 30",
    tags: ["Central", "Muslim Girl", "Class 9-12"],
  },
  {
    id: "pm_poshan",
    name: "PM POSHAN (Mid-Day Meal Scheme)",
    category: "student",
    benefit: "Free hot cooked meal every school day in government schools",
    eligibility: {
      occupation: ["student"],
      maxAge: 15,
      educationLevel: "school",
    },
    documents: ["School enrollment — no separate application needed"],
    applyLink: "https://pmposhan.education.gov.in/",
    deadline: "Automatic through govt school enrollment",
    tags: ["Central", "Free Meal", "School", "Auto-Benefit"],
  },
  {
    id: "pm_yuva",
    name: "PM YUVA 2.0 (Young Authors Scheme)",
    category: "student",
    benefit: "Rs. 50,000/month for 6 months for young writers under 30 — mentorship + publishing",
    eligibility: {
      occupation: ["writer","author","creative"],
      minAge: 15,
      maxAge: 30,
    },
    documents: ["Aadhaar Card", "Writing Sample (2,000 words min)", "Age Proof", "Bank Account"],
    applyLink: "https://www.mygov.in/",
    deadline: "Check MyGov portal — announced periodically",
    tags: ["Central", "Young Writers", "Under 30", "Creative"],
  },

  // ═══════════════════════════════════════════
  //  WOMEN & GIRL CHILD  (12 schemes)
  // ═══════════════════════════════════════════

  {
    id: "pm_ujjwala",
    name: "PM Ujjwala Yojana 2.0",
    category: "women",
    benefit: "Free LPG connection + first refill free — save Rs. 3,000+ on cooking fuel costs",
    eligibility: {
      gender: ["female","woman","mahila"],
      categories: ["bpl","sc","st","obc","poor"],
    },
    documents: ["Aadhaar Card", "Ration Card", "Self-Declaration (if no ration card)", "Bank Account"],
    applyLink: "https://www.pmuy.gov.in/",
    deadline: "Rolling — apply at nearest LPG distributor",
    tags: ["Central", "Women", "Free LPG", "BPL"],
  },
  {
    id: "sukanya_samriddhi",
    name: "Sukanya Samriddhi Yojana",
    category: "women",
    benefit: "8.2% interest savings account for girl child — best safe investment for daughter's future",
    eligibility: {
      gender: ["female","girl","beti","ladki"],
    },
    documents: ["Girl Child Birth Certificate", "Parent Aadhaar", "Address Proof"],
    applyLink: "https://www.indiapost.gov.in/",
    deadline: "Open account before girl turns 10 — at any post office",
    tags: ["Central", "Girl Child", "8.2% Interest", "Savings"],
  },
  {
    id: "pmmvy",
    name: "PM Matru Vandana Yojana (PMMVY)",
    category: "women",
    benefit: "Rs. 5,000 cash benefit for first live birth — to compensate for wage loss during pregnancy",
    eligibility: {
      gender: ["female","woman","mahila","pregnant"],
    },
    documents: ["Aadhaar Card", "MCP Card", "Bank Account", "Pregnancy Registration Certificate"],
    applyLink: "https://wcd.nic.in/",
    deadline: "Apply within 270 days of pregnancy registration",
    tags: ["Central", "Pregnant Women", "Cash Benefit"],
  },
  {
    id: "standup_india_women",
    name: "Stand-Up India (Women Entrepreneurs)",
    category: "women",
    benefit: "Bank loan Rs. 10 lakh to Rs. 1 crore for women to start new business — no collateral below Rs. 10L",
    eligibility: {
      gender: ["female","woman","mahila"],
      occupation: ["business","entrepreneur"],
    },
    documents: ["Aadhaar Card", "PAN Card", "Business Plan", "Bank Statement (6 months)"],
    applyLink: "https://www.standupmitra.in/",
    deadline: "Rolling — apply at any bank",
    tags: ["Central", "Women Entrepreneur", "Business Loan"],
  },
  {
    id: "one_stop_centre",
    name: "One Stop Centre / Sakhi (Women in Distress)",
    category: "women",
    benefit: "Emergency shelter, legal aid, medical help, police support for women facing violence",
    eligibility: {
      gender: ["female","woman","mahila"],
    },
    documents: ["No documents required for emergency help"],
    applyLink: "https://wcd.nic.in/",
    deadline: "Emergency — call Women Helpline 181",
    tags: ["Central", "Women Safety", "Emergency", "Free Aid"],
  },
  {
    id: "nari_shakti",
    name: "Nari Shakti Puraskar",
    category: "women",
    benefit: "National award + Rs. 2 lakh cash for exceptional women achievers",
    eligibility: {
      gender: ["female","woman","mahila"],
      minAge: 25,
    },
    documents: ["Nomination Form", "ID Proof", "Achievement Documents"],
    applyLink: "https://wcd.nic.in/",
    deadline: "Nominations open September–November",
    tags: ["Central", "Women Award", "Recognition"],
  },
  {
    id: "beti_bachao",
    name: "Beti Bachao Beti Padhao",
    category: "women",
    benefit: "Financial incentives and community support for girl child education and welfare",
    eligibility: {
      gender: ["female","girl","beti"],
    },
    documents: ["Aadhaar Card", "Birth Certificate", "Bank Account"],
    applyLink: "https://wcd.nic.in/bbbp-schemes",
    deadline: "Through Anganwadi / local ICDS center",
    tags: ["Central", "Girl Child", "Education Support"],
  },
  {
    id: "lakhpati_didi",
    name: "Lakhpati Didi Scheme",
    category: "women",
    benefit: "Free skill training for SHG women to earn Rs. 1 lakh+ annually — drone flying, plumbing, LED making etc.",
    eligibility: {
      gender: ["female","woman","mahila"],
      occupation: ["shg","self_help_group","mahila_mandal"],
    },
    documents: ["Aadhaar Card", "SHG Membership Certificate", "Bank Account"],
    applyLink: "https://nrlm.gov.in/",
    deadline: "Through NRLM / State Rural Livelihood Mission",
    tags: ["Central", "SHG Women", "Skill Training", "Rs 1L Income"],
  },
  {
    id: "nrlm_shg",
    name: "DAY-NRLM (Women Self Help Groups)",
    category: "women",
    benefit: "Rs. 15,000 revolving fund + interest subvention on loans for rural women SHGs",
    eligibility: {
      gender: ["female","woman","mahila"],
      location: ["village","gaon","rural"],
    },
    documents: ["Aadhaar Card", "SHG Registration Documents", "Bank Account"],
    applyLink: "https://aajeevika.gov.in/",
    deadline: "Form SHG of 10–20 women at village level",
    tags: ["Central", "Women SHG", "Rural", "Revolving Fund"],
  },
  {
    id: "pmegp_women",
    name: "PMEGP (Women Entrepreneurs — Extra Subsidy)",
    category: "women",
    benefit: "35% subsidy on project cost (vs 25% for general) for women starting businesses up to Rs. 50 lakh",
    eligibility: {
      gender: ["female","woman","mahila"],
      occupation: ["business","entrepreneur"],
      minAge: 18,
    },
    documents: ["Aadhaar Card", "PAN Card", "8th Class Certificate", "Business Plan", "Bank Account"],
    applyLink: "https://www.kviconline.gov.in/",
    deadline: "Rolling — apply at KVIC/KVIB/DIC",
    tags: ["Central", "Women Business", "PMEGP", "35% Subsidy"],
  },
  {
    id: "swadhar_greh",
    name: "Swadhar Greh Scheme",
    category: "women",
    benefit: "Free shelter, food, clothing, rehabilitation, legal aid for destitute or abandoned women",
    eligibility: {
      gender: ["female","woman","mahila"],
    },
    documents: ["ID Proof (if available) — not mandatory in emergencies"],
    applyLink: "https://wcd.nic.in/",
    deadline: "Contact district WCD office",
    tags: ["Central", "Destitute Women", "Free Shelter", "Rehabilitation"],
  },

  // ═══════════════════════════════════════════
  //  HEALTH  (9 schemes)
  // ═══════════════════════════════════════════

  {
    id: "ayushman_bharat",
    name: "Ayushman Bharat PM-JAY",
    category: "health",
    benefit: "Rs. 5 lakh/year free hospitalisation coverage for entire family",
    eligibility: {
      categories: ["bpl","poor","sc","st"],
      maxIncome: 100000,
    },
    documents: ["Aadhaar Card", "Ration Card", "PMJAY e-card (get from CSC center)"],
    applyLink: "https://pmjay.gov.in/",
    deadline: "Rolling — check eligibility at PMJAY portal",
    tags: ["Central", "Health Insurance", "BPL", "Rs 5L Cover"],
  },
  {
    id: "jan_aushadhi",
    name: "PM Jan Aushadhi Pariyojana",
    category: "health",
    benefit: "Generic medicines at 50–90% cheaper than branded — at 10,000+ Jan Aushadhi stores",
    eligibility: {},  // open to everyone
    documents: ["No documents — just visit the store"],
    applyLink: "https://janaushadhi.gov.in/",
    deadline: "No application needed — walk in",
    tags: ["Central", "Cheap Medicine", "Everyone", "Free Access"],
  },
  {
    id: "nhm",
    name: "National Health Mission (NHM)",
    category: "health",
    benefit: "Free OPD, IPD, surgeries, diagnostics, medicines at government hospitals",
    eligibility: {},
    documents: ["Aadhaar Card (preferred)"],
    applyLink: "https://nhm.gov.in/",
    deadline: "No application — walk into any govt hospital",
    tags: ["Central", "Free Treatment", "Govt Hospital", "Everyone"],
  },
  {
    id: "tb_nikshay",
    name: "Nikshay Poshan Yojana (TB Patients)",
    category: "health",
    benefit: "Rs. 500/month nutritional support until TB treatment is complete",
    eligibility: {
      health: ["tb","tuberculosis","kshay","kshay_rog"],
    },
    documents: ["Aadhaar Card", "TB Diagnosis Certificate from DOTS center", "Bank Account"],
    applyLink: "https://nikshay.in/",
    deadline: "Register at nearest govt hospital DOTS center",
    tags: ["Central", "TB Patients", "Nutritional Support"],
  },
  {
    id: "rashtriya_arogya_nidhi",
    name: "Rashtriya Arogya Nidhi",
    category: "health",
    benefit: "One-time financial aid up to Rs. 15 lakh for critical illness treatment",
    eligibility: {
      categories: ["bpl","poor"],
      maxIncome: 100000,
    },
    documents: ["Aadhaar Card", "BPL Card", "Medical Certificate", "Hospital Cost Estimate", "Bank Account"],
    applyLink: "https://mohfw.gov.in/",
    deadline: "Apply through Govt hospital's Medical Superintendent",
    tags: ["Central", "Critical Illness", "BPL", "Up to Rs 15L"],
  },
  {
    id: "poshan_abhiyaan",
    name: "POSHAN Abhiyaan",
    category: "health",
    benefit: "Free nutrition supplements for children under 6, pregnant and lactating mothers",
    eligibility: {
      gender: ["female","pregnant","mother"],
    },
    documents: ["Aadhaar Card", "MCP Card"],
    applyLink: "https://poshanabhiyaan.gov.in/",
    deadline: "Through nearest Anganwadi Center",
    tags: ["Central", "Mother & Child", "Nutrition", "Free"],
  },
  {
    id: "ayushman_hwc",
    name: "Ayushman Arogya Mandir (Health & Wellness Centers)",
    category: "health",
    benefit: "Comprehensive free primary healthcare — 12 services including yoga sessions",
    eligibility: {},
    documents: ["Aadhaar Card (preferred)"],
    applyLink: "https://ab-hwc.nhp.gov.in/",
    deadline: "Walk in at nearest HWC — no appointment needed",
    tags: ["Central", "Free Healthcare", "Everyone", "Walk-in"],
  },
  {
    id: "pm_surakshit_matritva",
    name: "PM Surakshit Matritva Abhiyan",
    category: "health",
    benefit: "Free prenatal check-up on 9th of every month at government hospitals",
    eligibility: {
      gender: ["female","pregnant","garbhavati"],
    },
    documents: ["MCP Card / Aadhaar Card"],
    applyLink: "https://pmsma.nhp.gov.in/",
    deadline: "Visit govt hospital on the 9th of any month",
    tags: ["Central", "Pregnant Women", "Free Check-up", "Monthly"],
  },
  {
    id: "mission_indradhanush",
    name: "Mission Indradhanush (Vaccination)",
    category: "health",
    benefit: "Free vaccination for children under 5 against 12 diseases",
    eligibility: {
      maxAge: 5,
    },
    documents: ["Child's birth certificate / Aadhaar Card"],
    applyLink: "https://nhm.gov.in/",
    deadline: "Through local Anganwadi or Primary Health Centre",
    tags: ["Central", "Children Under 5", "Free Vaccination"],
  },

  // ═══════════════════════════════════════════
  //  HOUSING  (5 schemes)
  // ═══════════════════════════════════════════

  {
    id: "pm_awas_gramin",
    name: "PM Awas Yojana — Gramin (Rural)",
    category: "housing",
    benefit: "Rs. 1.2–1.3 lakh cash grant to build a pucca house",
    eligibility: {
      categories: ["bpl","sc","st","poor"],
      location: ["village","gaon","rural"],
    },
    documents: ["Aadhaar Card", "SECC/BPL Certificate", "Bank Account", "Land Ownership"],
    applyLink: "https://pmayg.nic.in/",
    deadline: "Apply at your Gram Panchayat office",
    tags: ["Central", "Rural Housing", "BPL", "Cash Grant"],
  },
  {
    id: "pm_awas_urban",
    name: "PM Awas Yojana — Urban (CLSS)",
    category: "housing",
    benefit: "Interest subsidy Rs. 1–2.67 lakh on home loan for EWS/LIG/MIG families",
    eligibility: {
      location: ["city","shahar","urban","town"],
      maxIncome: 1800000,
    },
    documents: ["Aadhaar Card", "Income Certificate", "Home Loan Sanction Letter", "Bank Account"],
    applyLink: "https://pmaymis.gov.in/",
    deadline: "Check latest PMAY Urban portal",
    tags: ["Central", "Urban Housing", "Loan Subsidy"],
  },
  {
    id: "swachh_bharat_toilet",
    name: "Swachh Bharat Mission — Toilet Grant",
    category: "housing",
    benefit: "Rs. 12,000 incentive to build individual household toilet — paid after completion",
    eligibility: {
      categories: ["bpl","poor"],
      location: ["village","gaon","rural"],
    },
    documents: ["Aadhaar Card", "BPL/SECC Certificate", "Bank Account"],
    applyLink: "https://sbm.gov.in/",
    deadline: "Apply at Gram Panchayat",
    tags: ["Central", "Toilet Construction", "BPL Rural", "Rs 12K Grant"],
  },
  {
    id: "pmay_ews",
    name: "PMAY — EWS/LIG Credit Linked Subsidy",
    category: "housing",
    benefit: "Interest subsidy up to Rs. 2.67 lakh on home loan for EWS (income < 3L) and LIG (income < 6L)",
    eligibility: {
      maxIncome: 600000,
    },
    documents: ["Aadhaar Card", "Income Certificate", "Home Loan Sanction Letter", "Bank Account"],
    applyLink: "https://pmaymis.gov.in/",
    deadline: "Rolling — apply through bank",
    tags: ["Central", "Housing Loan Subsidy", "EWS/LIG"],
  },

  // ═══════════════════════════════════════════
  //  EMPLOYMENT / BUSINESS  (12 schemes)
  // ═══════════════════════════════════════════

  {
    id: "pm_mudra",
    name: "PM Mudra Yojana",
    category: "employment",
    benefit: "Business loan without collateral: Shishu (up to 50K) / Kishore (up to 5L) / Tarun (up to 10L)",
    eligibility: {
      occupation: ["business","vyapar","self-employed","dukaan","shop","entrepreneur","msme"],
    },
    documents: ["Aadhaar Card", "PAN Card", "Business Proof", "Bank Statement (6 months)"],
    applyLink: "https://www.mudra.org.in/",
    deadline: "Rolling — apply at any bank/NBFC",
    tags: ["Central", "Business Loan", "No Collateral", "MUDRA"],
  },
  {
    id: "skill_india",
    name: "PM Kaushal Vikas Yojana 4.0 (PMKVY)",
    category: "employment",
    benefit: "Free skill training in 300+ job roles + Rs. 8,000 stipend + certificate + job placement support",
    eligibility: {
      minAge: 15,
      maxAge: 45,
    },
    documents: ["Aadhaar Card", "Educational Certificates (if any)", "Bank Account"],
    applyLink: "https://www.skillindia.gov.in/",
    deadline: "Rolling — new batches start regularly",
    tags: ["Central", "Free Skill Training", "All Ages 15-45", "Job Placement"],
  },
  {
    id: "startup_india",
    name: "Startup India Initiative",
    category: "employment",
    benefit: "3-year tax holiday + govt funding access + fast-track registration for DPIIT-recognized startups",
    eligibility: {
      occupation: ["startup","entrepreneur","technology"],
    },
    documents: ["Incorporation Certificate", "Business Description (one-pager)", "DPIIT Registration"],
    applyLink: "https://www.startupindia.gov.in/",
    deadline: "Rolling — register on portal anytime",
    tags: ["Central", "Startup", "Tax Holiday", "DPIIT"],
  },
  {
    id: "pmegp",
    name: "PM Employment Generation Programme (PMEGP)",
    category: "employment",
    benefit: "25–35% subsidy on project cost up to Rs. 50 lakh (manufacturing) or Rs. 20 lakh (service)",
    eligibility: {
      occupation: ["business","entrepreneur"],
      minAge: 18,
    },
    documents: ["Aadhaar Card", "PAN Card", "8th Class Pass Certificate", "Business Plan", "Bank Account"],
    applyLink: "https://www.kviconline.gov.in/",
    deadline: "Rolling — apply at KVIC/KVIB/DIC office",
    tags: ["Central", "Business Subsidy", "PMEGP", "25-35%"],
  },
  {
    id: "pm_vishwakarma",
    name: "PM Vishwakarma Yojana",
    category: "employment",
    benefit: "Rs. 15,000 free toolkit + collateral-free loan at 5% + free skill training for 18 traditional trades",
    eligibility: {
      occupation: ["artisan","craft","vishwakarma","carpenter","darzi","cobbler","kumhar","lohar","sunar","nai","barber","dhobi"],
    },
    documents: ["Aadhaar Card", "Caste Certificate", "Bank Account", "Proof of Trade"],
    applyLink: "https://pmvishwakarma.gov.in/",
    deadline: "Rolling",
    tags: ["Central", "Artisan", "Traditional Trades", "Free Toolkit + Loan"],
  },
  {
    id: "mgnregs",
    name: "Mahatma Gandhi NREGA",
    category: "employment",
    benefit: "100 days guaranteed wage work per year — Rs. 220–357/day depending on state",
    eligibility: {
      location: ["village","gaon","rural"],
      minAge: 18,
    },
    documents: ["Aadhaar Card", "Ration Card", "Bank Account", "Job Card (from Gram Panchayat)"],
    applyLink: "https://nrega.nic.in/",
    deadline: "Apply at Gram Panchayat for Job Card",
    tags: ["Central", "Rural Employment", "NREGA", "Guaranteed Work"],
  },
  {
    id: "pm_svanidhi",
    name: "PM SVANidhi (Street Vendor Loan)",
    category: "employment",
    benefit: "Working capital loan: Rs. 10,000 → Rs. 20,000 → Rs. 50,000 — increases with timely repayment",
    eligibility: {
      occupation: ["vendor","rehri","thela","patri","street_vendor","hawker"],
    },
    documents: ["Aadhaar Card", "Vending Certificate or Letter of Recommendation from ULB", "Bank Account"],
    applyLink: "https://pmsvanidhi.mohua.gov.in/",
    deadline: "Rolling — apply at bank/CSC",
    tags: ["Central", "Street Vendor", "Working Capital Loan"],
  },
  {
    id: "ddu_gky",
    name: "DDU-GKY (Rural Youth Skill Training)",
    category: "employment",
    benefit: "Free residential skill training + Rs. 500–1,500/month stipend + job placement guarantee",
    eligibility: {
      minAge: 15,
      maxAge: 35,
      categories: ["bpl","poor","rural"],
      location: ["village","gaon","rural"],
    },
    documents: ["Aadhaar Card", "BPL/SECC Certificate", "Age Proof", "Bank Account"],
    applyLink: "https://ddugky.gov.in/",
    deadline: "Rolling — contact Program Implementing Agency in your district",
    tags: ["Central", "Rural Youth 15-35", "Free Training", "Job Guarantee"],
  },
  {
    id: "udyam",
    name: "Udyam Registration (MSME)",
    category: "employment",
    benefit: "Free MSME registration — unlocks: priority bank loans, govt subsidies, tender priority",
    eligibility: {
      occupation: ["business","msme","small_business","manufacturing","service"],
    },
    documents: ["Aadhaar Card", "PAN Card", "GSTIN (if applicable)"],
    applyLink: "https://udyamregistration.gov.in/",
    deadline: "Rolling — free, takes 10 minutes online",
    tags: ["Central", "MSME", "Free Registration", "Unlock Benefits"],
  },
  {
    id: "standup_india",
    name: "Stand-Up India (SC/ST Entrepreneurs)",
    category: "employment",
    benefit: "Bank loan Rs. 10 lakh to Rs. 1 crore for SC/ST starting new business",
    eligibility: {
      categories: ["sc","st"],
      occupation: ["business","entrepreneur"],
    },
    documents: ["Aadhaar Card", "PAN Card", "Caste Certificate", "Business Plan", "Bank Statement"],
    applyLink: "https://www.standupmitra.in/",
    deadline: "Rolling",
    tags: ["Central", "SC/ST Entrepreneur", "Business Loan"],
  },
  {
    id: "startup_seed_fund",
    name: "Startup India Seed Fund Scheme",
    category: "employment",
    benefit: "Seed funding: Rs. 20 lakh for proof of concept, Rs. 50 lakh for market entry",
    eligibility: {
      occupation: ["startup","entrepreneur"],
    },
    documents: ["DPIIT Recognition Certificate", "Business Plan", "Pitch Deck", "Bank Account"],
    applyLink: "https://seedfund.startupindia.gov.in/",
    deadline: "Rolling — through registered incubators",
    tags: ["Central", "Startup Seed Fund", "Incubator"],
  },

  // ═══════════════════════════════════════════
  //  SENIOR CITIZENS  (5 schemes)
  // ═══════════════════════════════════════════

  {
    id: "ignoaps",
    name: "Indira Gandhi National Old Age Pension Scheme",
    category: "senior",
    benefit: "Rs. 200–500/month pension for BPL senior citizens aged 60+",
    eligibility: {
      minAge: 60,
      categories: ["bpl","poor"],
    },
    documents: ["Aadhaar Card", "Age Proof", "BPL Certificate", "Bank Account"],
    applyLink: "https://nsap.nic.in/",
    deadline: "Apply at Block/Tehsil office",
    tags: ["Central", "Senior Citizen", "BPL Pension"],
  },
  {
    id: "pm_vaya_vandana",
    name: "PM Vaya Vandana Yojana",
    category: "senior",
    benefit: "Guaranteed 7.4% return pension for 10 years — for 60+ citizens (through LIC)",
    eligibility: {
      minAge: 60,
    },
    documents: ["Aadhaar Card", "Age Proof", "Bank Account", "LIC Policy"],
    applyLink: "https://licindia.in/",
    deadline: "Rolling — through LIC offices",
    tags: ["Central", "Senior", "Pension", "7.4% Return"],
  },
  {
    id: "atal_pension",
    name: "Atal Pension Yojana (APY)",
    category: "senior",
    benefit: "Guaranteed pension Rs. 1,000–5,000/month after age 60 — enroll now, reap later",
    eligibility: {
      minAge: 18,
      maxAge: 40,
      occupation: ["unorganised","informal","worker","mazdoor"],
    },
    documents: ["Aadhaar Card", "Bank Account (savings)", "Mobile Number"],
    applyLink: "https://npscra.nsdl.co.in/",
    deadline: "Enroll before turning 40",
    tags: ["Central", "Pension After 60", "Unorganised Workers", "APY"],
  },
  {
    id: "scss",
    name: "Senior Citizen Savings Scheme (SCSS)",
    category: "senior",
    benefit: "8.2% interest savings scheme — highest safe return available for seniors",
    eligibility: {
      minAge: 60,
    },
    documents: ["Aadhaar Card", "Age Proof", "PAN Card", "Bank Account"],
    applyLink: "https://www.indiapost.gov.in/",
    deadline: "Open at any post office or bank",
    tags: ["Central", "Senior Savings", "8.2% Interest", "Safe"],
  },
  {
    id: "widow_pension",
    name: "Indira Gandhi National Widow Pension Scheme",
    category: "senior",
    benefit: "Rs. 300/month pension for BPL widows aged 40–79",
    eligibility: {
      gender: ["female","woman"],
      categories: ["bpl","poor"],
      minAge: 40,
      maxAge: 79,
    },
    documents: ["Aadhaar Card", "Husband's Death Certificate", "BPL Certificate", "Bank Account"],
    applyLink: "https://nsap.nic.in/",
    deadline: "Apply at Block/Tehsil office",
    tags: ["Central", "Widow", "BPL", "Monthly Pension"],
  },

  // ═══════════════════════════════════════════
  //  DIFFERENTLY ABLED / DISABLED  (5 schemes)
  // ═══════════════════════════════════════════

  {
    id: "divyang_scholarship",
    name: "NSP Scholarship for Divyangjan Students",
    category: "disabled",
    benefit: "Rs. 1,000–5,000/month scholarship for disabled students at all levels",
    eligibility: {
      occupation: ["student","padhai"],
      categories: ["disabled","divyang"],
    },
    documents: ["Aadhaar Card", "Disability Certificate (40%+ disability)", "Income Certificate", "Mark Sheet", "Bank Account"],
    applyLink: "https://scholarships.gov.in/",
    deadline: "October 31",
    tags: ["Central", "Disabled Student", "Monthly Scholarship"],
  },
  {
    id: "adip",
    name: "ADIP Scheme — Free Assistive Devices",
    category: "disabled",
    benefit: "Free wheelchair, hearing aid, tricycle, white cane, Braille kit, prosthetic limbs",
    eligibility: {
      categories: ["disabled","divyang"],
      maxIncome: 200000,
    },
    documents: ["Aadhaar Card", "Disability Certificate", "Income Certificate"],
    applyLink: "https://alimco.in/",
    deadline: "Rolling — through ALIMCO camps or district hospital",
    tags: ["Central", "Disabled", "Free Devices", "Wheelchair"],
  },
  {
    id: "ignwdps",
    name: "Indira Gandhi National Disability Pension",
    category: "disabled",
    benefit: "Rs. 300/month for severely disabled (80%+) BPL persons",
    eligibility: {
      categories: ["disabled","divyang","bpl"],
      minAge: 18,
    },
    documents: ["Aadhaar Card", "Disability Certificate (80%+)", "BPL Certificate", "Bank Account"],
    applyLink: "https://nsap.nic.in/",
    deadline: "Block/Tehsil office",
    tags: ["Central", "Disabled", "BPL", "Pension"],
  },
  {
    id: "udid_card",
    name: "Unique Disability ID (UDID) Card",
    category: "disabled",
    benefit: "Single card for all disability benefits — no need to submit disability certificate again and again",
    eligibility: {
      categories: ["disabled","divyang"],
    },
    documents: ["Aadhaar Card", "Medical Certificate from Govt Doctor", "Passport Photo"],
    applyLink: "https://www.swavlambancard.gov.in/",
    deadline: "Rolling — apply free online",
    tags: ["Central", "Disabled", "Identity Card", "One-time Apply"],
  },

  // ═══════════════════════════════════════════
  //  FINANCIAL INCLUSION  (7 schemes)
  // ═══════════════════════════════════════════

  {
    id: "pm_jan_dhan",
    name: "PM Jan Dhan Yojana",
    category: "financial",
    benefit: "Zero-balance bank account + Rs. 2 lakh accident insurance + Rs. 30,000 life cover — free",
    eligibility: {},  // everyone
    documents: ["Aadhaar Card", "Passport Photo"],
    applyLink: "https://pmjdy.gov.in/",
    deadline: "Rolling — walk into any bank branch",
    tags: ["Central", "Free Bank Account", "Free Insurance", "Everyone"],
  },
  {
    id: "pm_jeevan_jyoti",
    name: "PM Jeevan Jyoti Bima Yojana (PMJJBY)",
    category: "financial",
    benefit: "Rs. 2 lakh life insurance at just Rs. 436/year — cheapest life cover in India",
    eligibility: {
      minAge: 18,
      maxAge: 50,
    },
    documents: ["Aadhaar Card", "Savings Bank Account"],
    applyLink: "https://jansuraksha.gov.in/",
    deadline: "Enroll by June 1 (auto-renews annually)",
    tags: ["Central", "Life Insurance", "Rs 436/year", "18-50 yrs"],
  },
  {
    id: "pm_suraksha_bima",
    name: "PM Suraksha Bima Yojana (PMSBY)",
    category: "financial",
    benefit: "Rs. 2 lakh accident insurance at just Rs. 20/year — must-have for everyone",
    eligibility: {
      minAge: 18,
      maxAge: 70,
    },
    documents: ["Aadhaar Card", "Savings Bank Account"],
    applyLink: "https://jansuraksha.gov.in/",
    deadline: "Enroll by June 1 (auto-renews annually)",
    tags: ["Central", "Accident Insurance", "Rs 20/year", "18-70 yrs"],
  },
  {
    id: "nps",
    name: "National Pension System (NPS)",
    category: "financial",
    benefit: "Market-linked pension + tax deduction under 80C + 80CCD — start early for maximum benefit",
    eligibility: {
      minAge: 18,
      maxAge: 70,
    },
    documents: ["Aadhaar Card", "PAN Card", "Bank Account"],
    applyLink: "https://npscra.nsdl.co.in/",
    deadline: "Rolling — open online or at bank",
    tags: ["Central", "Pension", "Tax Saving", "NPS"],
  },
  {
    id: "rupay_card",
    name: "RuPay Debit Card",
    category: "financial",
    benefit: "Free debit card with Rs. 1 lakh accident insurance — comes with Jan Dhan account",
    eligibility: {},
    documents: ["Jan Dhan Bank Account"],
    applyLink: "https://pmjdy.gov.in/",
    deadline: "Auto-issued with Jan Dhan account",
    tags: ["Central", "Free Debit Card", "Jan Dhan", "Insurance"],
  },

  // ═══════════════════════════════════════════
  //  ENERGY / ELECTRICITY  (4 schemes)
  // ═══════════════════════════════════════════

  {
    id: "pm_surya_ghar",
    name: "PM Surya Ghar Muft Bijli Yojana",
    category: "energy",
    benefit: "Rooftop solar panels installed — 300 units/month FREE electricity + subsidy Rs. 30,000–78,000",
    eligibility: {},  // any homeowner
    documents: ["Aadhaar Card", "Electricity Bill", "Bank Account", "Property / House Proof"],
    applyLink: "https://pmsuryaghar.gov.in/",
    deadline: "Rolling — apply online",
    tags: ["Central", "Free Solar", "Free Electricity", "Subsidy"],
  },
  {
    id: "saubhagya",
    name: "PM Saubhagya Scheme",
    category: "energy",
    benefit: "Free electricity connection for unelectrified BPL households",
    eligibility: {
      categories: ["bpl","poor"],
    },
    documents: ["Aadhaar Card", "BPL/SECC Certificate", "Address Proof"],
    applyLink: "https://saubhagya.gov.in/",
    deadline: "Through state electricity department",
    tags: ["Central", "Free Electricity Connection", "BPL"],
  },
  {
    id: "ujala_led",
    name: "UJALA Scheme — Subsidised LED Bulbs",
    category: "energy",
    benefit: "LED bulbs at Rs. 70 each (market price Rs. 300+) — save Rs. 1,200/year on electricity",
    eligibility: {},
    documents: ["Electricity Bill", "Aadhaar Card"],
    applyLink: "https://ujala.gov.in/",
    deadline: "Rolling — at electricity office or empanelled shops",
    tags: ["Central", "LED Bulbs", "Save Electricity", "Everyone"],
  },

  // ═══════════════════════════════════════════
  //  FOOD / RATION  (3 schemes)
  // ═══════════════════════════════════════════

  {
    id: "pmgkay",
    name: "PM Garib Kalyan Anna Yojana",
    category: "food",
    benefit: "5 kg free ration (wheat/rice) per person per month",
    eligibility: {
      categories: ["bpl","poor"],
    },
    documents: ["Aadhaar Card", "Ration Card"],
    applyLink: "Visit nearest PDS/ration shop",
    deadline: "Automatic via ration card",
    tags: ["Central", "Free Ration", "BPL", "5 kg/person"],
  },
  {
    id: "onorc",
    name: "One Nation One Ration Card",
    category: "food",
    benefit: "Claim your ration from ANY PDS shop anywhere in India — useful for migrant workers",
    eligibility: {
      categories: ["bpl","poor"],
    },
    documents: ["Aadhaar Card linked to ration card"],
    applyLink: "https://nfsa.gov.in/",
    deadline: "Automatic — just link Aadhaar to ration card",
    tags: ["Central", "Ration", "Portability", "Migrant Workers"],
  },
  {
    id: "nfsa",
    name: "NFSA — Subsidised Grains",
    category: "food",
    benefit: "Rice at Rs. 3/kg, Wheat at Rs. 2/kg, Coarse Grain at Rs. 1/kg for Priority Households",
    eligibility: {
      categories: ["bpl","poor","antyodaya"],
    },
    documents: ["Aadhaar Card", "Ration Card (Priority Household or Antyodaya)"],
    applyLink: "Apply at tehsil for ration card",
    deadline: "Rolling — apply at state food dept",
    tags: ["Central", "Subsidised Food", "NFSA", "BPL"],
  },

  // ═══════════════════════════════════════════
  //  SC / ST SPECIAL  (7 schemes)
  // ═══════════════════════════════════════════

  {
    id: "ambedkar_scholarship",
    name: "Dr. Ambedkar Post-Matric Scholarship (SC)",
    category: "sc_st",
    benefit: "Full tuition fee + maintenance allowance for SC students from Class 11 to PhD",
    eligibility: {
      categories: ["sc"],
      occupation: ["student","padhai"],
      maxIncome: 250000,
    },
    documents: ["Aadhaar Card", "SC Certificate", "Income Certificate", "Mark Sheet", "Bank Account"],
    applyLink: "https://scholarships.gov.in/",
    deadline: "October 31",
    tags: ["Central", "SC Student", "Full Scholarship"],
  },
  {
    id: "st_scholarship",
    name: "Post-Matric Scholarship for ST Students",
    category: "sc_st",
    benefit: "Full tuition fee + maintenance allowance for ST/tribal students from Class 11 to PhD",
    eligibility: {
      categories: ["st"],
      occupation: ["student","padhai"],
      maxIncome: 250000,
    },
    documents: ["Aadhaar Card", "ST Certificate", "Income Certificate", "Mark Sheet", "Bank Account"],
    applyLink: "https://scholarships.gov.in/",
    deadline: "October 31",
    tags: ["Central", "ST/Tribal Student", "Full Scholarship"],
  },
  {
    id: "pm_daksh",
    name: "PM-DAKSH (SC/OBC Skill Training)",
    category: "sc_st",
    benefit: "Free residential/non-residential skill training + Rs. 1,000–1,500/day stipend",
    eligibility: {
      categories: ["sc","obc"],
      minAge: 18,
      maxAge: 45,
    },
    documents: ["Aadhaar Card", "Caste Certificate", "Bank Account", "Age Proof"],
    applyLink: "https://pmdaksh.dosje.gov.in/",
    deadline: "Rolling",
    tags: ["Central", "SC/OBC", "Free Skill Training", "Stipend"],
  },
  {
    id: "venture_capital_sc",
    name: "Venture Capital Fund for SC/ST Entrepreneurs",
    category: "sc_st",
    benefit: "Concessional loan for SC/ST to start new business venture",
    eligibility: {
      categories: ["sc","st"],
      occupation: ["business","entrepreneur"],
    },
    documents: ["Aadhaar Card", "Caste Certificate", "Business Plan", "Bank Statement"],
    applyLink: "https://www.nsfdc.nic.in/",
    deadline: "Rolling — apply at NSFDC",
    tags: ["Central", "SC/ST", "Business Loan", "Startup"],
  },
  {
    id: "babu_jagivan_ram",
    name: "Babu Jagivan Ram Chhatrawas Yojana (SC Hostel)",
    category: "sc_st",
    benefit: "Free hostel facility for SC students in higher education (boys and girls separate hostels)",
    eligibility: {
      categories: ["sc"],
      occupation: ["student","college","university"],
    },
    documents: ["Aadhaar Card", "SC Certificate", "College Admission Letter", "Income Certificate"],
    applyLink: "https://socialjustice.nic.in/",
    deadline: "Apply before July each academic year",
    tags: ["Central", "SC Student", "Free Hostel", "College"],
  },
  {
    id: "eklavya_school",
    name: "Eklavya Model Residential Schools (ST Children)",
    category: "sc_st",
    benefit: "Free residential schooling (Class 6–12) with sports and cultural facilities for tribal children",
    eligibility: {
      categories: ["st"],
      occupation: ["student"],
      maxAge: 13,
      educationLevel: "school",
    },
    documents: ["Aadhaar Card", "ST Caste Certificate", "Birth Certificate", "Income Proof"],
    applyLink: "https://tribal.nic.in/",
    deadline: "Admission in April–May",
    tags: ["Central", "ST/Tribal", "Free Residential School"],
  },

  // ═══════════════════════════════════════════
  //  DIGITAL / TECH  (4 schemes)
  // ═══════════════════════════════════════════

  {
    id: "bhim_upi",
    name: "BHIM UPI",
    category: "digital",
    benefit: "Instant free bank transfers — zero charge on all UPI transactions",
    eligibility: {},
    documents: ["Bank account linked to mobile number"],
    applyLink: "https://www.bhimupi.org.in/",
    deadline: "Download the app — immediate",
    tags: ["Central", "Digital Payment", "Free", "Everyone"],
  },
  {
    id: "digilocker",
    name: "DigiLocker",
    category: "digital",
    benefit: "Store all your documents digitally — Aadhaar, marksheets, driving licence, RC book",
    eligibility: {},
    documents: ["Aadhaar-linked mobile number"],
    applyLink: "https://digilocker.gov.in/",
    deadline: "Free signup anytime",
    tags: ["Central", "Digital Documents", "Free", "Paperless"],
  },
  {
    id: "umang",
    name: "UMANG App",
    category: "digital",
    benefit: "Single app for 1,200+ govt services — PF balance, Aadhaar, passport, scheme applications",
    eligibility: {},
    documents: ["Aadhaar Card / Mobile Number"],
    applyLink: "https://web.umang.gov.in/",
    deadline: "Free download",
    tags: ["Central", "All Govt Services", "Free App", "Everyone"],
  },
  {
    id: "csc",
    name: "Common Service Centers (CSC)",
    category: "digital",
    benefit: "Access 300+ government services near you — certificates, pensions, scheme applications",
    eligibility: {},
    documents: ["Aadhaar Card"],
    applyLink: "https://www.csc.gov.in/",
    deadline: "Visit nearest CSC center",
    tags: ["Central", "Govt Services", "Rural Access", "All Services"],
  },

  // ═══════════════════════════════════════════
  //  WATER / SANITATION  (3 schemes)
  // ═══════════════════════════════════════════

  {
    id: "jal_jeevan",
    name: "Jal Jeevan Mission",
    category: "water",
    benefit: "Free tap water connection to every rural household — piped water at home",
    eligibility: {
      location: ["village","gaon","rural"],
    },
    documents: ["Aadhaar Card", "Address Proof"],
    applyLink: "https://jaljeevanmission.gov.in/",
    deadline: "Apply at Gram Panchayat",
    tags: ["Central", "Free Tap Water", "Rural", "Piped Connection"],
  },
  {
    id: "swachh_bharat_odf",
    name: "Swachh Bharat Mission Phase 2 (ODF+)",
    category: "water",
    benefit: "Infrastructure grants for clean villages — solid waste, liquid waste, ODF++ status",
    eligibility: {
      location: ["village","gaon","rural"],
    },
    documents: ["Application through Gram Panchayat"],
    applyLink: "https://sbm.gov.in/",
    deadline: "Through Gram Panchayat",
    tags: ["Central", "Rural Sanitation", "Clean Village"],
  },

  // ═══════════════════════════════════════════
  //  STATE — BIHAR SPECIFIC  (7 schemes)
  // ═══════════════════════════════════════════

  {
    id: "bihar_student_credit_card",
    name: "Bihar Student Credit Card Scheme",
    category: "state_bihar",
    benefit: "Education loan up to Rs. 4 lakh at 4% interest (1% for women/disabled) for Class 12 passed students",
    eligibility: {
      occupation: ["student","padhai","college","engineering","btech"],
      location: ["bihar"],
      educationLevel: "higher",
    },
    documents: ["Aadhaar Card", "Class 12 Marksheet", "Admission Letter", "Residence Certificate (Bihar)", "Bank Account"],
    applyLink: "https://www.7nishchay-yuvaupmission.bihar.gov.in/",
    deadline: "Rolling — apply within 1 year of Class 12 passing",
    tags: ["Bihar State", "Education Loan", "4% Interest", "Rs 4L"],
  },
  {
    id: "bihar_kanya_utthan",
    name: "Mukhyamantri Kanya Utthan Yojana (Bihar)",
    category: "state_bihar",
    benefit: "Rs. 25,000–50,000 for girl students in Bihar — paid at birth, Class 10, Class 12, and graduation",
    eligibility: {
      gender: ["female","girl","beti","ladki"],
      location: ["bihar"],
    },
    documents: ["Aadhaar Card", "Bihar Domicile", "Bank Account", "Marksheet (for each stage)"],
    applyLink: "https://medhasoft.bih.nic.in/",
    deadline: "Apply after each milestone (birth/board exams/graduation)",
    tags: ["Bihar State", "Girl Child", "Rs 50K Total", "Education"],
  },
  {
    id: "bihar_saat_nischay",
    name: "Saat Nischay Yojana — Kushal Yuva Program (Bihar)",
    category: "state_bihar",
    benefit: "Free communication + soft skills training + Rs. 1,000/month stipend for unemployed youth",
    eligibility: {
      location: ["bihar"],
      minAge: 15,
      maxAge: 25,
    },
    documents: ["Aadhaar Card", "Bihar Domicile", "Class 10 Certificate", "Bank Account"],
    applyLink: "https://www.7nishchay-yuvaupmission.bihar.gov.in/",
    deadline: "Rolling — register on portal",
    tags: ["Bihar State", "Youth 15-25", "Free Training", "Stipend"],
  },
  {
    id: "bihar_cycle_yojana",
    name: "Mukhyamantri Cycle Yojana (Bihar)",
    category: "state_bihar",
    benefit: "Free bicycle for Class 9 students in Bihar government schools",
    eligibility: {
      occupation: ["student"],
      location: ["bihar"],
      educationLevel: "school",
    },
    documents: ["Aadhaar Card", "School Enrollment Certificate (Class 9)", "Bihar Domicile"],
    applyLink: "https://education.bih.nic.in/",
    deadline: "Through school at Class 9 admission",
    tags: ["Bihar State", "Free Cycle", "Class 9", "School"],
  },
  {
    id: "bihar_laghu_udyami",
    name: "Mukhyamantri Laghu Udyami Yojana (Bihar)",
    category: "state_bihar",
    benefit: "Rs. 2 lakh business grant (non-refundable) for small businesses in Bihar",
    eligibility: {
      occupation: ["business","entrepreneur"],
      location: ["bihar"],
      categories: ["bpl","sc","st","obc","poor"],
    },
    documents: ["Aadhaar Card", "Bihar Domicile", "Caste Certificate", "Business Plan", "Bank Account"],
    applyLink: "https://udyami.bihar.gov.in/",
    deadline: "Check portal — announced periodically",
    tags: ["Bihar State", "Rs 2L Grant", "Business", "BPL/SC/ST/OBC"],
  },
  {
    id: "bihar_berojgar_bhatta",
    name: "Bihar Berojgari Bhatta (Unemployment Allowance)",
    category: "state_bihar",
    benefit: "Rs. 1,000/month unemployment allowance for 2 years for educated unemployed youth",
    eligibility: {
      location: ["bihar"],
      minAge: 21,
      maxAge: 35,
    },
    documents: ["Aadhaar Card", "Bihar Domicile", "12th/Degree Certificate", "Income Certificate (family)", "Bank Account"],
    applyLink: "https://www.7nishchay-yuvaupmission.bihar.gov.in/",
    deadline: "Rolling — apply on portal",
    tags: ["Bihar State", "Unemployment Allowance", "Rs 1000/month", "Youth"],
  },

  // ═══════════════════════════════════════════
  //  STATE — UTTAR PRADESH SPECIFIC  (5 schemes)
  // ═══════════════════════════════════════════

  {
    id: "up_scholarship",
    name: "UP Scholarship (Prerna Portal)",
    category: "state_up",
    benefit: "Scholarship for SC/ST/OBC/General (minority) students from Class 9 to postgrad — state top-up",
    eligibility: {
      occupation: ["student","padhai"],
      location: ["up","uttar_pradesh","uttar pradesh"],
      categories: ["sc","st","obc","minority"],
    },
    documents: ["Aadhaar Card", "Income Certificate", "Caste Certificate", "Mark Sheet", "Bank Account", "UP Domicile"],
    applyLink: "https://scholarship.up.gov.in/",
    deadline: "Usually September–October",
    tags: ["UP State", "SC/ST/OBC Scholarship", "Class 9 to PG"],
  },
  {
    id: "up_kanya_sumangala",
    name: "Mukhyamantri Kanya Sumangala Yojana (UP)",
    category: "state_up",
    benefit: "Rs. 15,000 total for girl child in 6 installments from birth to graduation (UP only)",
    eligibility: {
      gender: ["female","girl","beti","ladki"],
      location: ["up","uttar_pradesh"],
    },
    documents: ["Aadhaar Card", "Birth Certificate", "UP Domicile", "Bank Account"],
    applyLink: "https://mksy.up.gov.in/",
    deadline: "Apply within 6 months of each milestone",
    tags: ["UP State", "Girl Child", "Rs 15K Total", "6 Stages"],
  },
  {
    id: "up_free_laptop",
    name: "UP Free Laptop Yojana",
    category: "state_up",
    benefit: "Free laptop for students passing Class 10/12 from UP board with 65%+ marks",
    eligibility: {
      occupation: ["student"],
      location: ["up","uttar_pradesh"],
      educationLevel: "school",
    },
    documents: ["Aadhaar Card", "UP Board Marksheet (65%+)", "UP Domicile", "College Admission Proof"],
    applyLink: "https://upcmo.up.nic.in/",
    deadline: "Check UP CMO portal",
    tags: ["UP State", "Free Laptop", "65%+ in Board", "Student"],
  },

];

// ─────────────────────────────────────────────────────────────────
//  extractProfile()
//  Reads the user's message and builds a profile object.
//  Called from chat.js — keep return format the same.
// ─────────────────────────────────────────────────────────────────

function extractProfile(text) {
  const t = text.toLowerCase();

  const profile = {
    occupation:     [],
    categories:     [],
    gender:         [],
    location:       [],
    health:         [],
    age:            null,
    income:         null,
    hasLand:        false,
    educationLevel: null,   // "school" | "higher" | "phd" | null
    isGeneral:      false,
  };

  // ── Education Level — check this before generic "student" ─────
  // (order matters — B.Tech should set "higher", not just "student")
  if (/b\.?tech|btech|b\.?e\b|engineering college|polytechnic|iit\b|nit\b|iiit|lateral entry/.test(t)) {
    profile.occupation.push("student", "padhai", "engineering", "btech", "college");
    profile.educationLevel = "higher";

  } else if (/\bcollege\b|university|graduation|undergraduate|\bba\b|\bbsc\b|b\.sc|bcom|b\.com|\bbba\b|\bbca\b|\bmba\b|\bmca\b|\bmsc\b|\bllb\b|\bmbbs\b|degree course/.test(t)) {
    profile.occupation.push("student", "padhai", "college");
    profile.educationLevel = "higher";

  } else if (/\bphd\b|ph\.d|doctorate|research scholar|\bjrf\b|\bsrf\b/.test(t)) {
    profile.occupation.push("student", "phd", "research");
    profile.educationLevel = "phd";

  } else if (/mtech|m\.tech/.test(t)) {
    profile.occupation.push("student", "mtech", "engineering", "college");
    profile.educationLevel = "higher";

  } else if (/class [1-9]\b|class 1[0-2]\b|\b10th\b|\b12th\b|10 pass|12 pass|\binter\b|high school|secondary school|matric\b/.test(t)) {
    profile.occupation.push("student", "padhai");
    profile.educationLevel = "school";

  } else if (/\bstudent\b|padhai|scholarship/.test(t)) {
    // generic student — level unknown
    profile.occupation.push("student", "padhai");
  }

  // ── Specific occupations ──────────────────────────────────────
  if (/kisan|farmer|kheti|agriculture|fasal|crop|fertilizer/.test(t)) {
    profile.occupation.push("farmer", "kisan", "agriculture");
  }
  if (/\bstartup\b/.test(t)) {
    profile.occupation.push("startup", "entrepreneur", "business");
  }
  if (/business|dukaan|shop|vyapar|self.employ|entrepreneur|msme/.test(t)) {
    profile.occupation.push("business", "entrepreneur");
  }
  if (/daily wage|mazdoor|labour|informal|unorganised/.test(t)) {
    profile.occupation.push("unorganised", "informal", "mazdoor");
  }
  if (/vendor|rehri|thela|patri|hawker|street/.test(t)) {
    profile.occupation.push("vendor", "street_vendor", "hawker");
  }
  if (/fisherman|machhli|fishing|matsya/.test(t)) {
    profile.occupation.push("fisherman", "machhli", "fishing", "matsya");
  }
  if (/dairy|cow|buffalo|goat|poultry|murgi|animal farm/.test(t)) {
    profile.occupation.push("dairy", "animal_husbandry", "pashu");
  }
  if (/carpenter|darzi|tailor|cobbler|kumhar|potter|lohar|sunar|\bnai\b|barber|dhobi|artisan/.test(t)) {
    profile.occupation.push("artisan", "craft", "vishwakarma");
  }
  if (/self.?help.?group|\bshg\b|mahila mandal/.test(t)) {
    profile.occupation.push("shg", "self_help_group", "mahila_mandal");
  }
  if (/\bbsc\b|pure science|science student/.test(t)) {
    profile.occupation.push("bsc", "science_student");
  }
  if (/\bmsc\b|m\.sc/.test(t)) {
    profile.occupation.push("msc", "science_student");
  }
  if (/writer|author|creative writing|lekhan/.test(t)) {
    profile.occupation.push("writer", "author", "creative");
  }
  if (/beekeeping|madhumakhi|honey/.test(t)) {
    profile.occupation.push("beekeeping");
  }
  if (/organic farm/.test(t)) {
    profile.occupation.push("farmer", "kisan", "agriculture");
  }
  if (/agri.?startup/.test(t)) {
    profile.occupation.push("agri_startup", "startup", "farmer");
  }

  // ── Social categories ─────────────────────────────────────────
  if (/\bsc\b|scheduled.?caste|dalit/.test(t))          profile.categories.push("sc");
  if (/\bst\b|scheduled.?tribe|tribal|adivasi/.test(t)) profile.categories.push("st");
  if (/\bobc\b/.test(t))                                 profile.categories.push("obc");
  if (/\bebc\b/.test(t))                                 profile.categories.push("ebc");
  if (/bpl|ration card|garib|below poverty|poor/.test(t)) {
    profile.categories.push("bpl", "poor");
  }
  if (/minority|muslim|christian|sikh|buddhist|jain/.test(t)) {
    profile.categories.push("minority", "muslim");
  }
  if (/disabled|divyang|handicap|viklang|blind|deaf|wheelchair/.test(t)) {
    profile.categories.push("disabled", "divyang");
  }
  if (/\bdnt\b|denotified/.test(t))                      profile.categories.push("dnt");
  if (/orphan|both parent.*died|parent.*died|no parents/.test(t)) {
    profile.categories.push("orphan");
  }
  if (/police ward|army ward|capf|father.*police|father.*army|veer nari/.test(t)) {
    profile.categories.push("police_ward", "defense_ward");
  }
  if (/antyodaya|aay\b/.test(t))                         profile.categories.push("antyodaya", "bpl");

  // General category — means NOT SC/ST/OBC
  if (/general category|gen category|\bgeneral\b|unreserved|open category/.test(t)) {
    profile.isGeneral = true;
  }

  // ── Gender ────────────────────────────────────────────────────
  if (/\bwoman\b|\bwomen\b|\bfemale\b|mahila|ladki|beti|girl|wife|mata|aurat/.test(t)) {
    profile.gender.push("female", "woman", "mahila");
  }
  if (/pregnant|garbhavati|maternity|expecting baby/.test(t)) {
    profile.gender.push("pregnant", "female", "woman");
  }
  if (/widow|vidhwa/.test(t)) {
    profile.gender.push("female", "woman", "widow");
    profile.categories.push("poor"); // widows often eligible for poverty schemes
  }

  // ── Location ──────────────────────────────────────────────────
  if (/village|gaon|rural|gram panchayat|\bblock\b|tehsil|taluka/.test(t)) {
    profile.location.push("village", "gaon", "rural");
  }
  if (/\bcity\b|shahar|urban|town|nagar|metro/.test(t)) {
    profile.location.push("city", "shahar", "urban", "town");
  }
  if (/\bbihar\b|patna|gaya|muzaffarpur|bhagalpur|begusarai|darbhanga|munger/.test(t)) {
    profile.location.push("bihar");
  }
  if (/uttar pradesh|\bup\b|lucknow|kanpur|varanasi|allahabad|agra|meerut/.test(t)) {
    profile.location.push("up", "uttar_pradesh", "uttar pradesh");
  }
  if (/assam|meghalaya|manipur|nagaland|tripura|mizoram|arunachal|sikkim/.test(t)) {
    profile.location.push("northeast", t.match(/assam|meghalaya|manipur|nagaland|tripura|mizoram|arunachal|sikkim/)?.[0]);
  }

  // ── Land ownership ────────────────────────────────────────────
  if (/\d+\s*(acre|bigha|hectare)|zameen hai|land hai|khet hai|apni zameen/.test(t)) {
    profile.hasLand = true;
    if (!profile.occupation.includes("farmer")) {
      profile.occupation.push("farmer", "kisan", "agriculture");
    }
  }

  // ── Age ───────────────────────────────────────────────────────
  // Try common patterns: "21 saal", "21 years old", "age 21"
  let ageMatch = t.match(/(\d{1,2})\s*(saal|years?\s*old|sal\b|varshe)/);
  if (!ageMatch) ageMatch = t.match(/\bage\s*[:\-]?\s*(\d{1,2})\b/);
  if (!ageMatch) ageMatch = t.match(/\bi am\s+(\d{1,2})\b/);
  if (ageMatch) {
    const parsed = parseInt(ageMatch[1] || ageMatch[2] || ageMatch[3]);
    if (parsed > 5 && parsed < 110) profile.age = parsed;
  }

  // Override if they mention "senior citizen" etc
  if (/senior citizen|budhapa|elderly|pensioner|retired/.test(t)) {
    profile.age = profile.age || 65;
  }

  // ── Income ────────────────────────────────────────────────────
  const incMatch = t.match(/(\d[\d,]*)\s*(rupee|rs\.?|income|kamaai|salary|per month|mahine|annual|per year)/);
  if (incMatch) {
    let amt = parseInt(incMatch[1].replace(/,/g, ""));
    if (/per month|mahine|monthly/.test(t)) amt = amt * 12;
    profile.income = amt;
  }

  // ── Health conditions ─────────────────────────────────────────
  if (/\btb\b|tuberculosis|kshay/.test(t)) {
    profile.health.push("tb", "tuberculosis", "kshay", "kshay_rog");
  }
  if (/cancer|tumor/.test(t))    profile.health.push("cancer");
  if (/kidney|dialysis/.test(t)) profile.health.push("kidney");

  // remove duplicates
  for (const k of ["occupation","categories","gender","location","health"]) {
    profile[k] = [...new Set(profile[k])];
  }

  // console.log('[BV] Profile extracted:', profile); // uncomment for debugging

  return profile;
}

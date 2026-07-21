/**
 * ─────────────────────────────────────────────────────────────
 *  EDIT THIS FILE to update your portfolio content & links.
 *  Paste GitHub / live URLs on each project when ready.
 *  Leave `live: ""` to hide the Live button (GitHub still shows).
 * ─────────────────────────────────────────────────────────────
 */

export const profile = {
  name: "Harshal Gupta",
  firstName: "Harshal",
  role: "Software Engineer · ML & Systems",
  tagline: "Shipping ML systems, Web3 apps, and production-grade software.",
  location: "IIIT Ranchi, India",
  email: "guptharshal.hg@gmail.com",
  // Put your PDF at public/resume.pdf — then this link works as a download
  resumeUrl: "/resume.pdf",
  blurb:
    "B.Tech in Computer Science & Engineering (Data Science & AI) at IIIT Ranchi. I build RAG pipelines, decentralized apps, and full-stack products — with Docker, cloud, and competitive programming as the foundation.",
  cgpa: "8.05",
};

/**
 * Social & profile links. Leave a value as "" to hide that icon.
 */
export const socials = {
  github: "https://github.com/gupta-harshal",
  linkedin: "https://www.linkedin.com/in/harshalgupta10/",
  twitter: "https://twitter.com/gupta_harshall",
  instagram: "https://instagram.com/gupta_harshall",
  codolio: "https://codolio.com/profile/gupta_harshal",
  leetcode: "https://leetcode.com/gupta_harshal",
  codeforces: "https://codeforces.com/profile/gupta_harshal",
  codechef: "https://www.codechef.com/users/gupta_harshal",
  medium: "https://medium.com/@gupta_harshal",
  substack: "https://substack.com/@guptaharshal",
  duolingo: "https://www.duolingo.com/profile/HarshalGup2",
};

export const stats = [
  { value: "1,400+", label: "Problems solved" },
  { value: "Specialist", label: "Codeforces" },
  { value: "Knight", label: "LeetCode" },
  { value: "3★", label: "CodeChef" },
];

export const techStack = [
  {
    group: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "Java", "C++"],
  },
  {
    group: "ML & AI",
    items: ["PyTorch", "NLP", "RAG", "LangChain", "Gemini"],
  },
  {
    group: "Backend & Infra",
    items: ["Node.js", "Docker", "Redis", "GCP", "PostgreSQL"],
  },
  {
    group: "Web3 & Frontend",
    items: ["Solana", "RPC Nodes", "React", "Next.js", "Tailwind"],
  },
];

export const achievements = [
  {
    title: "2nd Runner-Up — Postman Hackathon",
    org: "BITS Pilani",
    detail:
      "Built a role-based hospital management system with an LLM chatbot using vector embeddings from the Gale Encyclopedia of Medicine.",
  },
  {
    title: "Runner-Up — InternLay Hackathon",
    org: "IIIT Ranchi",
    detail:
      "Designed a workflow-automation system with Redis for asynchronous, multi-tenant execution queues.",
  },
  {
    title: "Contributor — GirlScript Summer of Code",
    org: "GSSoC",
    detail:
      "Open-source contributor during GSSoC — shipping features, reviews, and collaboration across community projects.",
  },
  {
    title: "Partnership Manager · Co-Lead",
    org: "GDG Ranchi",
    detail:
      "Co-led partnerships for Google Developer Group Ranchi — community growth, event collaborations, and developer outreach.",
  },
  {
    title: "Codeforces Specialist · LeetCode Knight · CodeChef 3★",
    org: "Competitive Programming",
    detail:
      "1,400+ problems solved — deep intuition for algorithms, optimisation, and system design under pressure.",
  },
  {
    title: "1,800+ Day Streak — Duolingo",
    org: "Japanese & French",
    detail:
      "Consistent daily practice learning Japanese and French — discipline that carries into engineering work.",
  },
];

export const experience = [
  {
    role: "Software Engineering Intern",
    company: "dAaranya",
    period: "7 months",
    summary:
      "Built enterprise-grade Retrieval-Augmented Generation (RAG) systems for US-based clients.",
    points: [
      "Designed automated web crawlers and parsed unstructured data into semantic search pipelines.",
      "Led deployment on Google Cloud Platform (GCP) with containerised workflows using Docker.",
      "Reduced LLM query costs by 50% by migrating high-volume workloads to the Gemini Batch API.",
    ],
  },
  {
    role: "Partnership Manager · Co-Lead",
    company: "GDG Ranchi",
    period: "Community",
    summary:
      "Co-led partnerships and community initiatives for Google Developer Group Ranchi.",
    points: [
      "Drove partner collaborations and developer-community outreach for local tech events.",
      "Supported workshops and meetups connecting students with industry practitioners.",
    ],
  },
];

/**
 * PROJECTS — ordered as requested.
 * Fill `github` (and optionally `live`) when ready.
 * Empty `live` hides the Live button; empty `github` hides Code.
 */
export const projects = [
  {
    title: "Personalized Language Learning Platform",
    tags: ["SM-2", "Full-Stack", "Spaced Repetition"],
    description:
      "Language-learning platform built from scratch with the SuperMemo-2 (SM-2) algorithm — dynamically computing optimal review intervals from memory-decay curves.",
    github: "https://github.com/gupta-harshal/LanguageLearning",
    live: "https://language-learning-g1md85x5g-harshal-guptas-projects.vercel.app/",
    accent: "amber",
  },
  {
    title: "Hospital Management System + LLM Chatbot",
    tags: ["RAG", "LLM", "Vector Embeddings"],
    description:
      "Role-based hospital / medical management platform with an LLM chatbot powered by Gale Encyclopedia of Medicine embeddings. 2nd Runner-Up at BITS Pilani Postman Hackathon.",
    github: "https://github.com/InternLay-HG/SMHackers",
    live: "https://sm-hackers.vercel.app/",
    accent: "sage",
  },
  {
    title: "Stock Exchange Platform",
    tags: ["Full-Stack", "Real-time", "FinTech"],
    description:
      "Stock exchange application focused on trading flows, market data handling, and a clean full-stack architecture for simulated / live market interactions.",
    github: "https://github.com/gupta-harshal/exchange-platform",
    live: "",
    accent: "amber",
  },
  {
    title: "Solana Airdrop dApp",
    tags: ["Solana", "Web3", "RPC", "dApp"],
    description:
      "Decentralized airdrop application on Solana — wallet connect, claim flows, and RPC-node based chain reads for token distribution.",
    github: "https://github.com/gupta-harshal/dApp",
    live: "",
    accent: "rose",
  },
  {
    title: "Cross-Cultural Misogyny Detection",
    tags: ["NLP", "Text Classification", "ML"],
    description:
      "NLP system that detects nuanced misogynistic content in text across Indian, Chinese, and English cultural contexts using language modelling and classification.",
    github: "https://github.com/gupta-harshal/Cross-Cultural-Meme-Detection",
    live: "",
    accent: "rose",
  },
];

/**
 * Beyond engineering — still relevant, tech portfolio first.
 */
export const passions = [
  {
    title: "Guitar",
    line: "Electric and acoustic — I've performed with many teams and on many stages. Try the interactive guitar.",
  },
  {
    title: "Reading",
    line: "Books keep the mental stack deep — fiction, non-fiction, and long-form writing between shipping features.",
  },
  {
    title: "Languages",
    line: "1,800+ day Duolingo streak learning Japanese and French — consistency as a craft.",
  },
  {
    title: "3D Design",
    line: "Hands-on 3D design exposure — creative experiments live on Instagram alongside the engineering work.",
  },
];

export const marqueeWords = [
  "Machine Learning",
  "Docker",
  "Solana",
  "RAG Systems",
  "Competitive Programming",
  "GCP",
  "Guitar",
  "RPC Nodes",
  "React",
  "Web3",
  "GSSoC",
  "GDG Ranchi",
  "Japanese",
  "French",
  "3D Design",
];

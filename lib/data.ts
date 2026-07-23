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
  tagline: "I build ML systems, Web3 apps, and full-stack software that actually ships.",
  location: "IIIT Ranchi, India",
  email: "guptharshal.hg@gmail.com",
  // Put your PDF at public/resume.pdf so this link downloads it
  resumeUrl: "/resume.pdf",
  blurb:
    "B.Tech in Computer Science & Engineering (Data Science & AI) at IIIT Ranchi. Most of my time goes into RAG pipelines, Solana apps, and full-stack products. Docker, cloud, and competitive programming sit underneath all of that.",
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
    title: "2nd Runner-Up, Postman Hackathon",
    org: "BITS Pilani",
    detail:
      "Built a role-based hospital management system with an LLM chatbot using vector embeddings from the Gale Encyclopedia of Medicine.",
  },
  {
    title: "Runner-Up, InternLay Hackathon",
    org: "IIIT Ranchi",
    detail:
      "Designed a workflow automation system with Redis for async, multi-tenant execution queues.",
  },
  {
    title: "Contributor, GirlScript Summer of Code",
    org: "GSSoC",
    detail:
      "Contributed to open source during GSSoC: features, reviews, and working with other contributors.",
  },
  {
    title: "Partnership Manager · Co-Lead",
    org: "GDG Ranchi",
    detail:
      "Helped run partnerships for Google Developer Group Ranchi: events, collabs, and getting more people into the community.",
  },
  {
    title: "Codeforces Specialist · LeetCode Knight · CodeChef 3★",
    org: "Competitive Programming",
    detail:
      "1,400+ problems solved. Good practice for thinking through algorithms and system design when the clock is ticking.",
  },
  {
    title: "1,800+ Day Streak on Duolingo",
    org: "Japanese & French",
    detail:
      "Still showing up every day for Japanese and French. Same habit I try to keep with engineering work.",
  },
];

export const experience = [
  {
    role: "Software Engineering Intern",
    company: "dAaranya",
    period: "7 months",
    summary:
      "Built Retrieval-Augmented Generation (RAG) systems for US-based clients.",
    points: [
      "Wrote automated web crawlers and turned messy unstructured data into searchable pipelines.",
      "Owned deployment on Google Cloud Platform with Docker-based workflows.",
      "Cut LLM query costs by about 50% by moving heavy workloads onto the Gemini Batch API.",
    ],
  },
  {
    role: "Partnership Manager · Co-Lead",
    company: "GDG Ranchi",
    period: "Community",
    summary:
      "Co-led partnerships and community work for Google Developer Group Ranchi.",
    points: [
      "Worked with partners and helped grow local developer events.",
      "Helped run workshops and meetups connecting students with people already in the industry.",
    ],
  },
];

/**
 * PROJECTS (ordered as requested).
 * Fill `github` (and optionally `live`) when ready.
 * Empty `live` hides the Live button; empty `github` hides Code.
 */
export const projects = [
  {
    title: "Personalized Language Learning Platform",
    tags: ["SM-2", "Full-Stack", "Spaced Repetition"],
    description:
      "Language learning app built from scratch around the SuperMemo-2 (SM-2) algorithm. It figures out when you should review a card based on how memory tends to fade.",
    github: "https://github.com/gupta-harshal/LanguageLearning",
    live: "https://language-learning-g1md85x5g-harshal-guptas-projects.vercel.app/",
    accent: "amber",
  },
  {
    title: "Hospital Management System + LLM Chatbot",
    tags: ["RAG", "LLM", "Vector Embeddings"],
    description:
      "Role-based hospital management platform with an LLM chatbot backed by Gale Encyclopedia of Medicine embeddings. Came 2nd runner-up at the BITS Pilani Postman Hackathon.",
    github: "https://github.com/InternLay-HG/SMHackers",
    live: "https://sm-hackers.vercel.app/",
    accent: "sage",
  },
  {
    title: "Stock Exchange Platform",
    tags: ["Full-Stack", "Real-time", "FinTech"],
    description:
      "Stock exchange app focused on trading flows, market data, and a clean full-stack setup for simulated market interactions.",
    github: "https://github.com/gupta-harshal/exchange-platform",
    live: "",
    accent: "amber",
  },
  {
    title: "Solana Airdrop dApp",
    tags: ["Solana", "Web3", "RPC", "dApp"],
    description:
      "Airdrop app on Solana with wallet connect, claim flows, and RPC-based chain reads for token distribution.",
    github: "https://github.com/gupta-harshal/dApp",
    live: "",
    accent: "rose",
  },
  {
    title: "Cross-Cultural Misogyny Detection",
    tags: ["NLP", "Text Classification", "ML"],
    description:
      "NLP model that flags misogynistic language across Indian, Chinese, and English contexts using text classification.",
    github: "https://github.com/gupta-harshal/Cross-Cultural-Meme-Detection",
    live: "",
    accent: "rose",
  },
];

/**
 * Outside of engineering.
 */
export const passions = [
  {
    title: "Guitar",
    line: "Electric and acoustic. I've played with a bunch of teams and on a bunch of stages. Try the interactive guitar.",
  },
  {
    title: "Reading",
    line: "Mostly philosophy, psychology, and books about how money and markets actually work.",
  },
  {
    title: "Languages",
    line: "1,800+ day Duolingo streak for Japanese and French. Showing up every day adds up.",
  },
  {
    title: "3D Design",
    line: "I mess around with 3D design too. Some of that ends up on Instagram next to the engineering stuff.",
  },
];

/**
 * Reading shelf. Edit freely.
 */
export const books = [
  { title: "Bhagavad Gita", author: "Traditional" },
  { title: "The Personal MBA", author: "Josh Kaufman" },
  { title: "The Psychology of Money", author: "Morgan Housel" },
  { title: "Ikigai", author: "García & Miralles" },
  { title: "Freakonomics", author: "Levitt & Dubner" },
  { title: "Basics of Economics", author: "Introductory" },
];

/** Soft ambient words (JP / FR / music) scattered on the Beyond section */
export const ambientWords = [
  { text: "音楽", x: "8%", y: "12%", rotate: -8 },
  { text: "lire", x: "88%", y: "18%", rotate: 6 },
  { text: "本", x: "14%", y: "72%", rotate: 4 },
  { text: "musique", x: "78%", y: "68%", rotate: -5 },
  { text: "読む", x: "92%", y: "42%", rotate: 10 },
  { text: "livre", x: "6%", y: "48%", rotate: -3 },
  { text: "♪", x: "22%", y: "28%", rotate: 12 },
  { text: "♫", x: "70%", y: "32%", rotate: -14 },
  { text: "♬", x: "48%", y: "8%", rotate: 5 },
  { text: "apprendre", x: "55%", y: "88%", rotate: -6 },
  { text: "語", x: "35%", y: "90%", rotate: 8 },
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

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
  email: "harshalgupta10@gmail.com",
  resumeUrl: "",
  blurb:
    "B.Tech in Computer Science & Engineering (Data Science & AI) at IIIT Ranchi. I build RAG pipelines, decentralized apps, and full-stack products — with Docker, cloud, and competitive programming as the foundation.",
  cgpa: "8.05",
};

/**
 * Social & profile links. Leave a value as "" to hide that icon.
 */
export const socials = {
  github: "https://github.com/",
  linkedin: "https://www.linkedin.com/in/harshalgupta10/",
  twitter: "https://twitter.com/",
  instagram: "https://instagram.com/", // 3D design / creative work
  leetcode: "https://leetcode.com/",
  codeforces: "https://codeforces.com/",
  codechef: "https://www.codechef.com/",
  medium: "https://medium.com/",
  substack: "https://substack.com/",
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
    items: ["Python", "TypeScript", "JavaScript", "C++", "Solidity"],
  },
  {
    group: "ML & AI",
    items: ["PyTorch", "NLP", "Computer Vision", "RAG", "LangChain", "Gemini"],
  },
  {
    group: "Backend & Infra",
    items: ["Node.js", "Docker", "Kafka", "Redis", "GCP", "PostgreSQL"],
  },
  {
    group: "Web3 & Frontend",
    items: ["Ethereum", "Smart Contracts", "React", "Next.js", "Tailwind"],
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
      "Designed a workflow-automation system with Kafka and Redis for asynchronous, multi-tenant execution queues.",
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
    title: "Cross-Cultural Meme Detection",
    tags: ["NLP", "Computer Vision", "Multimodal", "ML"],
    description:
      "Multimodal system combining NLP and image processing to detect nuanced misogynistic content across Indian, Chinese, and English cultural contexts.",
    github: "",
    live: "",
    accent: "rose",
  },
  {
    title: "Personalized Language Learning Platform",
    tags: ["SM-2", "Full-Stack", "Spaced Repetition"],
    description:
      "Language-learning platform built from scratch with the SuperMemo-2 (SM-2) algorithm — dynamically computing optimal review intervals from memory-decay curves.",
    github: "",
    live: "",
    accent: "amber",
  },
  {
    title: "Hospital Management System + LLM Chatbot",
    tags: ["RAG", "LLM", "Vector Embeddings"],
    description:
      "Role-based hospital / medical management platform with an LLM chatbot powered by Gale Encyclopedia of Medicine embeddings. 2nd Runner-Up at BITS Pilani Postman Hackathon.",
    github: "",
    live: "",
    accent: "sage",
  },
  {
    title: "Stock Exchange Platform",
    tags: ["Full-Stack", "Real-time", "FinTech"],
    description:
      "Stock exchange application focused on trading flows, market data handling, and a clean full-stack architecture for simulated / live market interactions.",
    github: "",
    live: "",
    accent: "amber",
  },
  {
    title: "Web3 Airdrop dApp",
    tags: ["Web3", "Solidity", "Ethereum", "dApp"],
    description:
      "Decentralized airdrop application built on Web3 — smart-contract based token distribution with a frontend for wallet connect and claim flows.",
    github: "",
    live: "",
    accent: "rose",
  },
  {
    title: "Distributed Workflow Automation Engine",
    tags: ["Kafka", "Redis", "Docker", "Distributed Systems"],
    description:
      "Workflow-automation system using Kafka and Redis to handle asynchronous, multi-tenant execution queues at scale. Runner-Up at IIIT Ranchi InternLay.",
    github: "",
    live: "",
    accent: "sage",
  },
];

/**
 * Beyond engineering — still relevant, tech portfolio first.
 */
export const passions = [
  {
    title: "Guitar",
    line: "Electric and acoustic — I've performed with many teams and on many stages. Drag the 3D guitar below.",
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
  "Web3",
  "RAG Systems",
  "Competitive Programming",
  "GCP",
  "Guitar",
  "Kafka",
  "React",
  "Solidity",
  "GSSoC",
  "GDG Ranchi",
  "Japanese",
  "French",
  "3D Design",
];

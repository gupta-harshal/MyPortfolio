/**
 * ─────────────────────────────────────────────────────────────
 *  EDIT THIS FILE to update your portfolio content & links.
 *  Everything the site shows lives here so you never have to
 *  dig through components. Add project links whenever you want.
 * ─────────────────────────────────────────────────────────────
 */

export const profile = {
  name: "Harshal Gupta",
  firstName: "Harshal",
  role: "ML & Software Engineer",
  tagline: "Engineer by logic, artist by soul.",
  location: "IIIT Ranchi, India",
  email: "harshalgupta10@gmail.com", // ← change if you prefer another inbox
  resumeUrl: "", // ← optional: link to a hosted PDF resume
  blurb:
    "B.Tech in Computer Science & Engineering (Data Science & AI) at IIIT Ranchi. I build production-grade ML systems, chase clean optimisations, and — when the terminal sleeps — I chase melodies and metaphors.",
  cgpa: "8.05",
};

/**
 * Social & profile links. Leave a value as "" to hide that icon.
 */
export const socials = {
  github: "https://github.com/",
  linkedin: "https://www.linkedin.com/in/harshalgupta10/",
  twitter: "https://twitter.com/",
  leetcode: "https://leetcode.com/",
  codeforces: "https://codeforces.com/",
  codechef: "https://www.codechef.com/",
  medium: "https://medium.com/",
  substack: "https://substack.com/",
};

/**
 * Competitive programming & achievement stats (Hero + Achievements).
 */
export const stats = [
  { value: "1,400+", label: "Problems solved" },
  { value: "Specialist", label: "Codeforces" },
  { value: "Knight", label: "LeetCode" },
  { value: "3★", label: "CodeChef" },
];

export const achievements = [
  {
    title: "2nd Runner-Up — Postman Hackathon",
    org: "BITS Pilani",
    detail:
      "Architected a role-based Medical Management system with an LLM chatbot using vector embeddings from the Gale Encyclopedia of Medicine.",
  },
  {
    title: "Runner-Up — InternLay Hackathon",
    org: "IIIT Ranchi",
    detail:
      "Designed a workflow-automation system with Kafka and Redis to handle asynchronous, multi-tenant execution queues.",
  },
  {
    title: "Codeforces Specialist · LeetCode Knight · CodeChef 3★",
    org: "Competitive Programming",
    detail:
      "1,400+ problems solved across platforms — deep intuition for deterministic optimisation and algorithmic design.",
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
      "Led deployment of the systems on Google Cloud Platform (GCP).",
      "Reduced LLM query costs by 50% by migrating high-volume workloads to the Gemini Batch API.",
    ],
  },
];

/**
 * PROJECTS — add or edit freely.
 * Set `github` and/or `live` links whenever they're ready. Empty
 * strings simply hide that button, so it's safe to ship without them.
 */
export const projects = [
  {
    title: "Personalized Language Learning Platform",
    tags: ["Spaced Repetition", "SM-2", "Full-Stack"],
    description:
      "Building a language-learning platform from scratch, implementing the SuperMemo-2 (SM-2) algorithm to dynamically compute optimal review intervals from memory-decay curves.",
    github: "",
    live: "",
    accent: "amber",
  },
  {
    title: "Cross-Cultural Meme Detection",
    tags: ["NLP", "Computer Vision", "Multimodal"],
    description:
      "A multimodal system combining NLP and image processing to identify nuanced misogynistic content across Indian, Chinese, and English cultural contexts.",
    github: "",
    live: "",
    accent: "rose",
  },
  {
    title: "A Tale of Two UNets — Virtual Try-On",
    tags: ["Generative AI", "Diffusion", "Research"],
    description:
      "Reproduced the computer-vision architecture from the paper “A Tale of Two UNets,” exploring latent-space manipulation and geometric warping for virtual try-on.",
    github: "",
    live: "",
    accent: "sage",
  },
  {
    title: "Medical Management System + LLM Chatbot",
    tags: ["RAG", "Vector DB", "LLM"],
    description:
      "A role-based medical management platform with an LLM chatbot powered by vector embeddings from the Gale Encyclopedia of Medicine. Built at the BITS Pilani Postman Hackathon.",
    github: "",
    live: "",
    accent: "amber",
  },
  {
    title: "Distributed Workflow Automation Engine",
    tags: ["Kafka", "Redis", "Distributed Systems"],
    description:
      "A workflow-automation system using Kafka and Redis to efficiently handle asynchronous, multi-tenant execution queues at scale.",
    github: "",
    live: "",
    accent: "rose",
  },
  {
    title: "Enterprise RAG Pipeline",
    tags: ["RAG", "GCP", "Semantic Search"],
    description:
      "Automated crawlers, unstructured-data parsing, and semantic search pipelines deployed on GCP — with a 50% cut in LLM query costs via the Gemini Batch API.",
    github: "",
    live: "",
    accent: "sage",
  },
];

/**
 * The artist side — your passions beyond code.
 */
export const passions = [
  {
    title: "Guitar",
    line: "Chords over code. I play, and I've performed with many teams and on many stages.",
  },
  {
    title: "Poetry",
    line: "Compressing feeling into fewer words — the most elegant algorithm I know.",
  },
  {
    title: "Music",
    line: "The soundtrack to every debugging night and every quiet morning.",
  },
  {
    title: "Reading",
    line: "Books are my open tabs that never crash — worlds loaded one page at a time.",
  },
];

/**
 * A rotating marquee of words that describe you (Hero band).
 */
export const marqueeWords = [
  "Machine Learning",
  "Poetry",
  "Guitar",
  "Competitive Programming",
  "RAG Systems",
  "Music",
  "Generative AI",
  "Reading",
  "Distributed Systems",
  "Art",
];

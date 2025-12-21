export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  repo?: string;
  site?: string;
};

export const projects: Project[] = [
  {
    slug: "luna",
    title: "Luna",
    description:
      "AI assistant that helps students plan and organize assignments cleanly.",
    tags: ["Next.js", "Hono", "PostgreSQL", "Backblaze B2", "Gemini", "Inngest"],
    image: "/projects/luna.png",
    site: "https://luna-client-one.vercel.app",
  },
    {
    slug: "backblaze-mcp",
    title: "Backblaze MCP",
    description:
      "MCP server for Backblaze B2: buckets, uploads, key management.",
    tags: ["Bun", "MCP", "Backblaze B2"],
    image: "/projects/mcp-server.png",
    repo: "https://github.com/BraveRam/backblaze-mcp",
  },
  {
    slug: "pupilfy",
    title: "Pupilfy",
    description: "Awesome file sharing with secure uploads and quick previews.",
    tags: ["Next.js", "Backblaze", "TypeScript", "TailwindCSS", "NeonDB"],
    image: "/projects/pupilfy.png",
    site: "http://pupilfy.vercel.app"
  },
  {
    slug: "pixn",
    title: "Pixn",
    description: "Fast image hosting with instant uploads and shareable links.",
    tags: ["Next.js", "TypeScript", "TailwindCSS", "Supabase", "Gemini", "Pgvector"],
    image: "/projects/pixn.png",
    site: "https://pixn.vercel.app",
  },
  {
    slug: "coinylive",
    title: "Coinylive",
    description:
      "Live crypto prices with lightweight charts and responsive layout.",
    tags: ["Next.js", "TypeScript", "Coingecko", "TailwindCSS", "Tanstack query"],
    image: "/projects/coinylive-web.png",
    site: "https://coinylive.vercel.app",
  },
  {
    slug: "promptly",
    title: "Promptly",
    description:
      "Telegram bot that turns rough ideas into polished prompts for AI models.",
    tags: ["Telegram Bot API", "Node.js", "Vercel", "grammY"],
    image: "/projects/promptly-bot.jpg",
    repo: "https://github.com/BraveRam/Promptly",
  },
  {
    slug: "books-bot",
    title: "Books bot",
    description:
      "Find and download free books quickly via dBooks API in Telegram.",
    tags: ["Telegram Bot API", "Python", "Docker", "PyTelegramBotAPI"],
    image: "/projects/books-bot.jpg",
    repo: "https://github.com/BraveRam/Books-bot",
  },
  {
    slug: "ai-cli",
    title: "AI Chatbot CLI",
    description:
      "A simple command-line interface (CLI) tool built with Python to interact with AI.",
    tags: ["Python", "CLI", "OpenAI", "Groq", "LLama"],
    image: "/projects/ai-cli.webp",
    repo: "https://github.com/BraveRam/ai-cli",
  },
  {
    slug: "fastpostmaker",
    title: "Promotional Post Maker Bot",
    description: "Create rich Telegram promo posts with buttons and analytics.",
    tags: ["Telegram Bot API", "Python", "Docker", "PyTelegramBotAPI"],
    image: "/projects/promo-bot.jpg",
    repo: "https://github.com/BraveRam/FasterPostMaker",
  }
  
];

export type SkillCategory = "all" | "languages" | "frameworks" | "databases" | "tools" | "ai";

export type Skill = {
  name: string;
  slug: string;
  category: SkillCategory;
};

export const skillCategories: { value: SkillCategory; label: string }[] = [
  { value: "all", label: "All" },
  { value: "languages", label: "Languages" },
  { value: "frameworks", label: "Frameworks" },
  { value: "databases", label: "Databases" },
  { value: "tools", label: "Tools" },
  { value: "ai", label: "AI" },
];

export const skills: Skill[] = [
  { name: "HTML", slug: "html", category: "languages" },
  { name: "CSS", slug: "css", category: "languages" },
  { name: "JavaScript", slug: "javascript", category: "languages" },
  { name: "TypeScript", slug: "typescript", category: "languages" },
  { name: "Python", slug: "python", category: "languages" },
  { name: "Rust(Nooby)", slug: "rust", category: "languages" },

  { name: "Next.js", slug: "nextjs", category: "frameworks" },
  { name: "React", slug: "react", category: "frameworks" },
  { name: "Flask", slug: "flask", category: "frameworks" },
  { name: "FastAPI", slug: "fastapi", category: "frameworks" },
  { name: "Node.js", slug: "nodejs", category: "frameworks" },
  { name: "Bun", slug: "bun", category: "frameworks" },
  { name: "Express", slug: "express", category: "frameworks" },
  { name: "Hono", slug: "hono", category: "frameworks" },
  { name: "TailwindCSS", slug: "tailwind", category: "frameworks" },
  { name: "Framer", slug: "framer", category: "frameworks" },
  { name: "Redux", slug: "redux", category: "frameworks" },
  { name: "Tanstack Query", slug: "tanstack", category: "frameworks" },

  { name: "MongoDB", slug: "mongodb", category: "databases" },
  { name: "Supabase", slug: "supabase", category: "databases" },
  { name: "PostgreSQL", slug: "postgres", category: "databases" },
  { name: "Neon", slug: "neon", category: "databases" },
  { name: "Redis", slug: "redis", category: "databases" },
  { name: "MySQL", slug: "mysql", category: "databases" },

  { name: "Docker", slug: "docker", category: "tools" },
  { name: "Git", slug: "git", category: "tools" },
  { name: "Telegram", slug: "telegram", category: "tools" },
  { name: "Vercel", slug: "vercel", category: "tools" },
  { name: "Cloudflare", slug: "cloudflare", category: "tools" },

  { name: "OpenAI", slug: "openai", category: "ai" },
  { name: "Gemini", slug: "gemini", category: "ai" },
  { name: "Groq", slug: "groq", category: "ai" },
];


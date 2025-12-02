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
    tags: ["Next.js", "Hono", "PostgreSQL", "Backblaze B2", "AI"],
    image: "/projects/luna.png",
    site: "https://luna-client-one.vercel.app",
  },
  {
    slug: "pupilfy",
    title: "Pupilfy",
    description: "Simple file sharing with secure uploads and quick previews.",
    tags: ["Next.js", "TypeScript", "TailwindCSS"],
    image: "/projects/pupilfy.png",
    site: "http://pupilfy.vercel.app"
  },
  {
    slug: "pixn",
    title: "Pixn",
    description: "Fast image hosting with instant uploads and shareable links.",
    tags: ["Next.js", "TypeScript", "TailwindCSS", "Supabase"],
    image: "/projects/pixn.png",
    site: "https://pixn.vercel.app",
  },
  {
    slug: "coinylive",
    title: "Coinylive",
    description:
      "Live crypto prices with lightweight charts and responsive layout.",
    tags: ["Next.js", "TypeScript", "Coingecko"],
    image: "/projects/coinylive-web.png",
    site: "https://coinylive.vercel.app",
  },
  {
    slug: "promptly",
    title: "Promptly",
    description:
      "Telegram bot that turns rough ideas into polished prompts for AI models.",
    tags: ["Telegram", "Node.js", "Vercel"],
    image: "/projects/promptly-bot.jpg",
    repo: "https://github.com/BraveRam/Promptly",
  },
  {
    slug: "books-bot",
    title: "Books bot",
    description:
      "Find and download free books quickly via dBooks API in Telegram.",
    tags: ["Telegram", "Python", "Docker"],
    image: "/projects/books-bot.jpg",
    repo: "https://github.com/BraveRam/Books-bot",
  },
  {
    slug: "fastpostmaker",
    title: "Promotional Post Maker Bot",
    description: "Create rich Telegram promo posts with buttons and analytics.",
    tags: ["Telegram", "Python", "Docker"],
    image: "/projects/promo-bot.jpg",
    repo: "https://github.com/BraveRam/FasterPostMaker",
  },
  {
    slug: "backblaze-mcp",
    title: "Backblaze MCP",
    description:
      "MCP server for Backblaze B2: buckets, uploads, key management.",
    tags: ["Node.js", "MCP", "Backblaze B2"],
    image: "/projects/mcp-server.png",
    repo: "https://github.com/BraveRam/backblaze-mcp",
  },
  {
    slug: "ai-cli",
    title: "AI Chatbot CLI",
    description:
      "A simple command-line interface (CLI) tool built with Python to interact with AI.",
    tags: ["Python", "CLI", "AI"],
    image: "/projects/ai-cli.webp",
    repo: "https://github.com/BraveRam/ai-cli",
  },
];

export type Skill = {
  name: string;
  slug: string;
};

export const skills: Skill[] = [
  // Languages
  { name: "JavaScript", slug: "javascript" },
  { name: "TypeScript", slug: "typescript" },
  { name: "Python", slug: "python" },
  { name: "Rust", slug: "rust" },

  // Frameworks & Tools
  { name: "Next.js", slug: "nextjs" },
  { name: "React", slug: "react" },
  { name: "Node.js", slug: "nodejs" },
  { name: "Bun", slug: "bun" },
  { name: "Express", slug: "express" },
  { name: "Hono", slug: "hono" },
  { name: "TailwindCSS", slug: "tailwind" },
  { name: "Framer", slug: "framer" },
  { name: "Redux", slug: "redux" },
  { name: "MongoDB", slug: "mongodb" },
  { name: "Supabase", slug: "supabase" },
  { name: "PostgreSQL", slug: "postgres" },
  { name: "Neon", slug: "neon" },
  { name: "Docker", slug: "docker" },
  { name: "Git", slug: "git" },
  { name: "Telegram", slug: "telegram" },
  { name: "Vercel", slug: "vercel" },
  { name: "Cloudflare", slug: "cloudflare" },
  { name: "OpenAI", slug: "openai" },
  { name: "Gemini", slug: "gemini" },
];

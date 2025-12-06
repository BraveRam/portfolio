"use client";
import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="container pt-20 pb-1">
      <div className="grid items-center gap-8 md:grid-cols-[1.2fr_1fr] mt-10">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl/tight sm:text-5xl/tight font-semibold tracking-tight"
          >
            👋 Hi, Lencho here.
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-2xl/tight sm:text-2xl/tight font-normal tracking-tight"
          >
            A fullstack software developer
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="mt-4 text-zinc-500 dark:text-zinc-400 max-w-xl"
          >
            Self‑taught developer focused on fast and clean
            code. I specialize in web apps, Telegram bots, automation tools,
            and AI‑powered software.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 flex items-center gap-3"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium bg-foreground text-background hover:opacity-90 transition"
            >
              Projects <ArrowRight size={18} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium border border-black/10 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/5 transition"
            >
              Contact
            </a>
            <a
              href="/lencho-cv.pdf"
              download="Lencho-Mengistu-CV.pdf"
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium border border-black/10 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/5 transition"
            >
              <Download size={18} /> CV
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";
import { motion } from "framer-motion";
import { Mail, Copy, Check } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "Lenchomengistu100@gmail.com";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <section id="contact" className="container py-16">
      <div className="glass rounded-2xl p-6 mt-20">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-2xl font-semibold tracking-tight"
        >
          Let's build something cool
        </motion.h2>
        <p className="mt-2 text-sm text-zinc-500">
          I'm available for freelance and full‑time opportunities.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium bg-foreground text-background"
            href={`mailto:${email}`}
          >
            <Mail size={16} /> Email
          </a>
          <button
            onClick={handleCopy}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm font-medium border border-black/10 dark:border-white/15 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            {copied ? (
              <>
                <Check size={16} className="text-green-500" /> Copied!
              </>
            ) : (
              <>
                <Copy size={16} /> Copy Email
              </>
            )}
          </button>
          <a
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium border border-black/10 dark:border-white/15 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            href="https://t.me/plxor"
            target="_blank"
            rel="noreferrer"
          >
            <Image src="/socials/telegram.svg" alt="Telegram" width={16} height={16} /> Telegram
          </a>
          <a
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium border border-black/10 dark:border-white/15 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            href="https://github.com/BraveRam"
            target="_blank"
            rel="noreferrer"
          >
            <Image src="/socials/github.svg" alt="GitHub" width={16} height={16} className="dark:invert" /> GitHub
          </a>
          <a
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium border border-black/10 dark:border-white/15 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            href="https://x.com/plxor7"
            target="_blank"
            rel="noreferrer"
          >
            <Image src="/socials/x.svg" alt="X" width={16} height={16} className="dark:invert" /> X
          </a>
          <a
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium border border-black/10 dark:border-white/15 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            href="https://www.linkedin.com/in/lencho-mengistu-1a2642357"
            target="_blank"
            rel="noreferrer"
          >
            <Image src="/socials/linkedin.svg" alt="LinkedIn" width={16} height={16} /> LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}

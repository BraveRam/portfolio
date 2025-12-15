"use client";
import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import LiquidEther from "./LiquidEther";

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16 snap-start relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <LiquidEther
            colors={['#5227FF', '#FF9FFC', '#B19EEF']}
            mouseForce={20}
            cursorSize={100}
            isViscous={false}
            viscous={30}
            iterationsViscous={32}
            iterationsPoisson={32}
            resolution={0.5}
            isBounce={false}
            autoDemo={true}
            autoSpeed={0.5}
            autoIntensity={2.2}
            takeoverDuration={0.25}
            autoResumeDelay={3000}
            autoRampDuration={0.6}
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto gap-8 relative z-10">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl/tight sm:text-5xl/tight font-extrabold tracking-tight"
          >
            <motion.span
              className="inline-block origin-bottom"
              animate={{
                rotate: [0, 15, -10, 15, 0],
              }}
              transition={{
                duration: 1.2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 0.3
              }}
            >
              👋
            </motion.span>{" "}
            Hi, Lencho here.
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-2xl/tight sm:text-2xl/tight font-semibold tracking-tight"
          >
            Full-stack software developer from 🇪🇹
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="mt-4 text-zinc-500 dark:text-zinc-400 max-w-xl"
          >
            A software developer focused on fast and clean
            code. I specialize in building web apps, Telegram bots, automation tools,
            and AI‑powered software.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 flex items-center justify-center gap-3"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium bg-foreground text-background hover:opacity-90 transition"
            >
              Projects <ArrowRight size={18} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium border border-black/10 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/5 transition"
            >
              Contact
            </a>
            <a
              href="/lencho-cv.pdf"
              download="Lencho-Mengistu-CV.pdf"
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium border border-black/10 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/5 transition"
            >
              <Download size={18} /> CV
            </a>
          </motion.div>
        </div>
      </div>
    </section >
  );
}

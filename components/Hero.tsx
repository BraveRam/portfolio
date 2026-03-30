"use client";
import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { useState, useEffect } from "react";
import LightRays from "./LightRays";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import BlurText from "./ui/BlurText";

export default function Hero() {
  const [isEthiopia, setIsEthiopia] = useState(false);

  useEffect(() => {
    async function checkLocation() {
      try {
        const response = await fetch("/api/geo");
        const data = await response.json();
        setIsEthiopia(data.isEthiopia);
      } catch {
        setIsEthiopia(false);
      }
    }
    checkLocation();
  }, []);
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-13 snap-start relative overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
          <LightRays
            raysOrigin="top-center"
            raysColor="#00ffff"
            raysSpeed={1.5}
            lightSpread={0.8}
            rayLength={1.2}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0.1}
            distortion={0.05}
          />
        </div>
      </div>
      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center justify-center gap-8 px-6 text-center sm:px-0">
        <div className="mx-auto flex w-full flex-col items-center">
          <div className="w-full text-center">
            <BlurText
              text="Hi, Lencho here."
              delay={200}
              animateBy="words"
              direction="top"
              className="text-4xl/tight sm:text-5xl/tight font-extrabold tracking-tight"
            />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="mx-auto mt-4 max-w-xl text-zinc-500 dark:text-zinc-400"
          >
            A fullstack software engineer focused on building modern web,
            mobile, AI‑powered apps, and automation tools,
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
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
            {isEthiopia && (
              <a
                href="/lencho-cv.pdf"
                download="Lencho-Mengistu-CV.pdf"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium border border-black/10 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/5 transition"
              >
                <Download size={18} /> CV
              </a>
            )}
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <a href="#projects">
          <InteractiveHoverButton className="text-sm">
            Scroll Down
          </InteractiveHoverButton>
        </a>
      </motion.div>
    </section>
  );
}

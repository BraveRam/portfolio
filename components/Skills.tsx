"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { skills, skillCategories, type Skill, type SkillCategory } from "@/lib/data";
import { MagicCard } from "@/components/ui/magic-card";

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>("all");

  const filteredSkills = useMemo(() => {
    if (activeCategory === "all") return skills;
    return skills.filter((skill) => skill.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="skills" className="container py-16 snap-start">
      <h2 className="text-2xl font-semibold tracking-tight mb-6 mt-15">
        Skills
      </h2>

      <div className="flex flex-wrap gap-2 mb-6">
        {skillCategories.map((category) => (
          <button
            key={category.value}
            onClick={() => setActiveCategory(category.value)}
            className={`px-4 py-2 text-sm font-medium transition-all duration-200 cursor-pointer ${
              activeCategory === category.value
                ? "bg-foreground text-background"
                : "border border-black/10 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/5"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      <motion.div
        layout
        className="grid gap-3 grid-cols-4 sm:grid-cols-6 lg:grid-cols-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill: Skill) => {
            const needsLightBg = ['vercel', 'rust', 'nextjs', 'express', 'openai', 'groq', 'flask', 'fastapi', 'redis', 'mysql'].includes(skill.slug);

            return (
              <motion.div
                key={skill.slug}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
              >
                <MagicCard
                  className="rounded-xl h-24 cursor-pointer"
                  gradientSize={100}
                >
                  <div className="p-3 flex flex-col items-center justify-center gap-2 h-24 relative group">
                    <div className={`h-8 w-8 flex items-center justify-center rounded-md ${needsLightBg ? 'dark:bg-white/90 p-1' : ''
                      } transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-2`}>
                      <Image
                        src={`/icons/${skill.slug}.svg`}
                        alt={skill.name}
                        width={32}
                        height={32}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <span className="text-xs font-medium tracking-tight text-foreground/90 absolute bottom-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      {skill.name}
                    </span>
                  </div>
                </MagicCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

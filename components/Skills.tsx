"use client";
import { motion } from "framer-motion";
import { skills, type Skill } from "@/lib/data";

export default function Skills() {
  return (
    <section id="skills" className="container py-16">
      <h2 className="text-2xl font-semibold tracking-tight mb-6 mt-15">
        Skills
      </h2>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        className="grid gap-3 grid-cols-4 sm:grid-cols-6 lg:grid-cols-8"
      >
        {skills.map((skill: Skill) => {
          const needsLightBg = [
            "vercel",
            "rust",
            "nextjs",
            "express",
            "openai",
          ].includes(skill.slug);

          return (
            <motion.div
              key={skill.slug}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              className="card rounded-xl p-3 flex flex-col items-center justify-center gap-2 h-24"
            >
              <div
                className={`h-7 w-7 flex items-center justify-center rounded-md ${
                  needsLightBg ? "dark:bg-white/90 p-1" : ""
                }`}
              >
                <img
                  src={`/icons/${skill.slug}.svg`}
                  alt={skill.name}
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="text-xs font-medium tracking-tight text-foreground/90">
                {skill.name}
              </span>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

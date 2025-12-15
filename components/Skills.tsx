"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { skills, type Skill } from "@/lib/data";

export default function Skills() {
  return (
    <section id="skills" className="container py-16 snap-start">
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
          const needsLightBg = ['vercel', 'rust', 'nextjs', 'express', 'openai'].includes(skill.slug);

          return (
            <motion.div
              key={skill.slug}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              className="card rounded-xl p-3 flex flex-col items-center justify-center gap-2 h-24 relative group"
            >
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
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

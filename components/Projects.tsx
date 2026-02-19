"use client";
import { motion } from "framer-motion";
import { Github, SquareArrowOutUpRight } from "lucide-react";
import { projects, type Project } from "../lib/data";
import Image from "next/image";
import { MagicCard } from "@/components/ui/magic-card";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function Projects() {
  return (
    <section id="projects" className="container py-16 snap-start">
      <div className="flex items-end justify-between mb-6 mt-20">
        <h2 className="text-2xl font-semibold tracking-tight">Projects</h2>
        <a href="#contact" className="text-sm hover:opacity-80">
          Open to collaborations →
        </a>
      </div>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((p: Project) => {
          const cardLink = p.site || p.repo;

          return (
            <motion.article
              key={p.slug}
              variants={item}
              className="cursor-pointer"
              onClick={() => {
                if (cardLink) {
                  window.open(cardLink, "_blank", "noopener,noreferrer");
                }
              }}
            >
              <MagicCard className="rounded-2xl overflow-hidden h-full">
                <div className="group">
                  <div className="bg-black/30">
                    <Image
                      src={p.image}
                      alt={p.title}
                      width={1200}
                      height={630}
                      className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      priority={false}
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{p.title}</h3>
                      <div className="flex items-center gap-2 text-zinc-400">
                        {p.repo && (
                          <a
                            href={p.repo}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-foreground text-zinc-600 dark:text-zinc-400 z-10"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Github size={18} />
                          </a>
                        )}
                        {p.site && (
                          <a
                            href={p.site}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm font-medium text-green-500 hover:text-green-400 z-10 flex items-center gap-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            live <SquareArrowOutUpRight size={14} />
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-zinc-500">
                      {p.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.tags.map((t: string) => (
                        <span
                          key={t}
                          className="text-xs px-2 py-1 rounded-full border border-black/10 dark:border-white/15"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </MagicCard>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
}

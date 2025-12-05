"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-backdrop-filter:bg-background/60 border-b border-black/5 dark:border-white/10">
      <nav className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <a href="#home" className="font-semibold tracking-tight">
          plxor.dev
        </a>
        <div className="hidden md:flex items-center gap-4 text-sm">
          <a href="#skills" className="hover:opacity-80">
            Skills
          </a>
          <a href="#projects" className="hover:opacity-80">
            Projects
          </a>
          <a href="#contact" className="hover:opacity-80">
            Contact
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 border border-black/10 dark:border-white/15"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden border-t border-black/5 dark:border-white/10"
          >
            <div className="mx-auto max-w-6xl px-6 py-3 flex flex-col">
              <a href="#skills" className="py-2">
                Skills
              </a>
              <a href="#projects" className="py-2">
                Projects
              </a>
              <a href="#contact" className="py-2">
                Contact
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

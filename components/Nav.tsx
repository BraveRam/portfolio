"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlignRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";

const navItems = [
  { name: "Lencho", href: "#home" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Lencho");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <ActualNav
        isScrolled={isScrolled}
        open={open}
        setOpen={setOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </>
  );
}



interface ActualNavProps {
  isScrolled: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

function ActualNav({ isScrolled, open, setOpen, activeTab, setActiveTab }: ActualNavProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const variants = {
    top: {
      width: "fit-content",
      marginTop: 16,
      borderRadius: 9999,
      padding: "8px 12px",
    },
    scrolled: {
      width: "100%",
      marginTop: 0,
      borderRadius: 0,
      padding: "12px 24px",
    },
    mobile: {
      width: "100%",
      marginTop: 0,
      borderRadius: 0,
      padding: "12px 16px",
    }
  };

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center"
    >
      <motion.nav
        layout
        variants={variants}
        initial="top"
        animate={isMobile ? "mobile" : (isScrolled ? "scrolled" : "top")}
        transition={{
          type: "tween",
          duration: 0.3,
          ease: "easeInOut"
        }}
        className={cn(
          "flex items-center justify-between backdrop-blur-md shadow-sm border border-black/5 dark:border-white/10 bg-white/70 dark:bg-black/70 overflow-hidden",
          isMobile ? "w-full" : ""
        )}
      >
        {!isMobile && (
          <div className={cn(
            "hidden md:flex items-center gap-1 transition-all duration-300 w-full whitespace-nowrap",
            isScrolled ? "justify-between max-w-6xl mx-auto" : "justify-center"
          )}>
            {isScrolled && (
              <motion.a
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                href="#home"
                className="font-semibold tracking-tight mr-8 whitespace-nowrap hidden lg:block" // Hide on smaller desktops if getting crowded? Keep for now.
              >
                Lencho Mengistu
              </motion.a>
            )}

            <div className="flex items-center gap-1">
              {navItems
                .filter((item) => !(isScrolled && item.name === "Lencho"))
                .map((item) => {
                  const isActive = activeTab === item.name;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={() => setActiveTab(item.name)}
                      className={cn(
                        "relative px-4 py-2 text-sm font-medium transition-colors duration-200 flex items-center rounded-full outline-none",
                        isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="active-pill"
                          className="absolute inset-0 bg-white dark:bg-white/10 rounded-full shadow-sm"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">
                        {item.name}
                      </span>
                    </a>
                  );
                })}
              <div className="w-px h-6 bg-border mx-2" />
              <div className="pl-1 mt-2">
                <AnimatedThemeToggler />
              </div>
            </div>
          </div>
        )}

        {isMobile && (
          <div className="flex items-center justify-between w-full">
            <span className="font-semibold tracking-tight text-sm">Lencho Mengistu</span>
            <div className="flex items-center gap-2">
              <AnimatedThemeToggler />
              <button
                onClick={() => setOpen(!open)}
                className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                aria-label="Menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {open ? (
                    <motion.div
                      key="close"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={20} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="open"
                      initial={{ opacity: 0, rotate: 90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: -90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <AlignRight size={20} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        )}
      </motion.nav>

      <AnimatePresence>
        {isMobile && open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-black/5 dark:border-white/10 shadow-xl overflow-hidden z-40"
          >
            <div className="flex flex-col p-4 gap-2">
              {navItems
                .filter((item) => item.name !== "Lencho")
                .map((item) => {
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                    >
                      <span className="font-medium">{item.name}</span>
                    </a>
                  )
                })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

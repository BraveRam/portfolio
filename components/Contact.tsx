"use client";
import { motion } from "framer-motion";
import { Mail, Copy, Check, Send, Loader2 } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";


const formSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(1, "Message cannot be empty").refine((val) => val.trim().replace(/[\.,\s]+/g, "").length > 0, "Message must contain actual text"),
});

type FormValues = z.infer<typeof formSchema>;

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const email = "Lenchomengistu100@gmail.com";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to send");
      setIsSubmitted(true);
      reset();
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
    <section id="contact" className="container py-16 snap-start">
      <div className="glass rounded-2xl p-6 mt-20 mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl font-semibold tracking-tight"
          >
            Let&apos;s build something cool
          </motion.h2>
          <p className="mt-2 text-sm text-zinc-500">
            I&apos;m available for freelance and full‑time opportunities.
          </p>
          
          {/* Contact Links */}
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium bg-foreground text-background"
              href={`mailto:${email}`}
            >
              <Mail size={16} />
            </a>
            <button
              onClick={handleCopy}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm font-medium border border-black/10 dark:border-white/15 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              {copied ? (
                <>
                  <Check size={16} className="text-green-500" />
                </>
              ) : (
                <>
                  <Copy size={16} />
                </>
              )}
            </button>
            <a
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium border border-black/10 dark:border-white/15 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              href="https://t.me/plxor"
              target="_blank"
              rel="noreferrer"
            >
              <Image src="/socials/telegram.svg" alt="Telegram" width={20} height={20} /> 
            </a>
            <a
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium border border-black/10 dark:border-white/15 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              href="https://github.com/BraveRam"
              target="_blank"
              rel="noreferrer"
            >
              <Image src="/socials/github.svg" alt="GitHub" width={20} height={20} className="dark:invert" /> 
            </a>
            <a
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium border border-black/10 dark:border-white/15 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              href="https://x.com/plxor7"
              target="_blank"
              rel="noreferrer"
            >
              <Image src="/socials/x.svg" alt="X" width={15} height={15} className="dark:invert" /> 
            </a>
            <a
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium border border-black/10 dark:border-white/15 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              href="https://www.linkedin.com/in/lencho-mengistu-1a2642357"
              target="_blank"
              rel="noreferrer"
            >
              <Image src="/socials/linkedin.svg" alt="LinkedIn" width={25} height={25} /> 
            </a>
          </div>

          {/* Contact Form */}
          <div className="mt-8 pt-8 border-t border-black/10 dark:border-white/10">
            <h3 className="text-lg font-medium mb-4">Or send me a message directly</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
              <div>
                <input
                  {...register("email")}
                  placeholder="Your email"
                  className="w-full rounded-lg px-4 py-3 text-sm bg-transparent border border-black/10 dark:border-white/10 focus:border-black/30 dark:focus:border-white/30 outline-none transition-colors placeholder:text-zinc-500"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
                )}
              </div>
              <div>
                <textarea
                  {...register("message")}
                  rows={4}
                  placeholder="Your message..."
                  className="w-full rounded-lg px-4 py-3 text-sm bg-transparent border border-black/10 dark:border-white/10 focus:border-black/30 dark:focus:border-white/30 outline-none transition-colors placeholder:text-zinc-500 resize-none"
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex cursor-pointer items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium bg-foreground text-background hover:bg-foreground/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Sending...
                  </>
                ) : isSubmitted ? (
                  <>
                    <Check size={16} className="text-green-500" /> Sent!
                  </>
                ) : (
                  <>
                    Send Message <Send size={16} />
                  </>
                )}
              </button>
            </form>
          </div>
      </div>
    </section>
  );
}

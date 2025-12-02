import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Chatbot from "@/components/Chatbot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lencho",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <div className="min-h-dvh flex flex-col">
          <Nav />
          <main className="flex-1 my-10 sm:my-16">{children}</main>
          <footer className="border-t border-black/5 dark:border-white/10">
            <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-zinc-600 dark:text-zinc-400 flex items-center justify-between">
              <p>
                © {new Date().getFullYear()} All rights reserved.
              </p>
              <a href="#home" className="hover:opacity-80">
                ↑
              </a>
            </div>
          </footer>
          <Chatbot />
        </div>
      </body>
    </html>
  );
}

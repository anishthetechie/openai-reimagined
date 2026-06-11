"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { name: "Research", href: "#research" },
  { name: "Products", href: "#products" },
  { name: "Safety", href: "#safety" },
  { name: "Company", href: "#company" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scrollspy — highlight the nav link of the section currently in view
  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div
        className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 transition-all ${
          scrolled ? "" : ""
        }`}
      >
        <div
          className={`flex items-center justify-between rounded-2xl px-4 sm:px-6 h-14 transition-all duration-500 ${
            scrolled ? "glass-strong" : "bg-transparent"
          }`}
        >
          <a href="#" className="flex items-center gap-2 group">
            <Logo />
            <span className="font-display font-semibold tracking-tight text-lg">
              OpenAI
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => {
              const isActive = active === l.href;
              return (
                <a
                  key={l.name}
                  href={l.href}
                  className={`relative px-3 py-2 text-sm transition-colors group ${
                    isActive ? "text-white" : "text-ink-300 hover:text-white"
                  }`}
                >
                  {l.name}
                  <span
                    className={`absolute left-3 right-3 -bottom-px h-px bg-gradient-to-r from-accent-violet to-accent-cyan transition-transform origin-left ${
                      isActive
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-cmdk"))}
              data-cursor-label="⌘K"
              aria-label="Open command palette"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 hover:border-white/25 hover:bg-white/5 transition text-xs text-ink-300 hover:text-white"
            >
              <span className="hidden lg:inline">Search</span>
              <kbd className="font-mono text-[10px] px-1.5 py-0.5 rounded border border-white/15 bg-white/5">
                ⌘K
              </kbd>
            </button>
            <a
              href="#"
              className="text-sm text-ink-300 hover:text-white transition-colors"
            >
              Log in
            </a>
            <a
              href="#"
              className="relative inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full bg-white text-ink-950 hover:bg-ink-100 transition-all"
            >
              Try ChatGPT
              <span aria-hidden>→</span>
            </a>
          </div>

          <button
            className="md:hidden p-2 -mr-2 rounded-lg hover:bg-white/5"
            onClick={() => setOpen((s) => !s)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-2 glass-strong rounded-2xl p-4 space-y-1"
          >
            {links.map((l) => (
              <a
                key={l.name}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block px-3 py-2 rounded-lg text-ink-300 hover:bg-white/5 hover:text-white"
              >
                {l.name}
              </a>
            ))}
            <a
              href="#"
              className="mt-2 block text-center px-4 py-2 rounded-full bg-white text-ink-950 font-medium"
            >
              Try ChatGPT →
            </a>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}

function Logo() {
  return (
    <svg
      viewBox="0 0 32 32"
      width="28"
      height="28"
      className="text-white"
      aria-hidden
    >
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="50%" stopColor="#67e8f9" />
          <stop offset="100%" stopColor="#f0abfc" />
        </linearGradient>
      </defs>
      <path
        fill="url(#lg)"
        d="M16 2.5c-3.6 0-6.8 1.9-8.5 4.8a8.7 8.7 0 0 0-3.7 13c-1.3 3 -.6 6.6 1.7 9 2.4 2.3 6 3 9 1.7a8.7 8.7 0 0 0 13-3.7 8.7 8.7 0 0 0-1.7-13C24 5.2 20.4 2.5 16 2.5Zm0 4a5 5 0 0 1 4.5 2.8l-4.7 2.7-4.2-2.4A5 5 0 0 1 16 6.5Zm-7.8 5.8 4.7 2.7v5.5l-4.6 2.7a4.9 4.9 0 0 1-.1-10.9Zm15.6 0a4.9 4.9 0 0 1-.1 10.9l-4.6-2.7v-5.5l4.7-2.7ZM16 13.6 19.5 16 16 18.4 12.5 16Zm-4.4 9.3 4.2-2.4 4.7 2.7A5 5 0 0 1 11.6 22.9Z"
      />
    </svg>
  );
}

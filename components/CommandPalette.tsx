"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Sparkles,
  MessageSquare,
  Layers,
  BarChart3,
  FlaskConical,
  Clock,
  Quote,
  Shield,
  Github,
  Link2,
  ArrowUp,
  CornerDownLeft,
  type LucideIcon,
} from "lucide-react";

type Item = {
  id: string;
  label: string;
  hint: string;
  keywords: string;
  icon: LucideIcon;
  action: () => void;
};

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const [copied, setCopied] = useState(false);

  const jump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  const items: Item[] = useMemo(
    () => [
      {
        id: "chat",
        label: "Chat with GPT-Next",
        hint: "Open the assistant",
        keywords: "chat ai assistant ask gpt bot talk",
        icon: MessageSquare,
        action: () => {
          window.dispatchEvent(new CustomEvent("open-chat"));
          setOpen(false);
        },
      },
      {
        id: "capabilities",
        label: "Capabilities",
        hint: "Jump to section",
        keywords: "capabilities modality text image video voice code reel",
        icon: Sparkles,
        action: () => jump("capabilities"),
      },
      {
        id: "products",
        label: "Products",
        hint: "Jump to section",
        keywords: "products chatgpt sora dalle api platform",
        icon: Layers,
        action: () => jump("products"),
      },
      {
        id: "benchmarks",
        label: "Benchmarks",
        hint: "Jump to section",
        keywords: "benchmarks radar scores mmlu humaneval math",
        icon: BarChart3,
        action: () => {
          // Benchmarks section has no id — scroll to research minus offset fallback
          const el =
            document.getElementById("benchmarks") ||
            document.getElementById("research");
          el?.scrollIntoView({ behavior: "smooth" });
          setOpen(false);
        },
      },
      {
        id: "research",
        label: "Research",
        hint: "Jump to section",
        keywords: "research papers publications frontier",
        icon: FlaskConical,
        action: () => jump("research"),
      },
      {
        id: "today",
        label: "Today · Live",
        hint: "Jump to section",
        keywords: "today timeline live news events",
        icon: Clock,
        action: () => {
          const el =
            document.getElementById("today") ||
            document.getElementById("research");
          el?.scrollIntoView({ behavior: "smooth" });
          setOpen(false);
        },
      },
      {
        id: "voices",
        label: "Voices",
        hint: "Jump to section",
        keywords: "voices testimonials quotes customers",
        icon: Quote,
        action: () => {
          const el =
            document.getElementById("voices") ||
            document.getElementById("safety");
          el?.scrollIntoView({ behavior: "smooth" });
          setOpen(false);
        },
      },
      {
        id: "safety",
        label: "Safety",
        hint: "Jump to section",
        keywords: "safety alignment trust mission",
        icon: Shield,
        action: () => jump("safety"),
      },
      {
        id: "github",
        label: "View source on GitHub",
        hint: "anishthetechie/openai-reimagined",
        keywords: "github source code repo repository",
        icon: Github,
        action: () => {
          window.open(
            "https://github.com/anishthetechie/openai-reimagined",
            "_blank",
            "noopener"
          );
          setOpen(false);
        },
      },
      {
        id: "copy",
        label: copied ? "Copied!" : "Copy site URL",
        hint: "Share this page",
        keywords: "copy link url share clipboard",
        icon: Link2,
        action: () => {
          navigator.clipboard?.writeText(window.location.href);
          setCopied(true);
          setTimeout(() => {
            setCopied(false);
            setOpen(false);
          }, 800);
        },
      },
      {
        id: "top",
        label: "Back to top",
        hint: "Scroll to start",
        keywords: "top start beginning scroll up home",
        icon: ArrowUp,
        action: () => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          setOpen(false);
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [copied]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (i) =>
        i.label.toLowerCase().includes(q) || i.keywords.toLowerCase().includes(q)
    );
  }, [items, query]);

  // Global hotkeys + external open event
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-cmdk", onOpen as EventListener);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-cmdk", onOpen as EventListener);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[selected]?.action();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[70] bg-ink-950/70 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
            className="fixed z-[71] left-1/2 -translate-x-1/2 top-[18vh] w-[92vw] max-w-xl"
            role="dialog"
            aria-label="Command palette"
          >
            <div className="rounded-2xl shimmer-border">
              <div className="glass-strong rounded-2xl overflow-hidden">
                {/* Input */}
                <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/5">
                  <Search size={16} className="text-accent-violet flex-shrink-0" />
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={onInputKey}
                    placeholder="Type a command or search…"
                    data-cursor="text"
                    className="flex-1 bg-transparent outline-none text-sm placeholder:text-ink-500 text-white"
                  />
                  <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded border border-white/10 text-[10px] font-mono text-ink-500">
                    esc
                  </kbd>
                </div>

                {/* Results */}
                <div className="max-h-[46vh] overflow-y-auto py-2">
                  {filtered.length === 0 ? (
                    <div className="px-4 py-8 text-center text-sm text-ink-500 font-mono">
                      // no matches for "{query}"
                    </div>
                  ) : (
                    filtered.map((item, i) => {
                      const Icon = item.icon;
                      const isSel = i === selected;
                      return (
                        <button
                          key={item.id}
                          onClick={item.action}
                          onMouseEnter={() => setSelected(i)}
                          data-cursor="hover"
                          className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                            isSel ? "bg-white/[0.07]" : ""
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                              isSel
                                ? "bg-gradient-to-br from-accent-violet to-accent-cyan text-white"
                                : "bg-white/5 text-ink-300"
                            }`}
                          >
                            <Icon size={14} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm text-white truncate">
                              {item.label}
                            </div>
                            <div className="text-[11px] text-ink-500 truncate">
                              {item.hint}
                            </div>
                          </div>
                          {isSel && (
                            <CornerDownLeft
                              size={13}
                              className="text-ink-500 flex-shrink-0"
                            />
                          )}
                        </button>
                      );
                    })
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between px-4 py-2 border-t border-white/5 text-[10px] font-mono text-ink-500">
                  <span>↑↓ navigate · ↵ select</span>
                  <span>⌘K to toggle</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

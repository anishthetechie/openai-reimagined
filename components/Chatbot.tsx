"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowUp, X, Square, Trash2, MessageSquare } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What is this site?",
  "Who built it?",
  "Write a haiku about Mars",
  "Show me a code snippet",
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);
  const [notice, setNotice] = useState(true);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) setOpen(false);
    };
    const onOpenChat = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-chat", onOpenChat as EventListener);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-chat", onOpenChat as EventListener);
    };
  }, [open]);

  useEffect(() => {
    if (open && taRef.current) {
      setTimeout(() => taRef.current?.focus(), 200);
    }
  }, [open]);

  function autoSize() {
    const ta = taRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 128) + "px";
  }

  async function send(text: string) {
    const t = text.trim();
    if (!t || streaming) return;

    const next: Message[] = [...messages, { role: "user", content: t }];
    setMessages(next);
    setInput("");
    if (taRef.current) taRef.current.style.height = "auto";
    setStreaming(true);
    setMessages((m) => [...m, { role: "assistant", content: "" }]);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
        signal: controller.signal,
      });
      if (!res.ok || !res.body) throw new Error("net");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", content: acc };
          return copy;
        });
      }
    } catch (e: any) {
      if (e?.name !== "AbortError") {
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = {
            role: "assistant",
            content:
              "Something went wrong reaching the model. Try again in a moment.",
          };
          return copy;
        });
      }
    } finally {
      setStreaming(false);
      abortRef.current = null;
    }
  }

  function stop() {
    abortRef.current?.abort();
    setStreaming(false);
  }

  function clear() {
    if (streaming) stop();
    setMessages([]);
  }

  return (
    <>
      {/* Floating launcher */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ opacity: 0, y: 24, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.85 }}
            transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1], delay: 1 }}
            onClick={() => setOpen(true)}
            data-cursor="hover"
            data-cursor-label="CHAT"
            aria-label="Open chat"
            className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[55] group"
          >
            <div className="relative rounded-full shimmer-border">
              <div className="glass-strong rounded-full flex items-center gap-3 pl-3 pr-5 py-2.5 hover:bg-white/[0.08] transition">
                <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-accent-violet via-accent-fuchsia to-accent-cyan flex items-center justify-center">
                  <Sparkles size={15} className="text-white" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-ink-950" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] font-mono text-ink-500 uppercase tracking-widest leading-none">
                    GPT-Next
                  </div>
                  <div className="text-sm font-medium leading-tight mt-0.5">
                    Ask anything →
                  </div>
                </div>
              </div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Backdrop on mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[54] bg-ink-950/70 backdrop-blur-sm sm:hidden"
          />
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ duration: 0.32, ease: [0.2, 0.8, 0.2, 1] }}
            className="fixed z-[56] inset-x-3 bottom-3 top-16 sm:top-auto sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[440px] sm:h-[640px] sm:max-h-[88vh] flex flex-col rounded-3xl glass-strong overflow-hidden shadow-[0_30px_80px_-20px_rgba(139,92,246,0.4)]"
            role="dialog"
            aria-label="Chatbot"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 bg-white/[0.015]">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-accent-violet via-accent-fuchsia to-accent-cyan flex items-center justify-center">
                  <Sparkles size={16} className="text-white" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-ink-900" />
                </div>
                <div>
                  <div className="font-display font-semibold text-sm leading-tight">
                    GPT-Next
                  </div>
                  <div className="text-[10px] font-mono text-ink-500 mt-0.5 flex items-center gap-1.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-cyan opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent-cyan" />
                    </span>
                    online · 240ms
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                  <button
                    data-cursor="hover"
                    onClick={clear}
                    className="p-2 rounded-lg hover:bg-white/5 transition text-ink-300 hover:text-white"
                    aria-label="Clear chat"
                    title="Clear chat"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
                <button
                  data-cursor="hover"
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/5 transition text-ink-300 hover:text-white"
                  aria-label="Close"
                  title="Close"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Notice */}
            {notice && (
              <div className="px-5 py-2.5 border-b border-white/5 bg-gradient-to-r from-accent-violet/10 to-accent-cyan/10">
                <div className="flex items-start gap-2 text-[11px] font-mono text-ink-300">
                  <MessageSquare size={12} className="mt-0.5 flex-shrink-0 text-accent-cyan" />
                  <span className="flex-1">
                    Demo mode. Set <span className="text-white">OPENAI_API_KEY</span> on Vercel for real responses.
                  </span>
                  <button
                    data-cursor="hover"
                    onClick={() => setNotice(false)}
                    className="text-ink-500 hover:text-white"
                    aria-label="Dismiss"
                  >
                    <X size={12} />
                  </button>
                </div>
              </div>
            )}

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 py-5 space-y-4 scroll-smooth"
            >
              {messages.length === 0 ? (
                <EmptyState onPick={send} />
              ) : (
                messages.map((m, i) => (
                  <Bubble
                    key={i}
                    role={m.role}
                    content={m.content}
                    streaming={streaming && i === messages.length - 1}
                  />
                ))
              )}
            </div>

            {/* Input */}
            <div className="px-3 pb-3 pt-2 border-t border-white/5 bg-white/[0.015]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send(input);
                }}
              >
                <div className="flex items-end gap-2 rounded-2xl bg-black/30 border border-white/10 focus-within:border-white/25 transition-colors px-3 py-2">
                  <textarea
                    ref={taRef}
                    value={input}
                    onChange={(e) => {
                      setInput(e.target.value);
                      autoSize();
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        send(input);
                      }
                    }}
                    placeholder="Ask anything…"
                    rows={1}
                    data-cursor="text"
                    className="flex-1 bg-transparent outline-none text-sm placeholder:text-ink-500 resize-none py-1.5 leading-snug min-h-[28px]"
                  />
                  {streaming ? (
                    <button
                      type="button"
                      data-cursor="hover"
                      data-cursor-label="STOP"
                      onClick={stop}
                      className="flex-shrink-0 w-9 h-9 rounded-xl bg-ink-300 text-ink-950 flex items-center justify-center hover:scale-105 transition"
                      aria-label="Stop"
                    >
                      <Square size={11} fill="currentColor" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      data-cursor="hover"
                      disabled={!input.trim()}
                      className="flex-shrink-0 w-9 h-9 rounded-xl bg-white text-ink-950 flex items-center justify-center disabled:opacity-30 hover:scale-105 active:scale-95 transition"
                      aria-label="Send"
                    >
                      <ArrowUp size={15} />
                    </button>
                  )}
                </div>
              </form>
              <div className="mt-1.5 px-1 flex items-center justify-between text-[10px] font-mono text-ink-500">
                <span>↵ send · ⇧↵ newline · esc close</span>
                <span>v8.2.1</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function EmptyState({ onPick }: { onPick: (s: string) => void }) {
  return (
    <div className="flex flex-col items-center text-center pt-6 pb-2">
      <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-violet via-accent-fuchsia to-accent-cyan flex items-center justify-center mb-5">
        <Sparkles size={24} className="text-white" />
        <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-accent-violet via-accent-fuchsia to-accent-cyan blur-xl opacity-40 -z-10" />
      </div>
      <div className="font-display text-xl font-semibold tracking-tight">
        How can I help?
      </div>
      <div className="text-sm text-ink-300 mt-1.5 max-w-xs">
        Ask anything — about this site, code, ideas, or pick a starter:
      </div>
      <div className="mt-5 grid grid-cols-2 gap-2 w-full">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            data-cursor="hover"
            onClick={() => onPick(s)}
            className="text-left text-xs px-3 py-2.5 rounded-xl glass hover:bg-white/[0.08] transition text-ink-200 leading-snug"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

function Bubble({
  role,
  content,
  streaming,
}: {
  role: "user" | "assistant";
  content: string;
  streaming: boolean;
}) {
  if (role === "user") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="flex justify-end"
      >
        <div className="max-w-[85%] px-4 py-2.5 rounded-2xl rounded-br-md bg-white text-ink-950 text-sm leading-relaxed whitespace-pre-wrap break-words">
          {content}
        </div>
      </motion.div>
    );
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex gap-2.5"
    >
      <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-gradient-to-br from-accent-violet via-accent-fuchsia to-accent-cyan flex items-center justify-center mt-0.5">
        <Sparkles size={12} className="text-white" />
      </div>
      <div className="flex-1 min-w-0 text-sm leading-relaxed text-ink-100 pt-1 whitespace-pre-wrap break-words">
        {content ? (
          <>
            {content}
            {streaming && (
              <span className="inline-block w-[2px] h-[14px] bg-accent-cyan align-middle ml-0.5 animate-pulse" />
            )}
          </>
        ) : (
          <div className="flex items-center gap-1.5 pt-0.5">
            <span
              className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-bounce"
              style={{ animationDelay: "0ms" }}
            />
            <span
              className="w-1.5 h-1.5 rounded-full bg-accent-violet animate-bounce"
              style={{ animationDelay: "120ms" }}
            />
            <span
              className="w-1.5 h-1.5 rounded-full bg-accent-fuchsia animate-bounce"
              style={{ animationDelay: "240ms" }}
            />
            <span className="text-[11px] font-mono text-ink-500 ml-1">Thinking…</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

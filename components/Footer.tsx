"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Check } from "lucide-react";

const columns: { title: string; links: string[] }[] = [
  { title: "Research", links: ["Overview", "Index", "GPT-Next", "Sora", "Safety"] },
  { title: "Products", links: ["ChatGPT", "Enterprise", "API", "DALL·E", "Sora"] },
  { title: "Company", links: ["About", "Blog", "Careers", "Charter", "Brand"] },
  { title: "Resources", links: ["Help center", "Status", "Stories", "Trust", "Contact"] },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [clock, setClock] = useState("");

  useEffect(() => {
    const update = () => {
      const d = new Date();
      const pad = (n: number) => String(n).padStart(2, "0");
      setClock(
        `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())} UTC`
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="relative border-t border-white/5 pt-20 pb-10 bg-ink-950">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-8">
        {/* Terminal-style system block */}
        <div className="rounded-3xl glass-strong overflow-hidden mb-16">
          <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-white/[0.02]">
            <div className="flex items-center gap-2 text-[11px] font-mono">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
              <span className="ml-2 text-ink-300">sys // openai-reimagined</span>
            </div>
            <div className="font-mono text-[11px] text-ink-500 tabular-nums">
              {clock || "—"}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 p-8 sm:p-10">
            <div>
              <div className="font-display text-3xl sm:text-5xl font-semibold tracking-[-0.02em] leading-[1]">
                <span className="text-gradient">$ subscribe</span>
                <br />
                <span className="text-white"> --to insights</span>
              </div>
              <p className="mt-4 text-ink-300 max-w-md">
                Model launches, research updates, and product news. No fluff,
                twice a month, unsubscribe with one click.
              </p>
              <div className="mt-6 font-mono text-[11px] text-ink-500 space-y-1">
                <div>↳ 0.0s · validation</div>
                <div>↳ 0.1s · token issued</div>
                <div>↳ 0.2s · subscriber online</div>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email.includes("@")) {
                  setSubscribed(true);
                  setEmail("");
                  setTimeout(() => setSubscribed(false), 4000);
                }
              }}
              className="flex flex-col gap-3 justify-end"
            >
              <div className="relative rounded-full shimmer-border">
                <div className="flex items-center gap-2 glass-strong rounded-full pl-5 pr-1.5 py-1.5">
                  <span className="text-ink-500 font-mono text-sm">›</span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    data-cursor="text"
                    className="flex-1 bg-transparent outline-none text-sm placeholder:text-ink-500 py-2 font-mono"
                  />
                  <button
                    type="submit"
                    data-cursor="hover"
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white text-ink-950 text-sm font-semibold hover:scale-[1.02] active:scale-95 transition-transform"
                  >
                    {subscribed ? (
                      <><Check size={14} /> Subscribed</>
                    ) : (
                      <>Subscribe <ArrowRight size={14} /></>
                    )}
                  </button>
                </div>
              </div>
              <p className="text-[11px] text-ink-500 font-mono">
                // by subscribing you agree to our terms. unsubscribe anytime.
              </p>
            </form>
          </div>

          {/* System status row */}
          <div className="border-t border-white/5 px-8 py-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-[11px] font-mono">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-ink-500">API</span>
              <span className="text-white ml-auto sm:ml-2">operational</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-ink-500">ChatGPT</span>
              <span className="text-white ml-auto sm:ml-2">operational</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-ink-500">Sora</span>
              <span className="text-white ml-auto sm:ml-2">operational</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-ink-500">Voice</span>
              <span className="text-white ml-auto sm:ml-2">degraded · eu</span>
            </div>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10">
          {columns.map((c) => (
            <div key={c.title}>
              <div className="text-[10px] font-mono tracking-widest uppercase text-ink-500 mb-4">
                ▸ {c.title}
              </div>
              <ul className="space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      data-cursor="hover"
                      className="text-sm text-ink-300 hover:text-white transition-colors"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ASCII signature */}
        <div className="mt-16 pt-8 border-t border-white/5">
          <pre className="font-mono text-[8px] sm:text-[10px] leading-tight text-ink-500 select-none whitespace-pre overflow-hidden">
{`  ███████  ██████  ███████ ███    ██     █████  ██
 ██    ██ ██   ██ ██      ████   ██    ██   ██ ██
 ██    ██ ██████  █████   ██ ██  ██    ███████ ██
 ██    ██ ██      ██      ██  ██ ██    ██   ██ ██
  ██████  ██      ███████ ██   ████    ██   ██ ██`}
          </pre>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-display font-semibold tracking-tight text-base text-gradient">
              OpenAI · Reimagined
            </span>
            <span className="text-[11px] text-ink-500 font-mono ml-2">
              // a visual concept · not affiliated with openai
            </span>
          </div>
          <div className="flex items-center gap-6 text-[11px] text-ink-500 font-mono">
            <a href="#" data-cursor="hover" className="hover:text-white transition">privacy</a>
            <a href="#" data-cursor="hover" className="hover:text-white transition">terms</a>
            <a href="#" data-cursor="hover" className="hover:text-white transition">cookies</a>
            <span>© 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

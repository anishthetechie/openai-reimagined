"use client";

import { useEffect, useState } from "react";

type Metric = {
  key: string;
  label: string;
  format: (v: number) => string;
  baseline: number;
  jitter: number;
  drift?: number;
};

const METRICS: Metric[] = [
  { key: "rps", label: "REQ/SEC", baseline: 28341, jitter: 1200, drift: 4, format: (v) => v.toLocaleString() },
  { key: "lat", label: "AVG LATENCY", baseline: 127, jitter: 18, format: (v) => `${v}ms` },
  { key: "tokens", label: "TOKENS/DAY", baseline: 2.43, jitter: 0.04, drift: 0.001, format: (v) => `${v.toFixed(2)}T` },
  { key: "gpus", label: "H-CHIPS ACTIVE", baseline: 12448, jitter: 12, format: (v) => v.toLocaleString() },
  { key: "lang", label: "LANGUAGES LIVE", baseline: 181, jitter: 0, format: (v) => `${v}` },
  { key: "calls", label: "API CALLS TODAY", baseline: 1843291043, jitter: 80000, drift: 18000, format: (v) => v.toLocaleString() },
];

const TAGLINES = [
  "We don't predict the future. We help write it.",
  "Models that listen, reason, and act.",
  "Built in San Francisco. Deployed worldwide.",
  "Open research. Safety first. Always.",
  "Every modality. One system.",
];

export default function TelemetryTicker() {
  const [vals, setVals] = useState<Record<string, number>>(() =>
    Object.fromEntries(METRICS.map((m) => [m.key, m.baseline]))
  );
  const [taglineIdx, setTaglineIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setVals((prev) => {
        const next: Record<string, number> = {};
        for (const m of METRICS) {
          const drift = m.drift ?? 0;
          const noise = (Math.random() - 0.5) * 2 * m.jitter;
          let v = (prev[m.key] ?? m.baseline) + drift + noise * 0.4;
          // Keep within reasonable band
          if (v < m.baseline - m.jitter * 4) v = m.baseline - m.jitter * 4;
          if (v < 0) v = 0;
          next[m.key] = v;
        }
        return next;
      });
    }, 600);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setTaglineIdx((i) => (i + 1) % TAGLINES.length), 4800);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      aria-label="Live telemetry"
      className="relative border-y border-white/5 bg-ink-950 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink-950 to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink-950 to-transparent z-10" />
      </div>

      <div className="mx-auto max-w-[1500px] px-4 sm:px-8 py-5 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4 items-center">
        {/* Metrics row */}
        <div className="flex items-center gap-x-10 gap-y-3 flex-wrap font-mono text-[11px]">
          <div className="flex items-center gap-2 text-accent-cyan">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-cyan opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent-cyan" />
            </span>
            <span className="uppercase tracking-widest">LIVE</span>
          </div>
          {METRICS.map((m) => {
            const v = vals[m.key] ?? m.baseline;
            const display =
              m.key === "rps" || m.key === "calls" || m.key === "gpus"
                ? m.format(Math.round(v))
                : m.format(v);
            return (
              <div key={m.key} className="flex items-baseline gap-2">
                <span className="text-ink-500 uppercase tracking-widest text-[10px]">
                  {m.label}
                </span>
                <span className="text-white tabular-nums text-sm">{display}</span>
              </div>
            );
          })}
        </div>

        {/* Rotating tagline */}
        <div className="font-mono text-[11px] text-ink-300 uppercase tracking-widest text-right">
          <span className="text-ink-500">// </span>
          <span key={taglineIdx} className="inline-block animate-fade-in">
            {TAGLINES[taglineIdx]}
          </span>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(4px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </section>
  );
}

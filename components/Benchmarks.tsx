"use client";

import { motion, useInView } from "framer-motion";
import { useMemo, useRef, useState } from "react";

const AXES = [
  { key: "reasoning", label: "Reasoning", short: "MMLU-Pro" },
  { key: "code", label: "Code", short: "HumanEval+" },
  { key: "math", label: "Math", short: "MATH-500" },
  { key: "science", label: "Science", short: "GPQA" },
  { key: "vision", label: "Vision", short: "MMMU" },
  { key: "agents", label: "Agents", short: "SWE-Bench" },
  { key: "long", label: "Long-ctx", short: "NIAH" },
];

const MODELS = [
  {
    name: "GPT-Next",
    accent: "rgba(167,139,250,1)",
    accent2: "rgba(34,211,238,1)",
    scores: { reasoning: 91, code: 94, math: 89, science: 78, vision: 86, agents: 73, long: 95 },
  },
  {
    name: "Prior gen",
    accent: "rgba(244,114,182,0.95)",
    accent2: "rgba(244,114,182,0.95)",
    scores: { reasoning: 78, code: 84, math: 71, science: 58, vision: 74, agents: 51, long: 80 },
  },
  {
    name: "Open source",
    accent: "rgba(160,166,184,0.9)",
    accent2: "rgba(160,166,184,0.9)",
    scores: { reasoning: 71, code: 79, math: 64, science: 49, vision: 66, agents: 40, long: 64 },
  },
];

export default function Benchmarks() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [enabled, setEnabled] = useState<Record<string, boolean>>(
    Object.fromEntries(MODELS.map((m) => [m.name, true]))
  );

  const toggle = (n: string) =>
    setEnabled((s) => ({ ...s, [n]: !s[n] }));

  // Geometry
  const size = 520;
  const cx = size / 2;
  const cy = size / 2;
  const r = 200;
  const rings = [0.25, 0.5, 0.75, 1];

  const axisPoints = useMemo(() => {
    return AXES.map((_, i) => {
      const a = (Math.PI * 2 * i) / AXES.length - Math.PI / 2;
      return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r, a };
    });
  }, []);

  const polygons = MODELS.map((m) => {
    const points = AXES.map((ax, i) => {
      const a = (Math.PI * 2 * i) / AXES.length - Math.PI / 2;
      const v = (m.scores[ax.key as keyof typeof m.scores] ?? 0) / 100;
      return {
        x: cx + Math.cos(a) * r * v,
        y: cy + Math.sin(a) * r * v,
      };
    });
    return { name: m.name, points, accent: m.accent, accent2: m.accent2 };
  });

  return (
    <section className="relative py-32 border-y border-white/5 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div ref={ref} className="relative mx-auto max-w-[1500px] px-4 sm:px-8">
        <div className="grid grid-cols-12 gap-8 mb-12">
          <div className="col-span-12 lg:col-span-6">
            <div className="font-mono text-[11px] uppercase tracking-widest text-accent-cyan mb-4">
              §04 — BENCHMARKS
            </div>
            <h2 className="font-display text-5xl sm:text-7xl font-semibold tracking-[-0.03em] leading-[0.9]">
              State of the art —{" "}
              <span className="italic text-gradient" style={{ fontFamily: "Georgia, serif" }}>
                in seven dimensions.
              </span>
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:col-start-9 lg:pt-12">
            <p className="text-ink-300 leading-relaxed">
              Aggregate scores across reasoning, code, math, science, vision,
              agents, and long-context retrieval. Tap a legend to toggle.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-10 items-center">
          {/* Radar chart */}
          <div className="col-span-12 lg:col-span-7 flex items-center justify-center">
            <div className="relative w-full max-w-[560px] aspect-square">
              <svg
                viewBox={`0 0 ${size} ${size}`}
                className="w-full h-full"
                aria-label="Benchmark radar chart"
              >
                <defs>
                  {polygons.map((p, i) => (
                    <linearGradient
                      key={p.name + i}
                      id={`grad-${i}`}
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="1"
                    >
                      <stop offset="0%" stopColor={p.accent} />
                      <stop offset="100%" stopColor={p.accent2} />
                    </linearGradient>
                  ))}
                </defs>

                {/* Concentric polygons */}
                {rings.map((ring, ri) => {
                  const pts = AXES.map((_, i) => {
                    const a = (Math.PI * 2 * i) / AXES.length - Math.PI / 2;
                    return `${cx + Math.cos(a) * r * ring},${cy + Math.sin(a) * r * ring}`;
                  }).join(" ");
                  return (
                    <polygon
                      key={ri}
                      points={pts}
                      fill="none"
                      stroke="rgba(255,255,255,0.07)"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* Axis lines */}
                {axisPoints.map((p, i) => (
                  <line
                    key={i}
                    x1={cx}
                    y1={cy}
                    x2={p.x}
                    y2={p.y}
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="1"
                  />
                ))}

                {/* Model polygons */}
                {polygons.map((p, i) => {
                  if (!enabled[p.name]) return null;
                  const pts = p.points.map((q) => `${q.x},${q.y}`).join(" ");
                  return (
                    <g key={p.name}>
                      <motion.polygon
                        points={pts}
                        fill={`url(#grad-${i})`}
                        stroke={p.accent}
                        strokeWidth="1.5"
                        fillOpacity={i === 0 ? 0.22 : 0.1}
                        initial={{ opacity: 0, scale: 0.3 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        style={{ transformOrigin: `${cx}px ${cy}px` }}
                        transition={{
                          duration: 1.2,
                          delay: 0.2 + i * 0.15,
                          ease: [0.2, 0.8, 0.2, 1],
                        }}
                      />
                      {/* Vertex dots */}
                      {p.points.map((q, j) => (
                        <motion.circle
                          key={j}
                          cx={q.x}
                          cy={q.y}
                          r={i === 0 ? 4 : 2.5}
                          fill={p.accent}
                          initial={{ opacity: 0 }}
                          animate={inView ? { opacity: 1 } : {}}
                          transition={{ delay: 0.4 + j * 0.05 + i * 0.1 }}
                        />
                      ))}
                    </g>
                  );
                })}

                {/* Axis labels */}
                {AXES.map((ax, i) => {
                  const a = (Math.PI * 2 * i) / AXES.length - Math.PI / 2;
                  const lr = r + 36;
                  const x = cx + Math.cos(a) * lr;
                  const y = cy + Math.sin(a) * lr;
                  return (
                    <g key={ax.key}>
                      <text
                        x={x}
                        y={y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="fill-white"
                        fontFamily="var(--font-display)"
                        fontSize="14"
                        fontWeight="600"
                      >
                        {ax.label}
                      </text>
                      <text
                        x={x}
                        y={y + 14}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="fill-ink-500"
                        fontSize="9"
                        fontFamily="ui-monospace, monospace"
                      >
                        {ax.short}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Right rail: legend + comparison table */}
          <div className="col-span-12 lg:col-span-5 space-y-4">
            <div className="font-mono text-[11px] uppercase tracking-widest text-ink-500">
              // models
            </div>
            {MODELS.map((m, i) => {
              const isOn = enabled[m.name];
              const avg = Math.round(
                AXES.reduce(
                  (s, ax) => s + (m.scores[ax.key as keyof typeof m.scores] ?? 0),
                  0
                ) / AXES.length
              );
              return (
                <button
                  key={m.name}
                  data-cursor="hover"
                  onClick={() => toggle(m.name)}
                  className={`w-full text-left rounded-2xl p-5 transition-all ${
                    isOn
                      ? "glass-strong"
                      : "glass opacity-50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{
                          background: `linear-gradient(135deg, ${m.accent}, ${m.accent2})`,
                          opacity: isOn ? 1 : 0.3,
                        }}
                      />
                      <span className="font-display font-semibold">
                        {m.name}
                      </span>
                    </div>
                    <span className="text-xs text-ink-500 font-mono">
                      {isOn ? "ON" : "OFF"}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <div className="font-display text-4xl font-semibold tabular-nums">
                      {avg}
                    </div>
                    <div className="text-xs text-ink-500 font-mono">/ 100 avg</div>
                  </div>
                  {/* Tiny inline sparkline of scores */}
                  <div className="mt-3 flex items-end gap-1 h-6">
                    {AXES.map((ax) => {
                      const v = m.scores[ax.key as keyof typeof m.scores] ?? 0;
                      return (
                        <div
                          key={ax.key}
                          className="flex-1 rounded-sm"
                          style={{
                            height: `${v}%`,
                            background: `linear-gradient(to top, ${m.accent}, ${m.accent2})`,
                            opacity: isOn ? 0.9 : 0.25,
                          }}
                        />
                      );
                    })}
                  </div>
                </button>
              );
            })}
            <p className="text-[11px] text-ink-500 font-mono">
              // illustrative scores. see model card for methodology.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

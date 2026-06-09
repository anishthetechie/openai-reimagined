"use client";

import { motion } from "framer-motion";

const EVENTS = [
  {
    when: "11 MIN AGO",
    tag: "PRODUCT",
    title: "GPT-Next preview opened to 10,000 more developers",
    body: "Wait-listed teams in 27 countries got access this morning.",
    color: "from-violet-400 to-fuchsia-400",
  },
  {
    when: "2 HRS AGO",
    tag: "RESEARCH",
    title: "Paper: Deliberative alignment for high-stakes decisions",
    body: "Method for training models to deliberate over policies before acting.",
    color: "from-cyan-400 to-blue-400",
  },
  {
    when: "5 HRS AGO",
    tag: "INFRA",
    title: "EU-Frankfurt region now serving low-latency inference",
    body: "P50 latency to Frankfurt is 38ms; data residency available on Enterprise.",
    color: "from-emerald-400 to-cyan-400",
  },
  {
    when: "YESTERDAY",
    tag: "PARTNERSHIP",
    title: "Khan Academy expands AI tutoring to 4 new subjects",
    body: "Physics, organic chemistry, US government, and music theory go live.",
    color: "from-amber-300 to-rose-400",
  },
  {
    when: "2 DAYS AGO",
    tag: "SAFETY",
    title: "Preparedness framework v3 published",
    body: "New evals for cyber, bio, and autonomous replication thresholds.",
    color: "from-rose-400 to-fuchsia-500",
  },
];

export default function Today() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-8">
        <div className="grid grid-cols-12 gap-8 mb-16 items-end">
          <div className="col-span-12 lg:col-span-7">
            <div className="font-mono text-[11px] uppercase tracking-widest text-accent-cyan mb-4">
              §05 — TODAY · LIVE
            </div>
            <h2 className="font-display text-5xl sm:text-7xl font-semibold tracking-[-0.03em] leading-[0.9]">
              The last 48 hours
              <br />
              <span className="italic text-gradient" style={{ fontFamily: "Georgia, serif" }}>
                in real time.
              </span>
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-3 lg:col-start-10 text-right">
            <div className="font-mono text-[11px] uppercase tracking-widest text-ink-500">
              Auto-refresh
            </div>
            <div className="font-mono text-2xl text-white tabular-nums mt-1">
              <Pulse />
            </div>
          </div>
        </div>

        {/* Vertical timeline */}
        <div className="relative pl-6 sm:pl-12">
          {/* Spine */}
          <div className="absolute left-0 sm:left-3 top-2 bottom-2 w-px bg-gradient-to-b from-white/30 via-white/10 to-transparent" />

          <div className="space-y-10 sm:space-y-14">
            {EVENTS.map((e, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.06 }}
                className="relative grid grid-cols-12 gap-4 sm:gap-8 items-start"
              >
                {/* Dot on spine */}
                <div className="absolute -left-6 sm:-left-12 top-1.5 flex items-center gap-2 sm:gap-3">
                  <div className="relative">
                    <div
                      className={`w-3 h-3 rounded-full bg-gradient-to-br ${e.color}`}
                    />
                    {i === 0 && (
                      <div
                        className={`absolute inset-0 rounded-full bg-gradient-to-br ${e.color} animate-ping`}
                      />
                    )}
                  </div>
                </div>

                <div className="col-span-12 sm:col-span-3">
                  <div className="font-mono text-[11px] uppercase tracking-widest text-ink-300">
                    {e.when}
                  </div>
                  <div
                    className={`inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest bg-gradient-to-r ${e.color} text-ink-950`}
                  >
                    {e.tag}
                  </div>
                </div>

                <div className="col-span-12 sm:col-span-9">
                  <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight leading-tight">
                    {e.title}
                  </h3>
                  <p className="mt-2 text-ink-300 leading-relaxed">{e.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Pulse() {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
      <span className="text-sm">LIVE</span>
    </span>
  );
}

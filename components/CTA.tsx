"use client";

import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";

export default function CTA() {
  return (
    <section id="company" className="relative py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9 }}
          className="relative rounded-3xl overflow-hidden p-12 sm:p-20 text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent-violet/40 via-accent-fuchsia/30 to-accent-cyan/40" />
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="absolute -inset-x-40 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-aurora opacity-30 blur-3xl rounded-full animate-spin-slow" />
            <div
              className="absolute -bottom-32 -right-32 w-96 h-96 bg-aurora opacity-20 blur-3xl rounded-full animate-spin-slow"
              style={{ animationDirection: "reverse" }}
            />
          </div>

          <div className="relative">
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.02] max-w-4xl mx-auto">
              <span className="text-white">Build what's next</span>{" "}
              <span className="text-gradient">with us.</span>
            </h2>
            <p className="mt-6 text-lg text-ink-100/80 max-w-2xl mx-auto">
              Join engineers, researchers, designers, and policy experts working
              on the most important technology of our time.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center items-center">
              <MagneticButton
                className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-white text-ink-950 text-base font-semibold hover:shadow-[0_8px_40px_-10px_rgba(255,255,255,0.5)] transition-shadow"
                strength={0.4}
              >
                See open roles <span aria-hidden>→</span>
              </MagneticButton>
              <MagneticButton
                className="inline-flex items-center justify-center px-7 py-3 rounded-full border border-white/30 text-base font-semibold hover:bg-white/10 transition"
                strength={0.25}
              >
                Explore the API
              </MagneticButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

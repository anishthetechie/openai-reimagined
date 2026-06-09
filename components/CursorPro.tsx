"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

type Variant = "default" | "hover" | "text" | "view";

export default function CursorPro() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  // Trailing aurora lags slightly behind with spring physics
  const trailX = useSpring(x, { damping: 22, stiffness: 180, mass: 0.55 });
  const trailY = useSpring(y, { damping: 22, stiffness: 180, mass: 0.55 });
  // Subtle press scale
  const pressed = useMotionValue(1);

  const [variant, setVariant] = useState<Variant>("default");
  const [label, setLabel] = useState<string>("");
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
      setEnabled(false);
      return;
    }

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);

      const el = e.target as HTMLElement | null;
      if (!el) return;

      const interactive = el.closest(
        'a, button, [role="button"], input, textarea, [data-cursor]'
      ) as HTMLElement | null;

      if (interactive) {
        const v = (interactive.dataset.cursor as Variant) || "hover";
        setVariant(v);
        const cl = interactive.dataset.cursorLabel;
        if (cl) {
          setLabel(cl);
        } else if (interactive.tagName === "INPUT" || interactive.tagName === "TEXTAREA") {
          setLabel("TYPE");
        } else if (interactive.tagName === "A") {
          setLabel("OPEN");
        } else if (
          interactive.tagName === "BUTTON" ||
          interactive.getAttribute("role") === "button"
        ) {
          setLabel("TAP");
        } else {
          setLabel("");
        }
      } else if (
        ["P", "H1", "H2", "H3", "H4", "BLOCKQUOTE", "LI", "PRE", "CODE"].includes(el.tagName)
      ) {
        setVariant("text");
        setLabel("");
      } else {
        setVariant("default");
        setLabel("");
      }
    };

    const onLeave = () => setVisible(false);
    const onDown = () => pressed.set(0.85);
    const onUp = () => pressed.set(1);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseout", onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [x, y, pressed]);

  if (!enabled) return null;

  return (
    <>
      {/* Trailing aurora glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed z-[78] -translate-x-1/2 -translate-y-1/2"
        style={{ x: trailX, y: trailY, opacity: visible ? 0.85 : 0 }}
      >
        <div
          className="w-10 h-10 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(167,139,250,0.55), rgba(34,211,238,0.2) 50%, transparent 75%)",
            filter: "blur(10px)",
          }}
        />
      </motion.div>

      {/* Main cursor — arrow or caret */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed z-[80] origin-top-left"
        style={{ x, y, opacity: visible ? 1 : 0 }}
      >
        <AnimatePresence mode="wait">
          {variant === "text" ? (
            <motion.div
              key="caret"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.12 }}
              className="absolute"
              style={{ left: -1, top: -11 }}
            >
              <div className="w-[2px] h-[22px] rounded-sm bg-white mix-blend-difference" />
            </motion.div>
          ) : (
            <motion.div
              key="arrow"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: variant === "hover" ? 1.12 : 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
              style={{ scale: pressed, transformOrigin: "1px 1px" }}
            >
              <ArrowPointer />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Label chip on hover */}
        <AnimatePresence>
          {label && variant !== "text" && (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: -6, y: -4, scale: 0.85 }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: -6, y: -4, scale: 0.85 }}
              transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
              className="absolute left-[22px] top-[20px] inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono font-semibold tracking-[0.18em] uppercase whitespace-nowrap"
              style={{
                background:
                  "linear-gradient(135deg, #ffffff 0%, #ece4ff 100%)",
                color: "#05060a",
                boxShadow:
                  "0 6px 22px -4px rgba(139,92,246,0.55), 0 0 0 1px rgba(255,255,255,0.55), 0 0 30px -10px rgba(34,211,238,0.4)",
              }}
            >
              <span>{label}</span>
              <span aria-hidden style={{ fontSize: "9px" }}>
                ↗
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

function ArrowPointer() {
  // viewBox includes 2px padding around the arrow so drop-shadow filter isn't clipped.
  // Internal (0,0) — the tip — lives at SVG pixel (2,2). The wrapper's translate(-2,-2)
  // shifts the SVG so the tip sits exactly at the cursor coordinate.
  return (
    <svg
      width="24"
      height="28"
      viewBox="-2 -2 20 24"
      style={{
        display: "block",
        marginLeft: -2,
        marginTop: -2,
        filter:
          "drop-shadow(0 4px 8px rgba(139,92,246,0.5)) drop-shadow(0 2px 2px rgba(0,0,0,0.55))",
      }}
    >
      <defs>
        <linearGradient id="arrowFill" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="55%" stopColor="#f4eeff" />
          <stop offset="100%" stopColor="#cbb8ff" />
        </linearGradient>
        <linearGradient id="arrowStroke" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(40,20,80,0.85)" />
          <stop offset="100%" stopColor="rgba(20,8,40,0.95)" />
        </linearGradient>
      </defs>
      {/* Tip at (0,0). Path forms a clean, slightly slim modern arrow. */}
      <path
        d="M 0 0 L 0 16.5 L 4.7 12.5 L 7.4 18.8 L 9.7 17.8 L 7.1 11.6 L 12.6 11.6 Z"
        fill="url(#arrowFill)"
        stroke="url(#arrowStroke)"
        strokeWidth="0.7"
        strokeLinejoin="round"
      />
      {/* Inner highlight along left edge for depth */}
      <path
        d="M 0.7 1.6 L 0.7 14.4"
        stroke="rgba(255,255,255,0.85)"
        strokeWidth="0.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

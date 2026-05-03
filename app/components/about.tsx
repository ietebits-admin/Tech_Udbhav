"use client";

import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import EventSlider from "./EventSlider";

type ParticleProps = {
  delay: number;
  x: string;
  duration: number;
  height: number;
};

function Particle({ delay, x, duration, height }: ParticleProps) {
  return (
    <motion.div
      className="absolute w-[2px] rounded-full pointer-events-none"
      style={{
        left: x,
        bottom: "-10px",
        height: `${height}px`,
        background:
          "linear-gradient(to top, transparent, rgba(239, 68, 68, 0.55))",
        filter: "blur(0.5px)",
      }}
      animate={{
        y: [0, -520],
        opacity: [0, 0.8, 0],
        scaleX: [1, 1.25, 0.9],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}

export default function About() {
  const reduceMotion = useReducedMotion();

  const particles = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        delay: i * 0.45,
        x: `${4 + i * 8}%`,
        duration: 5 + (i % 4),
        height: 16 + (i % 4) * 10,
      })),
    [],
  );

  const eventLabels = ["ROBO SOCCER", "CLOAK CODING", "MINEFIELD RESCUE", "SENSORSYNC", "TECHNO-ग्राम", "Event 110"];

  return (
    <section
      id="about"
      className="relative min-h-screen overflow-hidden bg-[#080808] text-white scroll-mt-28"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
        }}
      />

      <div
        className="pointer-events-none absolute top-0 left-0 right-0 z-[1]"
        style={{
          height: "220px",
          background:
            "radial-gradient(ellipse 80% 100% at 50% 0%, rgba(255,0,0,0.16) 0%, transparent 75%)",
        }}
      />

      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-[1]"
        style={{
          height: "220px",
          background:
            "radial-gradient(ellipse 70% 100% at 50% 100%, rgba(255,0,0,0.2) 0%, transparent 70%)",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.025]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "180px 180px",
        }}
      />

      {!reduceMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[2]">
          {particles.map((particle, index) => (
            <Particle key={index} {...particle} />
          ))}
        </div>
      )}

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-6 py-24 md:px-10 md:py-28">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto mb-12 flex max-w-4xl flex-col items-center text-center"
        >
          <span
            className="mb-4 inline-flex items-center rounded-full border border-red-500/30 bg-red-500/8 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.35em] text-red-400"
            style={{ fontFamily: "'Courier New', monospace" }}
          >
            Event Teaser
          </span>

          <h2
            className="font-black uppercase leading-[0.9] tracking-[-0.04em]"
            style={{
              backgroundImage: "url('/red.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              WebkitBackgroundClip: "text",
              color: "transparent",
              fontSize: "clamp(3rem, 10vw, 7rem)",
              fontFamily: "'Georgia', serif",
              textShadow: "0 0 24px rgba(220,38,38,0.18)",
            }}
          >
            Our Events
          </h2>

          <div
            className="mt-4 h-[2px] w-24 bg-[#dc2626]"
            style={{ boxShadow: "0 0 10px rgba(220,38,38,0.5)" }}
          />

          <p
            className="mt-6 max-w-2xl leading-relaxed"
            style={{
              color: "rgba(255,255,255,0.62)",
              fontFamily: "'Georgia', serif",
              fontSize: "clamp(0.95rem, 2.2vw, 1.08rem)",
              lineHeight: 1.8,
            }}
          >
            Step into a lineup of technical challenges, high-stakes robotics,
            and code-driven showdowns crafted to test creativity, speed, and
            precision. Explore the event universe and get ready for what is
            coming next.
          </p>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 32 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.08 }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-[2rem] bg-red-600/8 blur-3xl" />
          <div className="relative rounded-[2rem] border border-white/10 bg-black/25 p-3 backdrop-blur-sm md:p-5">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-2">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0"
                  style={{
                    border: "1.5px solid rgba(220,38,38,0.4)",
                    boxShadow: "0 0 10px rgba(220,38,38,0.15)",
                  }}
                >
                  <img
                    src="./techno.png"
                    alt="Technogram"
                    className="w-full h-full object-cover"
                    style={{ filter: "brightness(0.9) saturate(1.1)" }}
                  />
                </div>
                <div>
                  <p
                    className="font-black text-white leading-tight"
                    style={{
                      fontFamily: "'Georgia', serif",
                      fontSize: "clamp(0.75rem, 2vw, 0.9rem)",
                    }}
                  >
                    TECHNO-ग्राम
                  </p>
                  <p
                    className="font-bold uppercase tracking-widest"
                    style={{
                      color: "#ef4444",
                      fontFamily: "'Courier New', monospace",
                      fontSize: "clamp(6px, 1.4vw, 8px)",
                    }}
                  >
                    Now Live &#8212; Register Open
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {eventLabels.map((label, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 rounded-full font-bold uppercase"
                    style={{
                      fontFamily: "'Courier New', monospace",
                      fontSize: "clamp(6px, 1.3vw, 8px)",
                      padding: "3px 8px",
                      background: i === 0 ? "rgba(220,38,38,0.12)" : "rgba(255,255,255,0.04)",
                      border: i === 0 ? "1px solid rgba(220,38,38,0.4)" : "1px solid rgba(255,255,255,0.08)",
                      color: i === 0 ? "#ef4444" : "rgba(255,255,255,0.25)",
                    }}
                  >
                    {i === 0 && (
                      <span
                        className="w-1 h-1 rounded-full animate-pulse flex-shrink-0"
                        style={{ background: "#ef4444" }}
                      />
                    )}
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <EventSlider />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
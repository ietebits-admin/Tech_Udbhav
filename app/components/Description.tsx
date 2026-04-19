"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const FLOATING_MEDIA = [
  {
    src: "/udbhav1.png",
    alt: "Tech visual 1",
    className:
      "absolute left-[-2%] top-[5%] w-[240px] rotate-[-15deg] opacity-[0.12] brightness-110 grayscale",
    width: 240,
    height: 240,
  },
  {
    src: "/udbhav2.png",
    alt: "Tech visual 2",
    className:
      "absolute bottom-[10%] left-[4%] w-[280px] rotate-[10deg] opacity-[0.1] brightness-110 grayscale",
    width: 280,
    height: 280,
  },
  {
    src: "/udbhav3.png",
    alt: "Tech visual 3",
    className:
      "absolute right-[-1%] top-[15%] w-[260px] rotate-[15deg] opacity-[0.12] brightness-110 grayscale",
    width: 260,
    height: 260,
  },
  {
    src: "/udbhav4.png",
    alt: "Tech visual 4",
    className:
      "absolute bottom-[5%] right-[6%] w-[220px] rotate-[-12deg] opacity-[0.1] brightness-110 grayscale",
    width: 220,
    height: 220,
  },
  {
    src: "/udbhav5.png",
    alt: "Tech visual 5",
    className:
      "absolute left-[15%] top-[40%] w-[200px] rotate-[20deg] opacity-[0.08] brightness-110 grayscale",
    width: 200,
    height: 200,
  },
  {
    src: "/udbhav6.png",
    alt: "Tech visual 6",
    className:
      "absolute right-[18%] top-[35%] w-[230px] rotate-[-18deg] opacity-[0.08] brightness-110 grayscale",
    width: 230,
    height: 230,
  },
] as const;

type ParticleProps = {
  delay: number;
  x: string;
  duration: number;
  size: number;
  height: number;
};

function Particle({ delay, x, duration, size, height }: ParticleProps) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: x,
        bottom: "-10%",
        width: `${size}px`,
        height: `${height}px`,
        background:
          "linear-gradient(to top, transparent, rgba(239, 68, 68, 0.6), rgba(255,255,255,0.3))",
        filter: `blur(${size * 0.4}px)`,
        willChange: "transform, opacity",
      }}
      animate={{
        y: [0, -1100],
        opacity: [0, 1, 0.8, 0],
        scaleX: [1, 1.5, 1],
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

export default function Description() {
  const reduceMotion = useReducedMotion();

  const particles = useMemo(
    () =>
      Array.from({ length: 24 }, (_, index) => ({
        delay: (index % 8) * 0.9,
        x: `${(index * 4.1) % 100}%`,
        duration: 7 + (index % 6),
        size: 1 + (index % 3),
        height: 24 + (index % 5) * 12,
      })),
    [],
  );

  return (
    <motion.section
      id="description"
      initial={reduceMotion ? false : { opacity: 0, y: 40 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#080808] py-20"
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

      <div className="absolute inset-0 z-[1]">
        {FLOATING_MEDIA.map((item) => (
          <Image
            key={item.src}
            src={item.src}
            alt={item.alt}
            width={item.width}
            height={item.height}
            className={item.className}
          />
        ))}
      </div>

      <div
        className="pointer-events-none absolute left-0 right-0 top-0 z-[5]"
        style={{
          height: "250px",
          background:
            "radial-gradient(ellipse 80% 100% at 50% 0%, rgba(255,0,0,0.16) 0%, transparent 75%)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-[5]"
        style={{
          height: "250px",
          background:
            "radial-gradient(ellipse 70% 100% at 50% 100%, rgba(255,0,0,0.2) 0%, transparent 70%)",
        }}
      />

      {!reduceMotion && (
        <div className="absolute inset-0 z-[8] overflow-hidden pointer-events-none">
          {particles.map((particle, index) => (
            <Particle key={index} {...particle} />
          ))}
        </div>
      )}

      <div className="relative z-30 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2">
        <div className="order-2 flex flex-col items-center lg:order-1 lg:items-start">
          <h2
            className="mb-4 font-black uppercase tracking-[-0.02em]"
            style={{
              backgroundImage: "url('/red.png')",
              backgroundSize: "cover",
              WebkitBackgroundClip: "text",
              color: "transparent",
              fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
              fontFamily: "'Georgia', serif",
            }}
          >
            About Us
          </h2>

          <div
            className="mb-10 h-[2px] w-24 bg-[#dc2626]"
            style={{ boxShadow: "0 0 10px rgba(220,38,38,0.5)" }}
          />

          <div className="space-y-6 text-center lg:text-left">
            <p
              className="max-w-xl leading-relaxed"
              style={{
                color: "rgba(255,255,255,0.6)",
                fontFamily: "'Georgia', serif",
                fontSize: "clamp(0.9rem, 2.2vw, 1.05rem)",
                lineHeight: 1.8,
              }}
            >
              Tech Udbhav 2026, the flagship technical fest presented by the{" "}
              <span
                style={{
                  color: "#ef4444",
                  fontFamily: "'Courier New', monospace",
                  fontWeight: "bold",
                }}
              >
                IETE Students Forum
              </span>
              , is on the horizon! Get ready to immerse yourself in a world
              where creativity knows no bounds and innovation takes center
              stage.
              <br />
              <br />
              Tech Udbhav is more than just a fest; it is an experience that
              will leave you inspired and awestruck. Stay tuned as we reveal
              more about our lineup of events, attractions, and surprises in
              store.
            </p>
          </div>
        </div>

        <div className="relative order-1 flex justify-center lg:order-2 lg:justify-end">
          <div className="group relative">
            <div className="absolute -inset-4 rounded-xl bg-[#dc2626] opacity-[0.12] blur-3xl transition-opacity group-hover:opacity-[0.18]" />
            <div className="relative z-10">
              <Image
                src="/main_poster2.png"
                alt="Tech Udbhav Poster"
                width={380}
                height={507}
                className="aspect-[3/4] w-full max-w-[380px] rounded-xl border border-white/10 bg-[#0a0a0a] object-contain shadow-2xl"
                style={{ filter: "brightness(0.9) contrast(1.1)" }}
                priority={false}
              />
              <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/20" />
            </div>

            <div className="absolute -right-3 -top-3 h-12 w-12 border-r-2 border-t-2 border-[#dc2626]/60" />
            <div className="absolute -bottom-3 -left-3 h-12 w-12 border-b-2 border-l-2 border-[#dc2626]/60" />

            <div
              className="absolute bottom-4 right-4 z-20 text-[9px] font-bold uppercase tracking-widest opacity-40"
              style={{ color: "white", fontFamily: "'Courier New', monospace" }}
            >
              EST. 2026 // IETE-SF
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

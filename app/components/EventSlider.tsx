"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const EVENTS = [
  { id: 0, code: "001", title: "ROBO SOCCER", image: "/robosoccer.png" },
  { id: 1, code: "010", title: "CLOAK CODING", image: "/cloakcoding.png" },
  { id: 2, code: "011", title: "MINEFIELD RESCUE", image: "/minefield.png" },
  { id: 3, code: "100", title: "SENSORSYNC", image: "/sensor.png" },
  { id: 4, code: "101", title: "TECHNO-ग्राम", image: "/techno.png" },
  { id: 5, code: "110", title: "COMING SOON", image: "/comingsoon.png" },
];

function useScramble(value: string) {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const chars = ["0", "1"];
    let iterations = 0;
    const id = setInterval(() => {
      setDisplay(
        value
          .split("")
          .map((char, i) =>
            i < iterations ? char : chars[Math.floor(Math.random() * 2)]
          )
          .join("")
      );
      iterations += 0.5;
      if (iterations >= value.length) {
        clearInterval(id);
        setDisplay(value);
      }
    }, 50);
    return () => clearInterval(id);
  }, [value]);

  return display;
}

type Props = {
  activeIndex?: number;
  onActiveChange?: (index: number) => void;
};

export default function EventSlider({ activeIndex, onActiveChange }: Props) {
  const [internalActive, setInternalActive] = useState(0);
  const active = activeIndex !== undefined ? activeIndex : internalActive;

  const setActive = (i: number) => {
    setInternalActive(i);
    onActiveChange?.(i);
  };

  const scrambled = useScramble(EVENTS[active].code);

  const prev = () => setActive((active - 1 + EVENTS.length) % EVENTS.length);
  const next = () => setActive((active + 1) % EVENTS.length);

  const getPos = (i: number) => {
    const diff = (i - active + EVENTS.length) % EVENTS.length;
    if (diff === 0) return "center";
    if (diff === 1) return "right";
    if (diff === EVENTS.length - 1) return "left";
    if (diff === 2) return "far-right";
    if (diff === EVENTS.length - 2) return "far-left";
    return "hidden";
  };

  return (
    <div className="flex flex-col items-center w-full max-w-7xl gap-4">
      <div className="relative flex h-[420px] w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 md:h-[560px]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/strangeBIT.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: "scale(1.08)",
            filter: "brightness(0.85) contrast(1.1)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.55)_100%)]" />

        <div className="relative z-10 flex h-full w-full items-center justify-center">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous event"
            className="absolute left-3 z-40 hidden md:flex rounded-full border border-white/20 bg-black/30 p-3 backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-black/50 hover:border-red-500/50 md:left-8"
          >
            <ChevronLeft size={28} className="text-white" />
          </button>

          <div className="relative flex h-full w-full items-center justify-center">
            {EVENTS.map((event, index) => {
              const pos = getPos(index);
              if (pos === "hidden") return null;

              const isCenter = pos === "center";
              const xMap: Record<string, number> = {
                center: 0,
                left: -280,
                right: 280,
                "far-left": -480,
                "far-right": 480,
              };
              const scaleMap: Record<string, number> = {
                center: 1,
                left: 0.82,
                right: 0.82,
                "far-left": 0.65,
                "far-right": 0.65,
              };
              const opacityMap: Record<string, number> = {
                center: 1,
                left: 0.45,
                right: 0.45,
                "far-left": 0.18,
                "far-right": 0.18,
              };

              return (
                <motion.div
                  key={event.id}
                  animate={{
                    scale: scaleMap[pos],
                    x: xMap[pos],
                    opacity: opacityMap[pos],
                    rotateY: pos === "left" ? 18 : pos === "right" ? -18 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 130, damping: 20 }}
                  className={`absolute ${isCenter ? "z-30 cursor-default" : "z-10 cursor-pointer"}`}
                  onClick={!isCenter ? () => setActive(index) : undefined}
                  style={{
                    width: "clamp(200px, 40vw, 320px)",
                    height: "clamp(260px, 52vw, 440px)",
                  }}
                >
                  <div
                    className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl"
                    style={{
                      border: isCenter
                        ? "1.5px solid rgba(220,38,38,0.6)"
                        : "1px solid rgba(255,255,255,0.08)",
                      boxShadow: isCenter
                        ? "0 0 32px rgba(220,38,38,0.22), 0 20px 60px rgba(0,0,0,0.7)"
                        : "0 8px 32px rgba(0,0,0,0.5)",
                      background: "#000",
                    }}
                  >
                    <AnimatePresence mode="wait">
                      {event.image && (
                        <motion.img
                          key={event.image}
                          src={event.image}
                          alt={event.title}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: isCenter ? 0.92 : 0.6 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.35 }}
                          className="absolute inset-0 h-full w-full"
                          style={{ objectFit: "contain" }}
                        />
                      )}
                    </AnimatePresence>

                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
                      }}
                    />

                    {isCenter && (
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background:
                            "radial-gradient(ellipse at 50% 0%, rgba(220,38,38,0.08) 0%, transparent 70%)",
                        }}
                      />
                    )}

                    <div className="relative z-10 flex h-full w-full flex-col justify-between p-4 md:p-5">
                      <span
                        className="font-mono text-[10px] tracking-[0.25em] uppercase"
                        style={{ color: "rgba(220,38,38,0.85)" }}
                      >
                        EVENT {isCenter ? scrambled : event.code}
                      </span>

                      <div className="flex flex-col gap-1">
                        <h3
                          className="font-black uppercase leading-none tracking-tight"
                          style={{
                            fontFamily: "'Georgia', serif",
                            fontSize: "clamp(1rem, 3.5vw, 1.6rem)",
                            color: "#fff",
                            textShadow: isCenter
                              ? "0 0 20px rgba(220,38,38,0.5), 0 2px 8px rgba(0,0,0,0.9)"
                              : "0 2px 6px rgba(0,0,0,0.8)",
                          }}
                        >
                          {event.title}
                        </h3>
                        {isCenter && (
                          <div
                            className="h-[1.5px] w-8 rounded-full"
                            style={{ background: "#dc2626" }}
                          />
                        )}
                      </div>
                    </div>

                    {isCenter && (
                      <div
                        className="absolute bottom-0 left-0 right-0 h-[2px]"
                        style={{
                          background:
                            "linear-gradient(to right, transparent, #dc2626, transparent)",
                        }}
                      />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Next event"
            className="absolute right-3 z-40 hidden md:flex rounded-full border border-white/20 bg-black/30 p-3 backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-black/50 hover:border-red-500/50 md:right-8"
          >
            <ChevronRight size={28} className="text-white" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-6 md:hidden">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous event"
          className="flex rounded-full border border-white/20 bg-white/5 p-3 backdrop-blur-sm transition-all duration-200 active:scale-95"
          style={{ borderColor: "rgba(220,38,38,0.35)" }}
        >
          <ChevronLeft size={24} className="text-white" />
        </button>

        <div className="flex gap-1.5 items-center">
          {EVENTS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === active ? "20px" : "5px",
                height: "5px",
                background: i === active ? "#dc2626" : "rgba(255,255,255,0.22)",
              }}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          aria-label="Next event"
          className="flex rounded-full border border-white/20 bg-white/5 p-3 backdrop-blur-sm transition-all duration-200 active:scale-95"
          style={{ borderColor: "rgba(220,38,38,0.35)" }}
        >
          <ChevronRight size={24} className="text-white" />
        </button>
      </div>

      <div className="hidden md:flex gap-2 items-center">
        {EVENTS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === active ? "20px" : "5px",
              height: "5px",
              background: i === active ? "#dc2626" : "rgba(255,255,255,0.22)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
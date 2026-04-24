"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const EVENTS = [
  { id: 0, code: "001", title: "", image: "/robosoccer.png" },
  { id: 1, code: "010", title: "COMING SOON", image: null },
  { id: 2, code: "011", title: "COMING SOON", image: null },
  { id: 3, code: "100", title: "COMING SOON", image: null },
  { id: 4, code: "101", title: "COMING SOON", image: null },
] as const;

export default function EventSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scramble, setScramble] = useState<string>(EVENTS[0].code);

  useEffect(() => {
    const activeCode = EVENTS[activeIndex].code;
    const chars = ["0", "1"] as const;
    let iterations = 0;

    const intervalId: ReturnType<typeof setInterval> = setInterval(() => {
      setScramble(
        activeCode
          .split("")
          .map((char, index) => {
            if (index < iterations) return char;
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join(""),
      );

      iterations += 0.5;

      if (iterations >= activeCode.length) {
        clearInterval(intervalId);
        setScramble(activeCode);
      }
    }, 50);

    return () => clearInterval(intervalId);
  }, [activeIndex]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % EVENTS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + EVENTS.length) % EVENTS.length);
  };

  return (
    <div className="relative flex h-[450px] w-full max-w-7xl items-center justify-center overflow-hidden rounded-2xl border border-white/10 md:h-[550px]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/strangeBIT.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: "scale(1.1)",
          filter: "brightness(0.9) contrast(1.1)",
        }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0.4)_75%)]" />

      <div className="relative z-10 flex h-full w-full items-center justify-center">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous event"
          className="absolute left-4 z-40 rounded-full border border-white/20 bg-black/20 p-3 backdrop-blur transition hover:scale-110 md:left-10"
        >
          <ChevronLeft size={32} />
        </button>

        <div className="relative flex h-full w-full -translate-y-4 items-center justify-center">
          {EVENTS.map((event, index) => {
            const isCenter = index === activeIndex;
            const isLeft =
              index === (activeIndex - 1 + EVENTS.length) % EVENTS.length;
            const isRight = index === (activeIndex + 1) % EVENTS.length;

            if (!isCenter && !isLeft && !isRight) return null;

            return (
              <motion.div
                key={event.id}
                animate={{
                  scale: isCenter ? 1 : 0.85,
                  x: isCenter ? 0 : isLeft ? -320 : 320,
                  rotateY: isLeft ? 20 : isRight ? -20 : 0,
                  opacity: isCenter ? 1 : 0.4,
                }}
                transition={{ type: "spring", stiffness: 120, damping: 18 }}
                className={`absolute h-[380px] w-[260px] md:h-[460px] md:w-[340px] ${
                  isCenter ? "z-30" : "z-10"
                }`}
              >
                <div className="relative flex h-full w-full flex-col items-center overflow-hidden rounded-xl border border-white/10 bg-black/40 p-4 text-center backdrop-blur-md">
                  {event.image ? (
                    <div className="absolute inset-0 z-0">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="h-full w-full object-cover opacity-60 transition-opacity duration-500 group-hover:opacity-80"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    </div>
                  ) : null}

                  <div className="relative z-10 flex h-full w-full flex-col items-center justify-between py-4">
                    <span className="font-mono text-xs tracking-widest text-red-500 drop-shadow-lg">
                      EVENT {isCenter ? scramble : event.code}
                    </span>

                    <h3 className="stranger-font stranger-glow text-3xl uppercase text-red-500 md:text-4xl">
                      {event.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next event"
          className="absolute right-4 z-40 rounded-full border border-white/20 bg-black/20 p-3 backdrop-blur transition hover:scale-110 md:right-10"
        >
          <ChevronRight size={32} />
        </button>
      </div>
    </div>
  );
}
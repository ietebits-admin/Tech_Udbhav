"use client";

import React, { useEffect, useRef } from "react";
import { MotionValue, motion } from "framer-motion";
import EventSlider from "./EventSlider";

interface AboutProps {
  scrollProgress: MotionValue<number>;
}

const Particle = ({
  delay,
  x,
  duration,
}: {
  delay: number;
  x: string;
  duration: number;
}) => (
  <motion.div
    className="absolute w-[2px] rounded-full pointer-events-none"
    style={{
      left: x,
      bottom: "-10px",
      height: `${Math.random() * 40 + 10}px`,
      background: "linear-gradient(to top, transparent, rgba(239, 68, 68, 0.55))",
      filter: "blur(0.5px)",
    }}
    animate={{
      y: [0, -800],
      opacity: [0, 0.8, 0],
      scaleX: [1, 1.4, 0.8],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "linear",
    }}
  />
);

const About: React.FC<AboutProps> = ({ scrollProgress }) => {
  const topLayerRef = useRef<HTMLDivElement>(null);
  const bottomLayerRef = useRef<HTMLDivElement>(null);
  const innerRevealRef = useRef<HTMLDivElement>(null);
  const crackGlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = scrollProgress.on("change", (value) => {
      const start = 2;
      const end = 3;
      const progress = (value - start) / (end - start);
      const localProgress = Math.min(Math.max(progress, 0), 1);

      const animationFactor = Math.sin(localProgress * Math.PI);
      const snapFactor = Math.pow(animationFactor, 1.2);
      const movement = snapFactor * 98;

      if (topLayerRef.current && bottomLayerRef.current) {
        topLayerRef.current.style.transform = `translateY(-${movement / 2}vh) scale(${1 + snapFactor * 0.08}) rotateX(${snapFactor * 10}deg)`;
        bottomLayerRef.current.style.transform = `translateY(${movement / 2}vh) scale(${1 + snapFactor * 0.08}) rotateX(${-snapFactor * 10}deg)`;

        const textOpacity = 1 - Math.pow(localProgress, 4);
        topLayerRef.current.style.opacity = `${Math.max(textOpacity, 0.4)}`;
        bottomLayerRef.current.style.opacity = `${Math.max(textOpacity, 0.4)}`;
      }

      if (innerRevealRef.current && crackGlowRef.current) {
        innerRevealRef.current.style.opacity = `${snapFactor}`;
        innerRevealRef.current.style.height = `${snapFactor * 105}%`;

        crackGlowRef.current.style.opacity = `${animationFactor}`;
        crackGlowRef.current.style.transform = `translateY(-50%) scaleX(${animationFactor * 3})`;
        crackGlowRef.current.style.boxShadow = `0 0 ${animationFactor * 60}px #ff0000`;
      }
    });

    return () => unsubscribe();
  }, [scrollProgress]);

  const particles = Array.from({ length: 16 }, (_, i) => ({
    delay: i * 0.5,
    x: `${(i / 16) * 100 + Math.random() * 5}%`,
    duration: 5 + Math.random() * 5,
  }));

  const textClassName =
    "absolute text-[15vw] font-black uppercase leading-[0.9] tracking-[-0.05em] text-center select-none pointer-events-none transition-opacity duration-300 z-[12]";

  return (
    <section className="bg-[#080808] text-white overflow-hidden h-screen relative">
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
        className="pointer-events-none absolute top-0 left-0 right-0 z-[5]"
        style={{
          height: "200px",
          background: "radial-gradient(ellipse 80% 100% at 50% 0%, rgba(255,0,0,0.16) 0%, transparent 75%)",
        }}
      />

      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-[5]"
        style={{
          height: "200px",
          background: "radial-gradient(ellipse 70% 100% at 50% 100%, rgba(255,0,0,0.2) 0%, transparent 70%)",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 z-[2] opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px",
        }}
      />

      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[6]">
        {particles.map((p, i) => (
          <Particle key={i} {...p} />
        ))}
      </div>

      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden perspective-[2000px]">
        <div
          ref={innerRevealRef}
          className="absolute top-1/2 left-1/2 w-full h-0 opacity-0 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center z-[1] overflow-hidden"
          style={{
            background: "radial-gradient(circle, rgba(40,0,0,0.4) 0%, #080808 80%)",
          }}
        >
          <EventSlider />
        </div>

        <div
          ref={crackGlowRef}
          className="absolute w-full h-[1.5px] top-1/2 left-0 -translate-y-1/2 scale-x-0 opacity-0 z-[15] bg-[#ef4444]"
        />

        <div
          ref={topLayerRef}
          className={textClassName}
          style={{
            clipPath: "inset(0 0 50% 0)",
            backgroundImage: "url('/red.png')",
            backgroundSize: "cover",
            backgroundPosition: "center 25%",
            WebkitBackgroundClip: "text",
            color: "transparent",
            filter: "brightness(1.5) contrast(1.2) ",
            fontFamily: "stranger-font",
          }}
        >
          OUR<br />EVENTS
        </div>

        <div
          ref={bottomLayerRef}
          className={textClassName}
          style={{
            clipPath: "inset(50% 0 0 0)",
            backgroundImage: "url('/red.png')",
            backgroundSize: "cover",
            backgroundPosition: "center 75%",
            WebkitBackgroundClip: "text",
            color: "transparent",
            filter: "brightness(1.5) contrast(1.2) ",
            fontFamily: "'Georgia', serif",
          }}
        >
          OUR<br />EVENTS
        </div>
      </div>
    </section>
  );
};

export default About;
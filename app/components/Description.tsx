"use client";

import React from "react";
import { motion, MotionValue, useTransform, useSpring } from "framer-motion";

interface DescriptionProps {
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
}) => {
  const size = Math.random() * 2 + 1;
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: x,
        bottom: "-10%",
        width: `${size}px`,
        height: `${Math.random() * 60 + 20}px`,
        background: "linear-gradient(to top, transparent, rgba(239, 68, 68, 0.6), rgba(255,255,255,0.3))",
        filter: `blur(${size * 0.4}px)`,
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
};

const Description: React.FC<DescriptionProps> = ({ scrollProgress }) => {
  const opacity = useTransform(scrollProgress, [2.8, 3.4], [0, 1]);
  const y = useTransform(scrollProgress, [2.8, 3.4], ["80px", "0px"]);
  const rawY = useTransform(scrollProgress, [2.8, 3.4], [-30, 30]);
  const bgY = useSpring(rawY, { stiffness: 120, damping: 20 });

  const particles = Array.from({ length: 40 }, (_, i) => ({
    delay: Math.random() * 10,
    x: `${Math.random() * 100}%`,
    duration: 6 + Math.random() * 6,
  }));

  return (
    <motion.section
      style={{ opacity, y }}
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-[#080808] py-20"
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

      <motion.div style={{ y: bgY }} className="absolute inset-0 z-[1]">
        <img src="./udbhav1.png" className="absolute w-[240px] top-[5%] left-[-2%] rotate-[-15deg] opacity-[0.12] brightness-110 grayscale" alt="tech-1" />
        <img src="./udbhav2.png" className="absolute w-[280px] bottom-[10%] left-[4%] rotate-[10deg] opacity-[0.1] brightness-110 grayscale" alt="tech-2" />
        <img src="./udbhav3.png" className="absolute w-[260px] top-[15%] right-[-1%] rotate-[15deg] opacity-[0.12] brightness-110 grayscale" alt="tech-3" />
        <img src="./udbhav4.png" className="absolute w-[220px] bottom-[5%] right-[6%] rotate-[-12deg] opacity-[0.1] brightness-110 grayscale" alt="tech-4" />
        <img src="./udbhav5.png" className="absolute w-[200px] top-[40%] left-[15%] rotate-[20deg] opacity-[0.08] brightness-110 grayscale" alt="tech-5" />
        <img src="./udbhav6.png" className="absolute w-[230px] top-[35%] right-[18%] rotate-[-18deg] opacity-[0.08] brightness-110 grayscale" alt="tech-6" />
      </motion.div>

      <div
        className="pointer-events-none absolute top-0 left-0 right-0 z-[5]"
        style={{ height: "250px", background: "radial-gradient(ellipse 80% 100% at 50% 0%, rgba(255,0,0,0.16) 0%, transparent 75%)" }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-[5]"
        style={{ height: "250px", background: "radial-gradient(ellipse 70% 100% at 50% 100%, rgba(255,0,0,0.2) 0%, transparent 70%)" }}
      />

      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[8]">
        {particles.map((p, i) => (
          <Particle key={i} {...p} />
        ))}
      </div>

      <div className="relative z-30 max-w-7xl w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start select-none">
          <h2
            className="font-black uppercase mb-4 tracking-[-0.02em]"
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
          <div className="h-[2px] w-24 mb-10 bg-[#dc2626]" style={{ boxShadow: "0 0 10px rgba(220,38,38,0.5)" }} />
          <div className="space-y-6 text-center lg:text-left">
            <p 
              className="leading-relaxed max-w-xl"
              style={{
                color: "rgba(255,255,255,0.6)",
                fontFamily: "'Georgia', serif",
                fontSize: "clamp(0.9rem, 2.2vw, 1.05rem)",
                lineHeight: 1.8
              }}
            >
              Tech Udbhav 2026, the flagship technical fest presented by the <span style={{ color: "#ef4444", fontFamily: "'Courier New', monospace", fontWeight: "bold" }}>IETE Students Forum</span>, is on the horizon!
              Get ready to immerse yourself in a world where creativity knows no bounds and innovation takes center stage. 
              <br /><br />
              Tech Udbhav is more than just a fest; it is an experience that will leave you inspired and awestruck. 
              Stay tuned as we reveal more about our lineup of events, attractions and surprises in store.
            </p>
          </div>
        </div>

        <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
          <div className="relative group">
            <div className="absolute -inset-4 bg-[#dc2626] opacity-[0.12] blur-3xl rounded-xl transition-opacity group-hover:opacity-[0.18]" />
            <div className="relative z-10">
              <img
                src="/main_poster.png" 
                alt="Tech Udbhav Poster"
                className="rounded-xl shadow-2xl w-full max-w-[380px] aspect-[3/4] object-contain bg-[#0a0a0a] border border-white/10"
                style={{ filter: "brightness(0.9) contrast(1.1)" }}
              />
              <div className="absolute inset-0 rounded-xl ring-1 ring-white/20 pointer-events-none" />
            </div>
            <div className="absolute -top-3 -right-3 w-12 h-12 border-t-2 border-r-2 border-[#dc2626]/60" />
            <div className="absolute -bottom-3 -left-3 w-12 h-12 border-b-2 border-l-2 border-[#dc2626]/60" />
            <div 
              className="absolute bottom-4 right-4 text-[9px] font-bold z-20 opacity-40 uppercase tracking-widest"
              style={{ color: "white", fontFamily: "'Courier New', monospace" }}
            >
              EST. 2026 // IETE-SF
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Description;
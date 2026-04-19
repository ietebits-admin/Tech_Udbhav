"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Loader from "./components/Loader";
import SocialSidebar from "./components/SocialSidebar";
import Navbar from "./components/Navbar";
import About from "./components/about";
import Description from "./components/Description";
import EventDescription from "./components/EventDescription";
import SponsorsSection from "./components/Sponsors";
import FooterSection from "./components/Footer";

function AudioToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.5;

    const attemptPlay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    };

    void attemptPlay();
  }, []);

  const toggleAudio = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
      return;
    }

    audio.pause();
    setIsPlaying(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[110]">
      <audio ref={audioRef} src="/titlesong.mp3" loop />
      <button
        type="button"
        onClick={() => void toggleAudio()}
        aria-label={
          isPlaying ? "Pause background music" : "Play background music"
        }
        className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-black/30 backdrop-blur-sm transition-all hover:bg-white/10 active:scale-90"
      >
        {isPlaying ? (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        ) : (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        )}
      </button>
    </div>
  );
}

function HeroSection() {
  const heroRef = useRef<HTMLDivElement | null>(null);

  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const radius = useMotionValue(0);

  const smoothX = useSpring(mouseX, { damping: 40, stiffness: 220 });
  const smoothY = useSpring(mouseY, { damping: 40, stiffness: 220 });
  const smoothRadius = useSpring(radius, { damping: 28, stiffness: 180 });

  const clipPath = useMotionTemplate`circle(${smoothRadius}px at ${smoothX}% ${smoothY}%)`;

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const el = heroRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    mouseX.set(x);
    mouseY.set(y);
    radius.set(150);
  };

  const handleMouseLeave = () => {
    radius.set(0);
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black scroll-mt-28"
    >
      <div
        ref={heroRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative h-screen w-full overflow-hidden"
      >
        <div className="absolute inset-0">
          <Image
            src="/light2.png"
            alt="Base background"
            fill
            className="object-cover"
            priority
          />
        </div>

        <motion.div
          className="absolute inset-0 hidden md:block"
          style={{ clipPath }}
        >
          <Image
            src="/red.png"
            alt="Portal glow"
            fill
            className="object-cover"
            priority={false}
          />
        </motion.div>

        <div className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.18)_75%,rgba(0,0,0,0.55)_100%)]" />

        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-0 px-4 text-center">
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-4 rounded-2xl border border-white/20 px-8 py-3 backdrop-blur-sm"
          >
            <h2 className="text-xs uppercase leading-relaxed tracking-[0.2em] text-white sm:text-sm md:text-base">
              Turn the tech world <br />
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "1px #ef4444", fontSize: "1.2em" }}
              >
                Upside Down
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.92 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[25vw] max-h-[250px] w-[75vw] max-w-[750px] shrink-0"
          >
            <Image
              src="/title6.png"
              alt="Tech Udbhav title"
              fill
              className="object-contain"
              priority
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ x: -120, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute left-[-5%] top-1/2 h-full w-full -translate-y-1/2 overflow-visible portrait:left-[-20%] md:w-auto"
        >
          <Image
            src="/tleft.png"
            alt="Left visual"
            width={800}
            height={3000}
            className="h-full w-full object-cover"
            priority
          />
        </motion.div>

        <motion.div
          initial={{ x: 120, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute right-[-5%] top-1/2 h-full w-full -translate-y-1/2 overflow-visible portrait:right-[-20%] md:w-auto"
        >
          <Image
            src="/tright.png"
            alt="Right visual"
            width={800}
            height={3000}
            className="h-full w-full object-cover"
            priority
          />
        </motion.div>

        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute bottom-[-5%] left-1/2 h-[50vh] w-full -translate-x-1/2 sm:bottom-[-10%] sm:h-[60vh] md:bottom-[-20%] md:h-[50vh]"
        >
          <Image
            src="/kid.png"
            alt="Hero character"
            fill
            className="object-contain scale-[1.2] sm:scale-[1.5] md:scale-[2.2]"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Loader onFinishAction={() => setLoading(false)} />}

      <div
        className={
          loading
            ? "pointer-events-none invisible h-screen overflow-hidden"
            : "visible"
        }
      >
        <Navbar />
        <SocialSidebar />
        <AudioToggle />

        <main className="relative bg-black text-white">
          <HeroSection />
          <About />
          <Description />
          <section id="events" className="scroll-mt-28">
            <EventDescription />
          </section>
          <section id="sponsors" className="scroll-mt-28">
            <SponsorsSection />
          </section>
          <section id="contact" className="scroll-mt-28">
            <FooterSection />
          </section>
        </main>
      </div>
    </>
  );
}

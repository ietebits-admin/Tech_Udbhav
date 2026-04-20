"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type LoaderProps = {
  onFinishAction: () => void;
};

export default function Loader({ onFinishAction }: LoaderProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const hasFinishedRef = useRef(false);
  const skipTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const expandTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fadeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const completeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [canSkip, setCanSkip] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  const clearScheduledTimeouts = useCallback(() => {
    if (skipTimeoutRef.current) clearTimeout(skipTimeoutRef.current);
    if (expandTimeoutRef.current) clearTimeout(expandTimeoutRef.current);
    if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
    if (completeTimeoutRef.current) clearTimeout(completeTimeoutRef.current);

    skipTimeoutRef.current = null;
    expandTimeoutRef.current = null;
    fadeTimeoutRef.current = null;
    completeTimeoutRef.current = null;
  }, []);

  const triggerTransition = useCallback(() => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    setIsCompleting(true);
    setCanSkip(false);

    clearScheduledTimeouts();

    const loader = loaderRef.current;
    if (!loader) {
      onFinishAction();
      return;
    }

    loader.classList.add("st-portal-open");

    expandTimeoutRef.current = setTimeout(() => {
      loader.classList.add("st-portal-expand");
    }, 350);

    fadeTimeoutRef.current = setTimeout(() => {
      loader.style.transition = "opacity 0.7s ease";
      loader.style.opacity = "0";
    }, 800);

    completeTimeoutRef.current = setTimeout(() => {
      onFinishAction();
    }, 1250);
  }, [clearScheduledTimeouts, onFinishAction]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnd = () => {
      triggerTransition();
    };

    const handleError = () => {
      triggerTransition();
    };

    video.addEventListener("ended", handleEnd);
    video.addEventListener("error", handleError);

    skipTimeoutRef.current = setTimeout(() => {
      setCanSkip(true);
    }, 1200);

    const fallbackTimeout = setTimeout(() => {
      triggerTransition();
    }, 4500);

    return () => {
      video.removeEventListener("ended", handleEnd);
      video.removeEventListener("error", handleError);
      clearTimeout(fallbackTimeout);
      clearScheduledTimeouts();
    };
  }, [clearScheduledTimeouts, triggerTransition]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-black"
      aria-label="Loading Tech Udbhav"
      role="status"
    >
      <div className="st-portal" />

      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        className="h-full w-full object-cover"
      >
        <source src="/loader4.mp4" media="(max-width: 650px)" />
        <source src="/loader3.mp4" />
      </video>

      {canSkip && !isCompleting && (
        <button
          type="button"
          onClick={triggerTransition}
          className="absolute bottom-6 right-6 rounded-full border border-white/20 bg-black/45 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/90 backdrop-blur-md transition-all duration-200 hover:border-red-500/50 hover:text-red-400 active:scale-95"
          aria-label="Skip intro"
        >
          Skip Intro
        </button>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AiFillHome } from "react-icons/ai";
import { FaUserAlt, FaBars, FaTimes } from "react-icons/fa";
import { MdEvent } from "react-icons/md";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { IoCall } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

type NavItem = {
  icon: React.ReactNode;
  label: string;
  href: string;
};

const items: NavItem[] = [
  { icon: <AiFillHome size={18} />, label: "HOME", href: "#home" },
  { icon: <FaUserAlt size={18} />, label: "ABOUT", href: "#about" },
  { icon: <MdEvent size={20} />, label: "EVENTS", href: "#events" },
  {
    icon: <RiMoneyDollarCircleFill size={18} />,
    label: "SPONSORS",
    href: "#sponsors",
  },
  { icon: <IoCall size={18} />, label: "CONTACT", href: "#contact" },
];

export default function Navbar() {
  const [hoverLabel, setHoverLabel] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("#home");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateHash = () => {
      setActiveHash(window.location.hash || "#home");
    };

    updateHash();
    window.addEventListener("hashchange", updateHash);

    return () => {
      window.removeEventListener("hashchange", updateHash);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const sections = items
      .map((item) => document.querySelector(item.href))
      .filter(Boolean) as Element[];

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target instanceof HTMLElement) {
          setActiveHash(`#${visibleEntry.target.id}`);
        }
      },
      {
        root: null,
        rootMargin: "-30% 0px -45% 0px",
        threshold: [0.2, 0.35, 0.5, 0.7],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    setActiveHash(href);
  };

  return (
    <header className="fixed left-1/2 top-4 z-[150] w-[95%] max-w-[1200px] -translate-x-1/2 md:top-6 md:w-auto">
      <nav
        className="
          relative flex items-center justify-between
          rounded-full border border-white/10
          bg-black/35 px-4 py-2 backdrop-blur-xl
          shadow-[0_8px_32px_0_rgba(0,0,0,0.35)]
          md:justify-start md:gap-4 md:rounded-2xl md:px-6 md:py-3
        "
      >
        <a
          href="#home"
          onClick={() => handleNavClick("#home")}
          className="flex items-center gap-3"
          aria-label="Go to home section"
        >
          <div
            className="
              relative h-8 w-8 overflow-hidden rounded-full
              border border-red-600/30 bg-black/40 p-1
              shadow-[0_0_15px_rgba(239,68,68,0.2)]
              md:h-10 md:w-10
            "
          >
            <Image
              src="/logo.png"
              alt="Tech Udbhav logo"
              fill
              className="object-contain p-1"
              priority
            />
          </div>
          <div className="hidden h-6 w-px bg-white/20 md:block" />
        </a>

        <div className="hidden items-center gap-2 md:flex">
          {items.map((item) => {
            const isActive = activeHash === item.href;

            return (
              <a
                key={item.label}
                href={item.href}
                onClick={() => handleNavClick(item.href)}
                onMouseEnter={() => setHoverLabel(item.label)}
                onMouseLeave={() => setHoverLabel("")}
                aria-label={`Go to ${item.label.toLowerCase()} section`}
                className={`
                  group relative flex h-11 w-11 items-center justify-center rounded-xl
                  transition-all duration-300
                  ${
                    isActive
                      ? "scale-105 text-red-500"
                      : "text-white/70 hover:scale-110 hover:text-red-500"
                  }
                `}
              >
                <span className="relative z-10">{item.icon}</span>
                <div
                  className={`
                    absolute inset-0 rounded-xl transition-all duration-300
                    ${
                      isActive
                        ? "bg-red-600/15 ring-1 ring-red-500/40"
                        : "bg-red-600/0 group-hover:bg-red-600/10"
                    }
                  `}
                />
              </a>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-red-500 md:hidden"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>

        <div
          className={`
            pointer-events-none absolute -bottom-8 left-1/2 hidden -translate-x-1/2
            text-[0.6rem] font-bold uppercase tracking-[0.4em] text-red-500
            transition-all duration-300 md:block
            ${hoverLabel ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"}
          `}
        >
          {hoverLabel}
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="
              absolute left-0 right-0 top-full mt-3 origin-top rounded-[2rem]
              border border-white/10 bg-black/60 p-2 backdrop-blur-2xl
              shadow-2xl md:hidden
            "
          >
            <div className="flex flex-col gap-1">
              {items.map((item) => {
                const isActive = activeHash === item.href;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className={`
                      flex w-full items-center gap-4 rounded-2xl px-5 py-4
                      transition-all duration-200
                      ${
                        isActive
                          ? "bg-red-600/20 text-red-400 ring-1 ring-red-500/30"
                          : "text-white/80 hover:bg-white/5 hover:text-red-500"
                      }
                    `}
                    aria-label={`Go to ${item.label.toLowerCase()} section`}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    <span className="text-[0.8rem] font-semibold uppercase tracking-[0.2em]">
                      {item.label}
                    </span>
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
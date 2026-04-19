"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const socials = [
  {
    name: "Instagram",
    icon: FaInstagram,
    href: "https://www.instagram.com/ietebits/",
  },
  {
    name: "Twitter",
    icon: FaTwitter,
    href: "https://x.com/IETE_BITS",
  },
  {
    name: "Linkedin",
    icon: FaLinkedin,
    href: "https://www.linkedin.com/company/iete-students-chapter-bit-sindri123/posts/?feedView=all",
  },
] as const;

export default function SocialSidebar() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [displayText, setDisplayText] = useState("");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearScramble = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startScramble = useCallback(
    (text: string) => {
      clearScramble();
      setDisplayText("");

      const chars = "█▓▒░<>/[]{}—=+*^?#________";
      let iterations = 0;

      intervalRef.current = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((char, index) => {
              if (index < iterations) return char;
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join(""),
        );

        iterations += 0.5;

        if (iterations >= text.length) {
          clearScramble();
          setDisplayText(text);
        }
      }, 25);
    },
    [clearScramble],
  );

  const handleMouseEnter = (name: string) => {
    setHovered(name);
    startScramble(name);
  };

  const handleMouseLeave = () => {
    setHovered(null);
    setDisplayText("");
    clearScramble();
  };

  useEffect(() => {
    return () => {
      clearScramble();
    };
  }, [clearScramble]);

  return (
    <div className="fixed left-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-6 md:flex">
      {socials.map((item) => {
        const Icon = item.icon;
        const isActive = hovered === item.name;

        return (
          <a
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3"
            onMouseEnter={() => handleMouseEnter(item.name)}
            onMouseLeave={handleMouseLeave}
            aria-label={item.name}
          >
            <Icon
              className="
                h-5 w-5 text-red-600
                transition-all duration-300
                group-hover:scale-125
                drop-shadow-[0_0_6px_rgba(255,0,0,0.8)]
                group-hover:drop-shadow-[0_0_18px_rgba(255,0,0,1)]
              "
            />

            <div className="relative h-5 min-w-[120px] overflow-hidden">
              <span
                className={`
                  absolute left-0 top-0
                  text-xs font-bold uppercase tracking-[0.3em] text-red-500 sm:text-sm
                  transition-opacity duration-300
                  ${isActive ? "opacity-100" : "opacity-0"}
                `}
                style={{
                  textShadow:
                    "0 0 6px rgba(255,0,0,0.8), 0 0 20px rgba(255,0,0,0.6)",
                }}
              >
                {isActive ? displayText : ""}
              </span>

              <span
                className="
                  absolute left-[1px] top-0
                  text-xs font-bold uppercase tracking-[0.3em] text-red-700 sm:text-sm
                  opacity-0 group-hover:opacity-70
                "
              >
                {isActive ? displayText : ""}
              </span>

              <span
                className="
                  absolute left-[-1px] top-0
                  text-xs font-bold uppercase tracking-[0.3em] text-blue-500 sm:text-sm
                  opacity-0 group-hover:opacity-60
                "
              >
                {isActive ? displayText : ""}
              </span>
            </div>
          </a>
        );
      })}
    </div>
  );
}

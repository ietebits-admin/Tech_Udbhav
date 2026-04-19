"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import { FaUserAlt, FaBars, FaTimes } from "react-icons/fa";
import { MdEvent } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [hoverLabel, setHoverLabel] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const items = [
    { icon: <AiFillHome size={18} />, label: "HOME", route: "/" },
    { icon: <FaUserAlt size={18} />, label: "ABOUT", route: "/about" },
    { icon: <MdEvent size={20} />, label: "EVENTS", route: "/events" },
  ];

  return (
    <header className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-[150] w-[90%] max-w-fit">
      <nav
        className="
          relative flex items-center justify-between md:justify-start gap-4
          px-4 py-2 md:px-6 md:py-3 rounded-full md:rounded-2xl
          border border-white/10
          bg-white/5 backdrop-blur-xl
          shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]
        "
      >
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Logo"
            className="
              w-8 h-8 md:w-10 md:h-10 rounded-full object-contain
              border border-red-600/30
              p-1 bg-black/40
              shadow-[0_0_15px_rgba(239,68,68,0.2)]
            "
          />
          <div className="h-6 w-[1px] bg-white/20 hidden md:block" />
        </div>

        <div className="hidden md:flex items-center gap-2">
          {items.map((item, index) => (
            <Link key={index} href={item.route}>
              <button
                onMouseEnter={() => setHoverLabel(item.label)}
                onMouseLeave={() => setHoverLabel("")}
                className="
                  relative flex items-center justify-center
                  w-11 h-11 rounded-xl
                  text-white/70
                  transition-all duration-300
                  hover:scale-110 hover:text-red-500
                  group
                "
              >
                <span className="relative z-10">{item.icon}</span>
                <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/10 rounded-xl transition-all duration-300" />
              </button>
            </Link>
          ))}
        </div>

        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-white/80 hover:text-red-500 transition-colors"
        >
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>

        <div
          className={`
            absolute -bottom-8 left-1/2 -translate-x-1/2
            text-[0.6rem] tracking-[0.4em] text-red-500
            font-bold uppercase pointer-events-none hidden md:block
            transition-all duration-300
            ${hoverLabel ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}
          `}
        >
          {hoverLabel}
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="
              absolute top-full left-0 right-0 mt-3 
              bg-white/5 backdrop-blur-2xl rounded-3xl 
              border border-white/10 p-6 flex flex-col items-center gap-2
              md:hidden shadow-2xl origin-top
            "
          >
            {items.map((item, index) => (
              <Link 
                key={index} 
                href={item.route} 
                onClick={() => setIsOpen(false)}
                className="
                  w-full py-4 text-center rounded-2xl
                  text-white/80 hover:text-red-500
                  hover:bg-white/5 transition-all
                "
              >
                <span className="text-[0.75rem] font-bold tracking-[0.4em] uppercase">
                  {item.label}
                </span>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
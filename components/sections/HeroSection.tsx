"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { HeroShaderCanvas } from "@/components/canvas/HeroShaderCanvas";
import { MagneticButton } from "@/components/common/MagneticButton";
import { PERSONAL_INFO } from "@/data/content";
import { ArrowDown, Download, Sparkles, Code2, Database, Layers, Cpu } from "lucide-react";

const ROTATING_WORDS = [
  "React.js",
  "Next.js 15",
  "Node & Express",
  "Cloud Firestore",
  "MongoDB",
  "TypeScript"
];

const ORBITING_CHIPS = [
  {
    label: "React 19 / Next.js",
    icon: <Code2 size={13} className="text-[#3D5AFE]" />,
    position: "top-[12%] -left-[14%]",
    delay: 0,
    duration: 6
  },
  {
    label: "Node / Express",
    icon: <Cpu size={13} className="text-[#FF5A3C]" />,
    position: "top-[40%] -right-[12%]",
    delay: 1.5,
    duration: 7
  },
  {
    label: "MongoDB & SQL",
    icon: <Database size={13} className="text-[#3D5AFE]" />,
    position: "bottom-[22%] -left-[10%]",
    delay: 0.8,
    duration: 6.5
  },
  {
    label: "Tailwind CSS v4",
    icon: <Layers size={13} className="text-[#FF5A3C]" />,
    position: "bottom-[12%] -right-[10%]",
    delay: 2.2,
    duration: 7.2
  }
];

export function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseParallax, setMouseParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 20;
    const y = (clientY / innerHeight - 0.5) * 20;
    setMouseParallax({ x, y });
  };

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[100svh] flex flex-col justify-between pt-24 sm:pt-28 pb-10 sm:pb-14 px-6 sm:px-8 lg:px-12 overflow-hidden"
    >
      {/* Interactive 3D WebGL Shader / CSS Fallback */}
      <HeroShaderCanvas />

      {/* Top micro-meta banner */}
      <div className="max-w-7xl w-full mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 sm:pt-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[var(--badge-border)] bg-[var(--badge-bg)] text-xs font-mono-code text-[var(--text)] backdrop-blur-md w-fit"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3D5AFE] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3D5AFE]" />
          </span>
          <span className="font-semibold text-[var(--primary)] uppercase tracking-wider">Live</span>
          <span className="text-[var(--text-muted)]">&bull;</span>
          <span className="font-medium text-[var(--text)]">Open to work &bull; Available for freelance</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hidden sm:flex items-center gap-2 text-xs font-mono-code text-[var(--text-muted)]"
        >
          <span>SURAT, GUJARAT, INDIA</span>
          <span>&bull;</span>
          <span>FULL STACK</span>
        </motion.div>
      </div>

      {/* Main Hero Grid: Typography + Cutout Portrait */}
      <div className="max-w-7xl w-full mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-6 sm:py-10">
        {/* Left Column: Huge Split-Text Headline & Subtitle */}
        <div className="lg:col-span-7 flex flex-col gap-6 z-10">
          <div className="overflow-hidden">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-xs sm:text-sm font-mono-code text-[var(--primary)] font-bold tracking-widest uppercase flex items-center gap-2"
            >
              <Sparkles size={14} className="text-[#FF5A3C]" />
              <span>Full Stack Web Architect</span>
            </motion.p>
          </div>

          {/* Huge Expressive Headline with Split Character Look */}
          <div className="flex flex-col">
            <h1 className="text-hero-headline font-display font-black uppercase text-[var(--text)] tracking-tighter select-none leading-[0.85]">
              <motion.span
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="block"
              >
                Jayesh
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                className="block text-transparent bg-clip-text bg-gradient-to-r from-[var(--text)] via-[var(--primary)] to-[var(--accent)]"
              >
                Mali
              </motion.span>
            </h1>
          </div>

          {/* Subtitle with Rotating Word Ticker */}
          <div className="flex flex-wrap items-center gap-2 text-lg sm:text-2xl md:text-3xl font-display font-semibold text-[var(--text)]">
            <span>Specialized in</span>
            <div className="inline-flex h-9 sm:h-11 overflow-hidden relative min-w-[200px] sm:min-w-[260px]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIndex}
                  initial={{ y: 28, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -28, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-0 top-0 font-bold text-[var(--primary)] underline decoration-[#FF5A3C] decoration-2 underline-offset-4"
                >
                  {ROTATING_WORDS[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          <p className="text-sm sm:text-base md:text-lg font-mono-code text-[var(--text-muted)] max-w-xl leading-relaxed">
            Crafting responsive, high-performance web applications with modern React/Next.js, robust Node & cloud backends, and award-grade micro-interactions.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-3">
            <MagneticButton
              onClick={scrollToProjects}
              className="px-6 sm:px-8 py-3.5 rounded-full bg-[var(--primary)] hover:bg-[#2B3BFF] text-white font-mono-code font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-[var(--primary)]/30 hover:shadow-[var(--primary)]/50 transition-all duration-300 flex items-center gap-2"
            >
              <span>View my work</span>
              <ArrowDown size={15} />
            </MagneticButton>

            <a
              href={PERSONAL_INFO.resumePath}
              download="Jayesh_Mali_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 sm:px-7 py-3.5 rounded-full border border-[var(--surface-border)] bg-[var(--surface)] hover:border-[var(--primary)] text-[var(--text)] font-mono-code font-semibold text-xs sm:text-sm tracking-wide transition-all duration-200 flex items-center gap-2"
              data-cursor-stick
            >
              <Download size={15} className="text-[#FF5A3C]" />
              <span>Download resume</span>
            </a>
          </div>
        </div>

        {/* Right Column: Floating Cut-out Portrait with Blue Glow & Orbital Tech Chips */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          <motion.div
            style={{
              transform: `translate3d(${mouseParallax.x}px, ${mouseParallax.y}px, 0)`
            }}
            className="relative w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[440px] aspect-[3/4] flex items-center justify-center transition-transform duration-200 ease-out"
          >
            {/* Soft Blue / Coral Backlight Glow behind cutout */}
            <div
              className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#3D5AFE]/40 via-[#536DFE]/25 to-[#FF5A3C]/30 blur-[75px] -z-10 scale-90"
              aria-hidden="true"
            />

            {/* Subtle editorial geometric framing ring */}
            <div
              className="absolute inset-6 rounded-3xl border border-[var(--surface-border)] -rotate-3 -z-10 bg-[var(--surface)]/20 backdrop-blur-xs"
              aria-hidden="true"
            />
            <div
              className="absolute inset-4 rounded-3xl border border-[var(--primary)]/20 rotate-3 -z-10"
              aria-hidden="true"
            />

            {/* Jayesh's Cutout Photo */}
            <div className="relative w-full h-full flex items-end justify-center">
              <Image
                src={PERSONAL_INFO.avatar}
                alt="Jayesh Mali - Full Stack Developer"
                width={800}
                height={1100}
                priority
                sizes="(max-width: 768px) 320px, 440px"
                className="w-full h-auto max-h-[520px] object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.5)] select-none pointer-events-none"
              />
            </div>

            {/* Orbiting / Drifting Tech Stack Badges */}
            {ORBITING_CHIPS.map((chip, idx) => (
              <motion.div
                key={chip.label}
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, idx % 2 === 0 ? 2 : -2, 0]
                }}
                transition={{
                  duration: chip.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: chip.delay
                }}
                className={`hidden sm:flex absolute ${chip.position} items-center gap-2 px-3.5 py-2 rounded-xl glass-pill shadow-xl text-xs font-mono-code font-bold text-[var(--text)] select-none border border-[var(--pill-border)] z-20 whitespace-nowrap`}
              >
                {chip.icon}
                <span>{chip.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom Scroll Indicator & Coordinates */}
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between pt-4 border-t border-[var(--surface-border)] text-xs font-mono-code text-[var(--text-muted)]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FF5A3C]" />
          <span>SCROLL TO EXPLORE</span>
        </div>
        <div className="hidden sm:block">
          <span>{PERSONAL_INFO.coordinates}</span>
        </div>
        <div>
          <span>EST. 2026 EDITION</span>
        </div>
      </div>
    </section>
  );
}

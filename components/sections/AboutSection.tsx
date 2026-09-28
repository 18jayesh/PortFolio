"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PERSONAL_INFO } from "@/data/content";
import { MapPin, Globe, CheckCircle2, Terminal } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ABOUT_TEXT =
  "I am a Full Stack Developer based in Surat, Gujarat, obsessed with bridging rigorous architectural logic with kinetic, tactile interface design. Over the past several years, I have engineered production billing systems, payroll engines with dynamic PDF generation, and real-time community platforms. I thrive on translating intricate workflows into intuitive, resilient digital products with zero compromise on craftsmanship.";

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLParagraphElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    if (!textContainerRef.current || wordsRef.current.length === 0) return;

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      wordsRef.current.forEach((word) => {
        if (word) word.style.opacity = "1";
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wordsRef.current,
        {
          opacity: 0.18,
          color: "var(--text-muted)",
        },
        {
          opacity: 1,
          color: "var(--text)",
          stagger: 0.04,
          scrollTrigger: {
            trigger: textContainerRef.current,
            start: "top 75%",
            end: "bottom 45%",
            scrub: 0.8,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const words = ABOUT_TEXT.split(" ");

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-28 sm:py-36 px-6 sm:px-8 lg:px-12 bg-editorial-grid border-t border-[var(--surface-border)]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header with Index */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-12 sm:pb-16 border-b border-[var(--surface-border)]">
          <div>
            <span className="text-xs font-mono-code text-[var(--primary)] uppercase tracking-widest font-bold block mb-2">
              [ 01 / 05 ] &bull; Perspective
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold uppercase tracking-tight text-[var(--text)]">
              Engineering with <span className="text-[var(--primary)]">Intent</span>
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono-code text-[var(--text-muted)]">
            <MapPin size={14} className="text-[#FF5A3C]" />
            <span>SURAT, GUJARAT, INDIA</span>
          </div>
        </div>

        {/* Editorial Scrubbed Paragraph */}
        <div className="py-14 sm:py-20 max-w-5xl">
          <p
            ref={textContainerRef}
            className="text-editorial-lead font-display font-bold leading-[1.3] tracking-tight select-none"
          >
            {words.map((word, i) => (
              <span
                key={i}
                ref={(el) => {
                  if (el) wordsRef.current[i] = el;
                }}
                className="inline-block mr-[0.28em] transition-colors duration-75"
              >
                {word}
              </span>
            ))}
          </p>
        </div>

        {/* Stats & Credential Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-8 border-t border-[var(--surface-border)]">
          {PERSONAL_INFO.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-2xl glass-card relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[var(--primary)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="flex items-baseline gap-1 text-4xl sm:text-5xl md:text-6xl font-display font-black tracking-tight text-[var(--text)]">
                <span>{stat.value}</span>
                <span className="text-2xl sm:text-3xl text-[var(--accent)] font-mono-code">
                  {stat.suffix}
                </span>
              </div>
              <div className="mt-3 text-sm font-display font-bold text-[var(--text)]">
                {stat.label}
              </div>
              <div className="mt-1 text-xs font-mono-code text-[var(--text-muted)]">
                {stat.sublabel}
              </div>
            </div>
          ))}
        </div>

        {/* Multilingual & Location Footnote */}
        <div className="mt-10 p-6 rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)]/50 backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--badge-bg)] text-[var(--primary)] flex items-center justify-center font-mono-code font-bold">
              <Globe size={18} />
            </div>
            <div>
              <div className="text-xs font-mono-code text-[var(--text-muted)] uppercase tracking-wider">
                Language Fluency
              </div>
              <div className="text-sm font-display font-bold text-[var(--text)] mt-0.5">
                Gujarati (Native) &bull; Hindi &bull; English &bull; Marathi
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--badge-bg)] text-[#FF5A3C] flex items-center justify-center font-mono-code font-bold">
              <Terminal size={18} />
            </div>
            <div>
              <div className="text-xs font-mono-code text-[var(--text-muted)] uppercase tracking-wider">
                Current Focus
              </div>
              <div className="text-sm font-display font-bold text-[var(--text)] mt-0.5">
                Next.js 15, Full-Stack TypeScript & Scalable Cloud Microservices
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

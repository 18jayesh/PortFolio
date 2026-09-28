"use client";

import React, { useState, useRef } from "react";
import {
  SKILL_CATEGORIES,
  MARQUEE_SKILLS_ROW1,
  MARQUEE_SKILLS_ROW2
} from "@/data/content";
import { Code, Layout, Server, Database, Wrench, Sparkles } from "lucide-react";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Languages: <Code size={18} className="text-[#3D5AFE]" />,
  Frontend: <Layout size={18} className="text-[#FF5A3C]" />,
  Backend: <Server size={18} className="text-[#3D5AFE]" />,
  Database: <Database size={18} className="text-[#FF5A3C]" />,
  "Tools & Ecosystem": <Wrench size={18} className="text-[#3D5AFE]" />
};

function BentoCard({
  category,
  description,
  skills
}: {
  category: string;
  description: string;
  skills: { name: string; level?: string }[];
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative p-7 sm:p-8 rounded-3xl glass-card overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:shadow-2xl"
    >
      {/* Interactive cursor spotlight radial glow */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 opacity-100"
          style={{
            background: `radial-gradient(350px circle at ${cursorPos.x}px ${cursorPos.y}px, rgba(61, 90, 254, 0.18), transparent 80%)`
          }}
        />
      )}

      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-2xl bg-[var(--badge-bg)] flex items-center justify-center border border-[var(--badge-border)]">
            {CATEGORY_ICONS[category] || <Sparkles size={18} className="text-[#3D5AFE]" />}
          </div>
          <span className="text-[11px] font-mono-code uppercase tracking-widest text-[var(--text-muted)]">
            {skills.length} Technologies
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-display font-black tracking-tight text-[var(--text)] group-hover:text-[var(--primary)] transition-colors">
          {category}
        </h3>
        <p className="mt-1 text-xs font-mono-code text-[var(--text-muted)] leading-relaxed">
          {description}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="px-3 py-1.5 rounded-xl border border-[var(--surface-border)] bg-[var(--bg)]/70 hover:border-[var(--primary)] text-xs font-mono-code font-semibold text-[var(--text)] transition-colors duration-200 flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
            <span>{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative py-28 sm:py-36 border-t border-[var(--surface-border)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-14 sm:mb-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-[var(--surface-border)]">
          <div>
            <span className="text-xs font-mono-code text-[var(--primary)] uppercase tracking-widest font-bold block mb-2">
              [ 02 / 05 ] &bull; Technical Repertoire
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold uppercase tracking-tight text-[var(--text)]">
              Core Stack & <span className="text-[var(--primary)]">Capabilities</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono-code text-[var(--text-muted)] max-w-sm">
            Battle-tested technologies refined through production applications and end-to-end architectures.
          </p>
        </div>
      </div>

      {/* Infinite Dual-Direction Velocity Marquee */}
      <div className="py-6 sm:py-8 flex flex-col gap-4 sm:gap-6 bg-[var(--surface)]/40 border-y border-[var(--surface-border)] select-none">
        {/* Row 1: Leftward Marquee */}
        <div className="flex overflow-hidden whitespace-nowrap group">
          <div className="flex gap-4 sm:gap-8 animate-marquee">
            {[...MARQUEE_SKILLS_ROW1, ...MARQUEE_SKILLS_ROW1, ...MARQUEE_SKILLS_ROW1].map(
              (item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 sm:gap-4 text-2xl sm:text-4xl md:text-5xl font-display font-black uppercase tracking-tight text-[var(--text)] hover:text-[var(--primary)] transition-colors duration-200"
                >
                  <span>{item}</span>
                  <span className="text-[#FF5A3C] text-lg sm:text-2xl">&bull;</span>
                </div>
              )
            )}
          </div>
        </div>

        {/* Row 2: Rightward Marquee */}
        <div className="flex overflow-hidden whitespace-nowrap group">
          <div className="flex gap-4 sm:gap-8 animate-marquee-reverse">
            {[...MARQUEE_SKILLS_ROW2, ...MARQUEE_SKILLS_ROW2, ...MARQUEE_SKILLS_ROW2].map(
              (item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 sm:gap-4 text-2xl sm:text-4xl md:text-5xl font-display font-black uppercase tracking-tight text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors duration-200"
                >
                  <span>{item}</span>
                  <span className="text-[#3D5AFE] text-lg sm:text-2xl">&bull;</span>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mt-16 sm:mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <div
              key={cat.category}
              className={idx === 0 || idx === 1 ? "lg:col-span-1" : "lg:col-span-1"}
            >
              <BentoCard
                category={cat.category}
                description={cat.description}
                skills={cat.skills}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

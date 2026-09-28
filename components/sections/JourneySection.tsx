"use client";

import React, { useRef } from "react";
import { JOURNEY } from "@/data/content";
import { GraduationCap, Award, Calendar, MapPin, CheckCircle } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

export function JourneySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 50%"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="journey"
      ref={containerRef}
      className="relative py-28 sm:py-36 px-6 sm:px-8 lg:px-12 border-t border-[var(--surface-border)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-12 sm:pb-16 border-b border-[var(--surface-border)] mb-14 sm:mb-20">
          <div>
            <span className="text-xs font-mono-code text-[var(--primary)] uppercase tracking-widest font-bold block mb-2">
              [ 04 / 05 ] &bull; Trajectory
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold uppercase tracking-tight text-[var(--text)]">
              Education & <span className="text-[var(--primary)]">Evolution</span>
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono-code text-[var(--text-muted)]">
            <span>BHARUCH &bull; SURAT &bull; GUJARAT</span>
          </div>
        </div>

        {/* Self-drawing Vertical Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Background vertical line track */}
          <div className="absolute left-4 sm:left-8 top-4 bottom-4 w-[2px] bg-[var(--surface-border)] -translate-x-1/2" />

          {/* Animated drawing foreground line */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-4 sm:left-8 top-4 w-[2px] bg-gradient-to-b from-[#3D5AFE] via-[#536DFE] to-[#FF5A3C] -translate-x-1/2 origin-top"
          />

          {/* Timeline Nodes */}
          <div className="flex flex-col gap-12 sm:gap-16">
            {JOURNEY.map((item, idx) => (
              <div key={idx} className="relative pl-12 sm:pl-20">
                {/* Node Milestone Circle */}
                <div className="absolute left-4 sm:left-8 top-1.5 -translate-x-1/2 w-7 h-7 rounded-full bg-[var(--surface)] border-2 border-[var(--primary)] flex items-center justify-center shadow-lg z-10">
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] animate-pulse" />
                </div>

                {/* Card Container */}
                <div className="p-7 sm:p-9 rounded-3xl glass-card relative overflow-hidden group hover:border-[var(--primary)]/50 transition-colors">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--surface-border)] mb-5">
                    <div className="flex items-center gap-2 text-xs font-mono-code font-bold text-[var(--primary)] bg-[var(--badge-bg)] px-3 py-1 rounded-full border border-[var(--badge-border)]">
                      <Calendar size={13} />
                      <span>{item.period}</span>
                    </div>
                    {item.status && (
                      <span className="text-xs font-mono-code text-[#FF5A3C] font-semibold uppercase tracking-wider">
                        {item.status}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-black tracking-tight text-[var(--text)]">
                    {item.degree}
                  </h3>

                  <div className="mt-2 flex flex-wrap items-center gap-4 text-xs sm:text-sm font-mono-code text-[var(--text-muted)]">
                    <span className="font-semibold text-[var(--text)] flex items-center gap-1.5">
                      <GraduationCap size={16} className="text-[var(--primary)]" />
                      {item.institution}
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <MapPin size={13} />
                      {item.location}
                    </span>
                  </div>

                  <p className="mt-4 text-sm font-mono-code text-[var(--text-muted)] leading-relaxed">
                    {item.description}
                  </p>

                  {/* Highlights list */}
                  <div className="mt-6 pt-5 border-t border-[var(--surface-border)] flex flex-col gap-2.5">
                    <span className="text-xs font-mono-code uppercase tracking-wider text-[var(--text-muted)]">
                      Core Accomplishments:
                    </span>
                    {item.highlights.map((hl, hIdx) => (
                      <div
                        key={hIdx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm font-mono-code text-[var(--text)]"
                      >
                        <CheckCircle size={14} className="text-[#3D5AFE] shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

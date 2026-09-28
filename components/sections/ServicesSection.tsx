"use client";

import React from "react";
import { SERVICES } from "@/data/content";
import { ArrowUpRight, Check, Zap } from "lucide-react";
import { MagneticButton } from "@/components/common/MagneticButton";

export function ServicesSection() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="services"
      className="relative py-28 sm:py-36 px-6 sm:px-8 lg:px-12 border-t border-[var(--surface-border)] bg-[var(--surface)]/30"
    >
      <div className="max-w-7xl mx-auto">
        {/* Availability Banner Strip */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[var(--surface)] via-[var(--bg)] to-[var(--surface)] border border-[var(--surface-border)] mb-20 sm:mb-28 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--primary)]/15 rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="flex flex-col gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--badge-bg)] border border-[var(--badge-border)] text-xs font-mono-code font-bold text-[var(--primary)] w-fit">
                <span className="w-2 h-2 rounded-full bg-[#27C93F] animate-ping" />
                <span>IMMEDIATE COMMENCEMENT AVAILABLE</span>
              </div>
              <h3 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-[var(--text)]">
                Available for Freelance & Full-Time Roles
              </h3>
              <p className="text-sm sm:text-base font-mono-code text-[var(--text-muted)] max-w-2xl leading-relaxed">
                Whether you need a dedicated full-stack developer to join your core engineering team or a standalone specialist to build your MVP from zero to production.
              </p>
            </div>

            <div className="shrink-0">
              <MagneticButton
                onClick={scrollToContact}
                className="px-8 py-4 rounded-full bg-[var(--primary)] hover:bg-[#2B3BFF] text-white font-mono-code font-bold text-sm tracking-wide shadow-xl shadow-[var(--primary)]/30 transition-all flex items-center gap-2.5"
              >
                <span>Start a Project</span>
                <ArrowUpRight size={16} />
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Services Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-12 sm:pb-16 border-b border-[var(--surface-border)] mb-14 sm:mb-20">
          <div>
            <span className="text-xs font-mono-code text-[var(--primary)] uppercase tracking-widest font-bold block mb-2">
              [ Solutions ] &bull; Production Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold uppercase tracking-tight text-[var(--text)]">
              What I Can <span className="text-[var(--primary)]">Build For You</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono-code text-[var(--text-muted)] max-w-sm">
            Architected from database schemas up to responsive, accessible, high-framerate interfaces.
          </p>
        </div>

        {/* 4 Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="p-8 sm:p-10 rounded-3xl glass-card flex flex-col justify-between group hover:border-[var(--primary)] transition-all duration-300 relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-[var(--surface-border)] mb-6">
                  <span className="text-4xl sm:text-5xl font-display font-black text-[var(--primary)] tracking-tight">
                    {srv.number}
                  </span>
                  <div className="w-10 h-10 rounded-full border border-[var(--surface-border)] bg-[var(--bg)] flex items-center justify-center text-[var(--text-muted)] group-hover:text-[var(--primary)] group-hover:border-[var(--primary)] transition-colors">
                    <Zap size={16} />
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-[var(--text)] group-hover:text-[var(--primary)] transition-colors">
                  {srv.title}
                </h3>
                <p className="mt-2 text-sm font-mono-code text-[#FF5A3C] font-semibold">
                  {srv.tagline}
                </p>
                <p className="mt-4 text-sm font-mono-code text-[var(--text-muted)] leading-relaxed">
                  {srv.description}
                </p>
              </div>

              {/* Deliverables list */}
              <div className="mt-8 pt-6 border-t border-[var(--surface-border)] flex flex-col gap-2.5">
                <span className="text-xs font-mono-code uppercase tracking-wider text-[var(--text-muted)] font-semibold">
                  Key Deliverables:
                </span>
                {srv.deliverables.map((del, dIdx) => (
                  <div
                    key={dIdx}
                    className="flex items-center gap-2.5 text-xs sm:text-sm font-mono-code text-[var(--text)]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] shrink-0" />
                    <span>{del}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

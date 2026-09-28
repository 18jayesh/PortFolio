"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { PROJECTS, Project } from "@/data/content";
import { ExternalLink, Sparkles, Globe, Lock, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/common/Icons";
import { MagneticButton } from "@/components/common/MagneticButton";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const centerX = width / 2;
    const centerY = height / 2;

    const rotateX = ((y - centerY) / centerY) * -6; // max -6 to 6 deg
    const rotateY = ((x - centerX) / centerX) * 6; // max -6 to 6 deg

    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)"
      }}
      className="group relative rounded-3xl glass-card overflow-hidden p-6 sm:p-10 lg:p-12 mb-12 sm:mb-16 border border-[var(--surface-border)] shadow-xl"
    >
      {/* Top subtle corner highlight */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[var(--primary)]/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Index, Meta, Details, Tech, Actions */}
        <div className="lg:col-span-6 flex flex-col justify-between h-full order-2 lg:order-1">
          <div>
            {/* Index & Tag */}
            <div className="flex items-center justify-between pb-4 border-b border-[var(--surface-border)] mb-6">
              <div className="flex items-center gap-3">
                <span className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-[var(--primary)] tracking-tight">
                  {project.index}
                </span>
                <span className="text-xs font-mono-code text-[var(--text-muted)] tracking-wider">
                  / 04
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[11px] font-mono-code font-bold text-[var(--primary)]">
                <Sparkles size={11} className="text-[#FF5A3C]" />
                <span>{project.tags[0]}</span>
              </div>
            </div>

            {/* Title & Subtitle */}
            <h3 className="text-2xl sm:text-4xl font-display font-black tracking-tight text-[var(--text)] group-hover:text-[var(--primary)] transition-colors">
              {project.title}
            </h3>
            <p className="mt-1 text-sm font-mono-code text-[var(--accent)] font-semibold">
              {project.subtitle}
            </p>

            {/* Description */}
            <p className="mt-4 text-sm sm:text-base font-mono-code text-[var(--text-muted)] leading-relaxed">
              {project.description}
            </p>

            {/* Architectural Highlight Metric */}
            <div className="mt-5 p-3.5 rounded-xl bg-[var(--bg)]/80 border border-[var(--surface-border)] text-xs font-mono-code text-[var(--text)] flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A3C] mt-1.5 shrink-0" />
              <span>
                <strong className="text-[var(--primary)]">Engineering Impact:</strong> {project.metrics}
              </span>
            </div>

            {/* Tech Chips */}
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-lg border border-[var(--surface-border)] bg-[var(--surface)] text-[11px] font-mono-code text-[var(--text-muted)] font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="mt-8 pt-6 border-t border-[var(--surface-border)] flex items-center gap-4">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-[var(--primary)] text-white text-xs font-mono-code font-semibold tracking-wide flex items-center gap-2 hover:bg-[#2B3BFF] transition-all duration-200 shadow-md shadow-[var(--primary)]/20"
              data-cursor-stick
            >
              <span>Live Demonstration</span>
              <ArrowUpRight size={14} />
            </a>

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-full border border-[var(--surface-border)] bg-[var(--surface)] text-[var(--text)] text-xs font-mono-code font-medium hover:border-[var(--primary)] transition-colors flex items-center gap-2"
              data-cursor-stick
            >
              <GithubIcon size={14} />
              <span>Repository</span>
            </a>
          </div>
        </div>

        {/* Right Column: Realistic Browser Frame Mockup with Screenshot */}
        <div className="lg:col-span-6 order-1 lg:order-2">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-view
            data-cursor-text="VISIT"
            className="block relative rounded-2xl overflow-hidden border border-[var(--surface-border)] bg-[var(--bg)] shadow-2xl transition-all duration-300 group-hover:border-[var(--primary)]/60 group-hover:shadow-[0_20px_50px_rgba(61,90,254,0.15)]"
          >
            {/* Browser Top Bar */}
            <div className="px-4 py-3 bg-[var(--surface)] border-b border-[var(--surface-border)] flex items-center justify-between gap-4 select-none">
              {/* Traffic light dots */}
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
              </div>

              {/* URL address bar */}
              <div className="flex-1 max-w-[280px] sm:max-w-[340px] px-3 py-1 rounded-md bg-[var(--bg)]/90 border border-[var(--surface-border)] text-[11px] font-mono-code text-[var(--text-muted)] flex items-center gap-2 truncate">
                <Lock size={10} className="text-[#27C93F] shrink-0" />
                <span className="truncate">{project.liveUrl.replace("https://", "").replace("http://", "")}</span>
              </div>

              <div className="w-4 h-4 flex items-center justify-center text-[var(--text-muted)] opacity-60">
                <Globe size={13} />
              </div>
            </div>

            {/* Screenshot Container with Reveal Effect */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--surface)]">
              <Image
                src={project.image}
                alt={`${project.title} - Screenshot Mockup`}
                width={1280}
                height={800}
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Subtle hover gradient shimmer */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-end p-6">
                <span className="px-3.5 py-1.5 rounded-full bg-[var(--primary)] text-white text-xs font-mono-code font-bold tracking-wider shadow-lg flex items-center gap-1.5">
                  <span>Open Live Application</span>
                  <ExternalLink size={12} />
                </span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative py-28 sm:py-36 px-6 sm:px-8 lg:px-12 border-t border-[var(--surface-border)]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-12 sm:pb-16 border-b border-[var(--surface-border)] mb-14 sm:mb-20">
          <div>
            <span className="text-xs font-mono-code text-[var(--primary)] uppercase tracking-widest font-bold block mb-2">
              [ 03 / 05 ] &bull; Selected Works
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold uppercase tracking-tight text-[var(--text)]">
              Featured <span className="text-[var(--primary)]">Architectures</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono-code text-[var(--text-muted)] max-w-md">
            Production-grade systems designed with rigorous full-stack workflows, real-time databases, and role-based operational permissions.
          </p>
        </div>

        {/* Stacked Project Cards */}
        <div className="flex flex-col">
          {PROJECTS.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

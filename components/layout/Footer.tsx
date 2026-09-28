"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PERSONAL_INFO } from "@/data/content";
import { ArrowUp, Mail, Phone, MapPin, Globe } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/common/Icons";
import { MagneticButton } from "@/components/common/MagneticButton";

export function Footer() {
  const [suratTime, setSuratTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
      };
      setSuratTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-[var(--surface-border)] bg-[var(--surface)] text-[var(--text)] transition-colors duration-300 overflow-hidden">
      {/* Editorial top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-40" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Col 1: Monogram & Bio */}
          <div className="md:col-span-5 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-sm font-mono-code font-bold">
                JM
              </span>
              <span className="text-xl font-display font-black tracking-tight uppercase">
                Jayesh Mali
              </span>
            </div>
            <p className="text-sm font-mono-code text-[var(--text-muted)] max-w-sm leading-relaxed">
              Full Stack Developer specializing in responsive React/Next.js architectures, scalable backend services, and tactile kinetic interfaces.
            </p>
            {/* Live Location / Time Capsule */}
            <div className="mt-2 inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[var(--surface-border)] bg-[var(--bg)]/80 text-xs font-mono-code text-[var(--text-muted)] w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3D5AFE] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3D5AFE]" />
              </span>
              <span>SURAT, GUJARAT:</span>
              <span className="text-[var(--text)] font-semibold tracking-wider tabular-nums">
                {suratTime || "1:30:00 PM"} IST
              </span>
            </div>
          </div>

          {/* Col 2: Navigation & Resources */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <span className="text-xs font-mono-code uppercase tracking-widest text-[var(--text-muted)]">
              Navigation
            </span>
            <ul className="flex flex-col gap-2.5 text-sm font-mono-code">
              <li>
                <a href="#about" className="hover:text-[var(--primary)] transition-colors">
                  01. About Me
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-[var(--primary)] transition-colors">
                  02. Skills & Stack
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-[var(--primary)] transition-colors">
                  03. Selected Work
                </a>
              </li>
              <li>
                <a href="#journey" className="hover:text-[var(--primary)] transition-colors">
                  04. Education & Journey
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[var(--primary)] transition-colors">
                  05. Get In Touch
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Connect & Back-to-top */}
          <div className="md:col-span-4 flex flex-col justify-between gap-8 h-full">
            <div className="flex flex-col gap-4">
              <span className="text-xs font-mono-code uppercase tracking-widest text-[var(--text-muted)]">
                Direct Inquiries
              </span>
              <div className="flex flex-col gap-2 text-sm font-mono-code">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="hover:text-[var(--primary)] transition-colors flex items-center gap-2"
                >
                  <Mail size={15} className="text-[var(--primary)]" />
                  <span>{PERSONAL_INFO.email}</span>
                </a>
                <a
                  href={`tel:${PERSONAL_INFO.phone}`}
                  className="hover:text-[var(--primary)] transition-colors flex items-center gap-2"
                >
                  <Phone size={15} className="text-[var(--accent)]" />
                  <span>{PERSONAL_INFO.phoneFormatted}</span>
                </a>
                <div className="flex items-center gap-2 text-[var(--text-muted)]">
                  <MapPin size={15} />
                  <span>{PERSONAL_INFO.coordinates}</span>
                </div>
              </div>
            </div>

            {/* Back to top button */}
            <div className="flex items-center justify-between pt-4 border-t border-[var(--surface-border)]">
              <span className="text-xs font-mono-code text-[var(--text-muted)]">
                Back to surface
              </span>
              <MagneticButton
                onClick={scrollToTop}
                aria-label="Scroll back to top"
                className="w-10 h-10 rounded-full border border-[var(--surface-border)] bg-[var(--bg)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors flex items-center justify-center"
              >
                <ArrowUp size={16} />
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="mt-14 pt-8 border-t border-[var(--surface-border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-code text-[var(--text-muted)]">
          <div>
            &copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--text)] transition-colors flex items-center gap-1.5"
            >
              <GithubIcon size={14} />
              <span>GitHub</span>
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--text)] transition-colors flex items-center gap-1.5"
            >
              <LinkedinIcon size={14} />
              <span>LinkedIn</span>
            </a>
            <a
              href={PERSONAL_INFO.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--primary)] hover:underline"
            >
              Resume PDF &darr;
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

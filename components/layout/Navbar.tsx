"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { MagneticButton } from "@/components/common/MagneticButton";
import { NAV_LINKS, PERSONAL_INFO } from "@/data/content";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hide on scroll down, reveal on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 60) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        // Scrolling down
        setVisible(false);
      } else {
        // Scrolling up
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Active section spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((sec) => observer.observe(sec));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header
        className={`fixed top-4 sm:top-6 inset-x-0 z-50 flex justify-center px-4 transition-transform duration-300 pointer-events-none ${
          visible ? "translate-y-0" : "-translate-y-24"
        }`}
      >
        <nav
          className={`pointer-events-auto flex items-center justify-between gap-3 sm:gap-6 px-3.5 sm:px-5 py-2.5 rounded-full transition-all duration-300 glass-pill ${
            scrolled
              ? "shadow-lg shadow-black/10 dark:shadow-black/40 scale-100"
              : "shadow-sm scale-[1.01]"
          }`}
          aria-label="Main Navigation"
        >
          {/* Logo / Monogram */}
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-display font-extrabold tracking-tight uppercase hover:text-[var(--primary)] transition-colors group"
            data-cursor-stick
          >
            <span className="w-7 h-7 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-xs font-mono-code font-bold group-hover:scale-105 transition-transform">
              JM
            </span>
            <span className="hidden sm:inline font-bold">Jayesh Mali</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1 text-xs font-mono-code font-medium">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-3 py-1.5 rounded-full transition-colors duration-200 ${
                    isActive
                      ? "text-[var(--text)] font-semibold"
                      : "text-[var(--text-muted)] hover:text-[var(--text)]"
                  }`}
                  data-cursor-stick
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-full bg-[var(--surface-hover)] -z-10"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Right actions: Theme Toggle + Magnetic CTA + Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <ThemeToggle />

            {/* Desktop CTA */}
            <div className="hidden sm:block">
              <MagneticButton
                onClick={() => {
                  const el = document.getElementById("contact");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-4 py-1.5 rounded-full bg-[var(--primary)] text-white text-xs font-mono-code font-semibold tracking-wide hover:shadow-md hover:shadow-[var(--primary)]/25 transition-all duration-200"
              >
                <span>Hire me</span>
              </MagneticButton>
            </div>

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-9 h-9 rounded-full flex items-center justify-center border border-[var(--surface-border)] bg-[var(--surface)] text-[var(--text)]"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Fullscreen Animated Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[var(--bg)]/98 backdrop-blur-2xl flex flex-col justify-between p-8 pt-28 md:hidden"
          >
            <div className="flex flex-col gap-6">
              <span className="text-xs font-mono-code uppercase tracking-widest text-[var(--text-muted)]">
                Navigation
              </span>
              <div className="flex flex-col gap-4">
                {NAV_LINKS.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 * idx, duration: 0.35 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-3xl font-display font-bold tracking-tight text-[var(--text)] hover:text-[var(--primary)] flex items-center justify-between"
                    >
                      <span>{link.name}</span>
                      <ArrowUpRight size={22} className="opacity-40" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="border-t border-[var(--surface-border)] pt-6 flex flex-col gap-4">
              <div className="flex items-center justify-between text-xs font-mono-code text-[var(--text-muted)]">
                <span>{PERSONAL_INFO.city}, India</span>
                <span className="text-[#3D5AFE] font-medium">Available for hire</span>
              </div>
              <a
                href={PERSONAL_INFO.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-[var(--primary)] text-white text-center font-mono-code text-sm font-semibold tracking-wide"
              >
                Download Resume (PDF)
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

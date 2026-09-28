"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!document.startViewTransition || reduced) {
      setTheme(nextTheme);
      return;
    }

    const rect = btnRef.current?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : e.clientX;
    const y = rect ? rect.top + rect.height / 2 : e.clientY;

    // Max distance to any corner of the screen
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      setTheme(nextTheme);
    });

    // Animate the new root expanding from click point as a circle
    transition.ready.then(() => {
      const isDark = nextTheme === "dark";

      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 600,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          pseudoElement: isDark
            ? "::view-transition-new(root)"
            : "::view-transition-new(root)",
        }
      );
    });
  };

  if (!mounted) {
    return (
      <div
        className={`w-9 h-9 rounded-full border border-[var(--surface-border)] bg-[var(--surface)] ${className}`}
        aria-hidden
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      data-cursor-stick
      className={`relative w-9 h-9 rounded-full border border-[var(--surface-border)] bg-[var(--surface)] hover:border-[var(--primary)] text-[var(--text)] flex items-center justify-center overflow-hidden transition-colors duration-200 ${className}`}
    >
      <span className="sr-only">Toggle theme</span>

      {/* Sun */}
      <span
        className="absolute transition-all duration-350 ease-out"
        style={{
          opacity: isDark ? 0 : 1,
          transform: isDark ? "rotate(90deg) scale(0)" : "rotate(0deg) scale(1)",
        }}
      >
        <Sun size={15} className="text-[#FF5A3C]" />
      </span>

      {/* Moon */}
      <span
        className="absolute transition-all duration-350 ease-out"
        style={{
          opacity: isDark ? 1 : 0,
          transform: isDark ? "rotate(0deg) scale(1)" : "rotate(-90deg) scale(0)",
        }}
      >
        <Moon size={15} className="text-[#3D5AFE]" />
      </span>
    </button>
  );
}

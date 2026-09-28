"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [count, setCount] = useState(0);
  const [shouldShow, setShouldShow] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const seen = sessionStorage.getItem("jayesh_portfolio_intro_seen");
      if (seen) {
        setShouldShow(false);
        onComplete?.();
        return;
      }
    } catch {
      // sessionStorage unavailable (e.g. private mode restrictions)
    }

    setShouldShow(true);

    const startTime = Date.now();
    const duration = 1600; // 1.6s rapid slick counter

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1, elapsed / duration);
      // easeOutExpo progression
      const current = Math.floor(progress === 1 ? 100 : (1 - Math.pow(2, -10 * progress)) * 100);
      setCount(current);

      if (progress >= 1) {
        clearInterval(interval);
        try {
          sessionStorage.setItem("jayesh_portfolio_intro_seen", "true");
        } catch {}
        setTimeout(() => {
          setShouldShow(false);
          onComplete?.();
        }, 300);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (shouldShow === false || shouldShow === null) return null;

  return (
    <AnimatePresence mode="wait">
      {shouldShow && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[999999] flex flex-col justify-between p-6 sm:p-12 md:p-16 bg-[#0A0B10] text-[#EDEBE6]"
        >
          {/* Top metadata */}
          <div className="flex items-center justify-between text-xs font-mono-code text-[#8A8D98] tracking-widest uppercase">
            <span>Portfolio &copy; 2026</span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3D5AFE] animate-ping" />
              SURAT, IN [21.17° N]
            </span>
          </div>

          {/* Center typography reveal */}
          <div className="my-auto overflow-hidden">
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-display font-extrabold tracking-tight uppercase"
              >
                Jayesh <span className="text-[#3D5AFE]">Mali</span>
              </motion.h1>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-3 text-sm sm:text-base md:text-lg font-mono-code text-[#8A8D98]"
            >
              Full Stack Developer &bull; Creative Technologist
            </motion.p>
          </div>

          {/* Bottom kinetic counter */}
          <div className="flex items-end justify-between border-t border-white/10 pt-6">
            <div className="text-xs font-mono-code text-[#8A8D98]">
              INITIALIZING EXPERIENCE
            </div>
            <div className="text-5xl sm:text-7xl md:text-8xl font-display font-black tracking-tight text-white tabular-nums">
              {String(count).padStart(2, "0")}
              <span className="text-2xl sm:text-3xl text-[#FF5A3C] font-mono-code font-normal ml-1">
                %
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

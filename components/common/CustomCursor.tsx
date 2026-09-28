"use client";

import React, { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<"default" | "link" | "view">("default");
  const [viewText, setViewText] = useState("");
  const [visible, setVisible] = useState(false);
  const [isFine, setIsFine] = useState(false);

  const ringPos = useRef({ x: -200, y: -200 });
  const mousePos = useRef({ x: -200, y: -200 });
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    setIsFine(true);
    document.body.classList.add("has-custom-cursor");

    const onMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      // Move dot instantly via direct DOM — no React re-render
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }

      if (!visible) setVisible(true);

      const el = e.target as HTMLElement;
      if (el.closest("[data-cursor-view]")) {
        setActive("view");
        const txt =
          el.closest("[data-cursor-view]")?.getAttribute("data-cursor-text") ?? "VISIT";
        setViewText(txt);
      } else if (
        el.closest("a, button, [role='button'], [data-cursor-stick]")
      ) {
        setActive("link");
      } else {
        setActive("default");
      }
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    // Spring-lerp ring loop
    const loop = () => {
      const lerp = 0.13;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerp;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerp;

      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`;
        ringRef.current.style.top = `${ringPos.current.y}px`;
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!isFine) return null;

  // Ring sizing & style based on cursor state
  const ringSize =
    active === "view" ? 72 : active === "link" ? 40 : 30;
  const ringBg =
    active === "view" ? "#3D5AFE" : "transparent";
  const ringBorder =
    active === "view"
      ? "none"
      : active === "link"
      ? "1.5px solid #FF5A3C"
      : "1.5px solid rgba(61,90,254,0.5)";
  const ringBoxShadow =
    active === "view" ? "0 0 30px rgba(61,90,254,0.4)" : "none";

  const dotBg =
    active === "link" ? "#FF5A3C" : active === "view" ? "transparent" : "#3D5AFE";
  const dotScale = active === "link" ? 1.6 : 1;

  return (
    <>
      {/* Sharp dot — position updated directly via ref in mousemove handler */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: "-100px",
          left: "-100px",
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: dotBg,
          transform: `translate(-50%, -50%) scale(${dotScale})`,
          pointerEvents: "none",
          zIndex: 99999,
          opacity: visible ? 1 : 0,
          transition: "background 0.15s ease, transform 0.12s ease, opacity 0.2s ease",
        }}
      />

      {/* Lagging spring ring — position updated directly via ref in rAF loop */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: "-100px",
          left: "-100px",
          width: ringSize,
          height: ringSize,
          borderRadius: "50%",
          background: ringBg,
          border: ringBorder,
          boxShadow: ringBoxShadow,
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 99998,
          opacity: visible ? 1 : 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition:
            "width 0.25s cubic-bezier(0.16,1,0.3,1), height 0.25s cubic-bezier(0.16,1,0.3,1), background 0.2s ease, border 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease",
        }}
      >
        {active === "view" && (
          <span
            style={{
              fontSize: 10,
              fontFamily: "var(--font-mono, monospace)",
              fontWeight: 700,
              letterSpacing: "0.1em",
              color: "#fff",
              userSelect: "none",
              textTransform: "uppercase",
              pointerEvents: "none",
            }}
          >
            {viewText}
          </span>
        )}
      </div>
    </>
  );
}

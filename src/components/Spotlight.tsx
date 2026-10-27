"use client";

import { useEffect, useRef } from "react";

// A soft glow that follows the cursor. Hidden on touch devices via CSS.
export default function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      el.style.background = `radial-gradient(520px circle at ${e.clientX}px ${e.clientY}px, rgba(45, 212, 191, 0.10), transparent 80%)`;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return <div ref={ref} className="spotlight" aria-hidden="true" />;
}

"use client";

import { useEffect, useRef, useState } from "react";

// A long screenshot that pans top to bottom, but only while it is on screen.
export default function PanImage({ src, alt }: { src: string; alt: string }) {
  const frame = useRef<HTMLSpanElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setPlaying(entry.isIntersecting),
      { threshold: 0.4 } // starts when 40% of the card is visible
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={frame} className={`pan${playing ? " playing" : ""}`}>
      {/* A plain <img> is used so the image can be as tall as it needs to be */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="pan-img" src={src} alt={alt} loading="lazy" decoding="async" />
    </span>
  );
}
"use client";

import dynamic from "next/dynamic";

// The 3D scene only runs in the browser, so it is loaded without SSR.
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

export default function HeroCanvas() {
  return (
    <div className="hero-canvas" aria-hidden="true">
      <HeroScene />
    </div>
  );
}

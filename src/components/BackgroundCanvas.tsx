"use client";

import dynamic from "next/dynamic";

// The 3D scene only runs in the browser, so it is loaded without SSR.
const BackgroundScene = dynamic(() => import("./BackgroundScene"), { ssr: false });

// Fixed behind the whole page; page content sits above it.
export default function BackgroundCanvas() {
  return (
    <div className="bg-canvas" aria-hidden="true">
      <BackgroundScene />
    </div>
  );
}

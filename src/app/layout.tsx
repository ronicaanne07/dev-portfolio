import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { profile } from "@/data/portfolio";
import "./globals.css";

export const metadata: Metadata = {
  title: profile.siteTitle,
  description: profile.siteDescription,
};

export const viewport: Viewport = {
  themeColor: "#2f4454",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

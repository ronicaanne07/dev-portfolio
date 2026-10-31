import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { profile } from "@/data/portfolio";
import "./globals.css";

export const metadata: Metadata = {
  title: profile.siteTitle,
  description: profile.siteDescription,
};

const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t="dark"}document.documentElement.dataset.theme=t}catch(e){}})();`;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8ede6" },
    { media: "(prefers-color-scheme: dark)", color: "#2f4454" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

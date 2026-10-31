"use client";

import { useEffect, useState } from "react";
import { profile, sections } from "@/data/portfolio";
import ThemeToggle from "./ThemeToggle";

const pad = (n: number) => String(n).padStart(2, "0");

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  // Hide the bar when scrolling down, show it when scrolling up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      if (Math.abs(y - last) > 8) {
        setHidden(y > last && y > 120);
        last = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll and support Escape while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const classes = ["header", scrolled && "scrolled", hidden && !open && "hidden"]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <header className={classes}>
        <a href="#hero" className="logo" aria-label="Back to top">
          <svg viewBox="0 0 100 100" aria-hidden="true">
            <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="5" />
            <text
              x="50"
              y="64"
              textAnchor="middle"
              fontSize="42"
              fontWeight="700"
              fill="currentColor"
            >
              {profile.name.charAt(0)}
            </text>
          </svg>
        </a>

        <nav aria-label="Primary" className="nav">
          <ol className="nav-list">
            {sections.map((s, i) => (
              <li key={s.id}>
                <a className="nav-link" href={`#${s.id}`}>
                  <span>{pad(i + 1)}.</span>
                  {s.label}
                </a>
              </li>
            ))}
            {profile.resumeUrl && (
              <li>
                <a
                  className="button small"
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Resume
                </a>
              </li>
            )}
            <li>
              <ThemeToggle />
            </li>
          </ol>
        </nav>

        <button
          className="menu-button"
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <div
        className={`backdrop${open ? " open" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <aside
        id="mobile-menu"
        className={`mobile-menu${open ? " open" : ""}`}
        aria-hidden={!open}
      >
        <button
          className="menu-close"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        >
          ✕
        </button>
        <ol>
          {sections.map((s, i) => (
            <li key={s.id}>
              <a href={`#${s.id}`} onClick={() => setOpen(false)}>
                <span>{pad(i + 1)}.</span>
                {s.label}
              </a>
            </li>
          ))}
        </ol>
        {profile.resumeUrl && (
          <a
            className="button"
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer noopener"
          >
            Resume
          </a>
        )}
        <ThemeToggle />
      </aside>
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import { profile, sections, socials } from "@/data/portfolio";

export default function Sidebar() {
  const [active, setActive] = useState<string>(sections[0].id);

  // Scroll spy: highlight the nav link for the section currently in view.
  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sidebar">
      <div>
        <h1 className="name">
          <a href="/">{profile.name}</a>
        </h1>
        <h2 className="title">{profile.title}</h2>
        <p className="tagline">{profile.tagline}</p>

        <nav aria-label="In-page navigation" className="nav">
          <ul>
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={active === s.id ? "nav-link active" : "nav-link"}
                  aria-current={active === s.id ? "true" : undefined}
                >
                  <span className="nav-line" aria-hidden="true" />
                  <span className="nav-label">{s.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <ul className="socials" aria-label="Social media">
        {socials.map((s) => (
          <li key={s.label}>
            <a href={s.href} target="_blank" rel="noreferrer noopener">
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </header>
  );
}

"use client";

import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { experience } from "@/data/portfolio";
import Reveal from "./Reveal";

export default function Experience() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const job = experience[active];

  const onKeyDown = (e: KeyboardEvent) => {
    const forward = e.key === "ArrowDown" || e.key === "ArrowRight";
    const back = e.key === "ArrowUp" || e.key === "ArrowLeft";
    if (!forward && !back) return;
    e.preventDefault();
    const next = (active + (forward ? 1 : -1) + experience.length) % experience.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section
      id="experience"
      className="section container"
      aria-labelledby="experience-heading"
    >
      <Reveal>
        <h2 id="experience-heading" className="numbered-heading">
          <span className="num">02.</span>Work Experience
        </h2>

        <div className="jobs">
          <div
            className="tablist"
            role="tablist"
            aria-label="Job history"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            style={{ ["--i" as string]: active }}
          >
            {experience.map((j, i) => (
              <button
                key={j.short}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                id={`tab-${i}`}
                aria-selected={active === i}
                aria-controls={`panel-${i}`}
                tabIndex={active === i ? 0 : -1}
                className={`tab${active === i ? " active" : ""}`}
                onClick={() => setActive(i)}
              >
                {j.short}
              </button>
            ))}
            <span className="tab-highlight" aria-hidden="true" />
          </div>

          <div
            key={active}
            role="tabpanel"
            id={`panel-${active}`}
            aria-labelledby={`tab-${active}`}
            className="tabpanel"
          >
            <h3 className="job-title">
              {job.role} <br/><span className="job-company">{job.company}</span>
            </h3>
            <p className="job-range">{job.period}</p>
            <ul className="bullets">
              {job.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            {/*<ul className="tags" aria-label="Technologies used">
              {job.tags.map((t) => (
                <li key={t} className="tag">
                  {t}
                </li>
              ))}
            </ul>*/}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

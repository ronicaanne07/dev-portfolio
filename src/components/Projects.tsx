import Image from "next/image";
import { projects } from "@/data/portfolio";
import type { Project } from "@/data/portfolio";
import type { CSSProperties } from "react";
import Reveal from "./Reveal";
import PanImage from "./PanImage";

const initialsOf = (title: string) =>
  title
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

function Media({ p }: { p: Project }) {
  const href = p.live ?? p.github;
  const className = `featured-image${p.tall ? " tall" : ""}`;
  // Passes the scroll duration to the CSS
  const style = p.panSeconds
    ? ({ "--pan": `${p.panSeconds}s` } as CSSProperties)
    : undefined;

  const content = p.image ? (
    p.tall ? (
      <PanImage src={p.image} alt={p.imageAlt ?? p.title} />
    ) : (
      <Image
        src={p.image}
        alt={p.imageAlt ?? p.title}
        fill
        sizes="(max-width: 768px) 100vw, 600px"
        className="project-img"
      />
    )
  ) : (
    <span>{initialsOf(p.title)}</span>
  );

  if (href) {
    return (
      <a
        className={className}
        style={style}
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={`${p.title} (opens in a new tab)`}
      >
        {content}
      </a>
    );
  }
  return (
    <div
      className={className}
      style={style}
      aria-hidden={p.image ? undefined : true}
    >
      {content}
    </div>
  );
}

function Links({ p }: { p: Project }) {
  if (!p.github && !p.live) return null;
  return (
    <p className="project-links">
      {p.github && (
        <a href={p.github} target="_blank" rel="noreferrer noopener">
          GitHub ↗
        </a>
      )}
      {p.live && (
        <a href={p.live} target="_blank" rel="noreferrer noopener">
          Live ↗
        </a>
      )}
    </p>
  );
}

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section id="work" className="section container" aria-labelledby="work-heading">
      <Reveal>
        <h2 id="work-heading" className="numbered-heading">
          <span className="num">03.</span>Selected Projects
        </h2>

        <ul>
          {featured.map((p, i) => (
            <li key={p.title} className={`featured${i % 2 ? " reverse" : ""}`}>
              <Media p={p} />
              <div className="featured-content">
                <p className="eyebrow">Featured project</p>
                <h3 className="featured-title">{p.title}</h3>
                <div className="featured-description">
                  <p>{p.description}</p>
                  <ul className="featured-tags" aria-label="Technologies used">
                    {p.tags.map((t) => (
                      <li className="tag" key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
                <Links p={p} />
              </div>
            </li>
          ))}
        </ul>

        {others.length > 0 && (
          <>
            <h3 className="other-title">Other Projects</h3>
            <ul className="project-grid">
              {others.map((p) => (
                <li key={p.title} className="project-card">
                  {p.image && (
                    <div className="project-thumb">
                      <Image
                        src={p.image}
                        alt={p.imageAlt ?? p.title}
                        fill
                        sizes="320px"
                      />
                    </div>
                  )}
                  <div>
                    <h4 className="project-card-title">{p.title}</h4>
                    <p className="project-card-text">{p.description}</p>
                  </div>
                  <div>
                    <ul className="featured-tags start" aria-label="Technologies used">
                      {p.tags.map((t) => (
                        <li className="tag" key={t}>{t}</li>
                      ))}
                    </ul>
                    <Links p={p} />
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </Reveal>
    </section>
  );
}

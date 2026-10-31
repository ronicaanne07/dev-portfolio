import Image from "next/image";
import { certificates } from "@/data/portfolio";
import Reveal from "./Reveal";

const initialsOf = (text: string) =>
  text
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

export default function Certificates() {
  if (certificates.length === 0) return null;

  return (
    <section
      id="certificates"
      className="section container"
      aria-labelledby="certificates-heading"
    >
      <Reveal>
        <h2 id="certificates-heading" className="numbered-heading">
          <span className="num">04.</span>Certificates
        </h2>

        <ul className="cert-grid">
          {certificates.map((c) => (
            <li key={`${c.title}-${c.issuer}`} className="cert-card">
              <div className="cert-thumb">
                {c.image ? (
                  <Image
                    src={c.image}
                    alt={c.imageAlt ?? `${c.title} certificate`}
                    fill
                    sizes="(max-width: 768px) 100vw, 320px"
                  />
                ) : (
                  <span aria-hidden="true">{initialsOf(c.issuer)}</span>
                )}
              </div>
              <div className="cert-body">
                <h3 className="cert-title">{c.title}</h3>
                <p className="cert-issuer">{c.issuer}</p>
                <p className="cert-meta">
                  {c.date}
                  {c.credentialId ? ` · ID ${c.credentialId}` : ""}
                </p>
                {c.url && (
                  <a
                    className="cert-link"
                    href={c.url}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    View credential ↗
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
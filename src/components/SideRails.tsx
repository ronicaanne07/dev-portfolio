import { profile, socials } from "@/data/portfolio";

// Fixed vertical rails on the left (social links) and right (email). Desktop only.
export default function SideRails() {
  return (
    <>
      <div className="side side-left">
        <ul className="side-list" aria-label="Social links">
          {socials.map((s) => (
            <li key={s.label}>
              <a
                className="side-link"
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer noopener"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="side side-right">
        <div className="side-list">
          <a className="side-link" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
        </div>
      </div>
    </>
  );
}

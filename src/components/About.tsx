import {
  about,
  education,
  profile,
  skillGroups,
} from "@/data/portfolio";
import Reveal from "./Reveal";

export default function About() {
  const initials = profile.name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  return (
    <section id="about" className="section container" aria-labelledby="about-heading">
      <Reveal>
        <div>
          <h2 id="about-heading" className="numbered-heading">
            <span className="num">01.</span>About Me
          </h2>
          {about.map((p, i) => (
            <p key={i} className="prose">
              {p}
            </p>
          ))}
          {/*<ul className="skills-list">
            {featuredSkills.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>*/}
        </div>

        <h3 className="subhead">Education</h3>
        <p className="job-title">{education.degree}</p>
        <p className="job-range">
          {education.major} · {education.school} · {education.year}
        </p>

        <h3 id="skills" className="subhead">
          Full skill set
        </h3>
        {skillGroups.map((g) => (
          <div key={g.name} className="skill-group">
            <p className="skill-group-name">{g.name}</p>
            <ul className="tags" aria-label={g.name}>
              {g.items.map((s) => (
                <li key={s} className="tag">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Reveal>
    </section>
  );
}

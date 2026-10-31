import { profile } from "@/data/portfolio";
import Reveal from "./Reveal";

export default function Contact() {
  return (
    <section id="contact" className="contact container" aria-labelledby="contact-heading">
      <Reveal>
        <p className="eyebrow centered">05. What&apos;s next?</p>
        <h2 id="contact-heading" className="contact-title">
          Let&apos;s talk
        </h2>
        <p>
          Open to Senior Web Developer, PHP Developer, Full-Stack Developer, HubSpot Admin and API Developer roles.
        </p>
        <p>
          Based in {profile.location}. Available for remote work.
        </p>
        <a className="button" href={`mailto:${profile.email}`}>
          Say hello
        </a>
      </Reveal>
    </section>
  );
}

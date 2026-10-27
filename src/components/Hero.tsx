import TypedTitles from "./TypedTitles";
import { titles } from "@/data/portfolio";
import { profile } from "@/data/portfolio";

export default function Hero() {
  return (
    <section id="hero" className="hero" aria-label="Introduction">
      <div className="container hero-inner">
        <p className="hello">Hi, my name is</p>
        <h1 className="hero-name">{profile.name}.</h1>
        <h2 className="hero-sub">
          <TypedTitles titles={titles} />
        </h2>
        <p className="hero-text">{profile.tagline}</p>
      </div>
    </section>
  );
}

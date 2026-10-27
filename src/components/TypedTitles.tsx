"use client";

import { useEffect, useState } from "react";

type Props = {
  titles: string[];
  typeMs?: number; // delay per typed letter
  deleteMs?: number; // delay per deleted letter
  holdMs?: number; // how long a finished title stays on screen
};

export default function TypedTitles({
  titles,
  typeMs = 60,
  deleteMs = 30,
  holdMs = 1600,
}: Props) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [still, setStill] = useState(false);

  // Visitors who prefer reduced motion get a static line instead
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setStill(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // The typing loop: type -> hold -> delete -> next title
  useEffect(() => {
    if (still) return;
    const full = titles[index];

    let delay = deleting ? deleteMs : typeMs;
    if (!deleting && text === full) delay = holdMs;
    if (deleting && text === "") delay = 350;

    const timer = setTimeout(() => {
      if (!deleting && text === full) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => (i + 1) % titles.length);
      } else {
        setText(deleting ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1));
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [text, deleting, index, still, titles, typeMs, deleteMs, holdMs]);

  if (still) return <span>{titles.join(" | ")}</span>;

  // The longest title is rendered invisibly so the layout doesn't jump while typing
  const longest = titles.reduce((a, b) => (b.length > a.length ? b : a), "");

  return (
    <span className="typed">
      <span className="sr-only">{titles.join(", ")}</span>
      <span className="typed-sizer" aria-hidden="true">{longest}</span>
      <span className="typed-live" aria-hidden="true">
        {text}
        <span className="typed-caret" />
      </span>
    </span>
  );
}
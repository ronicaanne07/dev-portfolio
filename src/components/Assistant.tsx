"use client";

import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { assistant, profile } from "@/data/portfolio";
import type { Intent } from "@/data/portfolio";
import Reveal from "./Reveal";

type Reply = {
  key: string;
  answer: string;
  cta?: string;
  target?: string;
  href?: string;
  intentId?: string;
};

type Message = { role: "user" | "assistant"; content: string };

// Button labels for the section the AI points to
const LABELS: Record<string, string> = {
  about: "Read the bio",
  skills: "See skills",
  experience: "View experience",
  work: "See projects",
  contact: "Contact Ronica",
};

// Scores each intent by how many of its keywords appear in the question.
// Used for the fallback when the AI is unavailable.
function match(query: string): Intent | null {
  const q = query.toLowerCase();
  let best: Intent | null = null;
  let bestScore = 0;
  for (const intent of assistant.intents) {
    const score = intent.keywords.filter((k) => q.includes(k)).length;
    if (score > bestScore) {
      best = intent;
      bestScore = score;
    }
  }
  return best;
}

const go = (target: string) =>
  document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });

export default function Assistant() {
  const [reply, setReply] = useState<Reply | null>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false); // false = starts collapsed
  const [loading, setLoading] = useState(false);
  const history = useRef<Message[]>([]); // conversation sent to the AI for context

  const showIntent = (intent: Intent) =>
    setReply({
      key: `${intent.id}-${Date.now()}`,
      answer: intent.answer,
      cta: intent.cta,
      target: intent.target,
      href: intent.href,
      intentId: intent.id,
    });

  // Sends a typed question to /api/chat. If anything fails (no key, limit hit,
  // offline), it falls back to the pre-written keyword answers.
  async function ask(question: string) {
    setLoading(true);
    history.current.push({ role: "user", content: question });
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history.current }),
      });
      if (!res.ok) {
        const info = await res.json().catch(() => null);
        throw new Error(`/api/chat returned ${res.status}: ${info?.detail ?? ""}`);
      }
      const data: { answer: string; target?: string } = await res.json();
      history.current.push({ role: "assistant", content: data.answer });
      setReply({
        key: `ai-${Date.now()}`,
        answer: data.answer,
        target: data.target,
        cta: data.target ? LABELS[data.target] : undefined,
      });
    } catch (err) {
      console.error("AI chat failed, using fallback:", err);
      history.current.pop(); // drop the question that didn't get an AI answer
      const intent = match(question);
      if (intent) {
        showIntent(intent);
      } else {
        setReply({ key: `fallback-${Date.now()}`, ...assistant.fallback });
      }
    } finally {
      setLoading(false);
    }
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q || loading) return;
    setQuery("");
    ask(q);
  };

  return (
    <section id="ask" className="assistant container" aria-labelledby="assistant-heading">
      <Reveal>
        <h2 id="assistant-heading" className="assistant-title">
          <button
            type="button"
            className="assistant-toggle"
            aria-expanded={open}
            aria-controls="assistant-body"
            onClick={() => setOpen((o) => !o)}
          >
            {assistant.title}
            <span className="assistant-caret" aria-hidden="true">‹</span>
          </button>
        </h2>
        <div id="assistant-body" className={`assistant-collapse${open ? " open" : ""}`}>
          <div className="assistant-collapse-inner" inert={!open}>
            <div className="assistant-panel">
              <p className="assistant-intro">{assistant.intro}</p>

              <ul className="chips" aria-label="Suggested questions">
                {assistant.intents.map((intent) => (
                  <li key={intent.id}>
                    <button
                      type="button"
                      className="chip"
                      aria-pressed={reply?.intentId === intent.id}
                      onClick={() => showIntent(intent)}
                    >
                      {intent.chip}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="assistant-answer" aria-live="polite">
                {loading ? (
                  <p className="assistant-empty">Thinking…</p>
                ) : reply ? (
                  <div key={reply.key} className="assistant-answer-body">
                    <p>{reply.answer}</p>
                    {reply.href ? (
                      <a
                        className="button small cta"
                        href={reply.href}
                        target={reply.href.startsWith("http") || reply.href.endsWith(".pdf") ? "_blank" : undefined}
                        rel="noreferrer noopener"
                      >
                        {reply.cta ?? "Open"}
                      </a>
                    ) : reply.target ? (
                      <button
                        type="button"
                        className="button small cta"
                        onClick={() => go(reply.target!)}
                      >
                        {reply.cta ?? "Take me there"} →
                      </button>
                    ) : null}
                  </div>
                ) : (
                  <p className="assistant-empty">{assistant.empty}</p>
                )}
              </div>

              <form className="assistant-form" onSubmit={onSubmit}>
                <label htmlFor="assistant-q" className="sr-only">
                  Ask a question about Ronica&apos;s work
                </label>
                <input
                  id="assistant-q"
                  className="assistant-input"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={assistant.placeholder}
                  autoComplete="off"
                  disabled={loading}
                />
                <button
                  type="submit"
                  className="assistant-send"
                  aria-label="Send question"
                  disabled={loading}
                >
                  →
                </button>
              </form>

              <p className="assistant-note">
                {assistant.note} <a href={`mailto:${profile.email}`}>email Ronica instead</a>.
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
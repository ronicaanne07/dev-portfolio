import { NextRequest, NextResponse } from "next/server";
import { buildSystemPrompt } from "@/lib/knowledge";

const MODEL = process.env.GROQ_MODEL ?? "llama-3.3-70b-versatile";
const SYSTEM = buildSystemPrompt();
const SECTIONS = ["about", "skills", "experience", "work", "certificates", "contact"];

// Simple per-visitor limit: 8 questions a minute (resets if the server restarts)
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 8;
}

export async function POST(req: NextRequest) {
  const key = process.env.GROQ_API_KEY;
  if (!key) return NextResponse.json({ error: "not_configured" }, { status: 503 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });

  let body: { messages?: { role: string; content: string }[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  // Keep the last 6 messages, cap each at 500 characters
  const messages = (body.messages ?? [])
    .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-6)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 500) }));

  if (!messages.length || messages[messages.length - 1].role !== "user") {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
    body: JSON.stringify({
      model: MODEL,
      temperature: 0.3,
      max_tokens: 1000,
      reasoning_effort: "low", // gpt-oss models: less thinking, faster replies
      messages: [{ role: "system", content: SYSTEM }, ...messages],
    }),
  });
  
  if (!res.ok) {
    const detail = await res.text();
    console.error("Groq error:", res.status, detail);
    return NextResponse.json(
      {
        error: "upstream",
        status: res.status,
        // Only shown while developing, never on your live site
        detail: process.env.NODE_ENV === "development" ? detail : undefined,
      },
      { status: 502 }
    );
  }

  const data = await res.json();
  const text: string = data.choices?.[0]?.message?.content ?? "";
  if (!text.trim()) {
    return NextResponse.json({ error: "empty" }, { status: 502 });
  }
  
  const tag = text.match(/\[\[goto:(\w+)\]\]/)?.[1];

  return NextResponse.json({
    answer: text.replace(/\[\[goto:\w+\]\]/g, "").trim(),
    target: tag && SECTIONS.includes(tag) ? tag : undefined,
  });
}
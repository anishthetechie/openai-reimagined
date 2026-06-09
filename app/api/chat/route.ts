import { NextRequest } from "next/server";

export const runtime = "edge";

type Message = { role: "user" | "assistant" | "system"; content: string };

const SYSTEM_PROMPT = `You are GPT-Next, a friendly and concise AI assistant embedded in a portfolio site that visually reimagines openai.com. The site was built by Anish Lotake as a design concept — it's NOT affiliated with OpenAI.

Style guide:
- Be helpful, warm, and brief. Match the user's tone.
- Plain prose. No markdown headers.
- Default to 1–3 short paragraphs unless the user asks for more.
- If asked about the site, mention it's a Next.js 14 + Tailwind + Framer Motion build with a custom HTML5 neural-network canvas and a horizontal-pinned capabilities reel.`;

const CANNED: { match: RegExp; reply: string }[] = [
  {
    match: /^(hi|hello|hey|yo|sup|howdy)\b/i,
    reply:
      "Hey! I'm a demo chatbot for this visual project. There's no API key wired up right now, so I'm running on canned responses — but ask away and I'll do my best to play along.",
  },
  {
    match: /who.*(built|made|created|designed?)/i,
    reply:
      "This site was reimagined by Anish Lotake as a visual concept — built with Next.js 14, Tailwind, Framer Motion, and an HTML5 canvas neural network. Not affiliated with OpenAI.",
  },
  {
    match: /(what.*site|what.*this|what is this|tell me about)/i,
    reply:
      "This is a portfolio piece — a visually reimagined openai.com homepage. It runs as a static Next.js app on Vercel, with a custom arrow cursor, a particle neural canvas, horizontal-pinned scroll for capabilities, and an interactive radar benchmark chart.",
  },
  {
    match: /(api|key|openai_api|how.*work|wire.*up|enable)/i,
    reply:
      "To enable real AI responses, set OPENAI_API_KEY in the Vercel project's environment variables and redeploy. The API route at /api/chat will pick it up automatically. Without it, I'll keep responding with these canned messages.",
  },
  {
    match: /(joke|funny|pun)/i,
    reply:
      "Why did the neural network bring a ladder to work? It wanted to reach the next layer. I'll be here all week — well, until someone wires up a real API.",
  },
  {
    match: /(stack|tech|built with|how.*built|technology)/i,
    reply:
      "Stack: Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion + lucide-react icons. The neural background is plain HTML5 canvas. The radar chart is hand-rolled SVG. Deployed on Vercel as a fully static build.",
  },
  {
    match: /(thank|thanks|appreciate)/i,
    reply: "Anytime! Wire up an API key when you want me to be more than a polished demo.",
  },
  {
    match: /(features?|what.*do|capabilit)/i,
    reply:
      "On the page above me: an editorial hero with a verb that rotates through building/training/aligning/shipping/scaling, a live telemetry ticker, a horizontal-pinned capabilities reel (5 panels), a magazine-style products spread, a 7-axis radar benchmark, a live 'Today' timeline, and a terminal-style footer. Plus a custom arrow cursor with context labels.",
  },
  {
    match: /(price|cost|how much)/i,
    reply:
      "The site itself is free — Vercel hobby tier hosts it for $0. If real AI responses are enabled, costs depend on the chosen model (gpt-4o-mini is roughly $0.15 per million input tokens at the time of writing).",
  },
];

function fallback(text: string): string {
  for (const c of CANNED) {
    if (c.match.test(text)) return c.reply;
  }
  return "I'm running in demo mode — no API key is configured, so my replies are scripted. Try asking me: \"what is this site?\", \"who built it?\", \"what's the tech stack?\", or \"how do I enable real responses?\"";
}

function streamFallback(text: string, encoder: TextEncoder): ReadableStream {
  const reply = fallback(text);
  return new ReadableStream({
    async start(controller) {
      // Type out word-by-word for a realistic streaming feel
      const tokens = reply.split(/(\s+)/);
      for (const t of tokens) {
        controller.enqueue(encoder.encode(t));
        await new Promise((r) => setTimeout(r, 18 + Math.random() * 32));
      }
      controller.close();
    },
  });
}

async function streamOpenAI(
  messages: Message[],
  apiKey: string,
  encoder: TextEncoder
): Promise<ReadableStream> {
  const r = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      stream: true,
      max_tokens: 600,
      temperature: 0.7,
    }),
  });

  if (!r.ok || !r.body) {
    throw new Error(`OpenAI ${r.status}`);
  }

  return new ReadableStream({
    async start(controller) {
      const reader = r.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || !trimmed.startsWith("data:")) continue;
            const data = trimmed.slice(5).trim();
            if (data === "[DONE]") continue;
            try {
              const json = JSON.parse(data);
              const delta = json.choices?.[0]?.delta?.content;
              if (delta) controller.enqueue(encoder.encode(delta));
            } catch {
              // ignore malformed lines
            }
          }
        }
      } finally {
        controller.close();
      }
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { messages?: Message[] };
    const messages = body.messages;
    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response("Bad request", { status: 400 });
    }

    // Truncate to last 12 messages to bound prompt size
    const trimmed = messages.slice(-12);
    const last = trimmed[trimmed.length - 1].content;

    const encoder = new TextEncoder();
    const apiKey = process.env.OPENAI_API_KEY;

    let stream: ReadableStream;
    if (apiKey) {
      try {
        stream = await streamOpenAI(trimmed, apiKey, encoder);
      } catch {
        stream = streamFallback(last, encoder);
      }
    } else {
      stream = streamFallback(last, encoder);
    }

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "X-Accel-Buffering": "no",
      },
    });
  } catch {
    return new Response("Error", { status: 500 });
  }
}

// POST /api/contact
//
// Sends a Telegram alert when someone submits the contact form. This runs on the server because
// the bot token must never reach the browser: anyone could read it and control the bot.
//
// Env (Vercel -> Project Settings -> Environment Variables, and .env.local for local work):
//   TELEGRAM_BOT_TOKEN  from @BotFather
//   TELEGRAM_CHAT_ID    the chat that receives the alerts

const LIMITS = { name: 100, email: 200, message: 2000 };
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;

// Per-IP timestamps. Each serverless instance has its own copy, so this is a best-effort brake
// against floods, not a hard guarantee.
const recentHits = new Map<string, number[]>();

const escapeHtml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Trim and drop control characters (keeps newlines and tabs).
const clean = (v: unknown) =>
  typeof v === "string" ? v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim() : "";

const reply = (status: number, body: Record<string, unknown>) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

function isAllowedOrigin(origin: string | null) {
  if (!origin) return true; // not a browser request (curl, tests); the other checks still apply
  try {
    const host = new URL(origin).hostname;
    return (
      host === "amirrahemi.com" ||
      host === "www.amirrahemi.com" ||
      host === "localhost" ||
      host === "127.0.0.1" ||
      host.endsWith(".vercel.app") // preview deployments
    );
  } catch {
    return false;
  }
}

function tooManyRequests(ip: string) {
  const now = Date.now();
  const hits = (recentHits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (hits.length >= RATE_MAX) {
    recentHits.set(ip, hits);
    return true;
  }
  hits.push(now);
  recentHits.set(ip, hits);
  return false;
}

export function GET() {
  return Response.json({ ok: false, error: "method_not_allowed" }, { status: 405, headers: { Allow: "POST" } });
}

export async function POST(request: Request) {
  if (!isAllowedOrigin(request.headers.get("origin"))) {
    return reply(403, { ok: false, error: "forbidden_origin" });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error("Telegram is not configured: TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID missing");
    return reply(500, { ok: false, error: "not_configured" });
  }

  let body: Record<string, unknown> | null = null;
  try {
    const parsed = await request.json();
    body = parsed && typeof parsed === "object" ? (parsed as Record<string, unknown>) : null;
  } catch {
    body = null;
  }
  if (!body) return reply(400, { ok: false, error: "invalid_body" });

  // Honeypot: the form has a hidden field that people never see or fill, but bots do.
  // Answer "ok" so a bot thinks it worked and doesn't retry.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return reply(200, { ok: true });
  }

  const name = clean(body.name);
  const email = clean(body.email);
  const message = clean(body.message);
  const lang = body.lang === "fa" ? "fa" : "en";

  const valid =
    name && name.length <= LIMITS.name &&
    email && email.length <= LIMITS.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    message && message.length <= LIMITS.message;
  if (!valid) return reply(400, { ok: false, error: "invalid_fields" });

  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (tooManyRequests(ip)) return reply(429, { ok: false, error: "too_many_requests" });

  const time = new Date().toLocaleString("en-GB", {
    timeZone: "Asia/Tehran",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const text = [
    "📩 <b>New portfolio message</b>",
    "",
    `<b>Name:</b> ${escapeHtml(name)}`,
    `<b>Email:</b> ${escapeHtml(email)}`,
    `<b>Site language:</b> ${lang === "fa" ? "Persian" : "English"}`,
    `<b>Time:</b> ${time} (Tehran)`,
    "",
    `<blockquote>${escapeHtml(message)}</blockquote>`,
  ].join("\n");

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML", disable_web_page_preview: true }),
      signal: controller.signal,
    });
    const data = (await response.json().catch(() => ({}))) as { ok?: boolean; description?: string };
    if (!response.ok || !data.ok) {
      // Log Telegram's reason, never the URL (it contains the token).
      console.error("Telegram sendMessage failed:", response.status, data.description);
      return reply(502, { ok: false, error: "telegram_failed" });
    }
    return reply(200, { ok: true });
  } catch (err) {
    // err.message can contain the request URL (which holds the token), so log only safe fields.
    const e = err as { name?: string; cause?: { code?: string } };
    console.error("Telegram request error:", e?.name, e?.cause?.code);
    return reply(502, { ok: false, error: "telegram_unreachable" });
  } finally {
    clearTimeout(timer);
  }
}

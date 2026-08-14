import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const MAX_NAME = 120;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 4000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function escHtml(raw: string): string {
  return raw
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function sanitise(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const name = sanitise(body.name, MAX_NAME);
    const email = sanitise(body.email, MAX_EMAIL);
    const message = sanitise(body.message, MAX_MESSAGE);

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }
    if (message.length < 10) {
      return NextResponse.json({ error: "Message is too short." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const recipient = process.env.CONTACT_EMAIL;
    const sender = process.env.CONTACT_FROM_EMAIL;

    if (!apiKey || !recipient || !sender) {
      console.error("[contact] service unavailable: required environment is missing.");
      return NextResponse.json(
        { error: "The contact form is temporarily unavailable. Please email directly instead." },
        { status: 503 },
      );
    }

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: sender,
      to: recipient,
      replyTo: email,
      subject: `New message from ${name}`,
      html: `
        <div style="font-family:ui-monospace,monospace;max-width:560px;margin:0 auto;padding:32px;background:#17140F;color:#F7F4EF;border:1px solid #6F675E;border-radius:6px;">
          <h2 style="color:#E8925A;letter-spacing:0.12em;font-size:13px;text-transform:uppercase;margin:0 0 24px;">jontAWorld — New contact</h2>
          <p style="margin:0 0 6px;font-size:11px;color:#A69D90;letter-spacing:0.12em;text-transform:uppercase;">From</p>
          <p style="margin:0 0 24px;font-size:15px;">${escHtml(name)} &lt;${escHtml(email)}&gt;</p>
          <p style="margin:0 0 6px;font-size:11px;color:#A69D90;letter-spacing:0.12em;text-transform:uppercase;">Message</p>
          <p style="margin:0;font-size:14px;line-height:1.75;white-space:pre-wrap;color:#F7F4EF;">${escHtml(message)}</p>
        </div>
      `,
    });

    if (error) {
      console.error("[contact] provider rejected message:", error.name);
      return NextResponse.json(
        { error: "The message could not be delivered. Please email directly instead." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] send error:", error);
    return NextResponse.json(
      { error: "The message could not be delivered. Please email directly instead." },
      { status: 500 },
    );
  }
}

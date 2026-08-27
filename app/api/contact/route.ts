import { NextResponse } from "next/server";
import { Resend } from "resend";
import { SITE } from "@/content/site";

const MAX_BODY_BYTES = 12_000;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 4;

type ContactBody = {
  name?: unknown;
  email?: unknown;
  projectType?: unknown;
  message?: unknown;
  website?: unknown;
};

const attempts = new Map<string, number[]>();

function text(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character] || character);
}

function clientKey(request: Request) {
  return request.headers.get("cf-connecting-ip")
    || request.headers.get("x-real-ip")
    || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || "unknown";
}

function limited(key: string) {
  const now = Date.now();
  const recent = (attempts.get(key) || []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  attempts.set(key, recent);
  return recent.length > MAX_REQUESTS;
}

function allowedOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    const { hostname } = new URL(origin);
    return hostname === "jontaworld.com" || hostname === "localhost" || hostname === "127.0.0.1";
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!allowedOrigin(request)) {
    return NextResponse.json({ message: "This request was not accepted." }, { status: 403 });
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ message: "This message is too long to send." }, { status: 413 });
  }

  if (limited(clientKey(request))) {
    return NextResponse.json({ message: "Please wait a little before sending another message." }, { status: 429 });
  }

  let body: ContactBody;
  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
      return NextResponse.json({ message: "This message is too long to send." }, { status: 413 });
    }
    body = JSON.parse(rawBody) as ContactBody;
  } catch {
    return NextResponse.json({ message: "Please check the form and try again." }, { status: 400 });
  }

  if (text(body.website, 200)) {
    return NextResponse.json({ ok: true });
  }

  const name = text(body.name, 80);
  const email = text(body.email, 254).toLowerCase();
  const projectType = text(body.projectType, 80) || "General enquiry";
  const message = text(body.message, 4000);
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (name.length < 2 || !emailPattern.test(email) || message.length < 20) {
    return NextResponse.json({ message: "Please complete your name, email, and message." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_EMAIL || SITE.email;

  if (!apiKey || !from) {
    return NextResponse.json(
      { message: "Direct sending is not available right now. Please email " + SITE.email + "." },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeType = escapeHtml(projectType);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");
  const subject = (projectType + ": message from " + name).slice(0, 180);

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject,
      text: "Name: " + name + "\nEmail: " + email + "\nEnquiry: " + projectType + "\n\n" + message,
      html: "<h2>New website message</h2><p><strong>Name:</strong> " + safeName + "</p><p><strong>Email:</strong> " + safeEmail + "</p><p><strong>Enquiry:</strong> " + safeType + "</p><p><strong>Message:</strong><br />" + safeMessage + "</p>",
    });

    if (error) throw new Error(error.message);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { message: "Your message could not be delivered. Please email " + SITE.email + "." },
      { status: 502 },
    );
  }
}
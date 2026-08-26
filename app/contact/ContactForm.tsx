"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Mail, Send } from "lucide-react";
import { SITE } from "@/content/site";
import styles from "./contact.module.css";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const nameId = useId(); const emailId = useId(); const msgId = useId(); const errId = useId();
  const successRef = useRef<HTMLDivElement>(null); const errorRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => { if (status === "sent") successRef.current?.focus(); if (status === "error") errorRef.current?.focus(); }, [status]);
  const set = (key: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm((current) => ({ ...current, [key]: event.target.value }));
  const gmailFallback = "https://mail.google.com/mail/?view=cm&fs=1&to=" + encodeURIComponent(SITE.email) + "&su=" + encodeURIComponent("Website enquiry from " + (form.name || "a visitor")) + "&body=" + encodeURIComponent(form.message + "\n\nFrom: " + form.name + "\nReply to: " + form.email);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim() || form.message.trim().length < 10) { setStatus("error"); setError("Please add your name, a valid reply email, and a little more detail."); return; }
    setStatus("sending"); setError("");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "The message could not be delivered.");
      setStatus("sent");
    } catch (reason) { setStatus("error"); setError(reason instanceof Error ? reason.message : "The message could not be delivered."); }
  }

  if (status === "sent") return (
    <div className={styles.success} role="status" ref={successRef} tabIndex={-1}>
      <span className={styles.successMark} aria-hidden="true">✓</span><h2 className={styles.successTitle}>Message sent.</h2>
      <p className={styles.successBody}>It has reached {SITE.email}. I will reply personally.</p>
      <button className={styles.reset} type="button" onClick={() => { setForm({ name: "", email: "", message: "" }); setStatus("idle"); }}>Send another message</button>
    </div>
  );

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <div className={styles.field}><label className={styles.label} htmlFor={nameId}>Your name</label><input id={nameId} className={styles.input} value={form.name} onChange={set("name")} required autoComplete="name" placeholder="How should I address you?" /></div>
      <div className={styles.field}><label className={styles.label} htmlFor={emailId}>Reply email</label><input id={emailId} className={styles.input} type="email" value={form.email} onChange={set("email")} required autoComplete="email" inputMode="email" placeholder="you@company.com" /></div>
      <div className={styles.field}><label className={styles.label} htmlFor={msgId}>What are you working on?</label><textarea id={msgId} className={styles.input + " " + styles.textarea} value={form.message} onChange={set("message")} required rows={7} placeholder="A few lines about the problem, timing, or role..." aria-describedby={status === "error" ? errId : undefined} /></div>
      {status === "error" && <div className={styles.errorBox}><p id={errId} className={styles.error} role="alert" ref={errorRef} tabIndex={-1}>{error}</p><a className={styles.gmailFallback} href={gmailFallback} target="_blank" rel="noopener noreferrer"><Mail aria-hidden="true" />Send this message with Gmail</a></div>}
      <button className={styles.submit} type="submit" disabled={status === "sending"}><Send aria-hidden="true" />{status === "sending" ? "Sending…" : "Send direct message"}</button>
    </form>
  );
}

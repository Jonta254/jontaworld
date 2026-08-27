"use client";

import { FormEvent, useRef, useState } from "react";
import { Send } from "lucide-react";
import styles from "./contact.module.css";

type FormState = "idle" | "sending" | "sent" | "error";

type FormSubmitResult = {
  success?: boolean;
  message?: string;
};

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, setState] = useState<FormState>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;

    const formData = Object.fromEntries(new FormData(event.currentTarget));
    if (formData.website) {
      formRef.current?.reset();
      setState("sent");
      setStatusMessage("Message sent. Thank you. I will reply by email.");
      return;
    }

    setState("sending");
    setStatusMessage("");

    try {
      const response = await fetch("https://formsubmit.co/ajax/jontaworld@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: String(formData.projectType || "General enquiry") + ": message from " + String(formData.name),
          _template: "table",
          name: formData.name,
          email: formData.email,
          enquiry: formData.projectType || "General enquiry",
          _captcha: "false",
          _honey: "",
          _url: "https://jontaworld.com/contact",
          message: formData.message,
          botcheck: "",
        }),
      });
      const result = (await response.json()) as FormSubmitResult;

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Your message could not be sent.");
      }

      formRef.current?.reset();
      setState("sent");
      setStatusMessage("Message sent. Thank you. I will reply by email.");
    } catch (error) {
      setState("error");
      setStatusMessage(error instanceof Error ? error.message : "Your message could not be sent. Please try again.");
    }
  }

  return (
    <section className={styles.formSection} aria-labelledby="message-title">
      <div className={styles.formIntro}>
        <p className={styles.label}>Send a message</p>
        <h2 id="message-title">Write to me here.</h2>
        <p>Your message comes directly to my inbox. No account and no redirect.</p>
      </div>

      <form ref={formRef} className={styles.form} onSubmit={submit}>
        <div className={styles.formRow}>
          <label>
            <span>Name</span>
            <input name="name" type="text" autoComplete="name" minLength={2} maxLength={80} required />
          </label>
          <label>
            <span>Email</span>
            <input name="email" type="email" autoComplete="email" maxLength={254} required />
          </label>
        </div>

        <label>
          <span>What can I help with?</span>
          <select name="projectType" defaultValue="">
            <option value="">Choose one if useful</option>
            <option>Website</option>
            <option>Web app or internal tool</option>
            <option>Online store</option>
            <option>Landing page</option>
            <option>Logo or visual identity</option>
            <option>Website improvement</option>
            <option>Role or collaboration</option>
            <option>Something else</option>
          </select>
        </label>

        <label>
          <span>Message</span>
          <textarea
            name="message"
            rows={7}
            minLength={20}
            maxLength={4000}
            placeholder="Tell me what you need, who it is for, and what a good result would look like."
            required
          />
        </label>

        <label className={styles.honeypot} aria-hidden="true">
          <span>Website</span>
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>

        <div className={styles.formFooter}>
          <button type="submit" disabled={state === "sending"}>
            <Send aria-hidden="true" />
            {state === "sending" ? "Sending" : "Send message"}
          </button>
          <p className={styles.formNote}>I use your details only to reply to this message.</p>
        </div>

        <p
          className={styles.formStatus}
          data-state={state}
          role={state === "error" ? "alert" : "status"}
          aria-live="polite"
        >
          {statusMessage}
        </p>
      </form>
    </section>
  );
}

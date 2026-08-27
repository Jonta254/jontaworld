import type { Metadata } from "next";
import { Code2, Copy, Mail, MapPin, Send } from "lucide-react";
import { SITE, SOCIAL } from "@/content/site";
import CopyEmail from "./CopyEmail";
import ContactForm from "./ContactForm";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description: "Email Josiah about a website, product, role, or project.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const subject = encodeURIComponent("Project enquiry for Josiah");
  const gmailUrl = "https://mail.google.com/mail/?view=cm&fs=1&to=" + encodeURIComponent(SITE.email) + "&su=" + subject;
  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>Contact</p>
          <h1>Let us talk about what you are building.</h1>
          <p>Share the problem, the stage you are at, and what a good result would look like. A rough idea is enough to begin.</p>
        </header>

        <ContactForm />

        <section className={styles.emailBlock} aria-labelledby="email-title">
          <div>
            <p className={styles.label}>Email me</p>
            <h2 id="email-title">{SITE.email}</h2>
            <p>I read every message myself and reply personally.</p>
          </div>
          <div className={styles.copy}><Copy aria-hidden="true" /><CopyEmail value={SITE.email} /></div>
        </section>

        <nav className={styles.actions} aria-label="Contact options">
          <a className={styles.primary} href={gmailUrl} target="_blank" rel="noopener noreferrer"><Mail aria-hidden="true" /><span><strong>Open Gmail</strong><small>Start a ready email</small></span></a>
          <a href={"mailto:" + SITE.email}><Send aria-hidden="true" /><span><strong>Use email app</strong><small>Open your default app</small></span></a>
          <a href={SOCIAL[0].href} target="_blank" rel="noopener noreferrer"><Code2 aria-hidden="true" /><span><strong>View GitHub</strong><small>Code and repositories</small></span></a>
        </nav>

        <section className={styles.brief} aria-labelledby="brief-title">
          <p className={styles.label}>A useful first message</p>
          <h2 id="brief-title">A few details are enough.</h2>
          <ul>
            <li>What you need built</li>
            <li>Who it needs to help</li>
            <li>What stage the idea is at</li>
            <li>When you would like it ready</li>
          </ul>
          <p>If some of that is still unclear, send the problem as you understand it. We can shape the rest together.</p>
        </section>
        <p className={styles.availability}><MapPin aria-hidden="true" />Available for selected new projects and remote roles.</p>
      </div>
    </div>
  );
}

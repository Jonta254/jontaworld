import type { Metadata } from "next";
import { Code2, Mail, MapPin, MessageSquareText } from "lucide-react";
import { SITE, SOCIAL } from "@/content/site";
import ContactForm from "./ContactForm";
import CopyEmail from "./CopyEmail";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Josiah about freelance projects, full time roles, or a product that needs thoughtful design and engineering.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const gmailUrl = "https://mail.google.com/mail/?view=cm&fs=1&to=" + encodeURIComponent(SITE.email);
  return (
    <div className={styles.page}>
      <div className={styles.grid}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>Contact</p>
          <h1 className={styles.title}>Tell me what you are building.</h1>
          <p className={styles.lede}>A rough idea is enough. Share the problem, the stage you are at, and what a good result would look like. I read every message myself.</p>
          <div className={styles.contactTabs} aria-label="Contact options">
            <a className={styles.contactTab} href={gmailUrl} target="_blank" rel="noopener noreferrer"><Mail aria-hidden="true" /><span><strong>Write with Gmail</strong><small>Opens a ready email</small></span><span className="sr-only"> to {SITE.email}, opens in a new tab</span></a>
            <a className={styles.contactTab} href={"mailto:" + SITE.email}><MessageSquareText aria-hidden="true" /><span><strong>Use email app</strong><small>{SITE.email}</small></span></a>
            <a className={styles.contactTab} href={SOCIAL[0].href} target="_blank" rel="noopener noreferrer"><Code2 aria-hidden="true" /><span><strong>View GitHub</strong><small>Code and repositories</small></span><span className="sr-only"> opens in a new tab</span></a>
          </div>
          <div className={styles.copyRow}><span>{SITE.email}</span><CopyEmail value={SITE.email} /></div>
          <p className={styles.location}><MapPin aria-hidden="true" />{SITE.availability}</p>
        </div>
        <div className={styles.formWrap}>
          <div className={styles.formIntro}><p>Direct message</p><h2>Send it from here.</h2><span>No account needed. Your reply address is used only to answer you.</span></div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}


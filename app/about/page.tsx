import type { Metadata } from "next";
import Link from "next/link";
import Section from "../components/home/Section";
import Statement from "../components/home/Statement";
import { SEQUENCE } from "@/content/sequence";
import { ESSAY, ABOUT_STATEMENT } from "@/content/about";
import { SITE } from "@/content/site";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About",
  description:
    "How I approach problems, decide what to build, work with other people, and what I mean by good software. No credentials, no claims the work cannot support.",
  alternates: { canonical: "/about" },
};

/**
 * About, written as an essay rather than a biography or a resume.
 *
 * The page moves from a wide, structured sequence (how the work got here),
 * through a quiet statement, into an intimate reading column (how I actually
 * think and work). No dates, no credentials, nothing the visitor cannot check
 * against the live work.
 */
export default function AboutPage() {
  return (
    <>
      <header className={styles.hero}>
        <p className={styles.kicker}>About</p>
        <h1 className={styles.headline}>
          I design and build <em>useful digital products</em>.
        </h1>
        <p className={styles.lede}>
          My approach comes from electrical work: understand the problem,
          build carefully, and make the result dependable.
        </p>
      </header>

      <Section eyebrow="Background" title="From field work to digital products.">
        <ol className={styles.sequence}>
          {SEQUENCE.map((c) => (
            <li key={c.num} className={styles.chapter}>
              <div className={styles.marker} aria-hidden="true">
                <span className={styles.num}>{c.num}</span>
                <span className={styles.node} />
              </div>
              <div className={styles.chapterBody}>
                <h3 className={styles.chapterTitle}>{c.title}</h3>
                <p className={styles.chapterText}>{c.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Statement>{ABOUT_STATEMENT}</Statement>

      <section className={styles.profile} aria-labelledby="profile-title">
        <div className={styles.profileIntro}>
          <h2 id="profile-title">Design judgment. Engineering responsibility.</h2>
          <p>I shape the product, design the interface, and stay responsible through launch.</p>
        </div>
        <dl>
          <div><dt>Practice</dt><dd>Product design and development</dd></div>
          <div><dt>Foundation</dt><dd>Electrical trade and field systems</dd></div>
          <div><dt>Work</dt><dd>Websites, applications, and digital tools</dd></div>
          <div><dt>Approach</dt><dd>Direct, practical, and responsible through launch</dd></div>
        </dl>
      </section>
      <section className={styles.tools} aria-labelledby="tools-title">
        <h2 id="tools-title">Tools I work with.</h2>
        <ul><li>Next.js</li><li>React</li><li>TypeScript</li><li>Node.js</li><li>Supabase</li><li>Vercel</li><li>CSS</li><li>Git</li></ul>
      </section>

      <div className={styles.essay}>
        {ESSAY.map((chapter) => (
          <section key={chapter.title} className={styles.essayChapter}>
            <h2 className={styles.essayTitle}>{chapter.title}</h2>
            {chapter.body.map((para, i) => (
              <p key={i} className={styles.essayText}>{para}</p>
            ))}
          </section>
        ))}

        <p className={styles.essayClose}>
          Everything here is live and open. You are meant to check it. Read{" "}
          <Link className={styles.inline} href="/portfolio">the work</Link>, and if
          something you are building needs this kind of care,{" "}
          <Link className={styles.inline} href="/contact">say hello</Link>.{" "}
          {SITE.availability}.
        </p>
      </div>
    </>
  );
}

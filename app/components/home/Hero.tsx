import Link from "next/link";
import { SITE } from "@/content/site";
import { PROJECTS } from "@/content/projects";
import styles from "./hero.module.css";

/**
 * The hero. Server-rendered text, with no canvas, orb, or boot sequence.
 *
 * A plain, client facing promise: what gets built, and that one person handles
 * the whole thing from design to launch. The one visual gesture is a hairline
 * underline beneath the emphasis, drawn in CSS.
 *
 * Nothing here animates before first paint, and nothing blocks the content.
 * A visitor's first five seconds are the most expensive on the site.
 */
export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.intro}>
        <p className={styles.kicker}>{SITE.availability}</p>

        <h1 className={styles.headline}>
          Digital products,
          <br className={styles.br} />
          <span className={styles.emphasis}> built end to end.</span>
        </h1>

        <p className={styles.lede}>
          I design the interface and engineer the system behind it—clear,
          fast, and built for real use.
        </p>

        <div className={styles.actions}>
          <Link href="/portfolio" className={styles.primary}>
            See the work
            <span className={styles.arrow} aria-hidden="true">→</span>
          </Link>
          <Link href="/contact" className={styles.secondary}>
            Start a project
          </Link>
        </div>
      </div>

      <aside className={styles.system} aria-label="Connected build process">
        <div className={styles.systemHead}>
          <span>Build system</span>
          <span>01—03</span>
        </div>
        <dl className={styles.brief}>
          <div><dt>01</dt><dd>Product direction</dd><span>Research + scope</span></div>
          <div><dt>02</dt><dd>Interface system</dd><span>UX + visual design</span></div>
          <div><dt>03</dt><dd>Engineering</dd><span>Next.js + TypeScript</span></div>
        </dl>
        <p className={styles.systemFoot}><span aria-hidden="true" />From first decision to production</p>
      </aside>

      {/* Proof, above the fold. The claim above is a sentence. This is the
          evidence: five products a visitor can open before scrolling once. */}
      <div className={styles.proof}>
        <span className={styles.proofLabel}>In production</span>
        <ul className={styles.proofList}>
          {PROJECTS.map((p) => (
            <li key={p.slug}>
              <a
                className={styles.proofLink}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {p.name}
                <span className="sr-only"> opens in a new tab</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

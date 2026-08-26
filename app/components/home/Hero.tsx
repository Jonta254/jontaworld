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
      <p className={styles.kicker}>{SITE.availability}</p>

      <h1 className={styles.headline}>
        I design and build websites and apps,
        <br className={styles.br} />
        <span className={styles.emphasis}> start to finish</span>.
      </h1>

      <p className={styles.lede}>
        I turn real operational problems into clear digital products—design,
        content, systems, and code handled as one connected piece.
      </p>

      <div className={styles.actions}>
        <Link href="/portfolio" className={styles.primary}>
          See the work
          <span className={styles.arrow} aria-hidden="true">â†’</span>
        </Link>
        <Link href="/contact" className={styles.secondary}>
          Start a project
        </Link>
      </div>

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


import Image from "next/image";
import Link from "next/link";
import { SERVICES } from "@/content/services";
import styles from "./services.module.css";

/**
 * What I can be hired to do.
 *
 * Editorial rows rather than a card grid — each row carries a number, the
 * service, what it includes, and a piece of visual evidence.
 *
 * Evidence is one of two honest kinds, never blurred:
 *   • a live `example` — a real, shipped product, linked out with "See it";
 *   • a `concept` — a self-initiated interface study, linked to /lab and
 *     labelled "Design concept" so it is never mistaken for shipped work.
 * When a service has both, the concept is the visual and the live product is
 * kept as a secondary link, so the concept amplifies the proof without
 * impersonating it. A service with neither says so plainly.
 */
export default function Services() {
  return (
    <ol className={styles.list}>
      {SERVICES.map((s) => {
        // The concept is the visual when present; otherwise the live example is.
        const media = s.concept
          ? {
              href: "/lab",
              shot: s.concept.shot,
              alt: s.concept.alt,
              label: s.concept.label,
              cta: "Design concept",
              external: false,
            }
          : s.example
            ? {
                href: s.example.href,
                shot: s.example.shot,
                alt: s.example.alt,
                label: s.example.label,
                cta: "See it",
                external: s.example.href.startsWith("http"),
              }
            : null;

        // A live product shown as a secondary link only when the concept took
        // the visual slot — so the shipped proof is never dropped.
        const secondaryLive = s.concept && s.example ? s.example : null;

        return (
          <li key={s.num} className={styles.row}>
            <div className={styles.head}>
              <span className={styles.num} aria-hidden="true">{s.num}</span>
              <h3 className={styles.title}>{s.title}</h3>
            </div>

            <div className={styles.body}>
              <p className={styles.text}>{s.body}</p>
              <ul className={styles.deliverables}>
                {s.deliverables.map((d) => (
                  <li key={d} className={styles.deliverable}>{d}</li>
                ))}
              </ul>
            </div>

            {media ? (
              <div className={styles.example}>
                <Link
                  href={media.href}
                  className={styles.exampleLink}
                  {...(media.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  <span className={styles.thumb}>
                    <Image
                      src={media.shot}
                      alt={media.alt}
                      width={480}
                      height={300}
                      sizes="220px"
                      className={styles.thumbImg}
                    />
                  </span>
                  <span className={styles.exampleMeta}>
                    <span className={styles.exampleLabel}>{media.label}</span>
                    <span className={styles.exampleCta}>{media.cta}</span>
                  </span>
                  {media.external && (
                    <span className="sr-only"> opens in a new tab</span>
                  )}
                </Link>

                {secondaryLive && (
                  <Link
                    href={secondaryLive.href}
                    className={styles.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live: {secondaryLive.label}
                    <span className={styles.arrow} aria-hidden="true">→</span>
                    <span className="sr-only"> opens in a new tab</span>
                  </Link>
                )}
              </div>
            ) : (
              <div className={styles.example}>
                <p className={styles.noExample}>Samples on request.</p>
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}

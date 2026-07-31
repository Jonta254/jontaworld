import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "../components/site/PageHeader";
import { CONCEPTS, LAB_NOTE } from "@/content/concepts";
import styles from "./lab.module.css";

export const metadata: Metadata = {
  title: "Lab",
  description:
    "Self-initiated interface studies exploring design-system range across industries. Design concepts, not client work — all data shown is fictional.",
  alternates: { canonical: "/lab" },
};

/**
 * The Lab. Interface studies shown honestly: labelled as concepts, with a
 * prominent note that every name and figure inside them is fictional. This is
 * the design-system and UI evidence (services #01, #06) that could not sit in
 * /portfolio without becoming a claim about shipped, client-owned software.
 *
 * A server component end to end — the images are the payload, lazy-loaded, and
 * no client JavaScript ships.
 */
export default function LabPage() {
  return (
    <div className={styles.page}>
      <PageHeader
        eyebrow="Lab"
        title="Interface concepts."
        lede="Where the design-system work goes to be tested. Each of these is a self-initiated study of a full product interface — a different industry, a different visual identity, one discipline."
      />

      <p className={styles.note} role="note">
        <span className={styles.noteLabel}>Note</span>
        {LAB_NOTE}
      </p>

      <ul className={styles.list}>
        {CONCEPTS.map((c, i) => (
          <li key={c.slug} className={styles.item}>
            <figure className={styles.figure}>
              <div className={styles.frame}>
                <Image
                  className={styles.shot}
                  src={c.image}
                  alt={c.alt}
                  fill
                  sizes="(min-width: 1120px) 1080px, 100vw"
                  loading={i === 0 ? "eager" : "lazy"}
                />
              </div>
              <figcaption className={styles.caption}>
                <div className={styles.captionHead}>
                  <h2 className={styles.name}>{c.name}</h2>
                  <span className={styles.category}>{c.category}</span>
                </div>
                <p className={styles.tagline}>{c.tagline}</p>
                <p className={styles.surfaces}>
                  <span className={styles.surfacesLabel}>Screens</span>
                  {c.surfaces}
                </p>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <div className={styles.foot}>
        <Link href="/portfolio" className={styles.footLink}>
          See the shipped work
          <span className={styles.arrow} aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}

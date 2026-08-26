import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "../components/site/PageHeader";
import { NOW } from "@/content/now";
import styles from "./now.module.css";

export const metadata: Metadata = {
  title: "Now",
  description: "What Josiah is building, learning, and noticing right now.",
  alternates: { canonical: "/now" },
};

const MOMENTS = [
  { src: "/showcase/electracore-feature.webp", alt: "ElectraCore electrical calculator interface", label: "Learning through the trade" },
  { src: "/showcase/apprenticelog-feature.webp", alt: "ApprenticeLog work-entry overview", label: "Removing friction from real work" },
  { src: "/showcase/traildesk-feature.webp", alt: "TrailDesk destination planning interface", label: "Designing for life away from a desk" },
];

export default function NowPage() {
  return (
    <div className={styles.page}>
      <PageHeader
        eyebrow="Now"
        title="Learning is part of the work."
        lede="I am always building, noticing, and learning. A new screen, a hard problem, a small mistake, or a good question can change how I make the next thing."
      />

      <main className={styles.main}>
        <figure className={styles.moments}>
          {MOMENTS.map((moment) => (
            <div className={styles.moment} key={moment.src}>
              <Image src={moment.src} alt={moment.alt} fill sizes="(max-width: 700px) 100vw, 33vw" />
              <span>{moment.label}</span>
            </div>
          ))}
          <figcaption>Three products in progress. Each one keeps teaching me something different.</figcaption>
        </figure>

        <p className={styles.pull}>
          I do not need to know everything before I begin. I need to listen,
          learn quickly, and care enough to improve the work.
        </p>

        <div className={styles.grid}>
          {NOW.map((group) => (
            <section key={group.label} className={styles.group}>
              <div className={styles.groupHead}>
                <h2>{group.label}</h2>
                <p>{group.intro}</p>
              </div>
              <ol className={styles.items}>
                {group.items.map((item, index) => (
                  <li key={item.title} className={styles.item}>
                    <span className={styles.num}>{String(index + 1).padStart(2, "0")}</span>
                    <div><h3>{item.title}</h3><p>{item.note}</p></div>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>

        <aside className={styles.invite}>
          <div>
            <p className={styles.inviteLabel}>Available for the right work</p>
            <h2>If you need someone who learns the problem, not just the brief, I would like to hear about it.</h2>
          </div>
          <Link href="/contact">Tell me what you are building <span aria-hidden="true">→</span></Link>
        </aside>
      </main>
    </div>
  );
}

import Link from "next/link";
import { SERVICES } from "@/content/services";
import styles from "./services.module.css";

/**
 * What I can be hired to do.
 *
 * A quiet, editorial capability list. No thumbnails and no per item links: the
 * concept boards live in the Lab and the shipped products live in the showcase,
 * so repeating either here would only add noise. One closing line carries the
 * path to the proof.
 */
export default function Services() {
  return (
    <>
      <ol className={styles.list}>
        {SERVICES.map((s) => (
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
          </li>
        ))}
      </ol>

      <p className={styles.foot}>
        Every one of these is demonstrated somewhere you can open:{" "}
        <Link className={styles.footLink} href="/portfolio">the live work</Link>
        {", "}
        and the{" "}
        <Link className={styles.footLink} href="/lab">interface concepts in the Lab</Link>.
      </p>
    </>
  );
}

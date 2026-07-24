import styles from "./statement.module.css";

/**
 * A quiet editorial beat: one line, standing alone in a lot of air.
 *
 * No eyebrow, no divider, no decoration. It reuses the serif and the spacing
 * scale already in the system; the composition is the only new thing. Its job
 * is pacing: a breath between two dense sections, and a sentence worth pausing
 * on when the visitor is reading rather than scrolling.
 */
export default function Statement({ children }: { children: React.ReactNode }) {
  return (
    <section className={styles.statement}>
      <p className={styles.line}>{children}</p>
    </section>
  );
}

import Link from "next/link";
import { SERVICES } from "@/content/services";
import styles from "./services.module.css";

export default function Services() {
  return (
    <>
      <ol className={styles.list}>
        {SERVICES.map((service) => (
          <li key={service.num} className={styles.row}>
            <div className={styles.heading}>
              <span className={styles.num} aria-hidden="true">{service.num}</span>
              <div>
                <h3>{service.title}</h3>
                <p className={styles.promise}>{service.promise}</p>
              </div>
            </div>
            <div className={styles.detail}>
              <p className={styles.body}>{service.body}</p>
              <ul className={styles.deliverables} aria-label={service.title + " includes"}>
                {service.deliverables.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <p className={styles.proof}><span>Proof in the work</span>{service.proof}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className={styles.close}>
        <p>You do not need a finished specification. A clear problem is enough to start.</p>
        <div className={styles.actions}>
          <Link className={styles.primary} href="/contact">Tell me about the work <span aria-hidden="true">→</span></Link>
          <Link className={styles.secondary} href="/portfolio">See what I have built</Link>
        </div>
      </div>
    </>
  );
}

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
              <div><h3>{service.title}</h3><p>{service.description}</p></div>
            </div>
            <div className={styles.includes}>
              <p>Can include</p>
              <ul>{service.includes.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          </li>
        ))}
      </ol>
      <div className={styles.close}>
        <div><p className={styles.closeLabel}>Something less standard?</p><h3>If it involves a browser, interface, workflow, data, automation, or digital product, I can probably help shape it.</h3></div>
        <div className={styles.actions}><Link className={styles.primary} href="/contact">Tell me what you need <span aria-hidden="true">→</span></Link><Link className={styles.secondary} href="/portfolio">See selected work</Link></div>
      </div>
    </>
  );
}

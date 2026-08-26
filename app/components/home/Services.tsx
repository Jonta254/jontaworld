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
      <section className={styles.process} aria-labelledby="process-title">
        <div><p className={styles.processLabel}>How a project moves</p><h3 id="process-title">A clear path from problem to launch.</h3></div>
        <ol>
          <li><span>01</span><p><strong>Understand</strong> the problem, the people, and the useful outcome.</p></li>
          <li><span>02</span><p><strong>Define</strong> the right first version and what it must prove.</p></li>
          <li><span>03</span><p><strong>Design</strong> the structure, content, and interface together.</p></li>
          <li><span>04</span><p><strong>Build and verify</strong> across real devices and realistic conditions.</p></li>
          <li><span>05</span><p><strong>Launch</strong> with the domain, analytics, search setup, and handover in place.</p></li>
        </ol>
      </section>      <div className={styles.close}>
        <div><p className={styles.closeLabel}>Something less standard?</p><h3>If it involves a browser, interface, workflow, data, automation, or digital product, I can probably help shape it.</h3></div>
        <div className={styles.actions}><Link className={styles.primary} href="/contact">Tell me what you need <span aria-hidden="true">→</span></Link><Link className={styles.secondary} href="/portfolio">See selected work</Link></div>
      </div>
    </>
  );
}

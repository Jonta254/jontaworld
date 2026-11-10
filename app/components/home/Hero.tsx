import PlatformOrbit from "./PlatformOrbit";
import Link from "next/link";
import { SITE } from "@/content/site";
import styles from "./hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.intro}>
        <p className={styles.kicker}><span aria-hidden="true" />{SITE.availability}</p>
        <h1 id="hero-title" className={styles.headline}>Digital products,<br /><span className={styles.emphasis}>built to work.</span></h1>
        <p className={styles.lede}>I design and build websites, web apps, and internal tools, from the interface to the system behind it. Clear, fast, and made for real use.</p>
        <div className={styles.actions}>
          <a href="#work" className={styles.primary}>See the work <span aria-hidden="true">→</span></a>
          <Link href="/contact" className={styles.secondary}>Start a project</Link>
        </div>
        <p className={styles.signature}>Product direction <span>/</span> Interface design <span>/</span> Engineering</p>
      </div>
      <PlatformOrbit />
      <div className={styles.footer}>
        <span>From first decision to production.</span>
        <a href="#work">Explore the work <span aria-hidden="true">↓</span></a>
      </div>
    </section>
  );
}

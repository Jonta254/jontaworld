"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NAV, SITE } from "@/content/site";
import styles from "./nav.module.css";
import BrandMark from "./BrandMark";

/**
 * Sticky, minimal, keyboard-first.
 *
 * The only client state is a boolean for whether the page has scrolled : used
 * to bring in a hairline border and a backdrop once the header stops sitting
 * on empty space. Everything else is CSS.
 *
 * Deliberately no mobile drawer: four links fit on one row at 360px, and a
 * hamburger would add a focus trap, an overlay, and a state machine to solve
 * a problem this site does not have.
 */
export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileNavHidden, setMobileNavHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    // A sentinel + IntersectionObserver rather than a scroll listener: no
    // work on the main thread per frame, and nothing to throttle.
    const sentinel = document.createElement("div");
    sentinel.setAttribute("aria-hidden", "true");
    sentinel.style.cssText = "position:absolute;top:0;height:1px;width:1px;";
    document.body.prepend(sentinel);

    const io = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { rootMargin: "0px" }
    );
    io.observe(sentinel);

    return () => {
      io.disconnect();
      sentinel.remove();
    };
  }, []);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 620px)");
    let frame = 0;

    lastScrollY.current = window.scrollY;

    const updateNavigation = () => {
      frame = 0;

      if (!mobile.matches) {
        setMobileNavHidden(false);
        lastScrollY.current = window.scrollY;
        return;
      }

      const currentY = Math.max(window.scrollY, 0);
      const distance = currentY - lastScrollY.current;

      if (currentY <= 32) {
        setMobileNavHidden(false);
      } else if (distance > 6 && currentY > 96) {
        setMobileNavHidden(true);
      } else if (distance < -4) {
        setMobileNavHidden(false);
      }

      if (Math.abs(distance) >= 4) lastScrollY.current = currentY;
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateNavigation);
    };

    const onBreakpointChange = () => {
      setMobileNavHidden(false);
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    mobile.addEventListener("change", onBreakpointChange);

    return () => {
      window.removeEventListener("scroll", onScroll);
      mobile.removeEventListener("change", onBreakpointChange);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${mobileNavHidden ? styles.mobileNavHidden : ""}`}
    >
      <nav className={styles.inner} aria-label="Primary">
        <Link href="/" className={styles.brand}>
          <BrandMark className={styles.logo} />
          <span className={styles.brandName}>{SITE.name}</span>
          <span className={styles.brandMark}>{SITE.brand}</span>
        </Link>

        <Link
          href="/contact"
          className={`${styles.mobileCta} ${pathname === "/contact" ? styles.active : ""}`}
          aria-current={pathname === "/contact" ? "page" : undefined}
        >
          Contact
        </Link>

        <ul className={styles.links} aria-hidden={mobileNavHidden || undefined}>
          {NAV.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`${styles.link} ${active ? styles.active : ""}`}
                  aria-current={active ? "page" : undefined}
                  tabIndex={mobileNavHidden ? -1 : undefined}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <Link href="/contact" className={styles.cta}>
          Get in touch
        </Link>
      </nav>
    </header>
  );
}

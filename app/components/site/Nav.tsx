"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NAV, SITE } from "@/content/site";
import styles from "./nav.module.css";
import BrandMark from "./BrandMark";

/**
 * Sticky, minimal, keyboard-first.
 *
 * Scroll state controls the header border and compact mobile row. Focusing
 * the header restores that row so keyboard navigation stays visible.
 * Routes are prefetched on hover or focus instead of loading the whole menu
 * during startup.
 */
export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const intentProps = (href: string) => {
    const prefetch = () => {
      if (href !== pathname) router.prefetch(href);
    };
    return { prefetch: false as const, onMouseEnter: prefetch, onFocus: prefetch };
  };
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
      } else if (distance > 6 && currentY > 96 && !document.activeElement?.closest("nav[aria-label='Primary']")) {
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
    <div className={styles.slot}>
      <header
        className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${mobileNavHidden ? styles.mobileNavHidden : ""}`}
      >
        <nav className={styles.inner} aria-label="Primary" onFocusCapture={() => setMobileNavHidden(false)}>
          <Link href="/" {...intentProps("/")} className={styles.brand}>
            <BrandMark className={styles.logo} />
            <span className={styles.brandName}>{SITE.name}</span>
            <span className={styles.brandMark}>{SITE.brand}</span>
          </Link>

          <Link
            href="/contact"
            {...intentProps("/contact")}
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
                    {...intentProps(item.href)}
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

          <Link href="/contact" {...intentProps("/contact")} className={styles.cta}>
            Get in touch
          </Link>
        </nav>
      </header>
    </div>
  );
}

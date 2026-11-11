import Image from "next/image";
import styles from "./showcase.module.css";

/**
 * Presents a real screenshot inside minimal browser chrome.
 *
 * Flat by design , one border, one radius, no gloss, no perspective, no 3D
 * tilt. The frame's job is to say "this is a running product", then get out of
 * the way. The screenshot is the marketing; the chrome is punctuation.
 */
export function BrowserFrame({
  src,
  alt,
  url,
  priority = false,
  width = 1440,
  height = 900,
}: {
  src: string;
  alt: string;
  url: string;
  priority?: boolean;
  width?: number;
  height?: number;
}) {
  return (
    <div className={styles.frame}>
      <div className={styles.chrome}>
        <span className={styles.dots} aria-hidden="true">
          <i /><i /><i />
        </span>
        {/* Decorative: the real, focusable link lives on the card itself. */}
        <span className={styles.chromeUrl} aria-hidden="true">
          {url}
        </span>
      </div>
      <div className={styles.previewViewport} data-tall={height > width} tabIndex={height > width ? 0 : undefined} role={height > width ? "group" : undefined} aria-label={height > width ? "Scrollable screenshot preview" : undefined}>
      <a href={src} target="_blank" rel="noopener noreferrer" className={styles.previewLink} aria-label={`Open full-size screenshot: ${alt}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 620px) calc(100vw - 66px), (max-width: 1023px) 480px, (max-width: 1440px) 40vw, 480px"
        priority={priority}
        className={styles.shot}
      />
      </a>
      </div>
    </div>
  );
}

/**
 * The mobile capture, overlapped against the desktop frame.
 *
 * Purely presentational , it repeats what the desktop shot already shows, so
 * it is hidden from assistive tech rather than announced twice.
 */
export function PhoneFrame({ src }: { src: string }) {
  return (
    <div className={styles.phone} aria-hidden="true">
      <Image
        src={src}
        alt=""
        width={390}
        height={844}
        sizes="105px"
        className={styles.phoneShot}
      />
    </div>
  );
}

"use client";

import { useEffect } from "react";
import styles from "./error.module.css";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return (
    <html lang="en">
      <body>
        <main className={styles.page}>
          <p>Something went wrong</p>
          <h1>This page could not finish loading.</h1>
          <p>The rest of the site is still available. You can try this page again without losing your place.</p>
          <button type="button" onClick={reset}>Try again</button>
        </main>
      </body>
    </html>
  );
}

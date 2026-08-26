"use client";

import { useState } from "react";
import styles from "./lab.module.css";

type EntryState = "approved" | "submitted";

export default function LabStateDemo() {
  const [state, setState] = useState<EntryState>("approved");
  const [version, setVersion] = useState(4);
  const [history, setHistory] = useState(3);

  function editApprovedEntry() {
    if (state === "approved") {
      setState("submitted");
      setVersion((value) => value + 1);
      setHistory((value) => value + 1);
    }
  }

  function resetDemo() {
    setState("approved");
    setVersion(4);
    setHistory(3);
  }

  return (
    <div className={styles.demo}>
      <div className={styles.demoHeader}>
        <p className={styles.outputLabel}>Working state model</p>
        <span className={styles.version}>Version {version}</span>
      </div>
      <div className={styles.entryCard}>
        <div>
          <span className={styles.entryRef}>ENTRY · AL 184</span>
          <strong>Install final subcircuit</strong>
        </div>
        <span className={state === "approved" ? styles.approved : styles.submitted}>
          {state === "approved" ? "Approved" : "Submitted"}
        </span>
      </div>
      <p className={styles.demoResult} aria-live="polite">
        {state === "approved"
          ? "The work is approved and its audit history is intact."
          : "The edit created a new version, withdrew approval, and added an audit event."}
      </p>
      <dl className={styles.demoFacts}>
        <div><dt>Status</dt><dd>{state}</dd></div>
        <div><dt>History events</dt><dd>{history}</dd></div>
        <div><dt>Data retained</dt><dd>Yes</dd></div>
      </dl>
      <div className={styles.demoActions}>
        <button type="button" onClick={editApprovedEntry} disabled={state !== "approved"}>Edit approved entry</button>
        <button type="button" onClick={resetDemo}>Reset example</button>
      </div>
    </div>
  );
}

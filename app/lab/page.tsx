import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "../components/site/PageHeader";
import styles from "./lab.module.css";

export const metadata: Metadata = {
  title: "Lab",
  description: "Real code studies, responsive interface work, prototypes, and engineering notes from Josiah's shipped products.",
  alternates: { canonical: "/lab" },
};

const transitionCode = `export function editEntry(
  entry: WorkEntry,
  patch: EntryEdit,
  now = new Date().toISOString(),
): WorkEntry {
  const nextVersion = entry.contentVersion + 1;
  const changedAfterApproval = entry.status === "approved";
  return {
    ...entry,
    ...patch,
    status: changedAfterApproval ? "submitted" : entry.status,
    contentVersion: nextVersion,
    updatedAt: now,
    history: changedAfterApproval
      ? [...entry.history, {
          id: createId("history"),
          action: "approval-withdrawn",
          fromStatus: "approved",
          toStatus: "submitted",
          occurredAt: now,
          contentVersion: nextVersion,
        }]
      : entry.history,
  };
}`;

const progressCode = `export function parseProgress(raw: string | null) {
  if (!raw || raw.length > 2_000_000) return EMPTY_PROGRESS;
  try {
    const value = record(JSON.parse(raw));
    if (!value) return EMPTY_PROGRESS;
    return {
      version: 2,
      completedLessonIds: uniqueIds(value.completedLessonIds),
      openedLessonIds: uniqueIds(value.openedLessonIds),
      completedChecks: uniqueIds(value.completedChecks),
    };
  } catch {
    return EMPTY_PROGRESS;
  }
}`;

const timerCode = `export function deriveTimerState(session: ActiveSession, now = Date.now()) {
  if (session.phase === "overdue") return "overdue";
  if (session.phase === "grace") {
    return remainingSeconds(session.graceDeadlineAt || session.deadlineAt, now) > 0
      ? "grace"
      : "overdue";
  }
  const left = remainingSeconds(session.deadlineAt, now);
  if (left <= 60) return "due-soon";
  if (left <= Math.min(300, Math.max(120, session.intervalMinutes * 60 * .2)))
    return "approaching";
  return "normal";
}`;

function CodeBlock({ children, label }: { children: string; label: string }) {
  return (
    <figure className={styles.codeFigure}>
      <figcaption>{label}</figcaption>
      <pre tabIndex={0}><code>{children}</code></pre>
    </figure>
  );
}

export default function LabPage() {
  return (
    <div className={styles.page}>
      <PageHeader
        eyebrow="Lab"
        title="Code, components, and working decisions."
        lede="A place for interface experiments, prototypes, and the engineering details behind the finished work. Everything here comes from a real project."
      />

      <main className={styles.grid}>
        <article className={`${styles.panel} ${styles.featured}`}>
          <div className={styles.headingRow}>
            <div><p className={styles.kind}>Code + output study</p><h2>Approval is a state transition, not a badge.</h2></div>
            <span className={styles.status}>Production logic</span>
          </div>
          <div className={styles.split}>
            <CodeBlock label="ApprenticeLog · app/lib/entry-transitions.ts">{transitionCode}</CodeBlock>
            <div className={styles.output}>
              <p className={styles.outputLabel}>Rendered behavior</p>
              <div className={styles.entryCard}>
                <div><span className={styles.entryRef}>ENTRY · AL-184</span><strong>Install final subcircuit</strong></div>
                <span className={styles.approved}>Approved</span>
              </div>
              <div className={styles.transition} aria-label="Editing an approved entry returns it to submitted status">
                <span>Edit saved</span><span aria-hidden="true">→</span><span>Approval withdrawn</span><span aria-hidden="true">→</span><span className={styles.submitted}>Submitted</span>
              </div>
              <p className={styles.note}>Editing approved work automatically invalidates the previous approval and preserves the audit history.</p>
            </div>
          </div>
        </article>

        <article className={`${styles.panel} ${styles.responsive}`}>
          <div className={styles.headingRow}>
            <div><p className={styles.kind}>Responsive study</p><h2>One product, two deliberate layouts.</h2></div>
            <span className={styles.status}>Interface study</span>
          </div>
          <div className={styles.deviceRow}>
            <figure className={styles.desktopDevice}><Image src="/showcase/traildesk-feature.webp" alt="TrailDesk destination discovery interface at desktop width" width={1440} height={900} sizes="(min-width: 900px) 62vw, 100vw" /><figcaption>Desktop · destination context stays visible</figcaption></figure>
            <figure className={styles.mobileDevice}><Image src="/showcase/traildesk-mobile.webp" alt="TrailDesk interface adapted to a narrow mobile viewport" width={390} height={844} sizes="180px" /><figcaption>Mobile · actions become linear</figcaption></figure>
          </div>
          <p className={styles.note}>The layout changes hierarchy rather than shrinking the desktop composition.</p>
        </article>

        <article className={`${styles.panel} ${styles.storage}`}>
          <p className={styles.kind}>Engineering note</p><h2>Local progress is parsed defensively.</h2>
          <CodeBlock label="DigiLearn · lib/learning-storage.ts · excerpt">{progressCode}</CodeBlock>
          <p className={styles.note}>Versioned local-first learning state survives malformed storage, duplicate IDs, and oversized payloads.</p>
        </article>

        <article className={`${styles.panel} ${styles.states}`}>
          <p className={styles.kind}>Component study</p><h2>Safety states communicate without relying on colour.</h2>
          <div className={styles.stateStrip}>
            <div><span className={styles.stateMark}>01</span><strong>Normal</strong><small>24 min remaining</small></div>
            <div><span className={styles.stateMark}>02</span><strong>Approaching</strong><small>Check-in soon</small></div>
            <div><span className={styles.stateMark}>03</span><strong>Grace</strong><small>Contact worker</small></div>
            <div><span className={styles.stateMark}>04</span><strong>Overdue</strong><small>Escalation required</small></div>
          </div>
          <details className={styles.details}><summary>See the real state logic</summary><CodeBlock label="SafeSignal · lib/session.ts · excerpt">{timerCode}</CodeBlock></details>
        </article>

        <article className={`${styles.panel} ${styles.technical}`}>
          <div className={styles.headingRow}>
            <div><p className={styles.kind}>Working interface</p><h2>Technical content earns the screen.</h2></div>
            <span className={styles.status}>Live product</span>
          </div>
          <div className={styles.browserStudy}>
            <div className={styles.browserBar}><i /><i /><i /><span>electracore.vercel.app/calculate</span></div>
            <Image src="/showcase/electracore-feature.webp" alt="ElectraCore electrical calculation tools rendered from the live application" width={1440} height={900} sizes="(min-width: 900px) 70vw, 100vw" />
          </div>
          <p className={styles.note}>Calculation and learning routes are shown as working tools, not dressed up as a generic course dashboard.</p>
        </article>

        <aside className={`${styles.panel} ${styles.observation}`}>
          <p className={styles.kind}>Engineering observation</p>
          <blockquote>“The answer first, the reasoning underneath.”</blockquote>
          <p>Mid-task users need the result now. Learners need the working one glance later. The same screen can serve both.</p>
        </aside>
      </main>

      <div className={styles.foot}><Link href="/portfolio">See the shipped work <span aria-hidden="true">→</span></Link></div>
    </div>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "../components/site/PageHeader";
import LabStateDemo from "./LabStateDemo";
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


function EvidenceLinks({ live, source }: { live: string; source: string }) {
  return (
    <div className={styles.evidenceLinks}>
      <a href={live} target="_blank" rel="noopener noreferrer">Open product</a>
      <a href={source} target="_blank" rel="noopener noreferrer">Read source</a>
    </div>
  );
}
export default function LabPage() {
  return (
    <div className={styles.page}>
      <PageHeader
        eyebrow="Lab"
        title="Code, systems, and interface studies."
        lede="A close look at the product logic, interface systems, and verification work behind what I build."
      />

      <nav className={styles.index} aria-label="Lab contents">
        <span>Inside the Lab</span>
        <ul>
          <li><a href="#product-logic">Product logic</a></li>
          <li><a href="#responsive-systems">Responsive systems</a></li>
          <li><a href="#defensive-data">Defensive data</a></li>
          <li><a href="#accessible-states">Accessible states</a></li>
          <li><a href="#verification">Verification</a></li>
        </ul>
      </nav>

      <section className={styles.proof} aria-label="Lab proof summary">
        <div><strong>5</strong><span>shipped products examined</span></div>
        <div><strong>3</strong><span>real code paths explained</span></div>
        <div><strong>1</strong><span>working state model to test</span></div>
      </section>

      <div className={styles.grid}>
        <article id="product-logic" className={`${styles.panel} ${styles.featured}`}>
          <div className={styles.headingRow}>
            <div><p className={styles.kind}>From ApprenticeLog · Code and result</p><h2>Approval is a state transition, not a badge.</h2></div>
            <span className={styles.status}>Shipped logic</span>
          </div>
          <div className={styles.split}>
            <CodeBlock label="ApprenticeLog · app/lib/entry-transitions.ts">{transitionCode}</CodeBlock>
            <LabStateDemo />
          </div>
          <EvidenceLinks live="https://apprentice-log-xi.vercel.app" source="https://github.com/Jonta254/apprentice-log" />
        </article>

        <article id="responsive-systems" className={`${styles.panel} ${styles.responsive}`}>
          <div className={styles.headingRow}>
            <div><p className={styles.kind}>From TrailDesk · Responsive system</p><h2>One product, two deliberate layouts.</h2></div>
            <span className={styles.status}>Interface study</span>
          </div>
          <div className={styles.deviceRow}>
            <figure className={styles.desktopDevice}><Image src="/showcase/traildesk-feature.webp" alt="TrailDesk destination discovery interface at desktop width" width={1440} height={900} sizes="(min-width: 900px) 62vw, 100vw" /><figcaption>Desktop · destination context stays visible</figcaption></figure>
            <figure className={styles.mobileDevice}><Image src="/showcase/traildesk-mobile.webp" alt="TrailDesk interface adapted to a narrow mobile viewport" width={390} height={844} sizes="180px" /><figcaption>Mobile · actions become linear</figcaption></figure>
          </div>
          <p className={styles.note}>The layout changes hierarchy rather than shrinking the desktop composition.</p>
          <EvidenceLinks live="https://traildesk.vercel.app" source="https://github.com/Jonta254/traildesk" />
        </article>

        <article id="defensive-data" className={`${styles.panel} ${styles.storage}`}>
          <p className={styles.kind}>From DigiLearn · Engineering note</p><h2>Local progress is parsed defensively.</h2>
          <CodeBlock label="DigiLearn · lib/learning-storage.ts · excerpt">{progressCode}</CodeBlock>
          <p className={styles.note}>Versioned local storage learning state survives malformed storage, duplicate IDs, and oversized payloads.</p>
          <EvidenceLinks live="https://digilearn-five.vercel.app" source="https://github.com/Jonta254/digilearn" />
        </article>

        <article id="accessible-states" className={`${styles.panel} ${styles.states}`}>
          <p className={styles.kind}>From SafeSignal · Component states</p><h2>Safety states communicate without relying on colour.</h2>
          <div className={styles.stateStrip}>
            <div><span className={styles.stateMark}>01</span><strong>Normal</strong><small>24 min remaining</small></div>
            <div><span className={styles.stateMark}>02</span><strong>Approaching</strong><small>Check-in soon</small></div>
            <div><span className={styles.stateMark}>03</span><strong>Grace</strong><small>Contact worker</small></div>
            <div><span className={styles.stateMark}>04</span><strong>Overdue</strong><small>Escalation required</small></div>
          </div>
          <details className={styles.details}><summary>See the real state logic</summary><CodeBlock label="SafeSignal · lib/session.ts · excerpt">{timerCode}</CodeBlock></details>
          <EvidenceLinks live="https://safesignal-beta.vercel.app" source="https://github.com/Jonta254/safesignal" />
        </article>

        <article className={`${styles.panel} ${styles.technical}`}>
          <div className={styles.headingRow}>
            <div><p className={styles.kind}>From ElectraCore · Code and result</p><h2>Technical content earns the screen.</h2></div>
            <span className={styles.status}>Live product</span>
          </div>
          <div className={styles.technicalViews}>
            <figure className={styles.browserStudy}>
              <div className={styles.browserBar}><i /><i /><i /><span>electracore.vercel.app/calculate</span></div>
              <Image src="/showcase/electracore-feature.webp" alt="ElectraCore electrical calculation tools rendered from the live application" width={1440} height={900} sizes="(min-width: 900px) 43vw, 100vw" />
              <figcaption>Eight calculators with local saved results</figcaption>
            </figure>
            <figure className={styles.browserStudy}>
              <div className={styles.browserBar}><i /><i /><i /><span>electracore.vercel.app/design</span></div>
              <Image src="/showcase/electracore-design.webp" alt="ElectraCore circuit designer rendered from the live application" width={1440} height={900} sizes="(min-width: 900px) 43vw, 100vw" />
              <figcaption>Load to cable design workflow</figcaption>
            </figure>
          </div>
          <p className={styles.note}>The calculator, designer, lesson diagrams, checks, and progress state are separate working systems. Each screen states its assumptions and review limits.</p>
          <EvidenceLinks live="https://electracore.vercel.app" source="https://github.com/Jonta254/electracore" />
        </article>

        <aside className={`${styles.panel} ${styles.observation}`}>
          <p className={styles.kind}>From ElectraCore · Engineering observation</p>
          <blockquote>“The answer first, the reasoning underneath.”</blockquote>
          <p>People in the middle of a task need the result now. Learners need the working one glance later. The same screen can serve both.</p>
        </aside>
        <article id="verification" className={`${styles.panel} ${styles.verification}`}>
          <div className={styles.headingRow}>
            <div><p className={styles.kind}>Verification · This portfolio</p><h2>A feature is not finished when it only looks right.</h2></div>
            <span className={styles.status}>Repeatable checks</span>
          </div>
          <div className={styles.checkGrid}>
            <section><span>01</span><h3>Code</h3><p>Lint, TypeScript, and a production build catch structural failures before release.</p></section>
            <section><span>02</span><h3>Routes</h3><p>Every internal route and every external project link is checked for a real response.</p></section>
            <section><span>03</span><h3>Interface</h3><p>Phone and desktop viewports are checked for overflow, missing labels, small controls, and browser errors.</p></section>
            <section><span>04</span><h3>Human use</h3><p>Keyboard focus, reduced motion, readable hierarchy, and status meaning are treated as product requirements.</p></section>
          </div>
          <div className={styles.commandRow} aria-label="Verification commands">
            <code>npm run lint</code><code>npm run typecheck</code><code>npm run build</code><code>npm run check:links</code>
          </div>
        </article>
        <aside className={[styles.panel, styles.accessibility].join(" ")}>
          <p className={styles.kind}>From this portfolio · Accessibility</p>
          <h2>Keyboard first, motion optional.</h2>
          <ul>
            <li><strong>Focus</strong><span>Every control keeps a visible keyboard state.</span></li>
            <li><strong>Motion</strong><span>Reduced motion removes decorative transitions.</span></li>
            <li><strong>Meaning</strong><span>Status never depends on colour alone.</span></li>
          </ul>
        </aside>
      </div>

      <div className={styles.foot}><Link href="/portfolio">See the shipped work <span aria-hidden="true">→</span></Link></div>
    </div>
  );
}

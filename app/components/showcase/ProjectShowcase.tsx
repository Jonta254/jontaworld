import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { Project } from "@/content/projects";
import { FLAGSHIPS, SUPPORTING } from "@/content/projects";
import { BrowserFrame, PhoneFrame } from "./BrowserFrame";
import styles from "./showcase.module.css";
import RecentPlatforms from "../home/RecentPlatforms";

/**
 * The showcase. Server-rendered, with no client JavaScript for any of it.
 *
 * Flagships get a wide, alternating two-column treatment with the mobile
 * capture overlapped, and lead into a full case study. Supporting work sits in
 * a compact grid with a lighter project page. Unequal work gets unequal
 * weight, which is the whole point.
 *
 * Each card carries three distinct links: the project name and the primary CTA
 * go to the internal case study; the live URL opens the running product. They
 * are separate targets, never nested, so keyboard and screen-reader order stays
 * clean.
 */

function LiveLink({ project }: { project: Project }) {
  return (
    <a
      className={styles.live}
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <ExternalLink aria-hidden="true" className={styles.liveIcon} />
      <span>Open live product</span>
      <span className="sr-only"> opens {project.name} in a new tab</span>
    </a>
  );
}

type HeadingLevel = "h2" | "h3";

export function FlagshipCard({ project, priority, heading = "h3" }: { project: Project; priority: boolean; heading?: HeadingLevel }) {
  const Heading = heading;
  const href = `/portfolio/${project.slug}`;
  return (
    <article className={`${styles.card} ${styles.flagship}`} data-project={project.slug}>
      <div className={styles.body}>
        <Heading className={styles.name}>
          <Link href={href} className={styles.nameLink}>
            {project.name}
          </Link>
        </Heading>
        <p className={styles.outcome}>{project.outcome}</p>
        <ul className={styles.stack}>
          {project.stack.map((s) => (
            <li key={s} className={styles.tag}>{s}</li>
          ))}
        </ul>
        <div className={styles.actions}>
          <Link href={href} className={styles.readCta}>
            {project.study ? "Read the case study" : "Explore the product"}
            <span className={styles.arrow} aria-hidden="true">→</span>
          </Link>
          <LiveLink project={project} />
        </div>
      </div>

      <div className={styles.media}>
        <BrowserFrame
          src={project.shot.desktop}
          alt={project.shot.alt}
          url={project.displayUrl}
          priority={priority}
        />
        <PhoneFrame src={project.shot.mobile} />
      </div>
    </article>
  );
}

function SupportingCard({ project, heading = "h3" }: { project: Project; heading?: HeadingLevel }) {
  const Heading = heading;
  const href = `/portfolio/${project.slug}`;
  return (
    <article className={`${styles.card} ${styles.supporting}`} data-project={project.slug}>
      <div className={styles.mediaBlock}>
        <BrowserFrame
          src={project.shot.desktop}
          alt={project.shot.alt}
          url={project.displayUrl}
        />
      </div>
      <div className={styles.body}>
        <Heading className={styles.name}>
          <Link href={href} className={styles.nameLink}>
            {project.name}
          </Link>
        </Heading>
        <p className={styles.outcome}>{project.outcome}</p>
        <ul className={styles.stack} aria-label="Technology">
          {project.stack.slice(0, 3).map((item) => (
            <li key={item} className={styles.tag}>{item}</li>
          ))}
        </ul>
        <div className={styles.actions}>
          <Link href={href} className={styles.readCtaSmall}>
            Read the case study
            <span className={styles.arrow} aria-hidden="true">→</span>
          </Link>
          <LiveLink project={project} />
        </div>
      </div>
    </article>
  );
}

export function SupportingGrid({ projects, heading = "h3" }: { projects: Project[]; heading?: HeadingLevel }) {
  return (
    <div className={styles.grid}>
      {projects.map((p) => (
        <SupportingCard key={p.slug} project={p} heading={heading} />
      ))}
    </div>
  );
}

/** Mix established products with newer work; private previews follow live products. */
export function SelectedWorkCards({ heading = "h3" }: { heading?: HeadingLevel } = {}) {
  const order = ["digilearn", "worklane", "apprenticelog", "passagewell", "electracore", "school-results", "innera"];
  return order.map((slug, index) => {
    const project = FLAGSHIPS.find((item) => item.slug === slug);
    return project
      ? <FlagshipCard key={slug} project={project} priority={index === 0} heading={heading} />
      : <RecentPlatforms key={slug} slugs={[slug]} heading={heading} />;
  });
}

export function ProjectShowcase() {
  return (
    <>
      <div className={styles.flagshipStack}>
        <SelectedWorkCards heading="h2" />
      </div>

      <div className={styles.stackGap}>
        <SupportingGrid projects={SUPPORTING} heading="h2" />
      </div>
    </>
  );
}

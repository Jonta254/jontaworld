import { BrowserFrame } from "../showcase/BrowserFrame";
import { RECENT_PLATFORMS } from "@/content/recent-platforms";
import styles from "./recent-platforms.module.css";
import showcase from "../showcase/showcase.module.css";

export default function RecentPlatforms({ slugs }: { slugs?: readonly string[] }) {
  return (
    <>
        {RECENT_PLATFORMS.filter((project) => !slugs || slugs.includes(project.slug)).map((project) => (
          <article key={project.slug} id={`project-${project.slug}`} data-project={project.slug} className={`${showcase.card} ${showcase.flagship} ${styles.project}`}>
            <div className={showcase.body}>
              <h3 className={showcase.name}>{project.name}</h3>
              <p className={showcase.outcome}>{project.description}</p>
              <ul className={showcase.stack} aria-label="Technology">{project.stack.split(" · ").map((item) => <li className={showcase.tag} key={item}>{item}</li>)}</ul>
              <div className={showcase.actions}>{project.url ? <a className={showcase.live} href={project.url} target="_blank" rel="noopener noreferrer">Open {project.name} <span aria-hidden="true">↗</span><span className="sr-only"> in a new tab</span></a> : <span className={styles.status}>{project.status}</span>}</div>
            </div>
            <div className={showcase.media}><BrowserFrame src={project.image} alt={project.alt} url={project.url ? new URL(project.url).hostname : `${project.name} · ${project.status}`} /></div>
          </article>
        ))}
    </>
  );
}

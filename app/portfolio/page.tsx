import { routeMetadata } from "@/content/metadata";
import { ProjectShowcase } from "../components/showcase/ProjectShowcase";
import styles from "./portfolio.module.css";

export const metadata = routeMetadata("Work", "Explore live work across learning, trade tools, safety, outdoor planning and entertainment, with case studies and links to each deployment.", "/portfolio");

export default function PortfolioPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Selected work</p>
        <h1 className={styles.title}>Work</h1>
        <p className={styles.lede}>
          Websites and applications across reading, wellbeing, research,
          school operations, learning and trade tools. Explore the previews,
          case studies, and the current scope of each product.
        </p>
      </header>

      <ProjectShowcase />
    </div>
  );
}

import type { Metadata } from "next";
import { ProjectShowcase } from "../components/showcase/ProjectShowcase";
import styles from "./portfolio.module.css";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Explore live work across learning, trade tools, safety, outdoor planning and entertainment, with case studies and links to each deployment.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Selected work</p>
        <h1 className={styles.title}>Work</h1>
        <p className={styles.lede}>
          Six live websites and applications across learning, trade tools,
          safety, outdoor planning and entertainment. Open each deployment,
          explore the work, and read its capabilities and current limits.
        </p>
      </header>

      <ProjectShowcase />
    </div>
  );
}

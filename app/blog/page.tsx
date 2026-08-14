import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "../components/site/PageHeader";
import { POSTS } from "@/content/blog";
import styles from "./blog.module.css";

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes on the overlap between the electrical trade and building software: architecture, design, and the discipline both demand.",
  alternates: { canonical: "/blog" },
};

const formatMonth = (date: string) => new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(new Date(`${date}T00:00:00Z`));

export default function BlogPage() {
  return (
    <div className={styles.page}>
      <PageHeader eyebrow="Writing" title="Notes from the overlap." lede="A few pieces on what the trade taught me about software, and what software taught me back." />
      <ol className={styles.list}>
        {POSTS.map((post, index) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className={styles.item}>
              <div className={styles.imageWrap}>
                <Image className={styles.image} src={post.image.src} alt={post.image.alt} width={1536} height={1024} priority={index === 0} sizes="(min-width: 1120px) 34vw, (min-width: 720px) 42vw, 100vw" />
              </div>
              <div className={styles.copy}>
                <div className={styles.meta}>
                  <span className={styles.topic}>{post.topic}</span>
                  <time dateTime={post.published}>{formatMonth(post.published)}</time>
                  <span className={styles.time}>{post.readingTime}</span>
                </div>
                <h2 className={styles.title}>{post.title}</h2>
                <p className={styles.excerpt}>{post.excerpt}</p>
                <span className={styles.cta}>Read essay<span className={styles.arrow} aria-hidden="true">→</span></span>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}

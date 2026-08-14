import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { POSTS, getPost } from "@/content/blog";
import { SITE } from "@/content/site";
import styles from "./post.module.css";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Not found" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { title: post.title, description: post.excerpt, type: "article", publishedTime: post.published, modifiedTime: post.updated, images: [{ url: post.image.src, width: 1536, height: 1024, alt: post.image.alt }] },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const others = POSTS.filter((p) => p.slug !== slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Person", name: SITE.fullName },
    publisher: { "@type": "Person", name: SITE.fullName },
    url: `${SITE.url}/blog/${post.slug}`,
    timeRequired: post.readingTime,
    datePublished: post.published,
    dateModified: post.updated ?? post.published,
    image: `${SITE.url}${post.image.src}`,
  };

  return (
    <article className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className={styles.head}>
        <Link href="/blog" className={styles.back}>
          <span aria-hidden="true">←</span> Writing
        </Link>
        <div className={styles.meta}>
          <span className={styles.topic}>{post.topic}</span>
          <time dateTime={post.published}>{new Intl.DateTimeFormat("en", { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${post.published}T00:00:00Z`))}</time>
          <span className={styles.time}>{post.readingTime}</span>
        </div>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.note}>{post.note}</p>
      </div>

      <figure className={styles.hero}>
        <Image className={styles.heroImage} src={post.image.src} alt={post.image.alt} width={1536} height={1024} priority sizes="(min-width: 1200px) 1120px, 100vw" />
      </figure>

      <div className={styles.prose}>
        {post.body.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      {others.length > 0 && (
        <aside className={styles.related}>
          <h2 className={styles.relatedTitle}>Keep reading</h2>
          <ul className={styles.relatedList}>
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/blog/${o.slug}`} className={styles.relatedLink}>
                  <span className={styles.relatedTopic}>{o.topic}</span>
                  <span className={styles.relatedName}>{o.title}</span>
                  <span className={styles.arrow} aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </article>
  );
}

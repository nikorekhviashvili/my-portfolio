import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPostSlugs, getPostBySlug, isBlogEnabled } from '../../../lib/blog';
import styles from './post.module.css';
import Subscribe from '../../../components/subscribe';

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: `${post.title} | Niko Rekhviashvili`,
    description: post.description,
  };
}

export default async function PostPage({ params }) {
  // Hide in production
  if (!isBlogEnabled()) {
    notFound();
  }

  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className={styles.main}>
      <article className={styles.container}>
        <header className={styles.header}>
          <Link href="/writing" className={styles.backLink}>← Back to Writing</Link>
          <h1 className={styles.title}>{post.title}</h1>
          {post.date && (
            <time className={styles.date}>{post.date}</time>
          )}
        </header>

        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <footer className={styles.footer}>
          <Subscribe />
        </footer>
      </article>
    </main>
  );
}

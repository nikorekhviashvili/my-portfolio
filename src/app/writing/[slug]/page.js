import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPostSlugs, getPostBySlug } from '../../../lib/blog';
import styles from './post.module.css';
import Subscribe from '../../../components/subscribe';
import PostContent from '../../../components/post-content';

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(decodeURIComponent(slug));

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: `${post.title} | Niko Rekhviashvili`,
    description: post.description,
  };
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(decodeURIComponent(slug));

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

        <PostContent className={styles.content} html={post.content} />

        <footer className={styles.footer}>
          <Subscribe />
        </footer>
      </article>
    </main>
  );
}

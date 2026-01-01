import Link from 'next/link';
import { getAllPosts } from '../../lib/blog';
import styles from './writing.module.css';
import Subscribe from '../../components/subscribe';

export const metadata = {
  title: 'Writing | Niko Rekhviashvili',
  description: 'Articles and thoughts by Niko Rekhviashvili',
};

export default function WritingPage() {
  const posts = getAllPosts();

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <header className={styles.header}>
          <Link href="/" className={styles.backLink}>← Back</Link>
          <h1>Writing</h1>
          <p className={styles.subtitle}>Articles and thoughts</p>
        </header>

        {posts.length === 0 ? (
          <p className={styles.empty}>No posts yet. Check back soon!</p>
        ) : (
          <div className={styles.postList}>
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/writing/${post.slug}`}
                className={styles.postItem}
              >
                <article>
                  <h2 className={styles.postTitle}>{post.title}</h2>
                  <p className={styles.postDescription}>{post.description}</p>
                  {post.date && (
                    <time className={styles.postDate}>{post.date}</time>
                  )}
                </article>
              </Link>
            ))}
          </div>
        )}

        <Subscribe />
      </div>
    </main>
  );
}

import { getAllPosts } from '../lib/blog';
import HomeClient from './HomeClient';

export default function Home() {
  const posts = getAllPosts().slice(0, 3); // Latest 3 posts
  return <HomeClient latestPosts={posts} />;
}

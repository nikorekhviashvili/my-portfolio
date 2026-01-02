import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { visit } from 'unist-util-visit';

/**
 * Custom remark plugin to transform image paths for the blog.
 * Handles various Obsidian path formats and normalizes them to /images/filename
 * 
 * Transforms:
 * - ../../../public/images/photo.webp → /images/photo.webp
 * - public/images/photo.webp → /images/photo.webp
 * - ./public/images/photo.webp → /images/photo.webp
 * - images/photo.webp → /images/photo.webp
 * - Already correct /images/photo.webp → unchanged
 */
function remarkImagePaths() {
  return (tree) => {
    visit(tree, 'image', (node) => {
      if (node.url) {
        // Skip external URLs
        if (node.url.startsWith('http://') || node.url.startsWith('https://')) {
          return;
        }

        // Extract just the filename from any path structure
        const filename = path.basename(node.url);

        // Check if the path contains 'images' folder reference or is in public/images
        if (node.url.includes('images/') || node.url.includes('public/')) {
          node.url = `/images/${filename}`;
        }
        // If it's a simple filename with image extension, assume it's in /images/
        else if (/\.(png|jpg|jpeg|gif|webp|svg|avif)$/i.test(filename)) {
          node.url = `/images/${filename}`;
        }
      }
    });
  };
}

const postsDirectory = path.join(process.cwd(), 'src/content/blog');

export function getAllPosts() {
  // Check if directory exists
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || slug,
        description: data.description || '',
        date: data.date ? (data.date instanceof Date ? data.date.toISOString().split('T')[0] : data.date) : '',
        image: data.image || null,
        color: data.color || '#0E38B1',
      };
    });

  // Sort by date descending
  return allPosts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPostSlugs() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => fileName.replace(/\.md$/, ''));
}

export async function getPostBySlug(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const processedContent = await remark()
    .use(remarkImagePaths)  // Transform image paths first
    .use(html)
    .process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    title: data.title || slug,
    description: data.description || '',
    date: data.date ? (data.date instanceof Date ? data.date.toISOString().split('T')[0] : data.date) : '',
    image: data.image || null,
    color: data.color || '#0E38B1',
    content: contentHtml,
  };
}

// Check if blog should be visible (preview/dev only, not production)
export function isBlogEnabled() {
  // Show in development (local)
  if (process.env.NODE_ENV === 'development') {
    return true;
  }
  // Show in Vercel preview deployments, hide in production
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production') {
    return true;
  }
  // Hide by default in production
  return false;
}

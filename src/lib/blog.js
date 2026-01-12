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
const draftsDirectory = path.join(postsDirectory, 'drafts');

// Check if drafts should be visible (dev/preview only, not production)
function includeDrafts() {
  if (process.env.NODE_ENV === 'development') {
    return true;
  }
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production') {
    return true;
  }
  return false;
}

// Get posts from a directory
function getPostsFromDirectory(directory, isDraft = false) {
  if (!fs.existsSync(directory)) {
    return [];
  }

  const fileNames = fs.readdirSync(directory);
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(directory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || slug,
        description: data.description || '',
        date: data.date ? (data.date instanceof Date ? data.date.toISOString().split('T')[0] : data.date) : '',
        isDraft,
      };
    });
}

export function getAllPosts() {
  // Get published posts from main directory
  const publishedPosts = getPostsFromDirectory(postsDirectory, false);

  // Get drafts if in dev/preview
  const draftPosts = includeDrafts() ? getPostsFromDirectory(draftsDirectory, true) : [];

  const allPosts = [...publishedPosts, ...draftPosts];

  // Sort by date descending
  return allPosts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPostSlugs() {
  const slugs = [];

  // Get published post slugs
  if (fs.existsSync(postsDirectory)) {
    const publishedFiles = fs.readdirSync(postsDirectory);
    publishedFiles
      .filter(fileName => fileName.endsWith('.md'))
      .forEach(fileName => slugs.push(fileName.replace(/\.md$/, '')));
  }

  // Get draft slugs if in dev/preview
  if (includeDrafts() && fs.existsSync(draftsDirectory)) {
    const draftFiles = fs.readdirSync(draftsDirectory);
    draftFiles
      .filter(fileName => fileName.endsWith('.md'))
      .forEach(fileName => slugs.push(fileName.replace(/\.md$/, '')));
  }

  return slugs;
}

export async function getPostBySlug(slug) {
  // Check published posts first
  let fullPath = path.join(postsDirectory, `${slug}.md`);
  let isDraft = false;

  // If not found in published, check drafts (if allowed)
  if (!fs.existsSync(fullPath)) {
    if (includeDrafts()) {
      const draftPath = path.join(draftsDirectory, `${slug}.md`);
      if (fs.existsSync(draftPath)) {
        fullPath = draftPath;
        isDraft = true;
      }
    }
  }

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
    content: contentHtml,
    isDraft,
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

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Next.js 13 portfolio website featuring an interactive single-page application with an animated cursor-following modal. The site displays work projects, personal projects, music, and a markdown-based blog.

## Development Commands

```bash
npm run dev    # Start development server (localhost:3000)
npm run build  # Build for production
npm start      # Run production server
npm run lint   # Run linter
```

## Technology Stack

- **Framework**: Next.js 13.4.5 (App Router)
- **Language**: JavaScript/React
- **Styling**: CSS Modules (scoped per-component)
- **Animation**: Framer Motion + GSAP
- **Blog**: Markdown with gray-matter + remark
- **Analytics**: Vercel Analytics & Speed Insights
- **Font**: Nunito Sans (Google Fonts via next/font)

## Architecture

### Page Structure

| Route | File | Purpose |
|-------|------|---------|
| `/` | `src/app/page.js` | Home page with all project sections |
| `/writing` | `src/app/writing/page.js` | Blog listing page |
| `/writing/[slug]` | `src/app/writing/[slug]/page.js` | Individual blog post |

### Component System

**Project Component** (`src/components/project/index.jsx`):
- Handles both desktop (hover) and mobile (double-tap) interactions
- Triggers modal visibility via `onHover` callback
- Uses dynamic heading levels for semantic HTML

**Modal Component** (`src/components/modal/index.jsx`):
- Cursor-following image preview using GSAP quickTo for smooth animation
- Uses Framer Motion for scale animations and GSAP for position tracking

**Subscribe Component** (`src/components/subscribe/index.jsx`):
- Buttondown email subscription form
- Requires replacing `YOUR_USERNAME` with actual Buttondown username

### Blog System

Blog posts are markdown files in `src/content/blog/` with YAML frontmatter:

```markdown
---
title: "Post Title"
description: "Short description for previews"
date: "2026-01-01"
---

Content here...
```

**Utilities** (`src/lib/blog.js`):
- `getAllPosts()`: Returns all posts sorted by date descending
- `getPostBySlug(slug)`: Returns single post with parsed HTML content
- `getAllPostSlugs()`: Returns slugs for static generation

### State Management

Modal state in `page.js`:
```js
{active: false, index: 0, category: '', projects: []}
```

## Adding Content

### Adding Projects (Home Page)

1. Edit the relevant array in `src/app/page.js` (workProjects, personalProjects, musicProjects)
2. Add object with: `title`, `description`, `link`, `src` (image filename), `color` (hex)
3. Place image in `/public/images/`

### Adding Blog Posts

1. Create `src/content/blog/my-post-slug.md` with frontmatter
2. The filename becomes the URL slug (`/writing/my-post-slug`)
3. Commit and push - posts are statically generated at build time

## Styling

- **Colors**: Background `#FFFFFF`, Primary `#0E38B1` (blue)
- **Mobile breakpoint**: 768px
- **Font Weights**: 300, 400, 500, 600, 700

## Mobile Behavior

- Desktop: Hover shows modal, click navigates
- Mobile: First tap expands accordion, second tap navigates
- Modal hidden on mobile via CSS

## Metadata

Site metadata in `src/app/layout.js`:
- Production: `https://www.niko.build`
- OG image: `/images/officestudio.png`

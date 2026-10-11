# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Next.js 13 portfolio website featuring an interactive single-page application with an animated cursor-following modal. The site displays work projects, personal projects, and music in distinct sections with hover effects.

## Development Commands

```bash
# Start development server (localhost:3000)
npm run dev

# Build for production
npm run build

# Run production server
npm start

# Run linter
npm run lint

# Playwright smoke suite (desktop + phone); starts the dev server itself
npm run test:e2e

# Same, recording a video of every test (for proving a change)
npm run test:e2e:prove
```

## Testing and previews

- `e2e/` holds the Playwright smoke suite: section headings, the desktop hover modal, the phone tap-to-expand card, and `/writing` through to a post. Config is `playwright.config.js`.
- Set `BASE_URL` to run the suite against a deployed URL instead of the local server, e.g. a Vercel preview. When `VERCEL_AUTOMATION_BYPASS_SECRET` is set, requests send `x-vercel-protection-bypass` so they get through Deployment Protection.
- Screenshots are always kept; videos only on failure unless `PW_VIDEO=on`. `PW_OUTPUT_DIR` changes where they land (default `test-results/`).
- GitHub Actions (`.github/workflows/ci.yml`) runs lint, build and the smoke suite against the production build on every PR, and uploads the Playwright report as an artifact.
- In Claude Code cloud sessions, `.claude/hooks/session-start.sh` runs `npm ci` whenever `package-lock.json` changed since the last install. It does nothing locally.

## Technology Stack

- **Framework**: Next.js 13.4.5 (App Router)
- **Language**: JavaScript/React
- **Styling**: CSS Modules (scoped per-component)
- **Animation**: Framer Motion + GSAP
- **Analytics**: Vercel Analytics & Speed Insights
- **Font**: Nunito Sans (Google Fonts via next/font)

## Architecture

### Single-Page Structure

The app uses Next.js App Router with a main page (`src/app/page.js`) that contains all project data as in-file arrays. There are three project categories:

- `workProjects`: Professional work from The Routing Company
- `personalProjects`: Side projects built with AI tools
- `musicProjects`: Music releases

A separate blog system lives at `/writing` with individual post pages at `/writing/[slug]`.

### Component System

**Project Component** (`src/components/project/index.jsx`):
- Handles both desktop (hover) and mobile (tap-to-expand accordion) interactions
- Triggers modal visibility via `onHover` callback
- Uses dynamic heading levels for semantic HTML

**Modal Component** (`src/components/modal/index.jsx`):
- Cursor-following image preview using GSAP quickTo for smooth animation
- Three animated elements: modal container, cursor circle, and "View" label
- Uses Framer Motion for scale animations and GSAP for position tracking
- Vertical slider showing all projects with CSS transform based on index

### State Management

Modal state is managed in `page.js` with a single `modal` object:
```js
{active: false, index: 0, category: '', projects: []}
```
This state is passed to Modal and updated via `handleProjectHover` callback from Project components.

### Blog System

Blog posts are markdown files in `src/content/blog/` with YAML frontmatter:
```yaml
---
title: Post Title
description: Short description
date: 2025-01-15
image: optional-image.png
color: "#0E38B1"
---
```

The blog library (`src/lib/blog.js`) uses gray-matter for frontmatter parsing and remark for markdown-to-HTML conversion.

## Adding/Editing Content

### Adding Projects

1. Edit the relevant array in `src/app/page.js` (workProjects, personalProjects, musicProjects, or blogArticles)
2. Add project object with required fields:
   - `title`: Display name
   - `description`: Subtitle/hover text
   - `link`: External URL
   - `src`: Image filename (must exist in `/public/images/`)
   - `color`: Modal background color (hex)
3. Place the image file in `/public/images/`
4. Dev server auto-reloads changes

### Image Requirements

- Images must be in `/public/images/` directory
- `src` field should be filename only (e.g., "project.png" not "/images/project.png")
- Modal component handles the `/images/` prefix automatically

### Adding Blog Posts

1. Create a new `.md` file in `src/content/blog/` (filename becomes the URL slug)
2. Add frontmatter with `title`, `description`, `date`, and optionally `image` and `color`
3. Write markdown content below the frontmatter

### Blog Images with Obsidian

The blog uses a custom remark plugin (`remarkImagePaths` in `src/lib/blog.js`) that automatically transforms image paths. This allows you to use Obsidian's Image Converter plugin seamlessly.

**Obsidian Image Converter Plugin Settings:**
1. **Output folder**: Set to `public/images` (relative to vault root)
2. **Custom imagename**: Use `{notename}-{timestamp}` for unique, organized filenames
3. **Format**: WebP recommended for web performance

**How it works:**
- Paste/drop an image in Obsidian → Plugin converts and saves to `public/images/`
- Plugin inserts a relative path like `![](../../../public/images/my-post-123.webp)`
- The `remarkImagePaths` plugin automatically transforms this to `/images/my-post-123.webp`

**Supported path transformations:**
- `../../../public/images/photo.webp` → `/images/photo.webp`
- `public/images/photo.webp` → `/images/photo.webp`
- `images/photo.webp` → `/images/photo.webp`
- External URLs (http/https) → unchanged

## Styling Guidelines

- **Colors**: Background `#FFFFFF`, Primary text/CTAs `#0E38B1` (blue)
- **Layout**: Left-aligned content with semantic heading hierarchy (H1 → H2 → H3)
- **Font Weights**: 300, 400, 500, 600, 700 available for Nunito Sans
- Use CSS Modules for component-scoped styling

## Metadata Configuration

Site metadata is in `src/app/layout.js` with OpenGraph and Twitter card support:
- Production domain: `https://www.niko.build`
- Development: `http://localhost:3000`
- OG image: `/images/officestudio.png`

## Mobile Behavior

The Project component includes mobile detection via `matchMedia('(max-width: 768px)')`:
- Desktop: Single click navigates, hover shows modal
- Mobile: Tap expands an accordion card with the image and a visit button (tap again to close); only the visit button navigates

## Animation Details

- Modal uses Framer Motion with custom easing: `[0.76, 0, 0.24, 1]` for enter, `[0.32, 0, 0.67, 0]` for close
- GSAP quickTo provides smooth 0.5-0.8s cursor tracking with "power3" easing
- Modal slider uses CSS transform `translateY` based on project index

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
```

## Technology Stack

- **Framework**: Next.js 13.4.5 (App Router)
- **Language**: JavaScript/React
- **Styling**: CSS Modules (scoped per-component)
- **Animation**: Framer Motion + GSAP
- **Analytics**: Vercel Analytics & Speed Insights
- **Font**: Nunito Sans (Google Fonts via next/font)

## Architecture

### Single-Page Structure

The app uses Next.js App Router with a single main page (`src/app/page.js`) that contains all project data as in-file arrays. There are four project categories:

- `workProjects`: Professional work from The Routing Company
- `personalProjects`: Side projects built with AI tools
- `musicProjects`: Music releases
- `blogArticles`: Articles (currently commented out in page.js:168-184)

### Component System

**Project Component** (`src/components/project/index.jsx`):
- Handles both desktop (hover) and mobile (double-tap) interactions
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
- Mobile: First tap shows modal, second tap navigates

## Animation Details

- Modal uses Framer Motion with custom easing: `[0.76, 0, 0.24, 1]` for enter, `[0.32, 0, 0.67, 0]` for close
- GSAP quickTo provides smooth 0.5-0.8s cursor tracking with "power3" easing
- Modal slider uses CSS transform `translateY` based on project index

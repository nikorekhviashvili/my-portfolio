# Simple Blog Plan for niko.build

## Goals
- Write in Obsidian (Markdown with frontmatter)
- Lightweight for mobile
- Email subscription
- Minimal complexity

---

## Architecture Overview

```
/src
  /app
    /blog
      page.js          # Blog listing page
      [slug]
        page.js        # Individual blog post
    page.js            # Home (add blog preview section)
  /content
    /blog
      my-first-post.md
      another-post.md
/public/images/blog/   # Blog post images
```

---

## Phase 1: Markdown Blog Setup

### 1.1 Install dependencies
```bash
npm install gray-matter remark remark-html
```

- **gray-matter**: Parse YAML frontmatter (Obsidian-compatible)
- **remark + remark-html**: Convert Markdown to HTML

### 1.2 Create blog content folder
Create `/src/content/blog/` for your markdown files.

### 1.3 Markdown file format (Obsidian-compatible)
```markdown
---
title: "My First Blog Post"
description: "A short description for previews"
date: "2026-01-01"
image: "first-post.png"
color: "#0E38B1"
---

Your blog content here in plain markdown...
```

### 1.4 Create utility functions
Create `/src/lib/blog.js` to:
- Read all markdown files from content folder
- Parse frontmatter with gray-matter
- Convert markdown to HTML with remark
- Sort posts by date

### 1.5 Create blog listing page `/blog`
- Fetch all posts at build time (static generation)
- Display list using existing Project component style
- Link to individual post pages

### 1.6 Create dynamic post page `/blog/[slug]`
- Static generation with `generateStaticParams`
- Render markdown content as HTML
- Minimal styling, fast loading

---

## Phase 2: Home Page Integration

### 2.1 Add blog preview section
- Show latest 3 posts on home page
- Reuse existing section styling
- Link to /blog for "View all"

### 2.2 Update existing commented blog code
- Uncomment blogArticles section in page.js
- Modify to pull from markdown files instead of hardcoded array

---

## Phase 3: Email Subscription

### Recommended: Buttondown
- Free tier (100 subscribers)
- Simple, lightweight embed
- No tracking bloat
- Markdown-native (write emails in Obsidian too!)

### 3.1 Setup
1. Create account at buttondown.email
2. Get your embed code

### 3.2 Add subscription form
```jsx
// Simple form component
<form
  action="https://buttondown.email/api/emails/embed-subscribe/YOUR_USERNAME"
  method="post"
>
  <input type="email" name="email" placeholder="your@email.com" required />
  <button type="submit">Subscribe</button>
</form>
```

### 3.3 Placement options
- Bottom of each blog post
- Dedicated section on /blog page
- Footer on all pages

---

## Phase 4: Obsidian Workflow

### 4.1 Setup Obsidian vault
Option A: Point Obsidian directly at `/src/content/blog/`
Option B: Use Obsidian Git plugin to sync a separate vault

### 4.2 Recommended workflow
1. Write post in Obsidian with frontmatter template
2. Save to `/src/content/blog/`
3. Add images to `/public/images/blog/`
4. `git commit && git push`
5. Vercel auto-deploys

### 4.3 Obsidian template
Create a template for new posts:
```markdown
---
title: "{{title}}"
description: ""
date: "{{date}}"
image: ""
color: "#0E38B1"
---

Write your post here...
```

---

## Mobile Optimization

- **No JavaScript for reading posts** - Static HTML
- **System fonts fallback** - Already using Nunito Sans with swap
- **Lazy load images** - Next.js Image component
- **Minimal CSS** - Reuse existing styles
- **Fast Time to First Byte** - Static generation at build time

---

## File Summary

| File | Purpose |
|------|---------|
| `/src/lib/blog.js` | Utility functions for reading/parsing posts |
| `/src/app/blog/page.js` | Blog listing page |
| `/src/app/blog/[slug]/page.js` | Individual post page |
| `/src/content/blog/*.md` | Your blog posts (Obsidian-editable) |
| `/src/components/subscribe/index.jsx` | Email subscription form |

---

## Alternative: Even Simpler Approach

If you want zero build complexity, you could:
1. Keep posts as external links (like current setup)
2. Write on Substack/Medium
3. Just link from your site

But the markdown approach gives you:
- Full ownership of content
- No platform dependency
- Faster loading (no external redirects)
- Better SEO
- Obsidian as your editor

---

## Estimated Work

1. **Phase 1** (Markdown setup): ~2 hours
2. **Phase 2** (Home integration): ~30 min
3. **Phase 3** (Subscription): ~30 min
4. **Phase 4** (Obsidian workflow): ~15 min

Total: ~3-4 hours of implementation

---

## Questions to Decide

1. **Subscription service**: Buttondown (recommended) or another? (Substack, ConvertKit, Mailchimp)
2. **Blog URL structure**: `/blog/post-slug` or `/writing/post-slug`?
3. **Comments**: None (recommended for simplicity) or add Giscus (GitHub-based)?
4. **RSS feed**: Want one? (Easy to add)

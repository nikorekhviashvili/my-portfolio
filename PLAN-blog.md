# Blog Implementation Status

## ✅ Completed

### Phase 1: Markdown Blog Setup
- Installed gray-matter, remark, remark-html
- Created `/src/content/blog/` for markdown posts
- Blog utility functions in `/src/lib/blog.js`
- Blog listing at `/writing` (not `/blog`)
- Individual posts at `/writing/[slug]`

### Phase 2: Home Page Integration
- Added "Writing" section on home page with link to `/writing`

### Phase 3: Email Subscription
- Subscribe component created at `/src/components/subscribe/index.jsx`
- Displayed on `/writing` page

---

## ⚠️ Needs Configuration

### Buttondown Setup
Replace `YOUR_USERNAME` in `/src/components/subscribe/index.jsx:17` with actual Buttondown username.

---

## 📝 Optional Enhancements (Not Started)

- **RSS feed**: Add `/writing/feed.xml` for RSS readers
- **Comments**: Add Giscus (GitHub-based) if desired
- **Home preview**: Show latest 2-3 posts on home page instead of just "View all" link

---

## Architecture Reference

```
/src
  /app
    /writing
      page.js              # Blog listing
      [slug]/page.js       # Individual post
    page.js                # Home (has Writing section)
  /content/blog/*.md       # Markdown posts
  /lib/blog.js             # Utility functions
  /components/subscribe/   # Email subscription form
```

### Post Frontmatter Format
```yaml
---
title: "Post Title"
description: "Short description"
date: "2025-01-15"
image: "optional.png"      # in /public/images/
color: "#0E38B1"           # optional
---
```

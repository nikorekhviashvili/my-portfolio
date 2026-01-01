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
- Buttondown username configured: `rekhviashvili`

---

## 📝 Optional Enhancements

### RSS Feed + Auto Email (Not Started)

Adds RSS feed that Buttondown can poll to auto-send emails when new posts are published.

**Code changes:**

1. Create `/src/app/writing/feed.xml/route.js` - Next.js route handler that generates RSS XML
   - Use `getAllPosts()` from `lib/blog.js`
   - Return XML with proper content-type header
   - Include: title, description, link, pubDate for each post

2. RSS format:
   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <rss version="2.0">
     <channel>
       <title>Niko Rekhviashvili</title>
       <link>https://www.niko.build/writing</link>
       <description>Articles and thoughts</description>
       <item>
         <title>Post Title</title>
         <link>https://www.niko.build/writing/post-slug</link>
         <description>Post description</description>
         <pubDate>Wed, 15 Jan 2025 00:00:00 GMT</pubDate>
       </item>
     </channel>
   </rss>
   ```

**Buttondown setup:**

1. Go to buttondown.email/settings/basics
2. Enable "RSS to email"
3. Enter feed URL: `https://www.niko.build/writing/feed.xml`
4. Configure frequency (daily/weekly check)

**Result:** When you publish a new post and deploy, Buttondown detects it in the RSS feed and sends to subscribers automatically.

---

### Other Ideas (Not Started)

- **Comments**: Add Giscus (GitHub-based)
- **Home preview**: Show latest 2-3 posts on home page instead of just "View all" link

---

## Architecture Reference

```
/src
  /app
    /writing
      page.js              # Blog listing
      [slug]/page.js       # Individual post
      feed.xml/route.js    # RSS feed (planned)
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

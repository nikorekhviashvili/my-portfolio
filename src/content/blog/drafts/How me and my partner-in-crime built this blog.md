---
title: How me and my partner-in-crime built this blog
description: My partner-in-crime is Claude Code btw!
date: 2025-01-01
image:
color: "#0E38B1"
---

### My semi-clear goals
I guess starting a blog wasn't really my new-years resolution but maybe it was an influence of these 2 pieces of content I consumed (kind of ironic). First [it was this podcast](https://podcasts.apple.com/us/podcast/kitzecast/id1725128042?i=1000684860920) from an indie-developer pushing the narrative to try to produce more and consume less. And second was [this small blog ](https://www.dbreunig.com/2025/12/27/why-i-write.html)from Drew Breunig on why I should actually write more.
I was never good at writing, not in school and not in university. I became aware of this more at work. I can (sometimes) make interesting decks and get my point across that way. I use (my mostly self-deprecating) humour, some neatly organised slides and my mostly exotic Georgian English accent to somehow get people to pay attention to what I am trying to communicate.
But I always knew that the people who could write engaging, really concise docs had some superior skills - and for me the most important part was that I felt they definitely had those concepts much more internalised.
So that's where my motivation is coming from:
1. **I want to create more (writing, building, music) this year**
2. **I want to get better at writing:**
So, building a blog on my personal website felt like a good start! And obviously, [Claude Code on vacation](https://youtu.be/cYQAFtkqH34?si=0CZgcL9Dg9IQH_wu) to help me out.
### My Requirements
While I know nothing about blogging (I totally missed that internet era - I was too young or too Georgian I guess?), I still had some strong feelings on what I wanted:
1. **Lightweight** - I wanted something that loads really fast, is not pain in the ass to read on the mobile - especially if someone opens it from x/reddit/hackernews.
2. **No clunky editor** - Since I transitioned from Notion to Obsidian this year, I really have become aware that I write WAAAY more if I actually like the interface I am writing in. So that already rules out random web platforms where I need to spend crazy amount of time before  or even Notion.
3. **Email Subscription** - I know I wanted to have a way for people to subscribe to my writing! Even thought it has a really small chance that someone will actually subscribe, I guess if that ever happens, it would be nice, right?
### Where we ended up
After couple hours of haphazard prompting and testing spread over 3 days (I am on the vacation after all) I ended up here:
- **Markdown files in my repo** - I can create markdown files in Obsidian Vault in my repo and when I commit to my repo, they automatically become beautiful (at least in my opinion blog posts). I can add images, any formatting available for Markdown but most importantly, use the tool I already love to use to write my blog posts!
- **Buttondown for subscription** - I still had to use a random 3rd party SaaS tool to send emails to my subscribers. Not super happy with that fact, but it actually seems okay. The button to subscribe fits nicely on my personal website.
- **Hosted on Vercel** - everything is hosted on Vercel. That makes it easy for me to manage, could be dumb decision if I get a lot of visitors, but so far that seems like a potentially good problem to have. I also get automatic analytics from Vercel which is what I need!
- **Dark Mode** - This is very straightforward, but before the blog - my website was a VERY light mode website. I like to read blogs at night - no one will want to read my blog at night if it hurts their eyes. It was literally one prompt and one follow-up suggestion for Opus 4.5 to add dark mode on my website.
### My Obsidian Setup
If you haven't heard of [Obsidian](https://obsidian.md/) - sorry! I already mentioned it several times without explaining. It's basically a notes app but with some interesting distinctions. It's not forcing you to lock-in within their walled garden, you are just editing markdown files (which almost anything can open). At the same time it's super customizable, has massive plugin ecosystem and is generally very fast.
The way I use Obsidian for my blog so far might seem really basic for Obsidian masters on the web, but these simple automations really make writing easily accessible for me.
- Templates - I have an easy to duplicate template created that has pre-filled date
- **New blog-post** **hotkey** - just start a new draft file in my drafts folder with cmd+n. No matter where I am or what I am doing in Obsidan. Then with cmd+ctrl+t can help me add a template to this doc that will be easily parsed to an HTML later.
- **Folder structure** - Publishing a blog post is basically just dragging my file from Drafts to the Blog folder and pushing changes to Github.
- **Images** - Adding an image to the blog-post is also as simple as just dragging a photo to the Obsidian file. Image Converter plugin does all the rest - converting it to webp, compressing it, writing the link in relative markdown format, and saving the photo in a pre-defined folder.



### Draft notes below only for myself - no need to review
What else happened?
- Obsidian Setup
	- Shortcuts (cmd + n; Header shortcuts)
	- Templates
	- Drafts folder
	- Images
- Buttondown
- How images work in Obsidian
- Drafts folder
- Dark Mode
- Still to do:
	- Editor Skill/prompt?
	- Local blog view in Drafts folder?
	- Automated buttondown
	- Graphics generation in my style


---

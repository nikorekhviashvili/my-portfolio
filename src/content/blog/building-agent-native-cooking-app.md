---
title: Building an agent-native cooking app
description: My baby started eating real food, so I built Sous Chef.
date: 2026-09-30
---
6 months ago my baby started to eat actual food instead of formula-slop. That meant I had to cook 10x more often than before, so I needed help.

So I decided to do the first thing that comes to every parent's mind at that time - build a fully agentic cooking app.

<video src="/videos/souschef-sizzle.mp4" poster="/videos/souschef-sizzle.jpg" muted loop playsinline preload="none"></video>

### Import via URL, photo, text

Introducing [Sous Chef](https://apps.apple.com/us/app/sous-chef-recipe-assistant/id6775589134) - a cooking app with an AI sidekick.

My 1st problem - my recipes were in the NYT Cooking app, Arc bookmarks, chats with my mom, Obsidian & the Notes app. Sous Chef imports recipes from any URL, text or a photo and formats them while getting rid of the recipe writer's personal story.

<video src="/videos/souschef-import-url.mp4" poster="/videos/souschef-import-url.jpg" muted loop playsinline preload="none"></video>

### Import from TikTok, IG, YouTube

My TikTok and IG algo also figured out I was a tired parent cooking dinners daily - so I was fed a looot of cheffluencer content that ended up in my Saved folder.

You can share any TikTok, IG or YouTube video to Sous Chef, it transcribes the video + caption and adds a perfectly formatted recipe.

<video src="/videos/souschef-import-social.mp4" poster="/videos/souschef-import-social.jpg" muted loop playsinline preload="none"></video>

### Edits

During cooking, you can ask Sous Chef to make any edits to the recipe - ingredient swaps, increasing portions, fibermaxx the dish etc.

It's pretty handy - makes edits very fast, edits anything including ingredients or cooking instructions and still keeps changes easy to reverse.

<video src="/videos/souschef-live-edit.mp4" poster="/videos/souschef-live-edit.jpg" muted loop playsinline preload="none"></video>

### MCP!

You can also bring your own agent to Sous Chef! If you have ever brainstormed a recipe with CC - now you can store those recipes in Sous Chef.

It's also an [MCP app](https://mysouschef.app/mcp) - so the cooking UX becomes much nicer directly in the chat. (ChatGPT plugin is waiting on approval!)

<video src="/videos/souschef-mcp-chat.mp4" poster="/videos/souschef-mcp-chat.jpg" muted loop playsinline preload="none"></video>

### Explore tab with RAG and all

If you are also looking for inspiration and don't want to search, the agent has access to ±8000 high-quality recipes. It can do a really smart search to find a relevant recipe for any situation.

<video src="/videos/souschef-explore.mp4" poster="/videos/souschef-explore.jpg" muted loop playsinline preload="none"></video>

### AI categorisation

I love things to be organised, but I don't always love the process of organising. So Sous Chef also auto-categorises recipes for you. It always keeps between 5-10 categories so that it's not overwhelming and rethinks if previous categories make sense every once in a while.

<video src="/videos/souschef-categories.mp4" poster="/videos/souschef-categories.jpg" muted loop playsinline preload="none"></video>

### Other learnings

On top of the above, I also learned a lot while building this.

- Building a conversational onboarding is awesome! But it's pretty different from building a chat/agent. You need way more boundaries.
- Building and running evals on new models is fun! And OpenRouter makes it sooo easy. You no longer need to have FOMO on new model launches.
- I'm also experimenting with programmatic and self-driving SEO loops to drive traffic to the website. My agent does weekly checks and comes up with ideas on how to improve SEO.

The thing that didn't work - generating images for recipes is bad bad bad. I don't know why I even tried.

### Bye?

The app is still free. Hopefully this doesn't go super viral, so that I don't go bankrupt soon.

[Here is the link again.](https://apps.apple.com/us/app/sous-chef-recipe-assistant/id6775589134)

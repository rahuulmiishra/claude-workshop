---
name: Source Quality Notes
description: Reliable tech news sources, blocked domains, and effective search query patterns for the news curator
type: reference
---

## Reliable Sources (confirmed accessible)

- TechCrunch (techcrunch.com) — broad tech coverage, breaks startup/industry stories early
- CNBC Technology (cnbc.com/technology) — strong on earnings, market-moving stories
- 9to5Mac (9to5mac.com) — Apple-specific, fast and accurate on earnings/products
- MacRumors (macrumors.com) — Apple earnings and product news
- Federal News Network (federalnewsnetwork.com) — DoD / government tech deals
- Breaking Defense (breakingdefense.com) — military tech and Pentagon deals
- Tom's Hardware (tomshardware.com) — hardware deep dives
- Engadget (engadget.com) — consumer tech, layoffs, industry moves
- Washington Post Technology (washingtonpost.com/technology) — policy, big tech
- Variety Digital (variety.com/digital) — media/entertainment tech crossover
- Yahoo Finance / Seeking Alpha — earnings corroboration
- Al Jazeera Tech — international angle on major US tech stories

## Blocked / Inaccessible Domains (API 400 errors)

- theverge.com — blocked by Anthropic crawler
- reuters.com — blocked by Anthropic crawler
- wsj.com — blocked by Anthropic crawler

Do NOT include these in `allowed_domains` filters — use them only as attribution references when search summaries quote them.

## Effective Search Query Patterns

- "top technology news today [Month Year]" — good broad sweep
- "AI artificial intelligence news [Month Day Year]" — surfaces AI-specific stories
- "tech industry breaking news hardware software [Month Year]" — hardware/software mix
- Story-specific deep dives: "[company] [event keyword] [year]" without domain filtering first, then refine
- Avoid `allowed_domains` lists that include reuters.com, theverge.com, or wsj.com — causes 400 errors

## Recurring Beats to Watch

- Pentagon / DoD AI procurement (active beat in 2026)
- Big Tech quarterly earnings cycles (Apple Q2 Apr 30 2026 confirmed)
- AI-driven workforce restructuring / layoffs (Snap Apr 2026, ongoing trend)
- Nvidia infrastructure expansion (Irving TX data center, Vera Rubin platform)

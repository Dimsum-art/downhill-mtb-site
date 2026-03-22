# DH Europe -- Downhill MTB Site

## Project
Static website showcasing Europe's 10 best downhill mountain biking destinations.
Live at: https://dimsum-art.github.io/downhill-mtb-site/

## Stack
- **HTML/CSS/JS** -- no build tools, no framework
- **Tailwind CSS v4** via browser CDN (`@tailwindcss/browser@4.2.1`)
- **Fonts:** Oswald (headings) + Inter (body) via Google Fonts
- **Images:** Unsplash (free tier, `images.unsplash.com/photo-*` URLs)
- **Hosting:** GitHub Pages (auto-deploys from `main` branch)

## File Structure
```
index.html              -- Homepage (hero, 3 featured cards, stats, about teaser)
locations.html          -- All 10 destinations grid with country/difficulty filters
guide.html              -- Beginner's guide (accordion FAQ, gear, safety)
locations/
  morzine.html          -- France
  leogang.html          -- Austria
  val-di-sole.html      -- Italy
  fort-william.html     -- Scotland/UK
  verbier.html          -- Switzerland
  finale-ligure.html    -- Italy
  schladming.html       -- Austria
  vallnord.html         -- Andorra
  bike-park-wales.html  -- Wales/UK
  chatel.html           -- France
css/style.css           -- Custom styles (transitions, cards, difficulty bars, animations)
js/main.js              -- Scroll animations, nav, page transitions, filters, counters
favicon.svg             -- Site icon
```

## Design System
- **Theme:** Dark background (`#0a0a0a`), orange accent (`#ff6b00`), teal for easy difficulty (`#2dd4bf`)
- **Tailwind theme tokens** defined in each HTML file's `<style type="text/tailwindcss">` block
- **CSS custom properties** mirrored in `css/style.css` `:root` for non-Tailwind styles
- **Cards:** `bg-card` (`#1a1a1a`) with hover lift + orange glow shadow
- **Difficulty bars:** CSS classes `easy`, `intermediate`, `moderate`, `advanced`, `expert`

## Conventions
- Each HTML page is self-contained (includes full `<head>`, nav, footer)
- Navigation links: root pages use `locations.html`, sub-pages use `../locations.html`
- Images: always use Unsplash `photo-*` IDs with `?w=...&q=80` params; no local images
- Page transitions: `js/main.js` intercepts internal link clicks with 300ms fade overlay
- All content sections use `.animate-on-scroll` for entrance animations

## Local Development
- **Do NOT use `open file.html`** -- macOS `com.apple.provenance` attribute blocks Chrome file:// access
- **Use:** `python3 -m http.server 8091` (or any free port) from project root, then open `http://localhost:PORT`

## Git
- **Remote:** `https://github.com/Dimsum-art/downhill-mtb-site.git`
- **Branch:** `main` (GitHub Pages source)
- **Commit style:** conventional (`feat:`, `fix:`, `docs:`, `refactor:`)

## Adding a New Location
1. Copy an existing `locations/*.html` file
2. Update: title, meta tags, hero image, all content sections, breadcrumb
3. Add card entry in `locations.html` (with `data-country` and `data-difficulty` attributes for filtering)
4. Add card in `index.html` featured section (if replacing one of the 3 featured)
5. Add footer link in all 13 HTML files

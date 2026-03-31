# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**MonPortfolio** — static personal portfolio site. No framework, no build step, no package manager.

Stack: HTML, CSS, vanilla JavaScript.

## Development

```
open index.html
# or
python3 -m http.server 8080
```

## Architecture

Single-page portfolio (`index.html`) with a blog section:

- `css/style.css` — all styles, organized by component sections with a full CSS custom properties system (`:root` variables for colors, typography, spacing, dimensions, transitions)
- `js/main.js` — mobile nav toggle, dark/light theme toggle (persisted in `localStorage`), scroll fade-in via `IntersectionObserver`
- `blog/index.html` — blog listing page (standalone HTML, links back to `../index.html`)
- `blog/posts/*.html` — individual blog articles (standalone HTML pages)

Blog pages and `index.html` each duplicate the navbar, footer, and critical inline CSS (in a `<style>` block in `<head>`). When modifying shared elements (navbar, footer, theme toggle, critical CSS variables), update **all** HTML files: `index.html`, `blog/index.html`, and every `blog/posts/*.html`.

The contact form (`index.html` only) is client-side validation only — no backend. Form submission is intercepted by JS and shows a success message without actually sending data.

## Design principles

- Minimalist and professional
- Dark theme by default, light theme via `[data-theme="light"]`
- Mobile-first responsive layout (breakpoints: 768px tablet, 480px mobile)

## Color palette

Defined as CSS custom properties in `:root` (dark) and `[data-theme="light"]` (light).

| Role | Dark | Light |
|---|---|---|
| Background | `#0a0a0a` | `#ffffff` |
| Primary text | `#e0e0e0` | `#1a1a1a` |
| Headings | `#ffffff` | `#111111` |
| Secondary text | `#aaaaaa` | `#444444` |
| Muted text | `#888888` | `#666666` |
| Accent | `#64ffda` | `#0d9373` |
| Borders | `#222222` | `#dddddd` |
| Card background | `#111111` | `#f5f5f5` |

## Typography

| Role | Font |
|---|---|
| Grand titre (`h1`) | Playfair Display (400, serif) |
| Titres de section (`h2`, `h3`) | Montserrat (500, sans-serif) |
| Texte courant | Noto Sans (300–500, sans-serif) |

## CSS conventions

- BEM naming: `.block__element` (e.g., `.project-card__title`, `.navbar__menu`)
- State classes: `.is-open`, `.is-visible`
- All magic numbers extracted to `--custom-properties` in `:root`

## Language conventions

- Code (variables, functions, classes, comments): **English**
- Visible content (text, labels, UI copy): **French**

# Subathra S — Portfolio Website

Personal portfolio website for **Subathra S**, Full Stack Developer (.NET & MERN), built with pure HTML + CSS + Vanilla JS. No frameworks, no dependencies — single file, zero build step.

---

## Live Demo

> Deploy `index.html` to any static host — Netlify, GitHub Pages, Vercel, etc.

---

## Features

- **Responsive design** — works from 320px mobile to 4K desktop
- **Hamburger menu** — collapses nav on mobile with animated open/close
- **Smooth scroll** with fade-in animations as sections enter the viewport
- **Back-to-top** button appears after scrolling 300px
- **Embedded photo** — no external image files needed, photo is base64-encoded inline
- **Zero dependencies** — one `.html` file, no `node_modules`, no build step
- **Dark theme** — deep navy with blue/green/purple accent system

---

## Sections

| Section | Description |
|---|---|
| **Hero** | Name, role, photo, stats, CTA buttons |
| **About** | Background, personal info, education, soft skills |
| **Skills** | Frontend, Backend, Database, Tools — pill tags |
| **Experience** | Timeline card — CTS Full Stack Developer |
| **Internship** | CTS (.NET) & Amdocs (React) internship cards |
| **Projects** | Invoice Builder, Expense Tracker, Flight Booking |
| **Certifications** | GUVI-HCL MERN program details + 4 cert cards |
| **Contact** | Email, phone, LinkedIn, GitHub, location |

---

## How to Deploy

### Option 1 — Netlify (Recommended, Free)

1. Go to [netlify.com](https://netlify.com) and log in
2. Click **"Add new site"** → **"Deploy manually"**
3. Drag and drop the `index.html` file
4. Done — live in under 30 seconds ✅

### Option 2 — GitHub Pages (Free)

```bash
# 1. Create a new GitHub repo (e.g. subathra2000mdu.github.io)
git init
git add index.html README.md
git commit -m "Initial portfolio"
git remote add origin https://github.com/subathra2000mdu/subathra2000mdu.github.io.git
git push -u origin main

# 2. In GitHub repo → Settings → Pages → Source: Deploy from branch (main)
# 3. Your site is live at: https://subathra2000mdu.github.io
```

### Option 3 — Vercel (Free)

```bash
npm i -g vercel
vercel --yes
# Follow prompts — done in ~20 seconds
```

### Option 4 — Local Preview

Just open `index.html` in any browser — no server needed.

```bash
# macOS
open index.html

# Windows
start index.html

# Linux
xdg-open index.html
```

---

## File Structure

```
portfolio/
├── index.html      ← Complete portfolio (photo embedded as base64)
└── README.md       ← This file
```

---

## Customisation Guide

All content is in a single `index.html` file. Open it in VS Code and search for the section you want to edit.

### Update your photo

Replace the `src` attribute of both `<img src="data:image/png;base64,...">` elements with either:
- A new base64 string: `data:image/jpeg;base64,/9j/...`
- A relative path: `src="photo.jpg"` (place `photo.jpg` in the same folder)
- A URL: `src="https://example.com/photo.jpg"`

### Update projects

Find the `<!-- PROJECTS -->` section and edit the `.pjc` cards. Each card has:
- `<h3>` — project title
- `<p>` — description
- `.pjtags` — tech stack pills
- `.pjlr` — links (Live Demo, GitHub)

### Update contact links

Find the `<!-- CONTACT -->` section. Edit the `href` values in `.ccrd` elements.

### Change accent colors

Edit the CSS variables in `:root`:
```css
:root {
  --accent:  #4f9cf9;   /* blue  — primary */
  --accent2: #34d399;   /* green — secondary */
  --accent3: #f97316;   /* orange — highlight */
  --purple:  #a78bfa;   /* purple — tertiary */
}
```

---

## Tech Stack

| Technology | Usage |
|---|---|
| HTML5 | Semantic structure |
| CSS3 | Custom properties, Grid, Flexbox, animations |
| Vanilla JS | Scroll events, IntersectionObserver, hamburger menu |
| Google Fonts | Syne (headings) + DM Sans (body) |

---

## Contact

**Subathra S**
- 📧 subathra2000mdu@gmail.com
- 📱 +91 9786951738
- 💼 [linkedin.com/in/subathra-s-](https://www.linkedin.com/in/subathra-s-)
- 🐙 [github.com/subathra2000mdu](https://github.com/subathra2000mdu)
- 📍 Karur, Tamil Nadu, India
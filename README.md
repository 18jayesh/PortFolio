# Jayesh Mali — Portfolio Website

**Next.js 15 + TypeScript + Tailwind CSS v4 · Awwwards-Level Personal Portfolio**

> Production-ready, SEO-optimized, fully animated portfolio for **Jayesh Mali**, Full Stack Developer from Surat, Gujarat, India.

---

## ✦ Features

| Feature | Implementation |
|---|---|
| Framework | Next.js 16 (App Router) + TypeScript |
| Styling | Tailwind CSS v4 + CSS Variables (dark/light themes) |
| Scroll | Lenis smooth scroll synced with GSAP ScrollTrigger |
| Animations | GSAP (word-by-word scrubbed text) + Framer Motion |
| 3D Background | React Three Fiber + custom GLSL fluid wave shader |
| Theme Toggle | Circular reveal via View Transitions API |
| Contact Form | Web3Forms (email delivery, no backend needed) |
| SEO | Metadata, Open Graph, Twitter Cards, JSON-LD, sitemap, robots |
| Fonts | Bricolage Grotesque · Manrope · JetBrains Mono (Google Fonts) |
| Deployment | Vercel (zero-config) |

---

## ✦ Quick Start

```bash
# Clone or open the project directory
cd Portfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

---

## ✦ Environment Variables

Create a `.env.local` file in the root:

```env
# Get your free key at https://web3forms.com/
NEXT_PUBLIC_WEB3FORMS_KEY=your_access_key_here
```

> **Without this key**, the contact form shows a simulated success. Set it up on Web3Forms to receive real emails — it's free and takes 2 minutes.

---

## ✦ Asset Replacement Guide

### 1. Profile Photo
Replace `/public/images/jayesh.png` with your transparent-background PNG.
- Recommended size: **800×1100px** minimum
- Format: **PNG with transparency**

### 2. Resume PDF
Replace `/public/Jayesh_Mali_Resume.pdf` with your updated resume.
- Keep the same filename or update the path in `data/content.ts → PERSONAL_INFO.resumePath`

### 3. Project Screenshots
Replace images in `/public/projects/`:

| File | Project |
|---|---|
| `bim.png` | BIM Billing System |
| `payslip.png` | Payslip Generator |
| `recipe.png` | Recipe Sharing Platform |
| `smarthome.png` | Smart Home Manager |

> Recommended size: **1440×900px** in PNG or JPG format.

### 4. All Text / Links / Data
All portfolio content lives in one single file:

```
data/content.ts
```

Edit `PERSONAL_INFO`, `PROJECTS`, `SKILL_CATEGORIES`, `JOURNEY`, and `SERVICES` to customize anything.

---

## ✦ Deploy to Vercel

```bash
# Build check locally first
npm run build

# Install Vercel CLI (if not installed)
npm i -g vercel

# Deploy
vercel

# Or push to GitHub and import in https://vercel.com/new
```

**Vercel Environment Variables:**
In your Vercel project dashboard → Settings → Environment Variables:
```
NEXT_PUBLIC_WEB3FORMS_KEY = your_access_key_here
```

---

## ✦ Project Structure

```
Portfolio/
├── app/
│   ├── layout.tsx          # Root layout, fonts, JSON-LD, ThemeProvider
│   ├── page.tsx            # Main single-page composition
│   ├── globals.css         # Tailwind v4, CSS tokens, animations
│   ├── robots.ts           # Crawler rules
│   └── sitemap.ts          # Auto sitemap
├── components/
│   ├── canvas/
│   │   ├── HeroShaderCanvas.tsx   # R3F GLSL fluid wave shader
│   │   └── ShaderFallback.tsx     # Mobile CSS glow fallback
│   ├── common/
│   │   ├── CustomCursor.tsx       # Minimal dot + lagging ring cursor
│   │   ├── Icons.tsx              # Custom GitHub + LinkedIn SVG icons
│   │   ├── MagneticButton.tsx     # Spring physics magnetic button
│   │   ├── Preloader.tsx          # 0-100 counter + curtain wipe intro
│   │   ├── ScrollProgress.tsx     # Top progress bar
│   │   ├── SmoothScroll.tsx       # Lenis + GSAP ticker integration
│   │   ├── ThemeProvider.tsx      # next-themes wrapper
│   │   └── ThemeToggle.tsx        # View Transitions circular reveal
│   ├── layout/
│   │   ├── Navbar.tsx             # Floating pill, scroll hide/show, mobile menu
│   │   └── Footer.tsx             # Surat live clock, social links, back-to-top
│   └── sections/
│       ├── HeroSection.tsx        # Headline, ticker, portrait, tech chips
│       ├── AboutSection.tsx       # GSAP scroll-scrubbed word reveal + stats
│       ├── SkillsSection.tsx      # Dual marquee + bento spotlight grid
│       ├── ProjectsSection.tsx    # Browser mockups, 3D tilt, screenshot reveal
│       ├── JourneySection.tsx     # Self-drawing timeline (BCA + MERN)
│       ├── ServicesSection.tsx    # Availability banner + 4 capability cards
│       └── ContactSection.tsx     # Magnetic email, Web3Forms, resume download
├── data/
│   └── content.ts          # ← ALL CONTENT IS HERE
└── public/
    ├── images/jayesh.png   # Profile photo (transparent PNG)
    ├── projects/           # Project screenshots (4 PNG/JPG files)
    └── Jayesh_Mali_Resume.pdf
```

---

## ✦ Sections Overview

| # | Section | Highlights |
|---|---|---|
| 1 | Preloader | Letter reveal + 0-100 counter, sessionStorage skip |
| 2 | Navbar | Smart scroll hide/show, active spy, mobile fullscreen |
| 3 | Hero | GLSL shader, portrait parallax, rotating ticker, orbital badges |
| 4 | About | GSAP scrubbed word reveal, stats grid |
| 5 | Skills | Dual marquee, bento cursor-spotlight cards |
| 6 | Projects | Browser mockups, 3D tilt, custom view cursor |
| 7 | Journey | Scroll-drawn SVG timeline |
| 8 | Services | Availability CTA + 4 service cards |
| 9 | Contact | Web3Forms, copy email, social links, resume PDF |
| 10 | Footer | Surat live IST clock, coordinates, back-to-top |

---

## ✦ Accessibility

- Fully keyboard navigable
- ARIA labels on all interactive elements
- `prefers-reduced-motion` respected throughout (disables Lenis, GSAP, animations)
- High contrast in both themes
- Semantic HTML (section, nav, main, footer, h1-h3)

---

*Built with craft. Surat, Gujarat, India — 2026*

# Lux Spa Nature: Brandbook & Design System

This document outlines the visual identity, UI/UX principles, and "Billion-Dollar Maison" aesthetic guidelines for the Lux Spa Nature digital flagship. It acts as the source of truth for all components (including the Configurator, Catalog, and Product Finder Quiz) to ensure the experience feels incredibly premium, tactile, and cohesive.

---

## 1. Aesthetic Philosophy & Art Direction

### "Obsidian & Bone"
The core aesthetic moves away from generic e-commerce templates into an ultra-luxury "Architectural Archive" feel. The design relies heavily on stark contrasts, immense whitespace, cinematic product imagery, and an editorial layout approach that emphasizes the product as an art piece or architectural element.

### Guiding Principles
- **Cinematic & Tactile:** Everything should feel grounded. Hover states are subtle lifts or lighting shifts rather than bouncy scaling. 
- **High-Signal, Low-Noise:** UI chrome (borders, containers) is minimized. Let the typography and photography do the heavy lifting.
- **Anti-Template:** Asymmetric grids, overlapping text-and-image compositions, and editorial typographic hierarchies that look like a high-end print magazine.
- **Guided Discovery:** Users are not "shopping"; they are being "consulted". This applies to the Quiz and the Configurator.

---

## 2. Color Palette

The palette is extremely restrained, relying on texture, transparency, and contrast to establish depth.

| Token | Hex/RGBA | Usage |
|-------|----------|-------|
| **Background (Obsidian)** | `#000000` to `#0A0A0A` | Primary background for Hero, full-bleed imagery, and dark-mode default. |
| **Surface (Bone/Canvas)** | `#FAFAFA` | The stark contrast background for the Catalog and inner product page tech specs. |
| **Surface Container** | `#111111` / `#F0F0F0` | Used for cards, quiz options, and floating UI elements depending on theme. |
| **Primary Accent** | *Subtle Gold or Deep Bronze* | Used extremely sparingly for "Best Match" badges, progress bars, or active border states. |
| **Outline Variant** | `rgba(255,255,255, 0.1)` (Dark) | The faint structural lines dividing product specs or quiz cards. No harsh borders. |
| **Text On Surface** | `#1C1C1C` or `#FFFFFF` | High-contrast body and headline text. |
| **Text Secondary** | `rgba(var(--text), 0.6)` | Descriptive copy, subtitles, utility text. |

---

## 3. Typography

The typographic system uses extreme hierarchy. We avoid "middle-ground" sizes; elements are either massive and light, or minuscule and heavily tracked.

### Display / Headline (`font-headline`)
- **Family:** Serif or high-contrast sans-serif (e.g., *Playfair Display*, *Noto Serif*).
- **Weight:** `font-light` (300).
- **Styling:** Often used in `italic` for section introductions ("*The Narrative*", "*Jums rekomenduojame*").
- **Spacing:** `tracking-tight` to create dense, elegant word shapes.
- **Sizes:** Massive (`text-4xl` to `text-7xl`) for heroes, product names on inner pages, and quiz question prompts.

### Body & Utility (`font-body`)
- **Family:** Clean, geometric sans-serif (e.g., *Inter*).
- **Weight:** `font-normal` to `font-medium`.
- **Styling:** Used for descriptive text and paragraphs (`text-lg leading-relaxed`).
- **Utility Caps:** Used for badges, buttons, and sub-labels (e.g., `text-xs uppercase tracking-widest font-bold`).

---

## 4. Component Dictionary

### A. The Quiz / Modal Overlay
- **Background:** Always a cinematic, full-screen glassmorphic overlay (`bg-black/80 backdrop-blur-sm`).
- **Container:** `max-w-5xl`, `bg-surface-container` with intense drop shadows (`shadow-2xl shadow-black/50`).
- **Cards (Quiz Options):** 
  - Subdued borders (`border-outline-variant/30`).
  - Upon selection or hover, the border transitions to the primary accent color.
  - Large iconography combined with clean utility type.
- **Animations:** All steps mount/unmount using Framer Motion with an `easeOut` slow-fade/slide (`y: 20` to `y: 0`, `duration: 0.5s`).

### B. Buttons & CTAs
- **Primary Action (Gateway):** `bg-white text-black` (or vice-versa in light mode). Hard corners, no rounded edges. Uppercase, tracked out (`tracking-[0.2em]`), e.g., `[ KONFIGŪRUOTI IR UŽSAKYTI ]`.
- **Secondary Action:** `variant="outline"`. Transparent background, 1px border.
- **Hover States:** Slight group-hover icon translations (`group-hover:translate-x-1`) and subtle scaling (`hover:scale-[1.02]`).

### C. Inner Product Page Anatomy
- **Cinematic Hero:** Full-viewport image gallery with scrolling thumbnails beneath.
- **Narrative Block:** Large italic headlines paired with relaxed, easily readable paragraphs bridging emotional connection before technical specs.
- **Spec Grid:** Strict, grid-aligned (`grid-cols-2`) or list-based technical specs built on `bg-surface-container-low` with thin dividers.
- **Sticky Price Bar:** Floating glassmorphic bar indicating the live configured price and the prominent "Į Krepšelį" CTA.

---

## 5. Interaction & Motion Matrix

Motion should feel intentional, smooth, and heavy—like moving heavy glass or reading a well-paced editorial piece.

- **Page Transitions:** Fade through black.
- **Micro-interactions:** Icons translating on x-axis within buttons. Badges sliding in slightly after card load.
- **Staggered Reveals:** Product grids load their cards one-by-one with a 0.1s stagger.
- **Scroll Parallax:** Hero images scroll at a different speed than the primary document (Locomotive Scrolling influence).

---

## 6. Photography Strategy

- **Tonal Value:** Images should be somewhat desaturated with high contrast (crushed blacks, bright but controlled highlights).
- **Cropping:** Use asymmetry. Not every product image needs to be perfectly centered. Use close-up macro shots of the wood grain, acrylic finish, and control panels mixed with wide lifestyle shots. 
- **Context:** Lifestyle imagery should focus on shadows, twilight, steam, and architectural integration (e.g., the hot tub built into a high-end wooden terrace).

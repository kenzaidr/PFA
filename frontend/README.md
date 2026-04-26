# ESISA Frontend Theme Guide

This document is the single source of truth for the current ESISA frontend visual language.
Use it when building new pages so the whole product keeps the same colors, typography, glass effects, spacing feel, and motion behavior.

## 1) Theme Architecture

Theme and style sources:

- `src/styles/design-tokens.css`: all design tokens (colors, alpha colors, shadows, blur).
- `src/styles/index.css`: global font setup and app shell variables.
- `src/styles/EsisaPlatform.css`: component classes and section-level visual patterns.
- `src/EsisaPlatform.tsx`: runtime effects, Framer Motion animations, dark-mode toggle behavior.

Theme switch behavior:

- Light mode is default.
- Dark mode is enabled when `data-theme="dark"` is present.
- Theme preference is persisted in local storage with key `esisa-theme`.

In code:

- `document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')`
- `window.localStorage.setItem('esisa-theme', darkMode ? 'dark' : 'light')`

## 2) Typography

Fonts are imported in `src/styles/index.css`:

- Display font: `Sora`
- Body font: `Manrope`

Global tokens:

- `--font-display: 'Sora', 'Segoe UI', sans-serif`
- `--font-body: 'Manrope', 'Segoe UI', sans-serif`

Usage pattern:

- Big headlines, brand titles, section titles: display font with uppercase and tight line-height.
- Body copy, descriptions, helper text: body font with comfortable line-height.

## 3) Core Color Palette

### 3.1 Primary blues

- `--color-primary-900: #0F2D7A`
- `--color-primary-880: #123890`
- `--color-primary-850: #0E2D80`
- `--color-primary-800: #1E3A8A`
- `--color-primary-750: #1E40AF`
- `--color-primary-700: #1D4ED8`
- `--color-primary-650: #1749B5`
- `--color-primary-625: #1741A5`
- `--color-primary-600: #2563EB`
- `--color-primary-500: #3B82F6`
- `--color-primary-400: #60A5FA`
- `--color-primary-300: #93C5FD`
- `--color-primary-200: #BFDBFE`
- `--color-primary-100: #DBEAFE`
- `--color-primary-50: #EFF6FF`

### 3.2 Accent and highlight colors

- `--color-accent-500: #FACC15`
- `--color-accent-400: #FDE047`
- `--color-accent-300: #FEF08A`
- `--color-accent-gold-600: #F1B000`

### 3.3 Neutrals and text

- `--color-white: #FFFFFF`
- `--color-text-main: #111C33`
- `--color-text-slate-800: #1E293B`
- `--color-text-slate-700: #475569`
- `--color-text-slate-500: #64748B`
- `--color-text-slate-400: #94A3B8`
- `--color-text-slate-300: #CBD5E1`
- `--color-text-slate-200: #E2E8F0`

### 3.4 Surface colors (light mode)

- `--color-bg-page: #EEF4FF`
- `--color-bg-loading: #F8FBFF`
- `--color-bg-surface-50: #F7FAFF`
- `--color-bg-surface-75: #F6FAFF`
- `--color-bg-surface-100: #F5F9FF`
- `--color-bg-surface-150: #F4F8FF`
- `--color-bg-surface-200: #EAF1FF`
- `--color-bg-surface-250: #E5EEFF`

### 3.5 Surface colors (dark mode)

- `--color-bg-page-dark: #050C18`
- `--color-bg-loading-dark: #050B18`
- `--color-bg-dark-950: #060D1A`
- `--color-bg-dark-900: #0A1528`
- `--color-bg-dark-875: #0B1526`
- `--color-bg-dark-850: #0C1A34`
- `--color-bg-dark-825: #0E1D38`
- `--color-bg-dark-800: #0E1628`
- `--color-bg-dark-775: #0F1D39`
- `--color-bg-dark-750: #172554`

### 3.6 Additional brand tones

- `--color-brand-navy-700: #18336C`
- `--color-brand-navy-600: #1A47AE`
- `--color-brand-blue-700: #1F4AB0`
- `--color-brand-teal-700: #1E3A5F`
- `--color-title-dark-900: #102246`

## 4) Semantic Theme Aliases

Aliases used by the global shell:

- `--bg-shell: var(--color-bg-page)`
- `--text-main: var(--color-text-main)`

Dark override:

- `--bg-shell: var(--color-bg-page-dark)`
- `--text-main: var(--color-bg-surface-250)`

Use these aliases for page backgrounds and default text whenever possible, instead of hardcoding light/dark values.

## 5) Glass / Alpha Tokens

The UI style relies heavily on translucent surfaces. These tokens should be reused instead of new ad-hoc rgba values.

White glass:

- `--glass-white-95`, `--glass-white-90`, `--glass-white-86`, `--glass-white-85`, `--glass-white-80`, `--glass-white-75`, `--glass-white-70`, `--glass-white-25`, `--glass-white-10`

Primary glass:

- `--glass-primary-200-90`, `--glass-primary-200-85`, `--glass-primary-200-70`, `--glass-primary-200-40`, `--glass-primary-200-20`
- `--glass-primary-100-80`, `--glass-primary-100-40`
- `--glass-primary-700-85`, `--glass-primary-700-70`, `--glass-primary-700-60`, `--glass-primary-700-30`, `--glass-primary-700-25`
- `--glass-primary-600-45`, `--glass-primary-600-40`, `--glass-primary-600-30`, `--glass-primary-600-20`, `--glass-primary-600-16`, `--glass-primary-600-14`, `--glass-primary-600-28`, `--glass-primary-600-08`
- `--glass-primary-300-70`
- `--glass-primary-500-15`, `--glass-primary-500-10`
- `--glass-primary-400-85`, `--glass-primary-400-25`

Blue deep glass:

- `--glass-blue-900-70`, `--glass-blue-900-60`, `--glass-blue-900-50`
- `--glass-blue-950-95`, `--glass-blue-950-85`, `--glass-blue-950-80`
- `--glass-blue-975-88`, `--glass-blue-960-85`, `--glass-blue-980-80`, `--glass-blue-980-75`
- `--glass-blue-800-70`, `--glass-blue-800-60`, `--glass-blue-800-50`, `--glass-blue-800-40`
- `--glass-blue-750-60`, `--glass-blue-750-50`, `--glass-blue-750-40`
- `--glass-blue-800-alt-60`

Accent and special glass:

- `--glass-accent-500-24`, `--glass-accent-500-20`, `--glass-accent-500-15`, `--glass-accent-500-09`, `--glass-accent-500-08`
- `--glass-accent-400-35`, `--glass-accent-400-30`, `--glass-accent-400-20`
- `--glass-accent-300-50`
- `--glass-violet-700-20`, `--glass-violet-700-14`
- `--glass-cyan-400-16`
- `--glass-sky-700-20`

Black alpha overlays:

- `--alpha-black-55`, `--alpha-black-50`, `--alpha-black-40`, `--alpha-black-30`, `--alpha-black-25`, `--alpha-black-10`

## 6) Shadow System

Soft shadows:

- `--shadow-soft-xs`
- `--shadow-soft-sm`
- `--shadow-soft-md`
- `--shadow-soft-lg`
- `--shadow-soft-xl`

Brand/primary emphasis:

- `--shadow-brand-sm`
- `--shadow-brand-md`
- `--shadow-brand-lg`
- `--shadow-brand-xl`
- `--shadow-primary-sm`
- `--shadow-primary-md`

Glass shadows:

- `--shadow-glass-xs`
- `--shadow-glass-sm`
- `--shadow-glass-md`
- `--shadow-glass-lg`
- `--shadow-glass-xl`

Dark shadows:

- `--shadow-dark-sm`
- `--shadow-dark-md`
- `--shadow-dark-lg`
- `--shadow-dark-xl`
- `--shadow-dark-2xl`
- `--shadow-dark-3xl`
- `--shadow-dark-4xl`
- `--shadow-dark-5xl`
- `--shadow-dark-6xl`

Special:

- `--shadow-node-icon`

## 7) Blur and Backdrop Effects

Blur tokens:

- `--glass-blur-md: blur(8px)`
- `--glass-blur-lg: blur(24px)`

Main visual effects used across pages:

- Glass cards with translucent backgrounds and backdrop blur.
- Large radial gradient blobs in background and hero.
- Grid overlay background pattern.
- Elevated cards and CTA sections using layered shadows.
- Light and dark variants for each major surface.

## 8) Motion and Interaction Effects

Animation engine: Framer Motion (defined in `src/EsisaPlatform.tsx`).

Global effects:

- Loading screen fade out: `0.7s`.
- Scroll progress bar: scale on X based on page scroll.
- Background parallax: Y transform from `0` to `-80` tied to scroll.

Loading scene:

- Left blob horizontal drift: `2.8s`, infinite.
- Right blob horizontal drift: `3.2s`, infinite.
- Intro video fade in: `1.8s`.
- Loading bar sweep: `1.2s`, infinite.

Connection visualization:

- Outer ring rotates `360` in `24s`, linear, infinite.
- Inner ring rotates `-360` in `18s`, linear, infinite.
- Node reveal stagger with delay.
- Dashed connector stroke dash offset loop (`1.2s`).

Hero and section motion:

- Hero text block entrance from Y+36 and opacity 0.
- Hero panel entrance from Y+40 and opacity 0.
- Floating blobs inside hero panel with infinite easing loops.
- Scroll hint chevron bounce (`2.2s`, infinite).
- Feature cards and capability cards animate in when in view.
- Capability cards lift on hover (`y: -6`).

Micro-interactions (CSS transitions):

- Most buttons and chips use `transition: all 150ms ease`.
- Hover lift pattern:
	- Small controls: `translateY(-2px)`
	- Primary actions: `translateY(-4px)`
- Arrow icon slide in primary button: `translateX(4px)` on hover.

## 9) Layout, Radius, and Responsiveness

Shared width container pattern:

- `width: min(1160px, 94vw)`

Common border radius scale:

- Pills: `9999px`
- Small cards/buttons: `0.75rem` to `1rem`
- Major surfaces: `1.5rem` to `2.2rem`

Breakpoints currently used:

- `640px`
- `768px`
- `1024px`

Responsive behavior examples:

- Navbar desktop links appear at `1024px`.
- Book Call button appears at `640px`.
- Hero switches to 2-column layout at `1024px`.
- Multi-column grids expand at `768px` and `1024px`.

## 10) Section Design Patterns You Should Reuse

When adding new pages, keep these patterns:

1. Surface hierarchy
- Page root uses shell alias variables.
- Sections use rounded glass or white surfaces with subtle borders.
- Dark mode uses deep blue glass and dark shadows.

2. Type hierarchy
- Upper labels: tiny uppercase with wide letter spacing.
- Titles: display font, uppercase, strong weight (often 900).
- Body text: slate scale with generous line-height.

3. Accent strategy
- Blue is the primary structure color.
- Gold/yellow accents highlight active or key actions.
- Avoid introducing unrelated accent palettes.

4. Interaction style
- Keep transitions fast (`150ms`) and smooth.
- Prefer subtle vertical lift and color shift on hover.
- Keep motion purposeful, not decorative noise.

## 11) New Page Starter Checklist

Before merging a new page, verify:

- Uses only existing tokens from `design-tokens.css`.
- Supports both light and dark themes via `[data-theme="dark"]`.
- Uses display/body fonts consistently.
- Reuses existing shadow and blur tokens.
- Uses existing spacing/radius rhythm.
- Keeps hover and reveal motion aligned with existing durations.
- Preserves readability and contrast in both themes.

## 12) Practical Copy Patterns

Use this as a style template for new sections:

- Section wrapper:
	- Rounded large container, subtle border, translucent background.
- Header:
	- Small uppercase label + bold uppercase title + concise description.
- Content cards:
	- Soft border, light gradient or dark solid surface, icon chip, short copy.
- CTA:
	- Bold blue gradient block with accent button and lift-on-hover.

## 13) Development Commands

Run locally:

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

## 14) Source of Truth (Important)

If this guide and code ever differ, update this README immediately after changing any of these files:

- `src/styles/design-tokens.css`
- `src/styles/index.css`
- `src/styles/EsisaPlatform.css`
- `src/EsisaPlatform.tsx`

Keeping this file current is required so all team pages stay in the same visual system.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **San Mateo Longboard Festival** website - a landing page for a surf festival in San Mateo, Ecuador (III Edition, December 2025). Built with **Astro 5.15.3** as a static site focused on event registration and information.

## Development Commands

```bash
npm run dev      # Start dev server (localhost:4321)
npm run build    # Build for production (outputs to dist/)
npm run preview  # Preview production build
npm run astro    # Access Astro CLI
```

## Project Architecture

### Core Structure
- **Astro 5.15.3** - Static site generator, no additional frameworks
- **TypeScript** - Strict mode enabled (`astro/tsconfigs/strict`)
- **Vanilla CSS** - No CSS framework, component-scoped styles
- **No Testing** - No test framework currently configured

### Directory Structure
```
src/
├── pages/        # File-based routing (.astro files)
├── layouts/      # Page layouts with <slot /> for content
├── components/   # Reusable Astro components
└── assets/       # Processed assets (images, SVGs)

public/           # Static assets (served as-is)
docs/             # Design and content documentation
```

### Routing
- Astro uses file-based routing in `src/pages/`
- `index.astro` = homepage
- Subdirectories become URL paths automatically

## Design System

**IMPORTANT**: The project has a comprehensive style guide (`docs/style_guide.md`) that MUST be followed strictly.

### Color Palette (Retro Surf Aesthetic)
```css
/* Primary Colors */
--color-primary-yellow: #FFD700;
--color-primary-orange: #FF8C42;
--color-primary-pink: #FF4D8C;

/* Neutral Base */
--color-neutral-white: #FEFDF8;    /* Warm cream white */
--color-neutral-black: #1A1A1A;
--color-neutral-cream: #FFF8E7;
```

### Typography Stack
- **Headings**: Bebas Neue (display font)
- **Subheadings**: Roboto Condensed
- **Body**: Roboto
- **Responsive sizing**: Use `clamp()` for fluid typography

### Design Principles
1. **Neo-Brutal Style**: Flat shadows, bold colors, high contrast
2. **Halftone Effects**: Vintage texture for retro feel
3. **WCAG AA/AAA**: All colors verified for accessibility
4. **Mobile-First**: Responsive design with 320px-1920px support

## Content Structure

The landing page follows an 11-section architecture (detailed in `docs/PLAN_CONTENIDO_LANDING.md`):

1. **Navigation Bar** - Sticky nav with logo and section links
2. **Hero Section** - Event title, date, location, primary CTA
3. **About Festival** - Event description and values
4. **Categories** - 5 competition categories (Open Men/Women, Intermediate/Beginner Women, Kids)
5. **Prizes & Attractions** - Cash prizes, athletes, live music
6. **Activities** - Entrepreneur fair, food contest
7. **Schedule** - Event timeline
8. **Location** - Map and venue details (El Faro, San Mateo)
9. **Registration** - Form with $10 fee and payment integration
10. **FAQ** - Common questions
11. **Footer** - Contact (Angelo Franco: 0969310187), social links

### Key Event Details
- **Date**: December 2025
- **Location**: El Faro, San Mateo, Ecuador
- **Registration**: $10 per category
- **Contact**: sanmateolongfestivalcgmail.com

## Development Guidelines

### Component Creation
- Use Astro components (`.astro` files) for all UI
- Leverage component-scoped `<style>` tags
- Props typing with TypeScript interfaces
- Follow style guide design tokens

### Styling Approach
- **NO Tailwind** - Use vanilla CSS with design tokens
- Define CSS variables in `:root` or component scope
- Use CSS Grid for layouts (12-column system in style guide)
- Mobile-first media queries

### Accessibility Requirements
- All interactive elements need focus states
- Color contrast ratios: WCAG AA minimum (4.5:1 text, 3:1 UI)
- Alt text for all images
- Respect `prefers-reduced-motion` for animations
- Semantic HTML5 elements

### Performance Targets
- Lazy load images below the fold
- Use WebP format with fallbacks
- Critical CSS inline for above-the-fold content
- Minimize JavaScript (Astro ships 0 JS by default)

## File References

- **Style Guide**: [docs/style_guide.md](docs/style_guide.md) - Complete design system (2,845 lines)
- **Content Plan**: [docs/PLAN_CONTENIDO_LANDING.md](docs/PLAN_CONTENIDO_LANDING.md) - Copywriting and information architecture (1,547 lines)

## Current Status

**Early Development** - Basic Astro starter template is in place. The actual festival landing page needs to be built according to the design system and content plan in `/docs`.

**Next Steps**:
1. Implement design tokens (CSS variables) from style guide
2. Create core components (Hero, CategoryCard, RegistrationForm, etc.)
3. Build 11-section landing page structure
4. Integrate content from content plan
5. Add registration form with payment processing
6. Optimize images and performance
7. SEO implementation (metadata, structured data)
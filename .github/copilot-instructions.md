# MTM Website - AI Coding Agent Instructions

## Project Overview
This is an **Astro-based multi-language marketing website** for Media Technology Monitor (MTM). Content is managed via **Google Sheets CSV exports** and rendered statically with i18n support (English/French). The site features animated hero sections, interactive filters, and a component-based architecture.

## Tech Stack
- **Astro 5.16** - SSG with component islands
- **PapaCSV** - Google Sheets data parsing
- **CSS Variables** - Design token system
- **No framework dependencies** - Vanilla JS for interactions
- **GitHub Actions** - Automated deployment on push to main

## Architecture & Key Patterns

### 1. Content Management (Google Sheets as CMS)
All dynamic content comes from Google Sheets published as CSV. Pattern used across the codebase:

```javascript
// See: census-tools.astro, nav-bar.astro
const SHEET_URL = "https://docs.google.com/.../pub?gid=xxx&single=true&output=csv";
const response = await fetch(SHEET_URL);
const csvData = await response.text();
const parsed = Papa.parse(csvData, { header: false, skipEmptyLines: true });
const rawData = Object.fromEntries(
  parsed.data.map(([k, v]) => [k?.toString().trim().toLowerCase(), v?.toString().trim()])
);
```

**Key convention**: CSV row[0] = key (lowercase), row[1] = value. Always use `.trim().toLowerCase()` for keys.

### 2. Component Co-location Pattern
Every component lives in its own folder with related files:
```
components/tools/census-highlights/
  ├── census-highlights.astro  (markup + props interface)
  ├── census-highlights.css    (scoped styles)
  └── (optional) *.js          (client-side interactions)
```

Import CSS at the top of `.astro` files: `import "./component-name.css";`

### 3. Multi-language Routing
- **English (default)**: `/` or `/mtm-website-1/`
- **French**: `/fr/` or `/mtm-website-1/fr/`
- Base path configured in `astro.config.mjs` for GitHub Pages deployment
- Language detection: `getLangFromUrl(Astro.url)` from `src/i18n/ui.js`
- Translations stored in `src/i18n/ui.js` object

### 4. Design Token System
**ALWAYS use CSS custom properties** from `src/styles/tokens.css`:

```css
/* Spacing (never hardcode pixel values) */
padding: var(--space-24);
gap: var(--gap-medium); /* Semantic aliases */

/* Colors (from design system) */
color: var(--color-blue-main);
background: var(--color-grey-4);

/* Typography */
font-size: var(--font-size-body-m);
line-height: var(--lh-body);

/* Radius */
border-radius: var(--radius-20);
```

**Typography classes**: Use semantic classes from `src/styles/typography.css`:
- Headings: `.h1` to `.h5` or `<h1>` to `<h5>`
- Body: `.body-l`, `.body-m`, `.body-s`
- Highlight (serif): `.highlight-1`, `.highlight-2`
- Weight variants: `.body-l-bold`, `.body-m-bold`

### 5. Interactive State Management Pattern
For filter/tab UI (see `census-highlights.astro`):

```javascript
// 1. Use data attributes for state tracking
<div data-filter="01" class="filter-block is-active">...</div>
<div data-content="01" class="content-view is-active">...</div>

// 2. Toggle CSS classes for state
element.classList.remove('is-active');
element.classList.add('is-inactive');

// 3. Sync multiple elements via data attribute matching
if (view.getAttribute('data-content') === targetId) {
  view.classList.add('is-active');
  view.classList.remove('is-hidden');
}
```

**Naming conventions**:
- State classes: `is-active`, `is-inactive`, `is-hidden`
- Data attributes: `data-filter`, `data-content`, `data-*`

### 6. Hero Animation System
Hero sections use a declarative orbit animation pattern (see `hero/main.js`):

```javascript
// Define scene in page component
const heroScene = {
  image: "/mtm-website-1/images/tools/census/hero.png",
  maskImage: "", // Optional mask for orbit layer
  orbitBlocker: "", // Optional blocker element
  
  // Single center or grouped centers
  centerOffset: { x: 0, y: 0 }, // For single center
  orbits: [
    { radius: 190, delay: 1 },
    { radius: 260, delay: 1.5 },
    { radius: 330, delay: 2 }
  ],
  icons: [
    { file: "/path/to/icon.svg", orbit: 0, angle: 320, tooltip: "Label" },
    { file: "/path/to/icon.svg", orbit: 1, angle: 210, tooltip: "Label" }
  ],
  
  // OR use groups for multiple orbit centers (see census-tools.astro)
  groups: [
    {
      centerOffset: { x: -320, y: 30 }, // Left center
      orbits: [{ radius: 200, delay: 1 }],
      icons: [{ file: "...", orbit: 0, angle: 200, tooltip: "..." }]
    },
    {
      centerOffset: { x: 320, y: 30 }, // Right center
      orbits: [{ radius: 200, delay: 1 }],
      icons: [{ file: "...", orbit: 0, angle: 310, tooltip: "..." }]
    }
  ]
};

// Pass to Hero component
<Hero scene={heroScene} {...otherProps} />
```

**Hero component structure** (standard across `home/`, `tools/`, `solutions/`, `products/`):
- `Hero.astro` - Markup with data attributes
- `hero.css` - Layout styles
- `hero-animation.css` - Animation keyframes
- `main.js` - JS that reads `data-scene` and builds orbits

### 7. Staggered Animation Pattern
For sequential element reveals (see `census-highlights.css`):

```css
.is-active .icon-cell {
  opacity: 0;
  animation: fadeInUp 0.5s forwards;
}
.is-active .icon-cell:nth-child(1) { animation-delay: 0.1s; }
.is-active .icon-cell:nth-child(2) { animation-delay: 0.15s; }
/* Increment by 0.05s for smooth cascade */
```

### 8. Content Transition Pattern
```css
.content-view {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.content-view.is-active {
  opacity: 1;
  transform: translateY(0);
}
```

## File Structure Conventions

### Pages (`src/pages/`)
```
index.astro              # Root English homepage
en/
  ├── insights.astro
  ├── products/
  │   ├── mtm18.astro
  │   ├── juniors.astro
  │   └── newcomers.astro
  ├── solutions/
  │   ├── advertising.astro
  │   ├── media.astro
  │   └── industry.astro
  └── tools/
      └── census-tools.astro
fr/
  └── [mirrors en/ structure]
```

### Components (`src/components/`)
**Numbered sections** (homepage only): `1hero/`, `2whyus/`, `3reports/`, `4variables/`, `5solutions/`, `6products/`, `7about-news/`
- Numbers enforce render order in index.astro

**Section-specific components**:
- `home/` - Homepage sections (numbered folders)
- `products/` - Product page components (hero, benefits, methodology, tools)
- `solutions/` - Solution page components (hero, benefits, faq, testimonials)
- `tools/` - Tool page components (hero, census-highlights)

**Reusable UI** (`ui/`):
- `NavBar/` - Main navigation with dropdown menus
- `Footer/` - Site footer with links
- `Buttons/` - Button styles (primary, secondary, tertiary)
- `CTA/` - Call-to-action section
- `Subscribe/` - Newsletter subscription
- `Grid/`, `HighlightText/`, `Benefit/`, `Feature/`, `Percentage/`, `Input/`, `ProductToggle/`

### Assets (`public/`)
- `icons/` - SVG icons organized by section (home/, Products/, Solutions/, Tools/)
- `images/` - JPG/PNG images organized by section (home/, products/, solutions/, tools/)
- `client-logos/` - Client/partner logos
- **Path convention**: Always use `/mtm-website-1/` prefix (matches `base` in config)

### Layouts & Styles
- `src/layouts/BaseLayout.astro` - Global HTML structure, font imports
- `src/styles/tokens.css` - All design tokens (spacing, colors, typography, etc.)
- `src/styles/typography.css` - Typography classes (.h1-.h5, .body-l/.body-m/.body-s, .highlight-1/.highlight-2)
- `src/styles/styles.css` - Global styles and resets
- `src/components/ui/Buttons/buttons.css` - Button component styles (imported in BaseLayout)

## Page Structure Patterns

### Homepage Pattern (`pages/index.astro`)
Numbered sections enforce render order:
```astro
import Hero from '../components/home/1hero/hero.astro';
import WhyUs from '../components/home/2whyus/why-us.astro';
import Reports from '../components/home/3reports/reports.astro';
import Variables from '../components/home/4variables/variables.astro';
import Solutions from '../components/home/5solutions/solutions.astro';
import Products from '../components/home/6products/product.astro';
import AboutNews from '../components/home/7about-news/about-news.astro';
```

### Product/Solution/Tool Page Pattern
Standard structure across all feature pages:
```astro
<BaseLayout title="MTM | Page Title">
  <HighlightText />  <!-- Global highlight wrapper -->
  <Grid />           <!-- Background grid overlay -->
  <Navbar />
  
  <main class="page">
    <Hero scene={heroScene} {...props} />
    <!-- Feature-specific components -->
    <CTA />
    <Subscribe />
    <Footer />
  </main>
</BaseLayout>
```

## Development Workflow

### Local Development
```bash
npm run dev         # Start dev server (default: http://localhost:4321)
npm run build       # Build for production (outputs to dist/)
npm run preview     # Preview production build
```

### Automated Deployment
Push to `main` branch triggers automatic deployment via GitHub Actions (`.github/workflows/deploy.yml`):
- Builds Astro site
- Deploys to GitHub Pages
- Available at configured site URL

### Adding New Pages
1. Create `.astro` file in `src/pages/en/[section]/`
2. Mirror structure in `src/pages/fr/` for French version
3. Import `BaseLayout` and required components
4. Fetch CSV data if content is dynamic
5. Add navigation link in `nav-bar.astro` (update both `solutionsItems`, `productsItems`, or `toolsItems` arrays)

### Adding New Components
1. Create folder: `src/components/[section]/[component-name]/`
2. Add files: `[component-name].astro`, `[component-name].css`, optional `.js`
3. Define TypeScript interface for props in frontmatter:
   ```typescript
   interface Props {
     content: any;
     items: { label: string; icon?: string }[];
   }
   ```
4. Import CSS: `import "./component-name.css";`

### Styling Guidelines
- **Never use inline styles** or hardcoded values
- Use design tokens for all spacing, colors, typography
- Follow BEM-like naming: `.component-name__element--modifier`
- **Section padding**: All new sections must use `padding-block: var(--section-padding);`
- Responsive: Use `@media (max-width: 1200px)` for tablet/mobile
- Z-index: Use `var(--z-section)`, `var(--z-nav)` from tokens

### Button Conventions (see `ui/Buttons/buttons.css`)
Three button variants available globally:
```astro
<button class="btn btn-primary button-l">Primary Action</button>
<button class="btn btn-secondary button-l">Secondary Action</button>
<button class="btn btn-tertiary button-l">Tertiary Link</button>
```
- `.btn-primary` - Blue background, white text, with shadow
- `.btn-secondary` - White background, blue outline
- `.btn-tertiary` - Transparent background, blue text (link style)
- Size variants: `.button-l`, `.button-m`, `.button-s`

## Common Pitfalls
1. **Base path**: All asset URLs must include `/mtm-website-1/` prefix
2. **CSV parsing**: Always lowercase and trim keys when creating `rawData`
3. **Language routing**: Use `getLangFromUrl()` instead of hardcoding language
4. **Client scripts**: Wrap in `<script>` tags, not `<script is:inline>`
5. **Grid layouts - CRITICAL**: 
   - **"Span columns X-Y"** → Use `grid-column: X / Y` on the element (relies on global page grid, don't create new grid)
   - **"Span 1fr or 3fr"** → Create new `grid-template-columns: 1fr 3fr` on that element (ignore global grid)
   - Example: "span columns 3 to 9" = `grid-column: 3 / 9`, "span 1fr and 3fr" = `display: grid; grid-template-columns: 1fr 3fr;`

## Testing Checklist
- [ ] Test both English (`/`) and French (`/fr/`) routes
- [ ] Verify CSV data loads correctly (check console for fetch errors)
- [ ] Test responsive layouts at 1200px, 768px, 390px breakpoints
- [ ] Verify animations trigger correctly on state changes
- [ ] Check asset paths work in both dev and production builds

## Key Files to Reference
- **Design tokens**: `src/styles/tokens.css` - All spacing, colors, typography values
- **Typography**: `src/styles/typography.css` - All text styling classes
- **i18n config**: `src/i18n/ui.js` - Translation strings and language detection
- **Base layout**: `src/layouts/BaseLayout.astro` - Global HTML structure
- **Navigation**: `src/components/ui/NavBar/nav-bar.astro` - Main nav with dropdowns

## Data Flow Example
```
Google Sheet → CSV URL → Papa.parse → rawData object → Astro component props → HTML rendering
```

All content changes happen in Google Sheets. Never hardcode content strings in components.

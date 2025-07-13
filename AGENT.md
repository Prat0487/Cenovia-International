# AGENT.md - Cenovia International Website

## Build/Development Commands
- No build process required - static HTML site served directly
- Local development: `npm run dev` (if package.json exists) or serve with any static server
- Testing: Open HTML files directly in browser for manual testing
- Deployment: Automatic via Netlify on git push (configured in netlify.toml)

## Architecture & Structure
- **Type**: Static HTML/CSS/JS website for manufacturing company (silvercraft & sporting goods)
- **Deployment**: Netlify with redirect rules in netlify.toml and _redirects
- **Components**: Web Components pattern in /components/ (TopRibbon.js, MainNav.js, SiteFooter.js)
- **Pages**: index.html (About), product-silvercraft.html, product-sportgoods.html, our-team.html, contact-us.html
- **Assets**: /Assets/ contains css/, js/, Images/, data/, others/ subdirectories
- **No database**: Static site with all content in HTML files

## Code Style & Conventions
- **Styling**: Tailwind CSS via CDN, Font Awesome 6.0.0 via CDN
- **HTML**: Semantic HTML5 with responsive design, mobile-first approach
- **Components**: ES6 classes extending HTMLElement for Web Components
- **Naming**: kebab-case for file names, camelCase for JS variables/functions
- **Structure**: Each page follows same pattern - top-ribbon, main-nav, main content, site-footer
- **JavaScript**: Vanilla JS with ES6+ features, modular approach in components
- **Accessibility**: WCAG 2.1 compliance, semantic markup, proper alt text required
- **Responsive**: Mobile-first design with Tailwind breakpoints (md:, lg:, etc.)

# Cenovia International

A modern, responsive website for Cenovia International, specializing in premium menswear and womenswear.

## Website Structure

### Header Components
- **Main Navigation**: 
  - Responsive navbar with company logo
  - Desktop menu with dropdown functionality for Products
  - Mobile-friendly hamburger menu
  - Navigation links: About Us, Products (Menswear, Womenswear), Contact Us
  - Product search functionality

### Main Sections

1. **Hero Section**
  - Dynamic gradient background
  - Company introduction
  - Interactive call-to-action buttons
  - Fully responsive design
  - Background video for desktop view

2. **Product Sections**
  - Menswear collection
  - Womenswear collection
  - Advanced filtering and sorting options
  - Infinite scroll product loading
  - Detailed product views

3. **About Section**
  - Company overview
  - Mission and Vision statements
  - Brand story
  - Customer focus

### Product Features
- Dynamic product grid layout
- Advanced search functionality
- Category filtering
- Sort by name (ascending/descending)
- Detailed product pages with specifications
- Responsive product images
- Attribute-based filtering

### Technical Features

#### Styling
- Tailwind CSS implementation
- Responsive design
- Glass effect navigation
- Dynamic loading animations
- Interactive hover effects

#### JavaScript Functionality
- Product search and filtering system
- Infinite scroll implementation
- Dynamic product loading
- Responsive image handling
- Mobile menu functionality

#### Performance Optimizations
- Lazy loading images
- Progressive loading
- Optimized asset delivery
- Responsive images
- Efficient data handling

## Pages
- index.html - Homepage and company overview
- product-womenswear.html - Women's fashion catalog
- product-menswear.html - Men's fashion catalog
- contact-us.html - Contact information and form

## Development
- Semantic HTML5
- Tailwind CSS
- Modern JavaScript (ES6+)
- Mobile-first approach
- Accessibility compliance
- SEO optimization

## Getting Started
1. Clone the repository

git clone https://github.com/Prat0487/Cenovia-International.git

## Quickstart / Local preview
- Preview with Python: `python -m http.server 8000` then open http://localhost:8000/index.html
- Preview with Node: `npx http-server -p 8000` or use `npm run preview` (provided in package.json)

## Running Playwright tests (added)
- Install dev deps: `npm install`
- Install Playwright browsers: `npm run playwright:install` (or `npx playwright install --with-deps`)
- Run full suite: `npm test` (runs `npx playwright test`)
- Run a single test file: `npm run test:single`

CI: GitHub Actions workflow runs Playwright on pull requests (see .github/workflows/playwright.yml).

## Project structure (short)
- Root HTML pages: index.html, product-menswear.html, product-womenswear.html, contact-us.html
- components/: Web Components (TopRibbon.js, MainNav.js, SiteFooter.js)
- js/: Client-side logic (product-loader.js, product-search.js, product-detail.js, infinite-scroll.js)
- data/: JSON product catalogs consumed by ProductLoader (`products-menswear.json`, `products-womenswear.json`)
- Assets/: Images and compiled CSS used by the site

## Deployment
- netlify.toml present for clean URL routing and a catch-all redirect to index.html. Deploy to Netlify or any static hosting provider.

## Copilot and tests
- Repository includes .github/copilot-instructions.md with guidance for Copilot sessions.
- Playwright tests are in tests/playwright/ and CI is configured to run them on PRs.

## Changelog & Contributing
- See CHANGELOG.md for recent changes. Open a PR against the `main` branch and include test updates for behavior changes.


# Copilot instructions for Cenovia-International

Purpose: short, repo-specific guidance for Copilot sessions working on this static site.

1) Build / test / lint commands
- This is a static HTML/CSS/JS site; there is no package.json, test suite, or linter configured in the repo.
- Quick local preview (choose one):
  - Python 3: `python -m http.server 8000` (then open http://localhost:8000/index.html)
  - Node: `npx http-server -p 8080` (or any simple static server)
- Netlify: netlify.toml is present and used for redirects. Deploy via Netlify dashboard/CLI as usual.
- If adding Tailwind/PostCSS build: add package.json and document npm scripts; none exist now.

2) High-level architecture (big picture)
- Static site composed of HTML pages in the repo root (index.html, product-*.html, contact-us.html, etc.).
- Components: Web Components live under `components/*.js` (customElements like <main-nav>, <top-ribbon>, <site-footer>). They render header, nav, footer and mobile behaviors.
- Client-side app logic: `js/*.js` implements product search, product loader, infinite scroll, wishlist and compare UI. Key files:
  - js/product-loader.js — loads JSON product data (`data/products-*.json`) via fetch.
  - js/product-search.js — filtering, sorting, wishlist, compare tray, and rendering logic.
  - Other js files implement product-detail, infinite-scroll, and helpers.
- Data: `data/products-menswear.json` and `data/products-womenswear.json` contain the canonical product objects consumed by ProductLoader.
- Assets: UI CSS and compiled styles are in `Assets/css/` and `css/` (site appears to use Tailwind classes in markup but compiled CSS files are already checked in).
- Deployment: netlify.toml routes clean URLs to HTML pages and provides a catch-all redirect to index.html.

3) Key conventions & patterns (repo-specific)
- Product types are referenced as 'men' or 'women'. ProductLoader maps those to `data/products-menswear.json` and `data/products-womenswear.json`.
- Product data shape expected in JSON: top-level `products` array; each product has at least `id`, `name`, `image`, and `attributes` (category, size, grammage, composition). Many UI flows rely on these keys.
- Wishlist & compare keys: UI uses string keys of the form `productType:productId` (e.g., `women:123`) for localStorage and compare sets — keep that format if altering persistence or endpoints.
- DOM hook IDs/classes used across modules: `productGrid`, `filterSummary`, `compareTray`, `clearFilters`, `categoryFilter`, `sizeFilter`, `compositionFilter`, `sortFilter`, and search input (`input[type="search"]`). Editing these IDs requires updating js/product-search.js.
- Accessibility: components use ARIA attributes (aria-expanded, aria-hidden, aria-pressed). Preserve these when refactoring interactive components.
- Mobile menu and desktop dropdown behaviors live in components/MainNav.js — prefer editing the web component rather than copying plumbing across pages.

4) Files and docs to incorporate (already included)
- README.md contains feature and structure notes — refer to it for product/feature context.
- netlify.toml contains routing rules used in CI/deploy.
- CHANGELOG.md lists release notes and useful context for recent changes.

5) When making changes that affect behavior
- Update the corresponding product JSON files in `data/` before changing ProductLoader expectations.
- If introducing a build step (Tailwind / bundler), add package.json and document `npm run dev` and `npm run build` scripts in README and update these Copilot instructions.

6) Common troubleshooting hints for Copilot sessions
- If product filters return no items, verify product JSON `attributes` keys match names used in the filters (category/size/composition/grammage).
- If product images fail to load in a preview, confirm the static server root and relative image paths (`Assets/Images/...`). Netlify rewrite rules expect root-relative paths.

---

If you'd like, add instructions for a local dev toolchain (Tailwind/PostCSS, bundler) or CI deploy steps.

Playwright MCP server (added)
- Files added: package.json, playwright.config.js, tests/playwright/home.spec.js.
- Quick commands:
  - Install dev deps and browsers: `npm install` then `npm run playwright:install` (or `npx playwright install`).
  - Start preview server: `npm run preview` (starts http-server on port 8000).
  - Run full test suite: `npm test` (runs `npx playwright test`).
  - Run a single test file: `npm run test:single` or `npx playwright test tests/playwright/home.spec.js`.
- Playwright config starts a local static server automatically (webServer). Tests use baseURL `http://localhost:8000` so run from repo root.
- If adding CI, run `npm ci && npm run playwright:install && npm test`.

If you want different test coverage (visual regression, additional routes, or headful runs), say which suites to add and a preferred CI provider.

CI: GitHub Actions workflow (added)
- Workflow: .github/workflows/playwright.yml
- Trigger: pull_request on main or master
- What it does: checks out the repo, sets up Node.js, installs dependencies, installs Playwright browsers (with deps), and runs the Playwright suite headless on Ubuntu.
- To run locally the same way: npm ci && npm run playwright:install && npm test

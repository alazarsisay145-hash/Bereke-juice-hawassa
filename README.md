# Bereket Juice & Salad — Hawassa

Official static website for **Bereket Juice & Salad** (በረከት ፍሬሽ ጁስ እና ሳላድ), a fresh juice, fruit salad, smoothie, shake and burger shop in Hawassa, Ethiopia.

- 📞 +251 916 39 90 15
- 🎵 TikTok: [@bereketjuice](https://www.tiktok.com/@bereketjuice)
- 🌐 Live URL: **https://alazarsisay145-hash.github.io/Bereke-juice-hawassa/**

## Tech

This is a no-build static site built with plain **HTML**, **CSS**, and **vanilla JavaScript**. The production site is served from the `docs/` folder so GitHub Pages can publish it directly.

## Project structure

```text
.
├── docs/
│   ├── .nojekyll
│   ├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── main.js
│   ├── index.html
│   ├── robots.txt
│   └── sitemap.xml
└── README.md
```

## What’s included

- Responsive storefront landing page with menu, About, gallery, contact, cart drawer and checkout flow
- GitHub Pages-ready deployment from `main` → `/docs`
- Local image and illustration assets (no remote image hosts)
- Menu filtering, product modal and cart persistence in `docs/js/main.js`
- Accessibility improvements including semantic structure, keyboard-friendly controls and reduced-motion support
- SEO metadata, social sharing tags and structured data for local discovery

## Local preview

Because the project is fully static, preview it locally from the `docs/` folder:

```bash
cd docs
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## Deploy to GitHub Pages

1. Push the repository to GitHub.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the `main` branch.
5. Select the `/docs` folder.
6. Save and wait for GitHub Pages to publish the site.

## Editing menu items

Menu data lives in **`docs/js/main.js`**.

- Update the `products` array to change names, descriptions and prices.
- Keep each product `id` stable so persisted cart data stays valid.
- Update category labels or artwork mappings near the top of the file when changing menu groups.

## Replacing photos and brand imagery

- Store local web-ready images in **`docs/assets/`**.
- Swap these exact files when replacing the current shop photo set:
  - `docs/assets/interior-dining.jpg` — main interior photo used in About/gallery
  - `docs/assets/interior-dining-800.jpg` — 800px responsive version of the main interior photo
  - `docs/assets/interior-dining-1600.jpg` — 1600px responsive version of the main interior photo
  - `docs/assets/interior-dining-hero.jpg` — landscape hero crop
  - `docs/assets/interior-dining-hero-800.jpg` — 800px responsive hero crop
- Update image references in **`docs/index.html`** if filenames change.
- Keep images compressed and include explicit `width` and `height` attributes for stable layout.
- If you replace the featured interior image, also update the corresponding Open Graph and structured data image references in `docs/index.html`.

## Smoke test

Run the lightweight storefront smoke test with:

```bash
npm test
```

## Notes

- The site uses only relative paths so it works from both `file://` previews and GitHub Pages under `/Bereke-juice-hawassa/`.
- No backend is required; menu browsing, cart persistence and checkout preparation are all client-side.

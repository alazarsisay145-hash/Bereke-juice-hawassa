# Bereket Juice & Fruit Salad — Hawassa

Official static website for **Bereket Juice & Fruit Salad** (በረከት ፍሬሽ ጁስ እና ፍሩት ሳላድ), a fresh juice, fruit salad, smoothie, shake and burger shop in Hawassa, Ethiopia.

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
│   │   ├── logo.svg
│   │   ├── favicon.svg
│   │   ├── menu/
│   │   ├── storefront.jpg
│   │   └── fruit-display.jpg
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── main.js
│   ├── index.html
│   ├── robots.txt
│   └── sitemap.xml
├── scripts/
│   └── smoke.js
└── README.md
```

## What’s included

- Responsive storefront landing page with hero, menu, gallery, contact, cart drawer and WhatsApp checkout flow
- GitHub Pages-ready deployment from `main` → `/docs`
- Local image and illustration assets only (no runtime remote image hosts)
- Menu filtering, product modal and cart persistence in `docs/js/main.js`
- Accessibility improvements including semantic structure, keyboard-friendly controls and reduced-motion support
- SEO metadata, social sharing tags and structured data for local discovery

## Brand direction

The current storefront theme uses a light Bereket palette inspired by the real shop:

- **Background:** `#FAFAF7` and soft cream tones
- **Primary green:** `#5FBF3A`
- **Green hover:** `#3E9E2E`
- **Accent orange:** `#F5891F`
- **Text:** `#1B1B1B`
- **Glass cards:** translucent white with subtle blur and soft borders

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

## WhatsApp ordering setup

The WhatsApp number is configured in exactly one place:

- **`docs/js/main.js`** → `const WHATSAPP_NUMBER = '251916399015';`

Update that single constant to change:

- WhatsApp ordering checkout
- Contact/footer/mobile WhatsApp links
- The displayed contact number
- Structured data contact details

## Editing menu items

Menu data lives in **`docs/js/main.js`**.

- Update the `products` array to change names, descriptions and prices.
- Keep each product `id` stable so persisted cart data stays valid.
- Each product now points to a local `.jpg` image and `.svg` fallback in `docs/assets/menu/`.

Current expected product image filenames:

- `mango-juice.jpg`
- `avocado-juice.jpg`
- `papaya-juice.jpg`
- `spris.jpg`
- `strawberry-smoothie.jpg`
- `tropical-smoothie.jpg`
- `banana-shake.jpg`
- `oreo-shake.jpg`
- `chicken-burger.jpg`
- `beef-burger.jpg`
- `fruit-salad.jpg`
- `special-fruit-mix.jpg`

## Replacing menu photos

The repository currently includes local placeholder menu images plus matching `.svg` fallbacks.

To replace them with real photos:

1. Export each image around **800px wide**.
2. Compress each file to roughly **under 120 KB**.
3. Save the real photo with the **same filename** in `docs/assets/menu/`.
4. Leave the matching `.svg` fallback file in place.

The placeholder artwork is documented in `docs/assets/menu/CREDITS.md`.

## Replacing shop and hero photos

Swap these exact files when real photos are ready:

- `docs/assets/interior-dining.jpg`
- `docs/assets/interior-dining-800.jpg`
- `docs/assets/interior-dining-1600.jpg`
- `docs/assets/interior-dining-hero.jpg`
- `docs/assets/interior-dining-hero-800.jpg`
- `docs/assets/storefront.jpg` ← owner storefront placeholder target
- `docs/assets/fruit-display.jpg` ← owner fruit-display placeholder target

If you replace the featured interior or hero image, also review the Open Graph image references in `docs/index.html`.

## Branding assets

- `docs/assets/logo.svg` is the shared navbar/footer brand mark.
- `docs/assets/favicon.svg` is derived from the same logo.
- If you receive the official Bereket logo file later, replace these assets with the same filenames.

## Smoke test

Run the lightweight storefront smoke test with:

```bash
npm ci
npm test
```

## Notes

- The site uses only relative paths so it works from both `file://` previews and GitHub Pages under `/Bereke-juice-hawassa/`.
- No backend is required; menu browsing, cart persistence and checkout messaging are all client-side.

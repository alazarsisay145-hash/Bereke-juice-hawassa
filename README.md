# Bereket Juice & Salad — Hawassa

Official website for **Bereket Juice & Salad** (በረከት ፍሬሽ ጁስ እና ሳላድ), a fresh juice, fruit salad, smoothie, shake and burger shop in Hawassa, Ethiopia.

- 📞 +251 916 39 90 15
- 🎵 TikTok: [@bereketjuice](https://www.tiktok.com/@bereketjuice)

## Live site

GitHub Pages URL: **https://alazarsisay145-hash.github.io/Bereke-juice-hawassa/**

## Tech

Static site built with plain HTML, CSS and vanilla JavaScript. The production site is served from the `docs/` folder for GitHub Pages.

## Project structure

```text
.
├── docs/
│   ├── assets/
│   ├── css/
│   ├── js/
│   ├── index.html
│   └── .nojekyll
└── README.md
```

## Features

- Real shop-inspired storefront and evening visuals stored locally in `docs/assets/`
- Compact responsive layout tuned for phone, tablet and desktop
- Animated menu filtering across fresh juices, smoothies, shakes, burgers and fruit salads
- Product quick-view modal with quantity selection and add-to-cart flow
- Working cart drawer with localStorage persistence, quantity controls and checkout request form
- Guest House “Coming Soon” section with animated notify form
- Responsive mobile navigation and floating order button
- `prefers-reduced-motion` support for reduced animation environments

## Local preview

Because the project is static, run a simple local server from the `docs/` folder:

```bash
cd docs
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## GitHub Pages deployment

1. Push the repository to GitHub.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the desired branch and choose the `/docs` folder.
5. Save the settings and wait for GitHub Pages to publish the site.

No build step is required.

## Updating menu items

- Edit `docs/js/main.js`.
- Each product in the `products` array contains the displayed name, category, price and description.
- Category placeholder art is mapped near the top of the file, so you can keep using local assets without third-party image hosts.

## Updating shop photos

- Replace `docs/assets/storefront-new.svg` and `docs/assets/shop-evening.svg` with newer local images if you have them.
- Keep filenames the same to avoid changing HTML references, or update the paths in `docs/index.html`.
- For best loading performance, keep replacement images reasonably compressed for the web.

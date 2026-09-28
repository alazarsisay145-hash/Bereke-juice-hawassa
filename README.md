# Bereket Juice & Salad — Hawassa

Official website for **Bereket Juice & Salad** (በረከት ፍሬሽ ጁስ እና ሳላድ), a fresh juice, fruit salad, smoothie, shake and burger shop in Hawassa, Ethiopia.

- 📞 +251 916 39 90 15
- 🎵 TikTok: [@bereketjuice](https://www.tiktok.com/@bereketjuice)

## Tech

Static site built with plain HTML, CSS and vanilla JavaScript, featuring a premium glassmorphism design with rich, accessible animations. Deployable directly to GitHub Pages.

## Project structure

```text
.
├── assets/
│   ├── empty-cart.svg
│   ├── fruit-slice.svg
│   └── juice-glass.svg
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── index.html
└── README.md
```

## Features

- Cinematic hero reveal with a short branded preloader
- Premium glassmorphism UI with ambient motion and scroll-triggered reveals
- Animated menu filtering across fresh juices, smoothies, shakes, burgers and fruit salads
- Product quick-view modal with quantity selection and add-to-cart flow
- Working cart drawer with localStorage persistence, quantity controls and checkout request form
- Guest House “Coming Soon” section with animated notify form
- Responsive mobile navigation and floating order button
- `prefers-reduced-motion` support for reduced animation environments

## Local preview

Because the project is static, you can open `index.html` directly in a browser or run a simple local server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## GitHub Pages deployment

1. Push the repository to GitHub.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the branch that contains `index.html` (for example `main`) and choose `/ (root)`.
5. Save the settings and wait for GitHub Pages to publish the site.

No build step is required.

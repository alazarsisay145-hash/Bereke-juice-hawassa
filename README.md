# Bereket Juice & Salad — Hawassa

Official static website for **Bereket Juice & Salad** (በረከት ፍሬሽ ጁስ እና ሳላድ), a fresh juice, fruit salad, smoothie, shake and burger shop in Hawassa, Ethiopia.

- 📞 +251 916 39 90 15
- 🎵 TikTok: [@bereketjuice](https://www.tiktok.com/@bereketjuice)

## Tech

This site uses plain **HTML, CSS and vanilla JavaScript** only, so it can be deployed directly to **GitHub Pages** with no build step.

## Project structure

```text
.
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── assets/
│   ├── empty-cart.svg
│   └── fruit-badge.svg
└── README.md
```

## Features

- Premium glassmorphism visual style with animated ambient gradients and floating fruit accents
- Animated preloader and cinematic hero reveal
- Sticky responsive navigation with active-section indicator and animated mobile drawer
- Interactive animated menu filtering for Fresh Juices, Smoothies, Shakes, Burgers and Fruit Salads
- Product modal with quantity selection and add-to-cart flow
- Working cart drawer with localStorage persistence, quantity controls and checkout summary
- Scroll reveal animations via `IntersectionObserver`
- Guest House “Coming Soon” section with email form validation and success state
- Reduced-motion support for accessibility

## Local preview

Because the project is fully static, you can open `index.html` directly in a browser or serve it locally.

Example:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploy to GitHub Pages

1. Push the repository to GitHub.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the branch to publish (for example `main`) and choose the `/ (root)` folder.
5. Save the settings and wait for GitHub Pages to publish the site.
6. Revisit the Pages URL after deployment finishes.

## Notes

- External photo placeholders are loaded from Unsplash URLs.
- No backend is required; the cart, notify form and checkout flow are client-side only.

# Accounting & Business with Usman Khan — Website

A responsive static website (plain HTML, CSS and JavaScript — no build step).

## Files

```
index.html     Page structure and content
styles.css     All styling (desktop, tablet and phone layouts)
script.js      Menu, active-link highlighting, scroll animations, testimonial dots
assets/
  usman-transparent.png   Cut-out portrait (hero + YouTube card)
  usman-office.png        Photo used in the "About" section
README.md
```

## Run it

Open `index.html` in a browser. To publish, upload all files **keeping the `assets` folder** (e.g. GitHub Pages, Netlify).

## Editing

- **Text / links:** edit `index.html`. The Linktree, YouTube (`tr.ee/...`) and Instagram links are plain `href`s.
- **Colours:** change the variables at the top of `styles.css` (`--wine`, `--cream`, `--sand`, …).
- **Portrait size:** the hero circle is controlled by `--S` in `.hero` (`styles.css`).
- **Photos:** replace the two files in `assets/` using the same file names. The portrait must be a transparent PNG with the person facing forward, head near the top.
- **Fonts:** loaded from Google Fonts in `index.html` (Source Serif 4, Playfair Display, DM Sans, Oswald, Herr Von Muellerhoff). An internet connection is needed to see them; fallbacks are built in.

## Notes

- Phone layout adds a bottom tab bar and swipeable testimonials, as in the mockup.
- Animations respect the "reduce motion" setting.
- Icons are inline SVG, so no icon files are needed.

# DMateo's Food House — Digital Menu

A mobile-first, QR-accessible digital menu built for **DMateo's Food House** in Lipa City, Philippines. Customers scan a table QR code on their smartphones to browse categories, dishes, and prices with an app-like booklet feel.

🔗 **Live Menu:** [https://dmateos-menu.github.io/](https://dmateos-menu.github.io/)

---

## Preview

| Mobile Menu View | Scan to Try on Your Phone |
| :---: | :---: |
| ![DMateo's Digital Menu Screenshot](images/screenshot.png) | <img src="qr-code/qrcode_dmateos-menu.github.io.png" alt="QR Code for DMateo's Digital Menu" width="220"> |

---

## Key Features

- **Booklet-Style Category Navigation:** Instead of one long scrolling page, each menu category (`Rice Meals & Platters`, `Rice Toppings`, `Snacks & Sandwiches`, `Bilao`, `Drinks`) renders as its own dedicated page.
- **Three Ways to Navigate on Mobile:**
  - **Sticky Category Tabs:** Horizontal pill tabs at the top automatically scroll the active category into the center of the tab bar.
  - **Touch Swipe Gestures:** Custom `touchstart` / `touchend` swipe detection lets customers swipe left/right between categories while ignoring vertical page scrolls and horizontal tab-bar scrolling.
  - **Fixed Bottom Pager (`← Prev` / `Next →`):** Thumb-friendly navigation bar at the bottom of phone screens (automatically hidden on tablets and desktops at `768px` and wider).
- **Accessible Page Transitions:** Directional CSS slide animations (`slideInFromRight` / `slideInFromLeft`) when flipping between categories, with an automatic `@media (prefers-reduced-motion: reduce)` fallback to a gentle fade.
- **Data-Driven Menu (`menu.json`):** Dish names, dual solo/platter pricing, and descriptions are decoupled from the UI in `menu.json`, making price or menu updates quick and error-free without touching HTML or JavaScript.
- **Brand-Matched Styling:** Custom CSS variables matched to the restaurant's logo (`#7b3f1e` brown, `#1d1d1d` black, `#faf6f0` cream) paired with `Playfair Display` headings.

---

## Tech Stack & Design Decisions

- **HTML5, CSS3, Vanilla JavaScript (ES6+)** — Built without frameworks or build tools so the entire site weighs only a few kilobytes and loads near-instantly over mobile cellular data.
- **JSON Data Layer (`menu.json`)** — Separates restaurant menu content from presentation logic (`script.js`).
- **GitHub Pages Hosting** — Provides free, reliable HTTPS hosting with virtually zero security attack surface (read-only static files, no database or login forms).

---

## Project Structure

```text
dmateos-menu.github.io/
├── index.html                              # Page structure (header, sticky nav, main menu container, footer, mobile pager)
├── style.css                               # Brand variables, mobile-first layout, slide/fade animations, responsive media queries
├── script.js                               # Fetches menu.json, builds category tabs, renders pages, handles swipes & buttons
├── menu.json                               # All categories, dishes, prices, and descriptions
├── images/
│   ├── logo.jpg                            # Restaurant logo and favicon
│   └── screenshot.png                      # Mobile preview screenshot for README
└── qr-code/
    └── qrcode_dmateos-menu.github.io.png   # Static QR code pointing to https://dmateos-menu.github.io/
```

---

## Running Locally

Because `script.js` loads `menu.json` using `fetch()`, open the project through a local web server rather than double-clicking `index.html`:

```bash
# Option 1: Using Python
python -m http.server 8000
# Then open http://localhost:8000 in your browser

# Option 2: Using VS Code Live Server
# Right-click index.html and select "Open with Live Server"
```

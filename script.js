let menuData = null;     // the menu.json contents, once loaded
let currentPage = 0;     // which category "page" we're on (0 = first)
let hasRendered = false; // NEW: so the very first page load doesn't animate

const menuEl = document.getElementById("menu");
const navEl = document.getElementById("category-nav");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const indicator = document.getElementById("page-indicator");

fetch("menu.json")
  .then(res => res.json())
  .then(data => {
    menuData = data;
    document.getElementById("restaurant-name").textContent = data.restaurant;
    buildTabs();
    showPage(0);
  });

// Create one tab button per category
function buildTabs() {
  navEl.innerHTML = menuData.categories
    .map((cat, i) => `<button class="tab" data-index="${i}">${cat.name}</button>`)
    .join("");

  navEl.addEventListener("click", e => {
    if (e.target.matches(".tab")) {
      showPage(Number(e.target.dataset.index));
    }
  });
}

// NEW: plays the slide animation. "next" slides in from the right, "prev" from the left.
function playSlide(direction) {
  menuEl.classList.remove("slide-next", "slide-prev");
  void menuEl.offsetWidth; // forces the browser to restart the animation
  menuEl.classList.add(direction === "next" ? "slide-next" : "slide-prev");
}

// Show ONE category (one page of the booklet)
function showPage(index) {
  const direction = index > currentPage ? "next" : "prev"; 
  const changed = index !== currentPage;                   
  currentPage = index;
  const cat = menuData.categories[index];

  menuEl.innerHTML =
    `<h2>${cat.name}</h2>` +
    cat.items.map(item => `
      <div class="item">
        <div class="item-top">
          <span class="name">${item.name}</span>
          <span class="price">${item.price ? "₱" + item.price : ""}</span>
        </div>
        <p>${item.description}</p>
      </div>`).join("");

  // Highlight the active tab
  document.querySelectorAll(".tab").forEach((tab, i) => {
    tab.classList.toggle("active", i === index);
    if (i === index) tab.scrollIntoView({ inline: "center", block: "nearest" });
  });

  // Disable Prev on the first page and Next on the last page
  prevBtn.disabled = index === 0;
  nextBtn.disabled = index === menuData.categories.length - 1;
  indicator.textContent = `${index + 1} / ${menuData.categories.length}`;

  // NEW: animate only after the first load, and only if the page actually changed
  if (hasRendered && changed) playSlide(direction);
  hasRendered = true;

  window.scrollTo({ top: 0, behavior: "smooth" });
}

prevBtn.addEventListener("click", () => showPage(currentPage - 1));
nextBtn.addEventListener("click", () => showPage(currentPage + 1));

// NEW: swipe support for phones
let touchStartX = 0;
let touchStartY = 0;
let swipeIgnored = false;

document.addEventListener("touchstart", e => {
  // Don't treat scrolling the tab bar sideways as a page swipe
  swipeIgnored = !!e.target.closest("#category-nav");
  touchStartX = e.changedTouches[0].clientX;
  touchStartY = e.changedTouches[0].clientY;
}, { passive: true });

document.addEventListener("touchend", e => {
  if (swipeIgnored || !menuData) return;

  const dx = e.changedTouches[0].clientX - touchStartX;
  const dy = e.changedTouches[0].clientY - touchStartY;

  // Must be a long enough, mostly sideways swipe (so normal scrolling doesn't trigger it)
  if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 1.5) return;

  if (dx < 0 && currentPage < menuData.categories.length - 1) {
    showPage(currentPage + 1); // swipe left = next page
  } else if (dx > 0 && currentPage > 0) {
    showPage(currentPage - 1); // swipe right = previous page
  }
}, { passive: true });
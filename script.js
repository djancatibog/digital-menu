let menuData = null;   // the menu.json contents, once loaded
let currentPage = 0;   // which category "page" we're on (0 = first)

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

// Show ONE category (one page of the booklet)
function showPage(index) {
  currentPage = index;
  const cat = menuData.categories[index];

  menuEl.innerHTML =
    `<h2>${cat.name}</h2>` +
    cat.items.map(item => `
      <div class="item">
        <div class="item-top">
          <span class="name">${item.name}</span>
          <span class="price">₱${item.price}</span>
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

  window.scrollTo({ top: 0, behavior: "smooth" });
}

prevBtn.addEventListener("click", () => showPage(currentPage - 1));
nextBtn.addEventListener("click", () => showPage(currentPage + 1));
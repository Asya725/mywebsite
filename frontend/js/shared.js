const header = document.querySelector("header");
const menuIcon = document.querySelector("#menu-icon");
const navMenu = document.querySelector(".navmenu");

function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveFavorites(items) {
  localStorage.setItem("favorites", JSON.stringify(items));
}

function saveCart(items) {
  localStorage.setItem("cart", JSON.stringify(items));
}

function isFavorite(productId) {
  return getFavorites().some((item) => item.id === productId);
}

function toggleFavorite(product) {
  const favorites = getFavorites();
  const exists = favorites.some((item) => item.id === product.id);

  if (exists) {
    saveFavorites(favorites.filter((item) => item.id !== product.id));
  } else {
    saveFavorites([...favorites, product]);
  }

  updateCartCount();
}

function addToCart(product, selectedSize = "") {
  const cart = getCart();
  cart.push({ ...product, selectedSize });
  saveCart(cart);
  updateCartCount();
}

function updateCartCount() {
  const countEls = document.querySelectorAll(".cart-count");
  const cart = getCart();

  countEls.forEach((el) => {
    el.textContent = cart.length;
  });
}

function setupHeader() {
  window.addEventListener("scroll", () => {
    if (header) {
      header.classList.toggle("sticky", window.scrollY > 10);
    }
  });
}

function setupMobileMenu() {
  if (!menuIcon || !navMenu) return;

  menuIcon.addEventListener("click", () => {
    menuIcon.classList.toggle("bx-x");
    navMenu.classList.toggle("open");
  });

  document.querySelectorAll(".navmenu a").forEach((link) => {
    link.addEventListener("click", () => {
      menuIcon.classList.remove("bx-x");
      navMenu.classList.remove("open");
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 750) {
      menuIcon.classList.remove("bx-x");
      navMenu.classList.remove("open");
    }
  });
}

function createStars() {
  return `
    <i class="bx bx-star"></i>
    <i class="bx bx-star"></i>
    <i class="bx bx-star"></i>
    <i class="bx bx-star"></i>
    <i class="bx bxs-star-half"></i>
  `;
}

function setupBaseUi() {
  setupHeader();
  setupMobileMenu();
  updateCartCount();
}

document.addEventListener("DOMContentLoaded", setupBaseUi);

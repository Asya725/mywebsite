const productsContainer = document.querySelector(".products");
const favoritesList = document.querySelector("#favorites-list");
const cartList = document.querySelector("#cart-list");

function createProductCard(product) {
  const productCard = document.createElement("div");
  productCard.className = "row";

  const favoriteActive = isFavorite(product.id)
    ? "bxs-heart active-heart"
    : "bx-heart";

  productCard.innerHTML = `
    <div class="product-image-wrap">
      <a href="product-detail.html?id=${product.id}" class="product-image-link">
        <img src="${product.image}" alt="${product.name}" />
      </a>
      ${product.tag ? `<div class="products-text"><h5>${product.tag}</h5></div>` : ""}
    </div>

    <div class="ratting">
      ${createStars()}
    </div>

    <div class="product-meta">
      <div class="product-info">
        <a href="product-detail.html?id=${product.id}" class="product-title-link">
          <h4>${product.name}</h4>
        </a>
        <p>${product.price}</p>
      </div>

      <button class="mini-heart-btn" aria-label="Favorite product">
        <i class="bx ${favoriteActive}"></i>
      </button>
    </div>
  `;

  const heartBtn = productCard.querySelector(".mini-heart-btn");
  heartBtn.addEventListener("click", (e) => {
    e.preventDefault();
    toggleFavorite(product);

    const icon = heartBtn.querySelector("i");
    icon.className = isFavorite(product.id)
      ? "bx bxs-heart active-heart"
      : "bx bx-heart";

    renderFavorites();
  });

  return productCard;
}

function renderFavorites() {
  if (!favoritesList) return;
  const favorites = getFavorites();

  if (!favorites.length) {
    favoritesList.innerHTML =
      '<p class="empty-message">No favorite products yet.</p>';
    return;
  }

  favoritesList.innerHTML = "";
  favorites.forEach((item) => {
    favoritesList.innerHTML += `
      <div class="saved-item">
        <img src="${item.image}" alt="${item.name}">
        <div>
          <h4>${item.name}</h4>
          <p>${item.price}</p>
        </div>
      </div>
    `;
  });
}

function renderCart() {
  if (!cartList) return;
  const cart = getCart();

  if (!cart.length) {
    cartList.innerHTML = '<p class="empty-message">Your cart is empty.</p>';
    return;
  }

  cartList.innerHTML = "";
  cart.forEach((item) => {
    cartList.innerHTML += `
      <div class="saved-item">
        <img src="${item.image}" alt="${item.name}">
        <div>
          <h4>${item.name}</h4>
          <p>${item.price}</p>
          <small>${item.selectedSize ? `Size: ${item.selectedSize}` : ""}</small>
        </div>
      </div>
    `;
  });
}

async function loadAllProducts() {
  if (!productsContainer) return;

  productsContainer.innerHTML =
    '<p class="loading-message">Loading products...</p>';

  try {
    const response = await fetch("./products.json");

    if (!response.ok) {
      throw new Error(`Failed to load products: ${response.status}`);
    }

    const products = await response.json();

    productsContainer.innerHTML = "";
    products.forEach((product) => {
      productsContainer.appendChild(createProductCard(product));
    });

    renderFavorites();
    renderCart();
  } catch (error) {
    console.error(error);
    productsContainer.innerHTML =
      '<p class="error-message">Sorry, products could not be loaded right now.</p>';
  }
}

document.addEventListener("DOMContentLoaded", loadAllProducts);

const productsContainer = document.querySelector(".products");

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
  });

  return productCard;
}

async function loadPopularProducts() {
  if (!productsContainer) return;

  productsContainer.innerHTML =
    '<p class="loading-message">Loading products...</p>';

  try {
    const response = await fetch("./products.json");

    if (!response.ok) {
      throw new Error(`Failed to load products: ${response.status}`);
    }

    const products = await response.json();
    const popularProducts = products.slice(0, 8);

    productsContainer.innerHTML = "";

    popularProducts.forEach((product) => {
      productsContainer.appendChild(createProductCard(product));
    });
  } catch (error) {
    console.error(error);
    productsContainer.innerHTML =
      '<p class="error-message">Sorry, products could not be loaded right now.</p>';
  }
}

document.addEventListener("DOMContentLoaded", loadPopularProducts);

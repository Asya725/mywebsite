const detailContainer = document.querySelector("#product-detail");

function getProductIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return Number(params.get("id"));
}

async function loadProductDetail() {
  if (!detailContainer) return;

  detailContainer.innerHTML =
    '<p class="loading-message">Loading product...</p>';

  try {
    const response = await fetch("./products.json");
    const products = await response.json();
    const productId = getProductIdFromUrl();
    const product = products.find((item) => item.id === productId);

    if (!product) {
      detailContainer.innerHTML =
        '<p class="error-message">Product not found.</p>';
      return;
    }

    detailContainer.innerHTML = `
      <div class="product-detail-image">
        <img src="${product.image}" alt="${product.name}" />
      </div>

      <div class="product-detail-info">
        <span class="detail-tag">${product.tag || "Featured"}</span>
        <h1>${product.name}</h1>
        <p class="detail-price">${product.price}</p>
        <p class="detail-description">${product.description}</p>

        <div class="size-block">
          <h4>Sizes</h4>
          <div class="size-options">
            ${product.sizes
              .map(
                (size, index) => `
              <button class="size-btn ${index === 0 ? "active-size" : ""}" data-size="${size}">
                ${size}
              </button>
            `,
              )
              .join("")}
          </div>
        </div>

        <div class="detail-actions">
          <button class="main-btn" id="add-to-cart-btn">
            Add to Cart <i class="bx bx-cart"></i>
          </button>

          <button class="outline-btn" id="favorite-btn">
            <i class="bx ${isFavorite(product.id) ? "bxs-heart active-heart" : "bx-heart"}"></i>
            Favorite
          </button>
        </div>
      </div>
    `;

    let selectedSize = product.sizes[0] || "";

    detailContainer.querySelectorAll(".size-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        detailContainer.querySelectorAll(".size-btn").forEach((b) => {
          b.classList.remove("active-size");
        });
        btn.classList.add("active-size");
        selectedSize = btn.dataset.size;
      });
    });

    document.querySelector("#add-to-cart-btn").addEventListener("click", () => {
      addToCart(product, selectedSize);
      alert("Product added to cart.");
    });

    document.querySelector("#favorite-btn").addEventListener("click", () => {
      toggleFavorite(product);
      const icon = document.querySelector("#favorite-btn i");
      icon.className = isFavorite(product.id)
        ? "bx bxs-heart active-heart"
        : "bx bx-heart";
    });
  } catch (error) {
    detailContainer.innerHTML =
      '<p class="error-message">Sorry, product details could not be loaded.</p>';
  }
}

document.addEventListener("DOMContentLoaded", loadProductDetail);

const header = document.querySelector("header");
const menuIcon = document.querySelector("#menu-icon");
const navMenu = document.querySelector(".navmenu");
const productsContainer = document.querySelector(".products");

window.addEventListener("scroll", () => {
  if (header) {
    header.classList.toggle("sticky", window.scrollY > 0);
  }
});

if (menuIcon && navMenu) {
  menuIcon.addEventListener("click", () => {
    menuIcon.classList.toggle("bx-x");
    navMenu.classList.toggle("open");
  });
}

async function loadProducts() {
  try {
    const response = await fetch("http://localhost:5000/api/products");
    const products = await response.json();

    if (!productsContainer) return;

    productsContainer.innerHTML = "";

    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("row");

      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        ${
          product.tag
            ? `<div class="products-text"><h5>${product.tag}</h5></div>`
            : ""
        }
        <div class="heart-icon">
          <i class="bx bx-heart"></i>
        </div>
        <div class="ratting">
          <i class="bx bx-star"></i>
          <i class="bx bx-star"></i>
          <i class="bx bx-star"></i>
          <i class="bx bx-star"></i>
          <i class="bx bxs-star-half"></i>
        </div>
        <div class="price">
          <h4>${product.name}</h4>
          <p>${product.price}</p>
        </div>
      `;

      productsContainer.appendChild(productCard);
    });
  } catch (error) {
    console.error("Error loading products:", error);
  }
}

loadProducts();

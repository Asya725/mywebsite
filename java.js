const header = document.querySelector("header");
const menuIcon = document.querySelector("#menu-icon");
const navMenu = document.querySelector(".navmenu");

window.addEventListener("scroll", () => {
  header.classList.toggle("sticky", window.scrollY > 0);
});

menuIcon.addEventListener("click", () => {
  menuIcon.classList.toggle("bx-x");
  navMenu.classList.toggle("open");
});

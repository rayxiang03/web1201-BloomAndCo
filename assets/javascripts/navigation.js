const addEventToElement= function (element, type, callback) {
  if (element.length > 1) {
    for (let i = 0; i < element.length; i++) {
      element[i].addEventListener(type, callback);
    }
  } else {
    element.addEventListener(type, callback);
  }
}

// Navigation Bar Minimize
const navMenu = document.querySelector("[data_minimize]");
const navBar = document.querySelector("[data_nav_bar]");
const navBarHref = document.querySelectorAll("[data_nav_href]");
const header = document.querySelector("[data_hdr]"); //active header when window scroll down to 100px

const menuBar = function () {
  navBar.classList.toggle("active");
  navMenu.classList.toggle("active");
}

const closeNavbar = function () {
  navBar.classList.remove("active");
  navMenu.classList.remove("active");
}

const activeScroll = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
}

addEventToElement(navMenu, "click", menuBar);
addEventToElement(navBarHref, "click", closeNavbar);
addEventToElement(window, "scroll", activeScroll);
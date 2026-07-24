let lastScrollTop = 0;
const header = document.getElementById("header");

window.addEventListener("scroll", function () {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const titleBar = document.getElementById("titleBar"); // só existe no mobile

  if (scrollTop > lastScrollTop) {
    // descendo → esconde
    if (header && window.innerWidth > 980) {
      // desktop
      header.style.transform = `translateY(-${header.offsetHeight}px)`;
    }
    if (titleBar && window.innerWidth <= 980) {
      // mobile
      titleBar.style.transform = `translateY(-${titleBar.offsetHeight}px)`;
    }
  } else {
    // subindo → mostra
    if (header && window.innerWidth > 980) {
      header.style.transform = "translateY(0)";
    }
    if (titleBar && window.innerWidth <= 980) {
      titleBar.style.transform = "translateY(0)";
    }
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

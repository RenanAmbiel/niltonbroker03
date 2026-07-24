// modal.js — simples com botões esquerda/direita

const modal = document.getElementById("modal");
const modalImg = modal.querySelector("img");
const closeBtn = modal.querySelector(".close-btn");
const leftBtn = modal.querySelector(".modal-nav.left");
const rightBtn = modal.querySelector(".modal-nav.right");
const links = document.querySelectorAll(".grid-menu a");

let currentIndex = 0;
let total = links.length;

// abrir modal
links.forEach((link, i) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    currentIndex = i;
    showImage();
    modal.style.display = "flex";
  });
});

// fechar modal
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// mostrar imagem atual
function showImage() {
  modalImg.src = links[currentIndex].href;
  updateButtons();
}

// botões de navegação
leftBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  if (currentIndex > 0) {
    currentIndex--;
    showImage();
  }
});

rightBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  if (currentIndex < total - 1) {
    currentIndex++;
    showImage();
  }
});

// fecha clicando fora da imagem
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

// habilita/desabilita botões nas extremidades
function updateButtons() {
  leftBtn.style.visibility = currentIndex === 0 ? "hidden" : "visible";
  rightBtn.style.visibility = currentIndex === total - 1 ? "hidden" : "visible";
}

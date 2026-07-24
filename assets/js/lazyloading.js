const imagens = document.querySelectorAll("img.lazy");

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src; // Move de data-src para src
      img.classList.remove("lazy");
      obs.unobserve(img); // Para de observar a imagem
    }
  });
});

imagens.forEach((img) => observer.observe(img));

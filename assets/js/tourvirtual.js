      const slides = document.querySelectorAll(".slide");
      const container = document.getElementById("slideshow");
      let current = 0;
      let scale = 1;
      let offsetX = 0;
      let offsetY = 0;
      let startX = 0;
      let startY = 0;
      let isDragging = false;
      let lastTouchDist = null;

      function showSlide(index) {
        const img = getCurrentImg();
        img.style.transform = "scale(1)";
        img.style.cursor = "grab";
        img.style.transition = "transform 0.3s ease";
        scale = 1;
        offsetX = 0;
        offsetY = 0;
        slides[current].classList.remove("active");
        current = (index + slides.length) % slides.length;
        slides[current].classList.add("active");
      }

      function zoomIn() {
        scale = Math.min(scale + 0.1, 5);
        updateTransform();
      }

      function zoomOut() {
        scale = Math.max(scale - 0.1, 1);
        if (scale === 1) {
          offsetX = 0;
          offsetY = 0;
        }
        updateTransform();
      }

      function updateTransform() {
        const img = getCurrentImg();
        img.style.transition = "transform 0.1s linear";
        img.style.transform = `scale(${scale}) translate(${offsetX}px, ${offsetY}px)`;
        img.style.cursor = scale > 1 ? "grab" : "default";
      }

      function getCurrentImg() {
        return slides[current].querySelector("img");
      }

      // Zoom com roda do mouse
      slides.forEach((slide) => {
        slide.addEventListener("wheel", (e) => {
          e.preventDefault();
          if (e.deltaY < 0) zoomIn();
          else zoomOut();
        });
      });

      // Impede clique em botões de ativar o próximo slide
      document.querySelectorAll(".controls button").forEach((btn) => {
        btn.addEventListener("click", (e) => e.stopPropagation());
      });

      // Clique avança (apenas se não estiver arrastando com zoom)
      document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") nextSlide();
        if (e.key === "ArrowLeft") prevSlide();
      });

      function nextSlide() {
        showSlide(current + 1);
      }

      function prevSlide() {
        showSlide(current - 1);
      }

      // ------ DRAG estilo mapa (mouse)
      container.addEventListener("mousedown", (e) => {
        if (scale <= 1) return;
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        container.style.cursor = "grabbing";
        // Evita seleção de texto durante o arraste
        e.preventDefault();
      });

      // Escuta o movimento no document para garantir que o arraste continue mesmo fora do container
      document.addEventListener("mousemove", (e) => {
        if (!isDragging || scale <= 1) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        startX = e.clientX;
        startY = e.clientY;
        offsetX += dx / scale;
        offsetY += dy / scale;
        updateTransform();
      });

      function stopDragging() {
        if (!isDragging) return;
        isDragging = false;
        container.style.cursor = scale > 1 ? "grab" : "default";
      }

      // Captura o 'mouseup' mesmo se for fora do container
      document.addEventListener("mouseup", stopDragging);
      // Caso a janela perca foco (ex.: ALT+TAB) também interrompe o arraste
      window.addEventListener("blur", stopDragging);

      // ------ DRAG estilo mapa (touch) + pinch-to-zoom

      // Clique com mouse
      container.addEventListener("click", (e) => {
        if (scale > 1 || isDragging) return; // não troca se estiver em zoom
        if (e.target.closest(".controls")) return; // ignora clique em botões
        const x = e.pageX;
        if (x < window.innerWidth / 2) {
          prevSlide();
        } else {
          nextSlide();
        }
      });

      // Toque em celular
      container.addEventListener("touchend", (e) => {
        if (scale > 1) return;
        if (e.changedTouches.length === 1) {
          const x = e.changedTouches[0].clientX;
          if (x < window.innerWidth / 2) {
            prevSlide();
          } else {
            nextSlide();
          }
        }
      });

      // Verifica se há um parâmetro ?slide= na URL
      const params = new URLSearchParams(window.location.search);
      const slideParam = params.get("slide");
      if (slideParam) {
        const index = Array.from(slides).findIndex(s =>
          s.querySelector("img").src.includes(slideParam)
        );
        if (index !== -1) current = index;
}

      showSlide(current);
    
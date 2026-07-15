/* main.js — SEVIAH. Inicialización de componentes de terceros (Swiper) y utilidades.
   Sin dependencias propias más allá de las librerías CDN (D-03). */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    if (typeof window.Swiper === "function") {
      // Hero full-width (docs/03 §3)
      document.querySelectorAll(".hero-swiper").forEach(function (el) {
        new window.Swiper(el, {
          loop: true,
          autoplay: { delay: 6000, disableOnInteraction: false },
          pagination: { el: el.querySelector(".swiper-pagination"), clickable: true },
          navigation: {
            nextEl: el.querySelector(".swiper-button-next"),
            prevEl: el.querySelector(".swiper-button-prev")
          }
        });
      });

      // Carrusel de destacados (docs/03 §3)
      document.querySelectorAll(".destacados-swiper").forEach(function (el) {
        new window.Swiper(el, {
          slidesPerView: 1,
          spaceBetween: 20,
          navigation: {
            nextEl: el.querySelector(".swiper-button-next"),
            prevEl: el.querySelector(".swiper-button-prev")
          },
          breakpoints: {
            576: { slidesPerView: 2 },
            992: { slidesPerView: 4 }
          }
        });
      });
    }

    // Filtro de playlists de /multimedia/ (progresivo; el sitio funciona sin JS).
    // D-13: el filtro opera dentro de cada bloque de formato; un bloque sin
    // resultados se oculta completo.
    var filtros = document.querySelectorAll("[data-playlist-filtro]");
    var videos = document.querySelectorAll("[data-playlist]");
    var bloques = document.querySelectorAll(".bloque-videos[data-formato]");
    if (filtros.length && videos.length) {
      filtros.forEach(function (btn) {
        btn.addEventListener("click", function (ev) {
          ev.preventDefault();
          var val = btn.getAttribute("data-playlist-filtro");
          filtros.forEach(function (b) { b.classList.remove("is-active"); });
          btn.classList.add("is-active");
          videos.forEach(function (card) {
            var show = val === "todas" || card.getAttribute("data-playlist") === val;
            card.hidden = !show;
          });
          bloques.forEach(function (bloque) {
            bloque.hidden = !bloque.querySelector("[data-playlist]:not([hidden])");
          });
        });
      });
    }
  });
})();

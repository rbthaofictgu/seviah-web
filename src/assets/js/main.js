/* main.js — SEVIAH. Inicialización de componentes de terceros (Swiper) y utilidades.
   Sin dependencias propias más allá de las librerías CDN (D-03). */
(function () {
  "use strict";

  // Firma de revisión para diagnóstico rápido (¿qué versión está viendo el navegador?)
  console.info("SEVIAH · assets rev 20260715-8");

  // D-15 (AJUSTE-04-D2, revisión del usuario): preloader en cada página y cada visita
  // (paridad con el loader de la SIT). Se oculta con fade de 400ms al cumplirse la
  // duración fija DURACION_CARGADOR (y con la página ya cargada). El failsafe
  // (duración + 2.5s) vive en el head (base.njk): main.js va después de los CDN y un
  // CDN lento no debe retrasar el tope. prefers-reduced-motion: desvanecido inmediato.
  var cargador = document.getElementById("sevCargador");
  if (cargador) {
    var raiz = document.documentElement;
    var sinMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var limpiarCargador = function () {
      raiz.className = raiz.className.replace(" con-cargador", "").replace(" cargador-vencido", "");
      if (cargador.parentNode) { cargador.parentNode.removeChild(cargador); }
    };
    // Duración fija (indicación del usuario): el cargador se aprecia completo aunque
    // la página cargue rápido. El failsafe del head es DURACION + 2.5s.
    var DURACION_CARGADOR = 3000;
    if (sinMovimiento) {
      // Movimiento reducido: misma duración pero estático (el CSS anula el giro) y
      // retirada sin fade. Antes se retiraba al cargar y se percibía como un parpadeo.
      var quitarEstatico = function () {
        setTimeout(limpiarCargador, Math.max(0, DURACION_CARGADOR - window.performance.now()));
      };
      if (document.readyState === "complete") { quitarEstatico(); }
      else { window.addEventListener("load", quitarEstatico); }
    } else {
      var ocultarCargador = function () {
        var espera = Math.max(0, DURACION_CARGADOR - window.performance.now());
        setTimeout(function () {
          cargador.classList.add("sev-cargador--oculto");
          raiz.className = raiz.className.replace(" con-cargador", "");
          setTimeout(limpiarCargador, 450);
        }, espera);
      };
      if (document.readyState === "complete") { ocultarCargador(); }
      else { window.addEventListener("load", ocultarCargador); }
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    // D-15 (AJUSTE-04-D3): AOS sobrio; deshabilitado si el usuario reduce el movimiento.
    if (window.AOS) {
      window.AOS.init({
        duration: 500,
        easing: "ease-out",
        once: true,
        disable: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      });
    }

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

(function () {
  "use strict";

  /* ---------- nav: fundo sólido ao rolar + menu mobile ---------- */
  var nav = document.getElementById("nav");
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");

  window.addEventListener("scroll", function () {
    nav.classList.toggle("scrolled", window.scrollY > 40);
  }, { passive: true });

  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- rodapé: ano automático ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- agenda: monta a partir de SHOWS (data/shows.js) ---------- */
  var MESES = ["JAN","FEV","MAR","ABR","MAI","JUN","JUL","AGO","SET","OUT","NOV","DEZ"];

  function parseData(str) {
    // "AAAA-MM-DD" -> Date local (evita bug de fuso do new Date("AAAA-MM-DD"))
    var partes = str.split("-").map(Number);
    return new Date(partes[0], partes[1] - 1, partes[2]);
  }

  function formatarDataLonga(d) {
    return d.getDate() + " de " + [
      "janeiro","fevereiro","março","abril","maio","junho",
      "julho","agosto","setembro","outubro","novembro","dezembro"
    ][d.getMonth()] + " de " + d.getFullYear();
  }

  function renderAgenda() {
    var proximoEl = document.getElementById("agendaProximo");
    var passadosEl = document.getElementById("agendaPassados");
    if (!proximoEl || !passadosEl || typeof SHOWS === "undefined") return;

    var hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    var comData = SHOWS.map(function (s) {
      return Object.assign({}, s, { _data: parseData(s.data) });
    });

    var futuros = comData.filter(function (s) { return s._data >= hoje; })
      .sort(function (a, b) { return a._data - b._data; });
    var passados = comData.filter(function (s) { return s._data < hoje; })
      .sort(function (a, b) { return b._data - a._data; });

    // ---- próximo show em destaque ----
    if (futuros.length === 0) {
      proximoEl.innerHTML = '<p class="agenda__empty">Nenhum show confirmado no momento. Fique de olho nas redes sociais da banda.</p>';
    } else {
      var next = futuros[0];
      var d = next._data;
      var local = next.bairro ? (next.local + " — " + next.bairro) : next.local;

      var linksHtml = "";
      if (next.ingresso) {
        linksHtml += '<a class="btn" href="' + next.ingresso + '" target="_blank" rel="noopener">Ingressos</a>';
      }
      if (next.video) {
        linksHtml += '<a class="btn btn--ghost" href="' + next.video + '" target="_blank" rel="noopener">Assistir</a>';
      }

      proximoEl.innerHTML =
        '<div class="agenda__next">' +
          '<div class="agenda__date">' +
            '<span class="day">' + String(d.getDate()).padStart(2, "0") + '</span>' +
            '<span class="mon">' + MESES[d.getMonth()] + '</span>' +
            '<span class="yr">' + d.getFullYear() + '</span>' +
          '</div>' +
          '<div class="agenda__info">' +
            '<span class="eyebrow">Próximo show</span>' +
            '<h3 class="agenda__local">' + local + '</h3>' +
            '<p class="agenda__cidade">' + next.cidade + (next.observacao ? " · " + next.observacao : "") + '</p>' +
          '</div>' +
          (linksHtml ? '<div class="btn-row">' + linksHtml + '</div>' : '') +
        '</div>';

      // se houver mais de um show futuro, lista os demais logo abaixo
      if (futuros.length > 1) {
        var extras = futuros.slice(1).map(rowHTML).join("");
        proximoEl.innerHTML += '<ul class="agenda__list" style="margin-top:1.5rem;">' + extras + '</ul>';
      }
    }

    // ---- shows anteriores ----
    if (passados.length === 0) {
      passadosEl.innerHTML = '<li class="agenda__empty">Nenhum show anterior registrado ainda.</li>';
    } else {
      passadosEl.innerHTML = passados.map(rowHTML).join("");
    }

    function rowHTML(s) {
      var d = s._data;
      var local = s.bairro ? (s.local + " — " + s.bairro) : s.local;
      var extra = s.video
        ? '<a href="' + s.video + '" target="_blank" rel="noopener">Assistir</a>'
        : (s.ingresso ? '<a href="' + s.ingresso + '" target="_blank" rel="noopener">Ingressos</a>' : "");
      return (
        '<li class="agenda__row">' +
          '<time datetime="' + s.data + '">' + String(d.getDate()).padStart(2, "0") + " " + MESES[d.getMonth()] + " " + d.getFullYear() + '</time>' +
          '<div><span class="row-local">' + local + '</span><span class="row-cidade">' + s.cidade + (s.observacao ? " · " + s.observacao : "") + '</span></div>' +
          extra +
        '</li>'
      );
    }
  }

  renderAgenda();
})();

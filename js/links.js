(function () {
  "use strict";

  function applyLanguage() {
    var requested = new URLSearchParams(window.location.search).get("lang");
    var language = requested === "en" || requested === "es" ? requested : "pt-BR";
    document.documentElement.lang = language;
    var year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();

    // O HTML em português é também a alternativa quando JavaScript está desativado.
    if (language === "pt-BR") return;
    var translations = {
      en: {
        title: "Ürütaü — Links",
        description: "All official Ürütaü links: where to buy the Transmutação CD, listen to the band and follow its social media.",
        ogDescription: "All official band links: labels, stores, partners and social media.",
        skip: "Skip to content", heading: "Ürütaü — Official links",
        homeLabel: "Back to the Ürütaü website",
        logoAlt: "Logo of Urutau, a Brazilian horror doom metal band from São Paulo, featuring the band’s name in stylized lettering.",
        stores: "Labels and stores", storesDescription: "Find out where to get the Transmutação EP in Brazil.",
        partners: "Partners", partnersDescription: "Support the Brazilian underground through our editorial partners",
        social: "The band's social media", socialDescription: "Follow the band's social media to keep up with the latest news",
        socialLabel: "{network} profile of the band Urutau",
        misc: "Misc", review: "Whiplash review - by Marcelo Rissi",
        back: "← Back to the website", credit: "Website by Ale Souza -"
      },
      es: {
        title: "Ürütaü — Enlaces",
        description: "Todos los enlaces oficiales de Ürütaü: dónde comprar el CD Transmutação, escuchar a la banda y seguir sus redes sociales.",
        ogDescription: "Todos los enlaces oficiales de la banda: sellos, tiendas, socios y redes sociales.",
        skip: "Saltar al contenido", heading: "Ürütaü — Enlaces oficiales",
        homeLabel: "Volver al sitio web de Ürütaü",
        logoAlt: "Logotipo de Urutau, banda brasileña de horror doom metal de São Paulo, con el nombre de la banda en letras estilizadas.",
        stores: "Sellos y tiendas", storesDescription: "Descubre dónde encontrar el EP Transmutação en Brasil.",
        partners: "Socios", partnersDescription: "Apoya al underground brasileño a través de nuestros socios editoriales",
        social: "Redes sociales de la banda", socialDescription: "Sigue las redes sociales de la banda para estar al tanto de las novedades",
        socialLabel: "{network} de la banda Urutau",
        misc: "Varios", review: "Reseña en Whiplash - por Marcelo Rissi",
        back: "← Volver al sitio", credit: "Sitio web creado por Ale Souza -"
      }
    };
    var text = translations[language];
    [
      ["data-i18n", null],
      ["data-i18n-content", "content"],
      ["data-i18n-aria-label", "aria-label"],
      ["data-i18n-alt", "alt"]
    ].forEach(function (binding) {
      document.querySelectorAll("[" + binding[0] + "]").forEach(function (element) {
        var value = text[element.getAttribute(binding[0])];
        if (typeof value !== "string") return;
        if (binding[1]) element.setAttribute(binding[1], value);
        else element.textContent = value;
      });
    });
    document.querySelectorAll("[data-network]").forEach(function (link) {
      link.setAttribute("aria-label", text.socialLabel.replace("{network}", link.dataset.network));
    });
    document.querySelectorAll("[data-home-link]").forEach(function (link) {
      link.setAttribute("href", "/" + language + "/");
    });
    var locale = document.querySelector('meta[property="og:locale"]');
    if (locale) locale.content = language === "en" ? "en_US" : "es_ES";
  }

  applyLanguage();
})();

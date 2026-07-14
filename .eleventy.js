module.exports = function (eleventyConfig) {
  // Activos estáticos: src/assets -> _site/assets (D-02/D-03)
  eleventyConfig.addPassthroughCopy("src/assets");

  // Filtro utilitario para año/fecha de "última actualización" del footer (docs/02 §9)
  eleventyConfig.addFilter("anio", (value) => String(value).slice(0, 4));

  // Busca un objeto por slug dentro de una lista (p. ej. el video de una noticia)
  eleventyConfig.addFilter("buscarPorSlug", (lista, slug) =>
    (lista || []).find((x) => x.slug === slug) || null);

  // Fecha de última actualización del footer (docs/02 §9), en español
  eleventyConfig.addGlobalData("actualizado", () => {
    const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio",
      "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    const d = new Date();
    return `${meses[d.getMonth()]} de ${d.getFullYear()}`;
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    pathPrefix: "/"
  };
};

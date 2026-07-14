const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

module.exports = function (eleventyConfig) {
  // Reescribe las URLs internas según pathPrefix (para GitHub Pages en subruta /<repo>/).
  // Con pathPrefix "/" (local/root) es un no-op. Es transparente para el sitio.
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  // Normaliza atributos booleanos a forma abreviada (disabled, no disabled="").
  // El re-serializado del EleventyHtmlBasePlugin (solo con pathPrefix != "/") los emite como
  // ="" ; se dejan idénticos al build raíz para una salida consistente y válida (AA de estilo).
  eleventyConfig.addTransform("normalizarBooleanos", (content, outputPath) => {
    if (outputPath && outputPath.endsWith(".html")) {
      return content.replace(
        /\s(disabled|allowfullscreen|hidden|required|checked|selected|readonly|multiple|autofocus|novalidate|ismap|open|reversed|loop|muted|controls|autoplay|async|defer)=""/g,
        " $1");
    }
    return content;
  });

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
    // Root por defecto (producción .gob.hn); en GitHub Pages de proyecto se define
    // PATH_PREFIX=/<repo>/ en el workflow de despliegue.
    pathPrefix: process.env.PATH_PREFIX || "/"
  };
};

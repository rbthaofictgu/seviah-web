module.exports = function (eleventyConfig) {
  // Activos estáticos: src/assets -> _site/assets (D-02/D-03)
  eleventyConfig.addPassthroughCopy("src/assets");

  // Filtro utilitario para año/fecha de "última actualización" del footer (docs/02 §9)
  eleventyConfig.addFilter("anio", (value) => String(value).slice(0, 4));

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

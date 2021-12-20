const PurgeCSS = require("purgecss");

const purgeCSSResults = new PurgeCSS.default().purge({
  content: ["index.html"],
  css: ["base.css"],
  fontFace: true,
  keyframes: true
}).then((res) => {
    console.log(res);
});
const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
const withFonts = require("next-fonts");
const path = require("path");

// for transpiling all ESM @fullcalendar/* packages
// also, for piping fullcalendar thru babel (to learn why, see babel.config.js)
const withTM = require("next-transpile-modules")([
  "@fullcalendar/core",
  "@fullcalendar/common",
  "@fullcalendar/daygrid",
  "@fullcalendar/timegrid",
  "@fullcalendar/interaction",
  "react-window",
]);

module.exports = withPlugins(
  [
    withImages,
    withFonts,
    withTM,
  ],
  {
    webpack(config, options = {}) {
      // Corrige alias e adiciona loaders extras
      config.module.rules.push({
        test: /\.(eot|ttf|woff|woff2)$/,
        use: {
          loader: "url-loader",
        },
      });

      config.module.rules.push({
        test: /node_modules\/@fullcalendar/,
        resolve: {
          alias: { "./main.css": "" },
        },
      });

      config.resolve.modules.push(path.resolve("./"));

      // Habilita mais detalhes de erro se necessário
      config.stats = {
        ...config.stats,
        errorDetails: true,
        children: true,
      };

      return config;
    },
  }
);
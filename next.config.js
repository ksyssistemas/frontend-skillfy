const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
const withSass = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");
const withFonts = require("next-fonts");
const webpack = require("webpack");
const path = require("path");

// for transpiling all ESM @fullcalendar/* packages
// also, for piping fullcalendar thru babel (to learn why, see babel.config.js)
const withTM = require("next-transpile-modules")(["@fullcalendar/core"]);

module.exports = withPlugins(
  [
    withImages,
    withCSS,
    withSass,
    withFonts,
    withTM,
  ],
  {
    webpack(config, options) {
      config.module.rules.push({
        test: /\.(eot|ttf|woff|woff2)$/,
        use: {
          loader: "url-loader",
        },
      });

      config.resolve.modules.push(path.resolve("./"));

      // config.module.rules.push({
      //   test: /\.m?js$/,
      //   include: /node_modules/,
      //   type: 'javascript/auto',
      //   use: {
      //     loader: "babel-loader",
      //     options: {
      //       presets: [
      //         [
      //           'next/babel',
      //           {
      //             'preset-env': {
      //               modules: false,
      //               targets: {
      //                 browsers: ['last 2 versions', 'ie >= 11'],
      //               },
      //             },
      //           },
      //         ],
      //       ],
      //     },
      //   },
      // });

      // config.resolve.alias = {
      //   ...(config.resolve.alias || {}),
      //   pages: path.resolve(__dirname, 'pages'),
      // };
      // config.resolve.alias = {
      //   ...(config.resolve.alias || {}),
      //   variables: path.resolve(__dirname, './variables'),
      //   components: path.resolve(__dirname, 'components'),
      //   layouts: path.resolve(__dirname, './layouts'),
      //   routes: path.resolve(__dirname, './routes'),
      //   assets: path.resolve(__dirname, 'assets'),
      //   'date-fns': path.resolve(__dirname, 'node_modules/date-fns'),
      // };

      // config.resolve.modules = [path.resolve(__dirname, 'src'), 'node_modules'];

      return config;
    },
  }
);
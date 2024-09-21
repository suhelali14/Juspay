const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

process.env["NODE_ENV"] = "production";

module.exports = merge(common, {
  mode: "production",
  optimization: {
    splitChunks: {
      chunks: "all",  // Code-splitting for performance
    },
    minimize: true,
    minimizer: [
      `...`,  // Terser for JS (included in Webpack by default)
      new CssMinimizerPlugin(),  // CSS minification
    ],
  },
});

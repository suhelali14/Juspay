const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devServer: {
    static: path.join(__dirname, "build"),  // Serve from "build" (matches output)
    compress: true,
    port: 3000,
    historyApiFallback: true,  // Handle routing for SPA like React
  },
});

var webpack = require("webpack");
var path = require("path");
var loaders = require("./webpack.loaders");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var WebpackCleanupPlugin = require("webpack-cleanup-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

loaders.push({
    test: /\.less$/,
    loaders: [
        "style-loader",
        "css-loader?importLoaders=1",
        "less-loader"
    ],
    exclude: ["node_modules"]
});

module.exports = {
  entry: ["./src/index.jsx", "./styles/index.less"],
  output: {
    publicPath: "./",
    path: path.join(__dirname, "public"),
    filename: "[chunkhash].js"
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    loaders
  },
  plugins: [
    new WebpackCleanupPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true,
        screw_ie8: false,
        drop_console: false,
        drop_debugger: false
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ExtractTextPlugin({
      filename: "style.css",
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      template: "./src/template.html",
      files: {
        css: ["style.css"],
        js: ["bundle.js"]
      }
    })
  ]
};

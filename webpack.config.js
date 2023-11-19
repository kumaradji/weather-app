const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx'], // Добавьте '.jsx' в расширения
  },
  devServer: {
    static: path.join(__dirname, 'src'),
    compress: true,
    port: 8080,
  },
}

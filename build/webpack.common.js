const path = require("path");
const eslint = require("eslint-friendly-formatter");
// const CopyWebpackPlugin = require("copy-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");

console.log(333333, path.resolve());
console.log(444, path.resolve(__dirname, "../dist"));

module.exports = {
  entry: {
    // main: path.join(__dirname, path.resolve(), "src/index.js")
    // main: "./src/index.js"
    main: path.resolve(__dirname, "../src/index.js")
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].[hash].js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        enforce: "pre",
        use: [
          {
            loader: "babel-loader",
            query: {
              presets: ["@babel/react", "@babel/env",]
            }
          },
          {
            loader: "eslint-loader",
            options: {
              formatter: eslint,
              emitWarning: false
            }
          }

        ]
      },
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              localIdentName: "[name]-[local]-[hash:base64:5]",
              modules: true
            }
          },
          {
            loader: "less-loader",
            options: {
              javascriptEnabled: true,
            }
          }],
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "index.html"
    }),
    new CleanWebpackPlugin()
  ]
};


const path = require("path")
const eslint = require("eslint-friendly-formatter")
// const CopyWebpackPlugin = require("copy-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HtmlWebPackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: {
    main: path.join(__dirname, "src/index.js")
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].[hash].js"
  },
  devServer: {
    port: 7777,
    host: 'localhost',
    open: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: [
          {
            loader: 'babel-loader',
            query: {
              presets: ["@babel/react", "@babel/env",]
            }
          },
          {
            loader: 'eslint-loader',
            options: {
              formatter: eslint,
              emitWarning: false
            }
          }

        ]
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(css|less)$/,
        exclude: /node_modules/,
        include: /src/,
        use: [
          { loader: "style-loader" },
          {
            loader: 'css-loader',
            options: {
              minimize: process.env.NODE_ENV === 'production',
              importLoaders: 2,
              localIdentName: '[name]-[local]-[hash:base64:5]',
              modules: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {           // 如果没有options这个选项将会报错 No PostCSS Config found
              plugins: (loader) => [
                require('autoprefixer')(), //CSS浏览器兼容
              ]
            }
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            }
          }],
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: 'index.html'
    }),
    new CleanWebpackPlugin()
  ]
}


const merge = require("webpack-merge");
const common = require("./webpack.common");
const path = require("path");

console.log("__dirname", __dirname);
console.log("dev resolve", path.resolve());
console.log("dev", path.resolve(__dirname, "../dist"));
module.exports = merge(common, {
  mode: "development",
  devServer: {
    contentBase: path.resolve(__dirname, "../dist"),
    host: "localhost",
    port: 7777,
    open: true,
    hot: true, 
    historyApiFallback: true
  }
});

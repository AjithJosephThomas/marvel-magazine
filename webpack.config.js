const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  context: __dirname,
  entry: [`webpack-dev-server/client?http://localhost:8080`, "./src/index.js"],
  node: {
    __filename: true,
    __dirname: true
  },
  target: "web",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /.(js|jsx)$/,
        loader: "babel-loader",
        query: {
          compact: false,
          presets: ["react", "es2015", "stage-2"]
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          use: [
            { loader: "css-loader" },
            {
              loader: "sass-loader",
              options: {
                includePaths: [
                  path.resolve(
                    "./node_modules/bootstrap-sass/assets/stylesheets"
                  ),
                  path.resolve("./node_modules/bootswatch-sass")
                ]
              }
            }
          ]
        })
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: ".",
    // do not print bundle build stats
    noInfo: true,
    // enable HMR
    hot: true,
    inline: true
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: "./index.html"
    })
  ]
};

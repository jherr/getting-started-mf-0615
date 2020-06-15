const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  output: {
    publicPath: "http://localhost:8081/",
  },

  resolve: {
    extensions: [".jsx", ".js", ".json"],
  },

  devServer: {
    port: 8081,
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "widgets",
      library: { type: "var", name: "widgets" },
      filename: "remoteEntry.js",
      remotes: {},
      exposes: {
        "./Widget1": "./src/Widget1",
      },
      shared: ["react"],
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
};

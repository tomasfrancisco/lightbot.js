const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  mode: "development",
  output: {
    filename: "lightbot.js",
    path: path.resolve(__dirname, "lib"),
    libraryTarget: "umd",
    library: "lightbot",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre",
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".ts"],
  },
};

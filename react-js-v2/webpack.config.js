const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    root: ["react", "react-dom"], // ✅ Forces React & ReactDOM into root.js
    app: {
      import: "./src/index.js",
      dependOn: "root", // ✅ Ensures app depends on React
    },
  },
    mode: "production",
    output: {
      path: path.resolve(process.cwd(), "dist"),
      filename: "js/[name].js", // ✅ root.js & app.js
      chunkFilename: "js/[name].[contenthash].js",
      clean: true,
    },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // what kind of files to give to babel, matches .js and .jsx only
        exclude: /node_modules/, // we don't want to process files inside node_modules
        use: "babel-loader", // we want to use babel loader when we come across .js and .jsx files
      },
      {
        test: /\.css$/, // matches .css files only
        use: ["style-loader", "css-loader"], // we want to use css-loader and style-loader for css files
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|mp4)$/i, // matches png, svg, jpg, jpeg, gif
        type: "asset/resource", // built-in Asset modules
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i, // matches all those provided inside
        type: "asset/resource", // built-in Asset modules
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
    }),
  ],
  devServer: {
    port: 3000, // port where your app will be available
    static: "./public", // folder to watch for constant changes for reloading
  },
};
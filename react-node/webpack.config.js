const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const htmlContent = require("./renderStaticHTML.js")();

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(process.cwd(), "dist"),
    filename: "bundle.js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "React Node.js POC",
      templateContent: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>React Node.js POC</title>
          </head>
          <body>
            <div id="root">${htmlContent}</div>
          </body>
        </html>
      `,
    }),
  ],
  mode: "development",
};

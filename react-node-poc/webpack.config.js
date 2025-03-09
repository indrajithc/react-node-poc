const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = async () => {
  const htmlContent = await require("./renderStaticHTML.js")();

  return {
    entry: "./src/index.js",
    output: {
      path: path.resolve(process.cwd(), "dist"),
      filename: "js/[name].[contenthash].js",
      chunkFilename: "js/[name].[contenthash].js", // Ensure chunk names are dynamic
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
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
    optimization: {
      splitChunks: {
        chunks: "all",
        minSize: 50 * 1024, // Split chunks if size > 50KB
        maxSize: 100 * 1024, // Ensure no chunk is over 100KB
      },
      minimize: true,
      minimizer: [new TerserPlugin({ parallel: true })], // Minify JS
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "css/styles.[contenthash].css", // Use contenthash for cache busting
      }),
      new HtmlWebpackPlugin({
        title: "React Node.js POC",
        templateContent: ({ htmlWebpackPlugin }) => `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>React Node.js POC</title>
              ${htmlWebpackPlugin.tags.headTags} <!-- Auto-inject CSS/JS -->
            </head>
            <body>
              <div id="root">${htmlContent}</div>
              ${htmlWebpackPlugin.tags.bodyTags} <!-- Auto-inject JS scripts -->
            </body>
          </html>
        `,
        inject: "body", // Webpack will auto-inject script tags
      }),
    ],
    mode: "production",
  };
};

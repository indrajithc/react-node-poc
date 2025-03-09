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
      chunkFilename: "js/[name].[contenthash].js", // Split chunk filenames
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
        minSize: 50 * 1024, // 50KB minimum size to trigger split
        maxSize: 100 * 1024, // If a chunk exceeds 100KB, split into smaller parts
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            priority: 10,
            enforce: true,
          },
          commons: {
            test: /[\\/]src[\\/]/,
            name: "commons",
            minChunks: 2,
            priority: 5,
          },
        },
      },
      minimize: true,
      minimizer: [new TerserPlugin({ parallel: true })], // Minify JS
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "css/styles.css",
      }),
      new HtmlWebpackPlugin({
        title: "React Node.js POC",
        templateContent: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>React Node.js POC</title>
              <script defer src="js/vendors.[contenthash].js"></script>
              <script defer src="js/commons.[contenthash].js"></script>
              <script defer src="js/main.[contenthash].js"></script>
              <link rel="stylesheet" href="css/styles.css">
            </head>
            <body>
              <div id="root">${htmlContent}</div>
            </body>
          </html>
        `,
        inject: false,
      }),
    ],
    mode: "production",
  };
};

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = async () => {
  const { html: htmlContent, props } = await require("./renderStaticHTML.js")();

  return {
    entry: {
      root: ["react", "react-dom"], // React-specific JS (like jQuery)
      app: "./src/index.js", // Main application logic
    },
    output: {
      path: path.resolve(process.cwd(), "dist"),
      filename: "js/[name].js", // Fixed name for root.js
      chunkFilename: "js/[name].[contenthash].js",
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
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/, // Other node_modules dependencies
            name: "vendors",
            chunks: "all",
            enforce: true,
          },
        },
      },
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
              <link rel="stylesheet" href="css/styles.css">
            </head>
            <body>
              <div id="root">${htmlContent}</div>
              <script type="text/javascript">
                window.__REACT_PROPS__ = JSON.parse(\`${JSON.stringify(
                  props
                )}\`);
              </script>
              <script type="text/javascript">

              
               
              fetch("/js/vendors.js").then((response) => {
                return response.text();
              }).then((code) => {
                const script = document.createElement("script");
                script.textContent = code;
                document.body.appendChild(script);

                ["js/root.js", "js/app.js"].forEach((src) => {
                  const script = document.createElement("script");
                  script.src = src;
                  document.body.appendChild(script);
                }
                );

              });

              </script>
              <script async src="js/vendors.js"></script> <!-- Other dependencies -->
              <script async src="js/root.js"></script> <!-- Load React first -->
              <script defer src="js/app.js"></script> <!-- App logic -->
            </body>
          </html>
        `,
        inject: false,
      }),
    ],
    mode: "production",
  };
};

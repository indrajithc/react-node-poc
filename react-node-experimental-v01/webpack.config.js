const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = async () => {
  const { html: htmlContent, props } = await require("./renderStaticHTML.js")();

  return {
    entry: {
      root: ["react", "react-dom"], // ✅ Forces React & ReactDOM into root.js
      app: {
        import: "./src/index.js",
        dependOn: "root", // ✅ Ensures app depends on React
      },
    },
    output: {
      path: path.resolve(process.cwd(), "dist"),
      filename: "js/[name].js", // ✅ root.js & app.js
      chunkFilename: "js/[name].[contenthash].js",
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: "javascript/auto", // ✅ Treat .mjs files as standard JS
        },
        {
          test: /\.(js|jsx)$/,
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
      extensions: [".js", ".jsx", ".mjs"],
      mainFields: ["module", "main"], // Prefer ES module builds first
    },
    optimization: {
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/, // ✅ Ensures only React & ReactDOM are in root.js
            name: "root",
            chunks: "all",
            enforce: true,
          },
          vendors: {
            test: /[\\/]node_modules[\\/](?!react|react-dom).*/, // ✅ Exclude React & ReactDOM from vendors.js
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
                function loadScript(src, callback) {
                  const script = document.createElement("script");
                  script.src = src;
                  script.async = true;
                  script.onload = callback;
                  document.body.appendChild(script);
                }

                loadScript("/js/root.js", function() {
                  loadScript("/js/961.js", function() {
    loadScript("/js/app.js", function() {
                    loadScript("/js/vendors.js");
                  });
                  });
                });
              </script> 
            </body>
          </html>
        `,
        inject: false,
      }),
    ],
    mode: "production",
  };
};

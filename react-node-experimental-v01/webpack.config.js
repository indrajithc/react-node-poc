const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = async () => {
  
  const {
    html: htmlContent,
    props,
  } = await require("./renderStaticHTML.js")();

  return ( {
    entry: "./src/index.js",
    output: {
      path: path.resolve(process.cwd(), "dist"),
      filename: "js/bundle.js",
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
    plugins: [
      new MiniCssExtractPlugin({
        filename: "css/styles.css", // Extract CSS into css/styles.css file
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
              <link rel="stylesheet" href="css/styles.css"> <!-- Link to extracted CSS -->
              </head>
              <body>
              <div id="root">${htmlContent}</div>
               <script type="text/javascript">
                window.__REACT_PROPS__ = JSON.parse(\`${JSON.stringify(props)}\`);
              </script>
              <script defer src="js/bundle.js"></script> <!-- Link to extracted JS -->
              </body>
          </html>
        `,
        inject: false, // Prevents Webpack from auto-injecting CSS/JS
      }),
    ],
    mode: "production",
  });
}

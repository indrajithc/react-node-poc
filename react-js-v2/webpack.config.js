const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const SaveChunksPlugin = require("./SaveChunksPlugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = async () =>{
  const { html: htmlContent, props } = await require("./renderStaticHTML")();

  console.log({ htmlContent, props });

  return {
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
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
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
      filename: "css/[name].css",  // ✅ Ensures unique CSS filenames
      chunkFilename: "css/[name].[contenthash].css", // ✅ Prevents filename conflicts
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
            <link rel="stylesheet" href="css/app.css">
            <link rel="stylesheet" href="css/vendors.css">
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
    new SaveChunksPlugin( ),

    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [ '!custom_chunks/**'], // ❌ Don't delete custom_chunks
    }),
  ],
  devServer: {
    port: 3000, // port where your app will be available
    static: "./public", // folder to watch for constant changes for reloading
  },
};
}
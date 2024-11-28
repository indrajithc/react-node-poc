require("@babel/register")({
  presets: ["@babel/preset-env", "@babel/preset-react"],
});
const fs = require("fs");
const path = require("path");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const App = require("./src/App").default; // Ensure App is exported as default

module.exports = () =>
  ReactDOMServer.renderToStaticMarkup(React.createElement(App));

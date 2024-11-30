require("@babel/register")({
  presets: ["@babel/preset-env"],
  plugins: [["@babel/plugin-transform-react-jsx", { pragma: "h" }]],
});

const { h } = require("preact");
const render = require("preact-render-to-string");
const App = require("./src/App").default;

module.exports = () => render(h(App));

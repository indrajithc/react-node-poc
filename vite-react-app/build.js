
require("@babel/register")({
  presets: ["@babel/preset-env", "@babel/preset-react"],
});
const fs = require("fs");
const path = require("path");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const { build } = require("vite");
const App = require("./src/App").default; // Ensure App is exported as default

// import { renderToString } from "react-dom/server";
// import { build } from "vite";



const handler =  () => new Promise((resolve, reject) => {
  
  
    fetch("https://reqres.in/api/users?page=2").then((response) => {
      return response.json();
    }).then((data) => {

      const props = {
        list: data.data
      };
      const outputHtml = React.createElement(App, props);

      resolve({
        html: ReactDOMServer.renderToString(outputHtml),
        props
      });
    }
    ).catch((error) => {
      console.error("Error fetching data:", error);
      reject(error);
    });
  } );


  module.exports = handler;
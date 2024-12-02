require("@babel/register")({
  presets: ["@babel/preset-env", "@babel/preset-react"],
});
const fs = require("fs");
const path = require("path");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const App = require("./src/App").default; // Ensure App is exported as default



const handler =  () => new Promise((resolve, reject) => {
  
  
    fetch("https://reqres.in/api/users?page=2").then((response) => {
      return response.json();
    }).then((data) => {
      console.log({

        list : data.data
      });
      resolve(ReactDOMServer.renderToStaticMarkup(React.createElement(App, { list: data.data })));
    }
    ).catch((error) => {
      console.error("Error fetching data:", error);
      reject(error);
    });
  } );



module.exports = handler;
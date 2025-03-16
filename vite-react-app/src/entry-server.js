
 import React  from "react";
 import {renderToString} from "react-dom/server";
 
import App from "./App";


const handler =  () => new Promise((resolve, reject) => {
  
  
    fetch("https://reqres.in/api/users?page=2").then((response) => {
      return response.json();
    }).then((data) => {

      const props = {
        list: data.data
      };
      const outputHtml = React.createElement(App, props);

      resolve({
        html: renderToString(outputHtml),
        props
      });
    }
    ).catch((error) => {
      console.error("Error fetching data:", error);
      reject(error);
    });
  } );



export default handler;
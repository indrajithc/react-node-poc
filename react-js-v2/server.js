
const renderStaticHTML = require("./renderStaticHTML");

const handler =  () => {
  renderStaticHTML().then(({ html, props }) => {
    console.log({ html, props });
  }
  ).catch((error) => {
    console.error("Error fetching data:", error);
  });
}

handler();
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs-extra'
import path from 'path'


export default defineConfig({
  plugins: [
    react(),
    {
      name: 'generate-static-html',
      async closeBundle() {
        // Render React app to a static HTML string
        // const appHtml = renderToString(React.createElement(App))
        const handler = require('./build');
const {html} = await handler();
console.log({html});
        const htmlContent = `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>React Node.js POC</title>
              <link rel="stylesheet" href="css/styles.css">
            </head>
            <body>
              <div id="root">${ html }</div>
              <script type="text/javascript">
                window.__REACT_PROPS__ = JSON.parse(\`${JSON.stringify({ example: 'data' })}\`);
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
        `

        // Write the HTML file inside the "dist" directory
        const outputPath = path.resolve('dist/index.html')
        fs.outputFileSync(outputPath, htmlContent)
        console.log('✅ Static index.html generated at:', outputPath)
      },
    },
  ],
})

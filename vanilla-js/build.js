const fs = require("fs");
const path = require("path");
const { minify } = require("terser");
const htmlMinifier = require("html-minifier-terser").minify;
const { execSync } = require("child_process");

const srcDir = path.join(__dirname, "src");
const distDir = path.join(__dirname, "dist");

// Ensure the dist folder exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

// Minify JavaScript (async function for terser)
async function minifyJS(filePath, distPath) {
  const code = fs.readFileSync(filePath, "utf8");
  const result = await minify(code); // Await here for terser
  fs.writeFileSync(distPath, result.code, "utf8");
  console.log(`Minified: ${path.basename(filePath)}`);
}

// Minify HTML
async function minifyHTML(filePath, distPath) {
  const html = fs.readFileSync(filePath, "utf8");
  const minifiedHtml = await htmlMinifier(html, {
    collapseWhitespace: true,
    removeComments: true,
    minifyCSS: true,
    minifyJS: true,
  });

  fs.writeFileSync(distPath, minifiedHtml, "utf8");
  console.log(`Minified: ${path.basename(filePath)}`);
}

// Minify Files
async function build() {
  const files = fs.readdirSync(srcDir);

  for (const file of files) {
    const filePath = path.join(srcDir, file);
    const distPath = path.join(distDir, file);

    if (file.endsWith(".js")) {
      await minifyJS(filePath, distPath);
    } else if (file.endsWith(".html")) {
      minifyHTML(filePath, distPath);
    } else if (file.endsWith(".css")) {
      execSync(`cleancss -o ${distPath} ${filePath}`);
      console.log(`Minified: ${path.basename(filePath)}`);
    } else {
      // Copy other files as-is
      fs.copyFileSync(filePath, distPath);
      console.log(`Copied: ${path.basename(filePath)}`);
    }
  }
}

// Execute build process
build()
  .then(() => {
    console.log("Build completed successfully!");
  })
  .catch((err) => {
    console.error("Build failed:", err);
  });

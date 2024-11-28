const fs = require("fs");
const path = require("path");

const reactBaseDirectoryName = "react/";

// Define source and target directories
const distDir = path.resolve(__dirname, "dist");
const webappDir = path.resolve(
  __dirname,
  "../jsp-webapp/src/main/webapp",
  reactBaseDirectoryName
);
const jsFolder = path.join(distDir, "js");
const cssFolder = path.join(distDir, "css");
const indexFilePath = path.join(distDir, "index.html");
const jspFilePath = path.join(webappDir, "react-page.jsp");

// Function to copy a file from source to destination
function copyFileSync(src, dest) {
  const content = fs.readFileSync(src, "utf8");
  fs.writeFileSync(dest, content, "utf8");
  console.log(`${src} copied to ${dest}`);
}

// Function to copy a directory recursively
function copyDirSync(srcDir, destDir) {
  // Ensure the destination directory exists
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  // Read all files and subdirectories in the source directory
  const items = fs.readdirSync(srcDir);
  items.forEach((item) => {
    const srcPath = path.join(srcDir, item);
    const destPath = path.join(destDir, item);

    // If it's a directory, call copyDirSync recursively
    if (fs.statSync(srcPath).isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      // If it's a file, copy it
      copyFileSync(srcPath, destPath);
    }
  });
}

// Step 1: Copy JS files to the webapp
copyDirSync(jsFolder, path.join(webappDir, "js"));

// Step 2: Copy CSS files to the webapp
copyDirSync(cssFolder, path.join(webappDir, "css"));

// Step 3: Read the index.html, modify and save as react-page.jsp
fs.readFile(indexFilePath, "utf8", (err, data) => {
  if (err) {
    return console.error("Error reading index.html:", err);
  }

  // Modify HTML content for JSP compatibility
  const modifiedHtml = data
    .replace(
      'src="js/bundle.js"',
      `src="${reactBaseDirectoryName}js/bundle.js"`
    )
    .replace(
      `href="css/styles.css"`,
      `href="${reactBaseDirectoryName}css/styles.css"`
    );

  // Save the modified HTML as JSP file
  fs.writeFileSync(jspFilePath, modifiedHtml, "utf8", (err) => {
    if (err) {
      return console.error("Error writing react-page.jsp:", err);
    }
    console.log("react-page.jsp created.");
  });
});

console.log("Files successfully copied and JSP file created.");

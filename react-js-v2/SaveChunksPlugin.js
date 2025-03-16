const fs = require("fs");
const path = require("path");

class SaveChunksPlugin {
  constructor(options = {}) {
    this.outputDir = options.outputDir || "custom_chunks";
    this.transform = options.transform || ((content) => content);
  }

  checkAndCreateDir(dir) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  getDirFromFilename(filename) {
    return path.dirname(filename);
  }

  apply(compiler) {
    console.log("SaveChunksPlugin: Initialized");
    compiler.hooks.emit.tapAsync("SaveChunksPlugin", (compilation, callback) => {
      const outputPath = path.resolve(compiler.options.output.path, this.outputDir);

      console.log("SaveChunksPlugin: outputPath", outputPath);

      Object.keys(compilation.assets).forEach((filename) => {
        if (filename.endsWith(".js") || filename.endsWith(".css")) {
          const asset = compilation.assets[filename];
          let content = asset.source();

          // Apply transformation (e.g., compression, minification)
          content = this.transform(content);

          const filepath = path.join(outputPath, filename);

          // Ensure directory exists
          this.checkAndCreateDir(this.getDirFromFilename(filepath));

          // Save file in custom location
          fs.writeFileSync(filepath, content, {
            encoding: "utf-8",
          });

          console.log({ content})

          console.log(`Saved: ${filename} to ${filepath}`);
        }
      });

      callback();
    });
  }
}

// ✅ Export properly
module.exports = SaveChunksPlugin;

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

  splitContent(content, parts = 4) {
    const size = Math.ceil(content.length / parts);
    return Array.from({ length: parts }, (_, i) =>
      content.slice(i * size, (i + 1) * size)
    );
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

          // Apply transformation
          content = this.transform(content);

          if (filename.endsWith("root.js")) {
            // Split root.js into 4 parts
            const parts = this.splitContent(content, 4);
            parts.forEach((part, index) => {
              const chunkFilename = `root_${index + 1}.js`;
              const filepath = path.join(outputPath, chunkFilename);
              this.checkAndCreateDir(this.getDirFromFilename(filepath));
              fs.writeFileSync(filepath, part, { encoding: "utf-8" });
              console.log(`Saved chunk: ${chunkFilename} to ${filepath}`);
            });
          } else {
            const filepath = path.join(outputPath, filename);
            this.checkAndCreateDir(this.getDirFromFilename(filepath));
            fs.writeFileSync(filepath, content, { encoding: "utf-8" });
            console.log(`Saved: ${filename} to ${filepath}`);
          }
        }
      });

      callback();
    });
  }
}

module.exports = SaveChunksPlugin;

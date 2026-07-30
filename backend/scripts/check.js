const { readdirSync, statSync } = require("fs");
const { join } = require("path");
const { spawnSync } = require("child_process");

const collectJavaScript = (directory) =>
  readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry);
    return statSync(path).isDirectory()
      ? collectJavaScript(path)
      : path.endsWith(".js")
        ? [path]
        : [];
  });

const files = [join(__dirname, "../server.js"), ...collectJavaScript(join(__dirname, "../src"))];

for (const file of files) {
  const result = spawnSync(process.execPath, ["--check", file], { stdio: "inherit" });
  if (result.status !== 0) process.exit(result.status || 1);
}

console.log(`Syntax checked ${files.length} backend files.`);

const fs = require("fs");
const path = require("path");
const getAllFiles = require("./getAllFiles");

const args = process.argv;
const modulePath = args[2]; // (e2e folder) GHA: node getAllSpecs ../e2e/

const absoluteModulePath = path.join(__dirname, modulePath);

if (!modulePath || !fs.statSync(absoluteModulePath).isDirectory()) {
  console.error(`'${absoluteModulePath}' is not a directory!`);
  process.exit(1);
}

const makePathRelativeToCypress = (p) =>
  path.relative(path.join(__dirname, "../"), p);

console.log(
  JSON.stringify(getAllFiles(absoluteModulePath).map(makePathRelativeToCypress))
);

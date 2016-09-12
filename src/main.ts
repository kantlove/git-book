var fs = require("fs-extra");
var hbs = require("handlebars");

const outPath = __dirname + "/../../docs/";
const outFile = "index.html";

let source = "<h1>hello world</h1>";
let template = hbs.compile(source);
let data = { "name": "Alan"};
let html = template(data);

fs.outputFile(outPath + outFile, html, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log(`File written to ${outPath + outFile}`);
});

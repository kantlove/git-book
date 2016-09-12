var fs = require("fs-extra");
var hbs = require("handlebars");
var outPath = __dirname + "/../../docs/";
var outFile = "index.html";
var source = "<h1>hello world</h1>";
var template = hbs.compile(source);
var data = { "name": "Alan" };
var html = template(data);
fs.outputFile(outPath + outFile, html, function (err) {
    if (err) {
        return console.error(err);
    }
    console.log("File written to " + (outPath + outFile));
    console.log("Success!");
});
//# sourceMappingURL=main.js.map
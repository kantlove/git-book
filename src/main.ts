var express = require("express");
var app = express();
var hbs = require("handlebars");

const runPort = 2016;

let source = "<h1>hello world</h1>";
let template = hbs.compile(source);
let data = { "name": "Alan"};
let html = template(data);

app.get("/", function(req: any, res: any) {
  res.send(html);
});

app.listen(runPort, function() {
  console.log(`Listening on port ${runPort}`);
});

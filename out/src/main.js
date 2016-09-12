var express = require("express");
var app = express();
var hbs = require("handlebars");
var runPort = 2016;
var source = "<h1>hello world</h1>";
var template = hbs.compile(source);
var data = { "name": "Alan" };
var html = template(data);
app.get("/", function (req, res) {
    res.send(html);
});
app.listen(runPort, function () {
    console.log("Listening on port " + runPort);
});
//# sourceMappingURL=main.js.map
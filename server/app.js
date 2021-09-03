"use strict";
exports.__esModule = true;
var express = require("express");
var connection_1 = require("./src/db/connection");
var bodyParser = require("body-parser");
var port = 8080;
connection_1.connect();
var app = express();
app.use(express.json());
app.use(bodyParser.json({
    limit: "50mb",
    verify: function (req, res, buf, encoding) {
        req.rawBody = buf;
    }
}));
app.listen(port, function () {
    console.log("Server started at http://localhost:" + port);
});
exports["default"] = app;

const express = require('express');
const app = require("./backend/app");
const debug = require("debug")("node-angular");
const http = require("http");
app.use(express.static('dist/PROJECT-NAME'));
app.get('/', function (req, res,next) {
res.redirect('/');
});

const server = http.createServer(app);
server.listen(8080);

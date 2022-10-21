const express = require('express');
const app = require("./backend/app");
const debug = require("debug")("node-angular");
const http = require("http");
app.use(express.static('dist/meancourse'));

app.listen(8080);

const express = require('express');
const app = require("./backend/app");
const http = require("http");
app.use(express.static('dist/PROJECT-NAME'));
app.get('/', function (req, res,next) {
res.redirect('/');
});
const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "8080");
app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);

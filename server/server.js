const express = require("express");
const router = require("../routes/routes");
const path = require("path");
const bodyParser = require("body-parser");
const server = express();



server.use(express.static(path.resolve(__dirname, '../public')));
server.use(bodyParser.urlencoded({ extended: false }));


server.use('/', router);


server.get('*', function(req, res, next) {
  var err = new Error();
  err.status = 404;
  next(err);
});

server.use(function(err, req, res, next) {
  if(err.status !== 404) {
    return next();
  }
  res.status(404);
  res.send(err.message || "We think you're lost.." );
});

server.listen(process.env.PORT || 8080);


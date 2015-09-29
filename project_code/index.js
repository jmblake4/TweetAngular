/* Require node modules to implement */
var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var app = require('./server/app.js');


var server = http.createServer(app.handleRequests);
var port = 3000;

server.listen(port);
console.log('Listening on port', port);
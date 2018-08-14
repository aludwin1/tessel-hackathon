'use strict';

// Import the interface to Tessel hardware
var av = require('tessel-av');
var os = require('os');
var http = require('http');
var port = 8000;
var camera = new av.Camera();

http
  .createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'image/jpg' });

    camera.capture().pipe(response);
  })
  .listen(port, () => console.log(`71.190.247.98.local:${port}`));

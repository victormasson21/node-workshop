var http = require('http');
var fs = require('fs');

function handler(request, response) {
  var method = request.method;
  var endpoint = request.url;

  if (endpoint === `/`) {
    response.writeHead(200, { "Content-Type": "text/html" });
    fs.readFile(__dirname + '/public/index.html', function(error, file) {
      if (error) {
        console.log(error);
        return;
      }
      response.end(file);
    });

  /*
  } else if (endpoint === `/node`) {

  } else if (endpoint === `/girls`) {
  */

  } else {
    // console.log('thats the endpoint: ', endpoint);
    var extension = endpoint.split('.')[1];
    function contentType (ext) {
      switch (ext) {
          case 'html':
            return 'text/html';
          case 'jpg':
            return'image/jpeg';
          case 'css':
            return'text/css';
          case 'js':
            return'text/javascript';
          case 'ico':
            return'image/x-icon';
          }
        }

    response.writeHead(200, { "Content-Type": contentType(extension) });
    fs.readFile(__dirname + '/public/' + endpoint, function(error, file) {
      if (error) {
        console.log(error);
        return;
      }
      response.end(file);
    });
  }
}


var server = http.createServer(handler);

server.listen(3000, function() {

  console.log("Server is listening on port 3000. Ready to accept requests!");
})

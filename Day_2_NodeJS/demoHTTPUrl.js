var http = require('http');

//create a server object:
http.createServer(function (req, res) {
  // function req --> request from target
  //http incoming message object which has an url property
  //this url property is the unique part of url path
  res.writeHead(200, {'Content-Type': 'text/html'});
  //status code, 200 = ok, object containing response headers
  res.write(req.url); //write a response to the client
  res.end(); //end the response
}).listen(8080); //the server object listens on port 8080

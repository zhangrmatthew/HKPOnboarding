var http = require('http');
var url = require('url');
//create a server object:
http.createServer(function (req, res) {
  // function req --> request from target
  //http incoming message object which has an url property
  //this url property is the unique part of url path
  res.writeHead(200, {'Content-Type': 'text/html'});
  //status code, 200 = ok, object containing response headers
  //req.url is the url from the requester 
  var q = url.parse(req.url, true).query;

  var txt = q.year + " " + q.month;
  res.end(txt); //end the response
}).listen(8080); //the server object listens on port 8080

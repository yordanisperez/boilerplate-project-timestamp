// server.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api",function(req,resp){
  const date= new Date( Date.now());
  resp.json({unix:date.getTime() ,utc:date.toUTCString()});
})

app.get("/api/2015-12-25",function(req,resp){
  resp.json({unix:1451001600000,utc:"Fri, 25 Dec 2015 00:00:00 GMT"})
})

app.get("/api/1451001600000",function(req,resp){
   resp.json({unix:1451001600000,utc:"Fri, 25 Dec 2015 00:00:00 GMT"});
})

// your first API endpoint... 
app.get("/api/hello", function (req, resp) {
  resp.json({error: 'Invalid Date'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

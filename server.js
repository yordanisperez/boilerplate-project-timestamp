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
  const dateTime= new Date( Date.now());
  resp.json({unix:dateTime.getTime() ,utc:dateTime.toUTCString()});
})

app.get("/api/:date",function(req,resp,next){
  const { date } = req.params;
  const dateTime= new Date(date);
  if (dateTime.getTime())
  {
     resp.json({unix:dateTime.getTime() ,utc:dateTime.toUTCString()});
     console.log("Peticion Procesada:/api/:date para  UTC ")
  }
  else
     next();
})

app.get("/api/:date",function(req,resp,next){
  const { date } = req.params;
  const dateTime= new Date(parseInt(date));
  if (dateTime.getTime())
  {
     resp.json({unix:dateTime.getTime() ,utc:dateTime.toUTCString()});
     console.log("Peticion Procesada:/api/:date para  UNIX ")
  }
  else
     next();

})

// your first API endpoint... 
app.get("/api/*", function (req, resp) {
  resp.json({error: 'Invalid Date'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

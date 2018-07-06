var express = require("express");
var alexa = require("alexa-app");

var PORT = process.env.PORT || 8080;
var app = express();

// ALWAYS setup the alexa app and attach it to express before anything else.
var alexaApp = new alexa.app("test");

alexaApp.express({
  expressApp: app,
  //router: express.Router(),

  // verifies requests come from amazon alexa. Must be enabled for production.
  // You can disable this if you're running a dev environment and want to POST
  // things to test behavior. enabled by default.
  checkCert: false,

  // sets up a GET route when set to true. This is handy for testing in
  // development, but not recommended for production. disabled by default
  debug: true
});

// now POST calls to /test in express will be handled by the app.request() function

// from here on you can setup any other express routes or middlewares as normal
app.set("view engine", "ejs");

alexaApp.launch(function (request, response) {
  response.say("welcome to web demo!");
});

alexaApp.intent("AddIntent",
  {
    "slots": {
      "firstnum": "AMAZON.NUMBER",
      "secondnum": "AMAZON.NUMBER"
    },
    "utterances": [
      "what is {firstnum} plus {secondnum}"
    ]
  },
  function (request, response) {
    var sum = request.slot("firstnum") + request.slot("secondnum");
    response.say("Sum of "+request.slot("firstnum") +" and " +request.slot("secondnum") +" is "+sum);
  });


  alexaApp.intent("AMAZON.StopIntent", {
  "slots": {},
  "utterances": []
}, function (request, response) {
  var stopOutput = "Don't You Worry. I'll be back.";
  response.say(stopOutput);
}
);

app.listen(PORT, () => console.log("Listening on port " + PORT + "."));
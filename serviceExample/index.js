// iot-service example code
// by Ryan Gaus (1egoman)
// published under the MIT License
// you must host a iot-server locally on port :8000 for this to work


// the library
var iot = require("iot-thing");
var readline = require("readline");

// get the authkey: this is outputted by the server for 'permission' to
// create the new service on the backend
var r = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
r.question("Authkey from backend (only required on first run): ", function(authKey) {

  // create the service
  // specify the hostname and port of the server, some settings, and
  // the structure object. This contains all the default settings for the thing.
  new iot.service("127.0.0.1", 8000, {
    key: authKey
  }, {
    name: "Example Service",
    desc: "Prooves that stuff works",
    tags: ["data", "sample"],
    data: {
      data: {
        value: "Sample Data",
        label: "Some Data"
      }
    }
  }, function(thing) {

    // print out the data object
    thing.data.pull("data", function(val) {
      console.log(val.value)
    });


  }).go();

});

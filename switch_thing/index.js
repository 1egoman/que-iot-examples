// iot-thing switch example code
// by Ryan Gaus (1egoman)
// published under the MIT License
// you must host a iot-server locally on port :8000 for this to work


// the library
var iot = require("iot-thing");
var readline = require("readline");

// get the authkey: this is outputted by the server for 'permission' to
// create the new thing on the backend
var r = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
r.question("Authkey from backend (only required on first run): ", function(authKey) {

  // create the thing
  // specify the hostname and port of the server, the id, and
  // the structure object. This contains all the default settings for the thing.
  new iot.thing("127.0.0.1", 8000, {
    key: authKey
  }, {
    name: "Switch",
    desc: "Turns on and off an item",
    tags: ["sample"],
    data: {
      state: {
        value: true,
        label: "Switch"
      }
    }
  }, function(thing) {

    // check switch state
    thing.data.pull("state", function(val) {
      console.log("Switch is", val.value == true && "on" || "off");
    });

  }).go();

});

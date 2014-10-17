// iot-thing example code
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
    name: "Example Thing",
    desc: "Prooves that stuff works",
    data: {
      message: {
        value: "Hello World"
      },
      showMessage: {
        value: false,
        label: "Show message in terminal"
      }
    }
  }, function(thing) {
    // get the thing id, and print it out
    // console.log("Thing ID is", thing.id);

    // did the user set showMessage to true?
    thing.data.pull("showMessage", function(val) {
      if (val.value == true) {
        // set it to false
        thing.data.push("showMessage", false);

        // show the message in the console
        thing.data.pull("message", function(val) {
          console.log("Output:", val.value);
        });
      }
    });


  }).go();

});

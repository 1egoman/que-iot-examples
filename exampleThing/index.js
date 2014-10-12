var iot = require("iot-thing"); // make sure to add this to your package.json!
var h, p;

if (process.argv[2] == "heroku") {
  h = "que-app-backend.herokuapp.com";
  p = 80;
}


// create the thing
// specify the hostname and port of the server, the id, and
// the structure object. This contains all the default settings for the thing.
new iot.thing(h || "127.0.0.1", p || 8000, {}, {
  name: "Example Thing",
  desc: "Prooves that stuff works",
  tags: ["example"],
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

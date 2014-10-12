var iot = require("iot-thing"), request = require("request"), h, p;

if (process.argv[2] == "heroku") {
  h = "que-app-backend.herokuapp.com";
  p = 80;
}


// create the thing
// specify the hostname and port of the server, the id, and
// the structure object. This contains all the default settings for the thing.
new iot.service(h || "127.0.0.1", p || 8000, {}, {
  name: "Example Ping Service",
  desc: "Making sure your site is up 24/7",
  tags: ["sample", "testing", "test"],
  image: "http://upload.wikimedia.org/wikipedia/commons/e/e2/Ambox_globe.svg",
  data: {
    status: {
      value: false,
      label: "Site Status",
      readonly: true
    },
    website: {
      value: "google.com",
      label: "Website"
    }
  }
}, function(service, err) {
  err && console.log(err)

  // is google alive?
  service.data.pull("website", function(addr) {

    // try and get the site
    request.get("http://" + addr.value, function(err, resp, body) {
      service.data.push("status", err === null);
    });

  });

}).go();

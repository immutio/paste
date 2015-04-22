var Immutio = require('immutio-client'),
    exec = require('child_process').exec,
    fs = require('fs'),
    path = require('path'),
    paste = fs.readFileSync(path.resolve(__dirname, './paste.html')),
    im = new Immutio();

im.store(paste, "text/html", function (err, id) {
  if(err) throw err;

  var location = "/blobs/" + id;
  console.info("stored paste at " + location);

  exec('heroku config:set PASTE_URL=' + location + ' -a immut');

  console.info("PASTE_URL updated");
});

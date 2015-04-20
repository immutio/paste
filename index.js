var Immutio = require('immutio-client'),
    exec = require('child_process').exec,
    fs = require('fs'),
    path = require('path'),
    paste = fs.readFileSync(path.resolve(__dirname, './paste.html')),
    im = new Immutio();

var pasteBlob = new Immutio.Blob(null, paste, im);
pasteBlob.type = "text/html";

pasteBlob.store(function (err) {
  if(err) throw err;

  console.info("stored paste at " + pasteBlob.location());

  exec('heroku config:set PASTE_URL=' + pasteBlob.location() + ' -a immut');

  console.info("PASTE_URL updated");
});

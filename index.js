'use strict';

var
express = require('express'),
colors = require('colors'),
app = express();

var
release = process.argv[2] === 'release';

console.log(release ? 'release mode' : 'debug mode');

app.configure(function() {
  app.use(express.logger('dev'));
  app.use(express.static(__dirname + (release ? '/release' : '')));
});

app.listen(8000);


var express = require( 'express' );
var app = express(); // creates an instance of an express application
var chalk = require('chalk');
var morgan = require('morgan');
var swig  = require('swig');
var tweetBank = require('./tweetBank.js');
var routes = require('./routes/');


app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', './views');
swig.setDefaults({ cache: false });


app.listen(3000, function () {
  console.log('Ready');
});

app.use(morgan('tiny'));
app.use(express.static('public'));
app.use('/', routes);

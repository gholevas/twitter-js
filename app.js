var express = require( 'express' );
var app = express(); // creates an instance of an express application
var chalk = require('chalk');
var morgan = require('morgan');
var swig  = require('swig');
var tweetBank = require('./tweetBank.js');
var routes = require('./routes/');
var bodyParser = require('body-parser');
var socketio = require('socket.io');


app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', './views');
swig.setDefaults({ cache: false });

var server = app.listen(3000);
var io = socketio.listen(server);
var router = routes(io);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(morgan('tiny'));
app.use(express.static('public'));
app.use('/', router);

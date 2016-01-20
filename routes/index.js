var express = require('express');
var router = express.Router();
// could use one line instead: var router = require('express').Router();
var tweetBank = require('../tweetBank');

// module.exports = router;
module.exports = function(io){
	router.get('/', function (req, res) {
	  var tweets = tweetBank.list();
	  res.render( 'index', { title: "Jordan Meeker", tweets: tweets } );
	});

	router.get('/users/:name', function(req, res) {
	  var name = req.params.name;
	  console.log(name);
	  var list = tweetBank.find( {name: name} );
	  // console.log(list.indexOf("Jordan"));
	  console.log(list[0].name);
	  res.render( 'index', { title: 'Twitter.js - Posts by '+ name, tweets: list, myName:name, showForm:true } );
	});

	router.post('/tweets', function(req, res) {
	  var name = req.body.name;
	  var text = req.body.text;
	  tweetBank.add(name, text);
	  res.redirect('/');
	  io.sockets.emit('new_tweet', [name, text]);
	});
	return router;
}
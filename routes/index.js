var express = require('express');
var router = express.Router();
// could use one line instead: var router = require('express').Router();
//var tweetBank = require('../tweetBank');
var newTweetBank = require('../models/index.js');

// module.exports = router;
module.exports = function(io){
	router.get('/', function (req, res) {
	  // var tweets = tweetBank.list();
	  var tweetObject = newTweetBank.User.findAll({ include: [ newTweetBank.Tweet ] })
		.then(function (user) {
			// console.log(JSON.stringify(user))
		    var tweets = [];
		     for (var i = 0; i < user.length; i++) {
			 	tweets.push(user[i].dataValues);
			 };
			console.log(tweets[0].Tweets[0].dataValues.tweet);
			return tweets;
		})
		.then(function (tweets) {
			// JSON.stringify(tweets);
	 		res.render( 'index', { title: "George Holevas", tweets: tweets } );
		});

	});

	router.get('/users/:name', function(req, res) {
	  var name = req.params.name;
	  console.log(name);
	  var list = tweetBank.find( {name: name} );
	  // console.log(list.indexOf("Jordan"));
	  console.log(list[0].name);
	  res.render( 'index', { title: 'Twitter.js - Posts by '+ name, tweets: list, myName:name, showForm:true } );
	});

	  // single-tweet page
	  router.get('/tweets/:id', function(req, res, next) {
	      var tweetsWithThatId = tweetBank.find({
	          id: Number(req.params.id)
	      });
	      res.render('index', {
	          title: 'Twitter.js',
	          tweets: tweetsWithThatId // an array of only one element ;-)
	      });
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
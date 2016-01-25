var express = require('express');
var router = express.Router();
// could use one line instead: var router = require('express').Router();
//var tweetBank = require('../tweetBank');
var newTweetBank = require('../models/index.js');

// module.exports = router;
module.exports = function(io){
	router.get('/', function (req, res) {
	  newTweetBank.Tweet.findAll({ include: [ newTweetBank.User ] })
		.then(function (tweet) {
			//console.log(tweet);
			// console.log(JSON.stringify(user))
		    var tweets = [];
		     for (var i = 0; i < tweet.length; i++) {
			 	tweets.push(tweet[i].dataValues);
			 };
		//	console.log(tweets[0].Tweets[0].dataValues.tweet);
		//console.log(tweets)
			return tweets;
		})
		.then(function (tweets) {
			// JSON.stringify(tweets);
			//console.log(tweets[0].dataValues);
	 		res.render( 'index', { title: "George Holevas", tweets: tweets } );
		});

	});

	router.get('/users/:name', function(req, res) {
	  var name = req.params.name;
								// where: {name:name },

	  newTweetBank.Tweet.findAll({ include: [{
							        model: newTweetBank.User,
							        where: { name: name }
    }]
	  							})
		.then(function (tweet) {
			//console.log(tweet);
			// console.log(JSON.stringify(user))
		    var tweets = [];
		     for (var i = 0; i < tweet.length; i++) {
			 	tweets.push(tweet[i].dataValues);
			 };
		//	console.log(tweets[0].Tweets[0].dataValues.tweet);
		//console.log(tweets)
			return tweets;
		})
		.then(function (tweets) {
			 JSON.stringify(tweets);
	 		res.render( 'index', { title: 'Twitter.js - Posts by '+ name, tweets: tweets , myName:name, showForm:true } );
		});
	});

	  // single-tweet page
	  router.get('/tweets/:id', function(req, res, next) {
		var id = req.params.id;
	  	 newTweetBank.Tweet.findAll({ 
							        where: { id: id },
	  	 							include: [{
							        model: newTweetBank.User
								    }]
	  							})
		.then(function (tweet) {
			//console.log(tweet);
			// console.log(JSON.stringify(user))
		    var tweets = [];
		     for (var i = 0; i < tweet.length; i++) {
			 	tweets.push(tweet[i].dataValues);
			 };
		//	console.log(tweets[0].Tweets[0].dataValues.tweet);
		//console.log(tweets)
			return tweets;
		})
		.then(function (tweets) {
			// JSON.stringify(tweets);
	 		res.render( 'index', { title: 'Twitter.js', tweets: tweets} );
		});

	  });

  
	router.post('/tweets', function(req, res) {
	  var name = req.body.name;
	  var text = req.body.text;

	  newTweetBank.User.findOne({ where: {name: name} })
	  .then(function(user) {
	  	newTweetBank.Tweet.create({ UserId: user.dataValues.id, tweet: text })
		})


	  //send DB userid tweet
	 //.then(function(task) {
  // you can now access the newly created task via the variable task


	//  tweetBank.add(name, text);
	  res.redirect('/');
	  io.sockets.emit('new_tweet', [name, text]);
	});
	return router;
}
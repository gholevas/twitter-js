var express = require( 'express' );
var app = express(); // creates an instance of an express application
var chalk = require('chalk');
var morgan = require('morgan');

app.listen(3000, function () {
  console.log('Ready');
});

app.use(morgan('tiny'));

// app.use(function (req, res, next) {
//     // do your logging here
    
//     console.log(chalk.green(req.method));
//     console.log(req.originalUrl);
//     // console.log('res: ',res);
//     // call `next`, or else your app will be a black hole — receiving requests but never properly responding
//     next();
// })

app.use('/special',function(req,res){
	res.send("You've reached the special section");
})

app.get('/',function(req,res){
	res.send('Welcome');
});

app.get('/news',function(req,res){
	res.send('Welcome to the news section');
});
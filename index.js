var express = require("express");
var app = express();
var port = 3005;
var OAuth= require('oauth').OAuth;
var io = require('socket.io').listen(app.listen(port));
var fs = require('fs');

// var oa = new OAuth(
// 	"https://api.twitter.com/oauth/request_token",
// 	"https://api.twitter.com/oauth/access_token",
// 	"TBBakBuSGjl62kDxU8ImOw",
// 	"aIh9mrStGYhbty59KdwqhtyRAxsoT6EgnkNzhmlQfg",
// 	"1.0",
// 	"http://thethread.pw/auth/twitter/callback",
// 	"HMAC-SHA1"
// );

app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.get("/", function(req, res){
    res.render("page");
});
app.use(express.static(__dirname + '/public'));

// app.get('/auth/twitter', function(req, res){
// 	oa.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results){
// 		if (error) {
// 			console.log(error);
// 			res.send("yeah no. didn't work.")
// 		}
// 		else {
// 			req.session.oauth = {};
// 			req.session.oauth.token = oauth_token;
// 			console.log('oauth.token: ' + req.session.oauth.token);
// 			req.session.oauth.token_secret = oauth_token_secret;
// 			console.log('oauth.token_secret: ' + req.session.oauth.token_secret);
// 			res.redirect('https://twitter.com/oauth/authenticate?oauth_token='+oauth_token)
// 	}
// 	});
// });

// app.get('/auth/twitter/callback', function(req, res, next){
// 	if (req.session.oauth) {
// 		req.session.oauth.verifier = req.query.oauth_verifier;
// 		var oauth = req.session.oauth;

// 		oa.getOAuthAccessToken(oauth.token,oauth.token_secret,oauth.verifier, 
// 		function(error, oauth_access_token, oauth_access_token_secret, results){
// 			if (error){
// 				console.log(error);
// 				res.send("yeah something broke.");
// 			} else {
// 				req.session.oauth.access_token = oauth_access_token;
// 				req.session.oauth.access_token_secret = oauth_access_token_secret;
// 				console.log(results);
// 				res.send("worked. nice one.");
// 			}
// 		}
// 		);
// 	} else
// 		next(new Error("you're not supposed to be here."))
// });


io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chat' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});

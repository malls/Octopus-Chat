var express = require("express");
var app = express();
var port = 3005;
var io = require('socket.io').listen(app.listen(port));
var dotenv = require('dotenv');
var assert = require('assert');
var env = require('node-env-file');

dotenv.load();

app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.get("/", function(req, res){
    res.render("page");
});

app.use(express.favicon("octopus.ico")); 
app.use(express.static(__dirname + '/public'));

io.sockets.on('connection', function (socket) {
	var track_url = "https://soundcloud.com/maindoctrl/ctrl10-luxury-elite-101-7-wave";
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});


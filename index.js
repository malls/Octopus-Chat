var express = require("express");
var app = express();
var port = 3005;
var OAuth= require('oauth').OAuth;
var io = require('socket.io').listen(app.listen(port));
var fs = require('fs');
var sc = require("soundclouder");

app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.get("/", function(req, res){
    res.render("page");
});


app.use(express.static(__dirname + '/public'));

io.sockets.on('connection', function (socket) {
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});





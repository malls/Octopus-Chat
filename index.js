var express = require("express");
var app = express();
var port = process.env.PORT || 5000;
// var port = 3005; keep for local testing
var io = require('socket.io').listen(app.listen(port));


app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);

app.get("/", function(req, res){
    res.render("page");
});

app.use(express.favicon("octopus.ico")); 
app.use(express.static(__dirname + '/public'));

io.sockets.on('connection', function (socket) {
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
    socket.on('disconnect', function () {
    io.sockets.emit('user disconnected');
  });

});
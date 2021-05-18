var express = require('express');
var app = express();
var port = process.env.PORT || 5000;

var io = require('socket.io').listen(app.listen(port));


app.set('views', __dirname + '/tpl');
app.set('view engine', "pug");
app.engine('pug', require('pug').__express);

app.get('/', function (req, res) {
    res.render('page');
});

app.use(express.favicon(__dirname + '/public/octopus.ico'));
app.use(express.static(__dirname + '/public'));

io.sockets.on('connection', function (socket) {
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
    socket.on('disconnect', function (data) {
        //make work
        io.sockets.emit('message', data);
    });
});
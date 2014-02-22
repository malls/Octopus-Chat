window.onload = function() {
	$('body').hide();
    var messages = [];
    var socket = io.connect('http://localhost:3005');
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");
    // var username = document.getElementById("username");
    var username = "username";

    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data.message);
            var html = '';
            for(var i=0; i<messages.length; i++) {
                html += messages[i] + '<br />';
            }
            content.innerHTML = html;
        } else {
            console.log("There is a problem:", data);
        }
    });

    sendButton.onclick = function() {
        var text = username + ": " + field.value;
        socket.emit('send', { message: text });
    };

}
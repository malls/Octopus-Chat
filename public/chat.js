window.onload = function() {
	$('button').click(function(e){
        $(this).addClass(".hide");
    });

    var messages = [];
    var socket = io.connect('http://192.168.1.4:3005');
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");
    var username = "";

    // socket.on('entrance', function  (data) {
    //     log_chat_message(data.message, 'system' + username);
    // });

    // socket.on('exit', function  (data) {
    //     log_chat_message(data.message, 'leave');
    // });

     socket.on('exit', function  (data) {
        socket.emit('send', {message: "bye " + username + "!"});
    });

    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data.message);
            var html = '';
            for(var i=0; i<messages.length; i++) {
                html += '<li>' + messages[i] + '</li>';
            }
            content.innerHTML = html;
            content.scrollTop = content.scrollHeight;

        } else {
            console.log("There is a problem:", data);
        }
    });

    $('#field').hide();

    $('#username').keypress(function (event) {
         if (event.which == 13) {
            username =  this.value;
            socket.emit('send', {message: "hi " + username + ", welcome to the chat"});
            $('#field').show();
            $('#field').focus();
            $('#username').hide();
        }
    });

    $('#field').keypress(function (event) {
         if (event.which == 13) {
            text = username + ": " + field.value;
            socket.emit('send', {message: text});
            $('#field').val('');
        }
    });


}
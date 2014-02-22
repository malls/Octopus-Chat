window.onload = function() {
	// $('body').hide();
    var messages = [];
    var socket = io.connect('http://192.168.1.4:3005');
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");
    var username = document.getElementById("username");

    socket.on('entrance', function  (data) {
        log_chat_message(data.message, 'system');
    });

    socket.on('exit', function  (data) {
        log_chat_message(data.message, 'leave');
    });


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

    $('#field').keypress(function (event) {
        if (event.which == 13) {
            var text = username + ": " + field.value;
            socket.emit('send', {message: text});
        //     fs.writeFile("test.txt", {message: text}, encoding='utf8', function(err) {
        //     if(err) {
        //         console.log(err);
        //     } else {
        //         console.log("The file was saved!");
        //     }
        // });
            jQuery('#field').val('');
        }
    });

//     sendButton.onclick = function() {
//         var text = username + ": " + field.value;
//         socket.emit('send', { message: text });
//         fs.writeFile("test", "Hey there!", function(err) {
//             if(err) {
//                 console.log(err);
//             } else {
//                 console.log("The file was saved!");
//             }
//         });
//     };

}
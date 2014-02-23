window.onload = function() {

    var messages = [];
    var socket = io.connect('http://192.168.1.4:3005');
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");
    var username = "";
    var track_url = "https://soundcloud.com/maindoctrl/ctrl10-luxury-elite-101-7-wave";
    var usernames = {};
    
    SC.initialize({
        client_id: ''
    });

    SC.oEmbed(track_url, {color: "ff0066"},  document.getElementById("scplayer"));

    socket.on('message', function (data) {

        if(data.type === 'chat'){

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
        }   
        if(data.type === 'track'){
            SC.oEmbed(data.message, {color: "ff0066"},  document.getElementById("scplayer"));  
        }

    });

    $('#field').hide();
    $('#username').focus();

    $('#username').keypress(function (event) {
         if (event.which == 13) {
            username =  this.value;
            socket.emit('send', { type: 'chat', message: "hi " + username + ", welcome to the chat" });
            $('#field').show();
            $('#field').focus();
            $('#username').hide();
            usernames[username] = username;
        }
    });

    $('#field').keypress(function (event) {
         if (event.which == 13) {
            if (field.value === ""){
            }else{
                text = username + ": " + field.value;
                socket.emit('send', { type: 'chat', message: text });
                $('#field').val('');
            }
        }
    });

    $('#scbox').keypress(function (event) {
        if(event.which == 13) {
            track_url = $('#scbox').val();
            socket.emit('send', {type: 'track', message: track_url}); 
            console.log(track_url);  
            $('#field').focus();
            $('#scbox').val('');      
        }
    });

}
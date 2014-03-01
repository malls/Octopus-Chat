window.onload = function() {

    var messages = [];
    var socket = io.connect('http://hidden-beach-6020.herokuapp.com/');
    // var socket = io.connect('http://192.168.1.4:3005/');
    // keep for local testing
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");
    var username = "";
    var track_url = "https://soundcloud.com/saintpepsi/cherry-pepsi-1";
    var usernames = {};
    var linkTest = new RegExp('^(https?:\\/\\/)?'+ // protocol
              '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
              '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
              '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
              '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
              '(\\#[-a-z\\d_]*)?$','i'); // fragment locator 

    function checkIMG(url) {
        return(url.match(/\.(jpeg|jpg|gif|png|ico|bmp)$/) != null);
    };
    
    SC.initialize({
        client_id: "c597d56a1c6dd9e319d0b6ad5d3cc59f"
    });

    SC.oEmbed(track_url, {auto_play: true},  document.getElementById("scplayer"));
    //just gonna toss this here: http://developers.soundcloud.com/docs/api/sdks#methods
    
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

    socket.on('disconnect', function (event) {
        socket.emit('send', { type: 'chat', message: username + ' disconnected' });
        //make this work
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
            }else if(checkIMG(field.value)){
                text = username + ":<br/> <img src='" + field.value +"' class='chatimg' />";
                socket.emit('send', { type: 'chat', message: text });
                $('#field').val('');
            }else if(linkTest.test(field.value)){
                var url = field.value;
                 if (!/^(f|ht)tps?:\/\//i.test(url)) {
                     url = "http://" + url;
                }
                text = username + ": <a href='" + url + "'>" + url + "</a>"
                socket.emit('send', { type: 'chat', message: text });
                $('#field').val('');

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
var sc = require("soundclouder");

// client id, secret and redirect url are the values obtained from http://soundcloud/you/apps
sc.init(a8150c81dcf31984778907af9026e3a3, 1de9457503bbaeee391e12bbba81e4a8, https:soundcloud.com/devon-anthony-1;

// code sent by the browser based SoundCloud Login that redirects to the redirect_uri
sc.auth( code, function (error, access_token) 
{
    if(error) 
    {
        console.error(e.message);
    } 
    else 
    {
        console.log('access_token=' + access_token );
    }
});

sc.get('/tracks/' + track_id, access_token, function (data) {

    console.log( data.title );

});
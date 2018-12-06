//just following the README
require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

//import needed packages
// var axios = require("axios");


//retrieves user input, stores as command and input arguments
var command = process.argv[2];
var input = process.argv.slice(3).join(" ");



//possible command inputs lead into a switch statement
switch(command) {
    case 'spotify-this-song':
    {spotSearch()};
    break;

    case 'concert-this':
    {spotSearch()};
    break;

    case 'movie-this':
    {spotSearch()};
    break;

    case 'do-what-it-says':
    {spotSearch()};
    break;

}




function spotSearch() {
    spotify.search({ type: 'track', query: input},
    function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        var song = data.tracks.items[0];
        getArtist(song);
        var songName = song.name;
        var songPreview = song.preview_url;
        var albumName = song.album.name;
        console.log(songName);
        console.log(albumName);
        console.log(songPreview);
        
    });
};

function getArtist(obj){
    var artists = [];
    obj.artists.forEach(function(artist) {
        artists.push(artist.name);    
    });
    console.log(artists.join(", "));
};



//just following the README
require("dotenv").config();

//spotify setup
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

//import needed packages
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");


//retrieves user input, stores as command and input arguments
var command = process.argv[2];
var input = process.argv.slice(3).join(" ");



//possible command inputs lead into a switch statement
function general() {
    switch(command) {
        case 'spotify-this-song':
        {spotSearch()};
        break;
    
        case 'concert-this':
        {concertSearch()};
        break;
    
        case 'movie-this':
        {movieSearch()};
        break;
    
        case 'do-what-it-says':
        {doSays()};
        break;
    
    }
}




function spotSearch() {
    spotify.search({ type: 'track', query: input},
    function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        var song = data.tracks.items[0];
        console.log("-------------------------------------------------");
        getArtist(song);
        var songName = song.name;
        var songPreview = song.preview_url;
        var albumName = song.album.name;
        console.log("Song: "+songName+"\nAlbum: "+albumName+"\nPreview: "+songPreview);
        console.log("-------------------------------------------------");
        
    });
};

function getArtist(obj){
    var artists = [];
    obj.artists.forEach(function(artist) {
        artists.push(artist.name);    
    });
    console.log("Artist(s): "+artists.join(", "));
};

function concertSearch(){
    axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id="+keys.bands.api).then(function (response){
        var name = response.data[0].venue.name;
        var city = response.data[0].venue.city;
        var state = response.data[0].venue.region;
        var country = response.data[0].venue.country;
        var loc = city+", "+state+", "+country;
        var date = moment(response.data[0].datetime).format("MM.DD.YYYY");
        console.log("-------------------------------------------------");
        console.log("Venue: "+name+"\nLocation: "+loc+"\nDate: "+date);
        console.log("-------------------------------------------------");
    })
    .catch(function (error) {
        console.log(error);
    })
}

function movieSearch(){
    axios.get("http://www.omdbapi.com/?t="+input+"&y=&plot=short&apikey="+keys.OMDB.api).then(
        function(response) {
            var title = response.data.Title;
            var year = response.data.Year;
            var imdb = response.data.Ratings[0].Value;
            var rotten = response.data.Ratings[1].Value;
            var country = response.data.Country
            var lang = response.data.Language
            var plot = response.data.Plot;
            var actors = response.data.Actors;
            console.log("-------------------------------------------------");
            console.log("Title: "+title+"\nYear: "+year+"\nIMDB Rating: "+imdb+"\nRotten Tomatoes Rating: "+rotten+"\nCountry: "+country+"\nLangueage: "+lang+"\nPlot: "+plot+"\nActors: "+actors);
            console.log("-------------------------------------------------");
          
        }
    ).catch(function (error) {
        console.log(error);
    });
}

function doSays(){
    fs.readFile("random.txt", "utf8", function(err, data){
        if(err){
            return console.log(err);
        };
        split = data.split(",");
        command = split[0];
        input = split[1];
        general();
    });
}

general();
console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

exports.OMDB ={
  api: process.env.OMDB_API
};

exports.bands={
  api: process.env.BANDS_IN_TOWN_API
}

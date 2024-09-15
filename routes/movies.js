const fs = require('fs');
const express = require('express');
const router = express.Router();
const path = require('path');
const { searchForMovie } = require('../lib/apiCalls');

router.get('/', (req, res) => {
  res.send('Welcome to <> your movies api.');
});

router.get('/searchByTitle/:title_encoded', async (req, res, next) => {
  var { title_encoded } = req.params;
  try {
    const response = await searchForMovie(title_encoded);
    if (!response.ok || !response?.results[0]) next(response);
    const movie = response.results[0];

    const { id, backdrop_path, title, poster_path } = movie;
    const movieId = 'm_' + id;

    const movieInfo = { movieId, backdrop_path, title, poster_path };
    fs.writeFileSync(
      path.join(__dirname, `../data/movies/${movieId}.json`),
      JSON.stringify(movieInfo),
      { flag: 'w' }
    );
    res.send(movieInfo);
  } catch (err) {
    next(err);
  }
});

router.get('/:movieId', (req, res, next) => {});

module.exports = router;

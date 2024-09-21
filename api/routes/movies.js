const fs = require('fs');
const express = require('express');
const router = express.Router();
const path = require('path');
const { searchForMovie } = require('../lib/apiCalls.js');

router.get('/', (req, res) => {
  res.send('Welcome to <> your movies api.');
});

router.get('/searchByTitle/:title_encoded', async (req, res, next) => {
  var { title_encoded } = req.params;
  try {
    const movie = await searchForMovie(title_encoded);
    var { id, title, poster_path } = movie;
    id = 'm_' + id;
    const img = poster_path;
    const text = title;

    const movieInfo = { id, img, text };
    fs.writeFileSync(
      path.join(__dirname, `../data/movies/${id}.json`),
      JSON.stringify(movieInfo),
      { flag: 'w' }
    );
    res.send(movieInfo);
  } catch (err) {
    next(err);
  }
});

//router.get('/:movieId', (req, res) => {});

module.exports = router;

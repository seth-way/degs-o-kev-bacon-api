const fs = require('fs');
const express = require('express');
const router = express.Router();
const path = require('path');
const asyncHandler = require('express-async-handler');
const { searchForMovie } = require('../lib/apiCalls');

router.get('/', (req, res) => {
  res.send('Welcome to <> your movies api.');
});

router.get(
  '/searchByTitle/:title_encoded',
  asyncHandler(async (req, res, next) => {
    var { title_encoded } = req.params;
    const response = await searchForMovie(title_encoded);
    if (!response.ok || !response?.results[0]) next(response);
    const movie = response.results[0];

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
  })
);

router.get('/:movieId', (req, res) => {});

module.exports = router;

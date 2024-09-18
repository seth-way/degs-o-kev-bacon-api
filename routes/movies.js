//const fs = require('fs');
const express = require('express');
const router = express.Router();
console.log('MOUNT PATH <><>', router.mountpath);
const path = require('path');
const { searchForMovie } = require('./apiCalls.js');

router.get('/', (req, res) => {
  res.send('Welcome to <> your movies api.');
});

router.get('/searchByTitle/:title_encoded', (req, res, next) => {
  var { title_encoded } = req.params;
  const movie = searchForMovie(title_encoded)
    .then(res => {
      if (!res.ok || !res?.results[0]) next(res);
      return res.results[0];
    })
    .catch(err => next(err));

  var { id, title, poster_path } = movie;
  id = 'm_' + id;
  const img = poster_path;
  const text = title;

  const movieInfo = { id, img, text };
  // fs.writeFileSync(
  //   path.join(__dirname, `../data/movies/${id}.json`),
  //   JSON.stringify(movieInfo),
  //   { flag: 'w' }
  // );
  res.send(movieInfo);
});

//router.get('/:movieId', (req, res) => {});

module.exports = router;

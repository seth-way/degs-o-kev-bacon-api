const fs = require('fs');
const express = require('express');
const router = express.Router();
const path = require('path');
const { searchForMovie } = require('../lib/apiCalls.js');

router.get('/', (req, res) => {
  res.send('Welcome to <> your movies api.');
});

// router.get('/searchByTitle/:title_encoded', (req, res, next) => {
//   var { title_encoded } = req.params;
//   const movie = searchForMovie(title_encoded)
//     .then(response => {
//       if (!response.ok || response instanceof Error) next(response);
//       const targetMovie = response.results[0];
//       var { id, title, poster_path } = targetMovie;
//       id = 'm_' + id;
//       const img = poster_path;
//       const text = title;

//       const movieInfo = { id, img, text };
//       fs.writeFileSync(
//         path.join(__dirname, `../data/movies/${id}.json`),
//         JSON.stringify(movieInfo),
//         { flag: 'w' }
//       );
//       return movieInfo;
//     })
//     .catch(err => next(err));

//   res.send(movie);
// });

router.get('/searchByTitle/:title_encoded', async (req, res, next) => {
  var { title_encoded } = req.params;
  try {
    console.log('boutta search for dat movieeeeeeeee......');
    const movie = await searchForMovie(title_encoded);
    console.log('movie:::::', movie);
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

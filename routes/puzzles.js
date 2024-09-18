const fs = require('fs');
const express = require('express');
const router = express.Router();
const path = require('path');

async function readFiles(filePaths) {
  const filePromises = filePaths.map(async path => {
    const data = await fs.promises.readFile(path, 'utf-8');
    return data;
  });

  const fileContents = await Promise.all(filePromises);

  return fileContents;
}

router.get('/', async (req, res, next) => {
  try {
    const puzzleFileNames = fs.readdirSync(
      path.join(__dirname, '../data/puzzles')
    );

    const paths = puzzleFileNames.map(file =>
      path.join(__dirname, `../data/stars/${file}`)
    );

    const contents = await readFiles(paths);

    res.send(contents.map(json => JSON.parse(json)));
  } catch (err) {
    next(err);
  }
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

router.get('/:id', async (req, res, next) => {
  var { id } = req.params;
  try {
    const puzzle = fs.readFileSync(
      path.join(__dirname, `../data/puzzles/${id}.json`)
    );
    res.send(puzzle);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

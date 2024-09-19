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

router.get('/createPuzzle/:puzzleKey', async (req, res, next) => {
  const { puzzleKey } = req.params;
  try {
    const [hubKey, wheel] = puzzleKey.split('*');
    var hub = await fs.promises.readFile(
      path.join(__dirname, `../data/stars/${hubKey}.json`),
      'utf-8'
    );

    hub = await JSON.parse(hub); // working up to here. need to use readFiles function
    // to read stars / movies... parse... write... and respond

    const puzzle = { stars: {}, movies: {}, hub, wheel };

    const paths = wheel.split('-').map(key => {
      const type = key[0] === 'm' ? 'movies' : 'stars';
      return path.join(__dirname, `../data/${type}/${key}.json`);
    });

    const contents = await readFiles(paths);
    const promises = await contents.map(async string => {
      return await JSON.parse(string);
    });
    const data = await Promise.all(promises);
    data.forEach(item => {
      const type = item.id[0] === 'm' ? 'movies' : 'stars';
      puzzle[type][item.id] = item;
    });
    fs.writeFileSync(
      path.join(__dirname, `../data/puzzles/${hubKey}.json`),
      JSON.stringify(puzzle),
      { flag: 'w' }
    );
    console.log('hub <>', hub);
    res.send(puzzle);
  } catch (err) {
    next(err);
  }
});

// router.get('/searchByTitle/:title_encoded', async (req, res, next) => {
//   var { title_encoded } = req.params;
//   try {
//     const response = await searchForMovie(title_encoded);
//     if (!response.ok || !response?.results[0]) next(response);
//     const movie = response.results[0];

//     const { id, backdrop_path, title, poster_path } = movie;
//     const movieId = 'm_' + id;

//     const movieInfo = { movieId, backdrop_path, title, poster_path };
//     fs.writeFileSync(
//       path.join(__dirname, `../data/movies/${movieId}.json`),
//       JSON.stringify(movieInfo),
//       { flag: 'w' }
//     );
//     res.send(movieInfo);
//   } catch (err) {
//     next(err);
//   }
// });

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

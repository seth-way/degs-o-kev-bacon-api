const express = require('express');
const router = express.Router();
const moviesRouter = require('./movies.js');
//const starsRouter = require('./stars.js');
//const puzzlesRouter = require('./puzzles.js');

router.get('/', (req, res) => {
  res.send('Welcome to <> your new api.');
});

router.use('/movies', moviesRouter);
//router.use('/stars', starsRouter);
//router.use('/puzzles', puzzlesRouter);

module.exports = router;

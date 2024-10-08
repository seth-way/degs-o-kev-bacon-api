const fs = require('fs');
const express = require('express');
const router = express.Router();
const path = require('path');
const { searchForStar } = require('../lib/apiCalls');

router.get('/', (req, res) => {
  res.send('Welcome to <> your star api.');
});

router.get('/searchByName/:name_encoded', async (req, res, next) => {
  var { name_encoded } = req.params;
  try {
    const star = await searchForStar(name_encoded);
    var { id, name, profile_path } = star;
    id = 's_' + id;
    const text = name;
    const img = profile_path;
    const starInfo = { id, img, text };

    fs.writeFileSync(
      path.join(__dirname, `../data/stars/${id}.json`),
      JSON.stringify(starInfo),
      { flag: 'w' }
    );

    res.send(starInfo);
  } catch (err) {
    next(err);
  }
});

router.get('/:starId', (req, res) => {});

module.exports = router;

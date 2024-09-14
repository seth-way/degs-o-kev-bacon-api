const fs = require('fs');
const express = require('express');
const router = express.Router();
const path = require('path');
import { searchForStar } from '../lib/apiCalls';
//var url = require('url');

router.get('/', (req, res) => {
  res.send('Welcome to <> your star api.');
});

router.get('/searchByName/:name_encoded', async (req, res, next) => {
  var { name_encoded } = req.params;
  try {
    const response = await searchForStar(name_encoded);
    if (!response.ok || !response?.results[0]) next(response);
    const star = response.results[0];
    const { id, name, profile_path } = star;
    const starId = 's_' + id;
    const starInfo = { starId, name, profile_path } ;

    fs.writeFileSync(
      path.join(__dirname, `../data/stars/${starId}.json`),
      JSON.stringify(starInfo),
      { flag: 'w' }
    );
    res.send(starInfo);
  } catch (err) {
    next(err);
  }
});

router.get('/:starId', (req, res, next) => {});

module.exports = router;

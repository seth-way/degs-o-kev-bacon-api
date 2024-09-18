require('dotenv').config({ path: '.env.local' });
const express = require('express');
const apiRouter = require('./routes/index.js');
const cors = require('cors');
const path = require('path');
const { logErrors, clientErrorHandler, errorHandler } = require('./error.js');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send(`Server is running on port ${PORT}`);
});

app.use('/api', apiRouter);
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on <><><> port ${PORT}`);
});

module.exports = app;

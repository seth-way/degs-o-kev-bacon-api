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

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log(`Server is running on <><><> port ${PORT}`);
});

server.on('error', err => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use <><><> retrying...`);
    server.close(err => {
      if (err) console.error(err);
      else {
        setTimeout(() => {
          server.listen(PORT);
        }, 300);
      }
    });
  } else {
    console.error('Server error:', err);
    process.exit(1);
  }
});

module.exports = app;

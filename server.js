console.log('PROCESS . ENV . NODE_ENV <><><><>', process.env.NODE_ENV);
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
//const apiRouter = require('./routes/index.js');
const cors = require('cors');
//const { logErrors, clientErrorHandler, errorHandler } = require('./error.js');

const PORT = process.env.PORT || 3001;

const app = express();

app.locals = {
  title: '6 Degs-O-Bacon API',
};

app.use(cors());
//app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Express server working on Vercel');
});

//app.use('/api', apiRouter);
// app.use(logErrors);
// app.use(clientErrorHandler);
// app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`${app.locals.title} <><><> is running on <><><> port ${PORT}`);
});

module.exports = app;

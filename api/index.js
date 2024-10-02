console.log('PROCESS . ENV . NODE_ENV <><><><>', process.env.NODE_ENV);
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}
const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require('./routes/index.js');
const cors = require('cors');
const logger = require('morgan');
const errorHandler = require('./error.js');

const PORT = process.env.PORT || 3001;
const app = express();

app.locals = {
	title: '6 Degs-O-Bacon API'
};

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('combined'));
// app.use(express.static(path.join(__dirname, 'public')));

const setContext = (req, res, next) => {
	if (!req.context) req.context = {};
	next();
};

app.use(setContext);

app.get('/', (req, res) => {
	res.send('Express on Vercel');
});

app.use('/api', apiRouter);
app.use(errorHandler);

app.listen(PORT, () => console.log(`server ready on port ${PORT}`));

module.exports = app;

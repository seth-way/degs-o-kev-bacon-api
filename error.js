function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}

function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' });
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error from error handler', { error: err });
}

module.exports = { logErrors, clientErrorHandler, errorHandler };

// Example route handler
// app.get('/example', (req, res, next) => {
//   try {
//     // Some code that might throw an error
//     throw new Error('Example error');
//   } catch (error) {
//     // Pass the error to Express error handler middleware
//     next(error);
//   }
// });

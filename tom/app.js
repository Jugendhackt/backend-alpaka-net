const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

const UserRoute = require('./routes/user');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// allow ajax requests: Add CORS header
app.use((req, res, next) => {
  res
    .header('Access-Control-Allow-Origin', '*')
    .header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
  next();
})


// register user route (User search + Add Skills)
app.use('/user', UserRoute);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// general error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.type('json');
  res.end(JSON.stringify({
    err: (err.message) ? err.message : 'An error occured. More information is in the output console.'
  }));
  console.error(err);
});

module.exports = app;

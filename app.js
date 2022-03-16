const createError = require('http-errors');
const express = require('express');

const showsRouter = require('./routes/shows');
const actorsRouter = require('./routes/actors');

const app = express();

app.use(addCommonHeaders);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/search', showsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //res.render('error');
  res.end();
});

function addCommonHeaders(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next(); // forwards request
}

module.exports = app;

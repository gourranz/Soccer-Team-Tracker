//server.js

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
// connect to the database with AFTER the config vars are processed
require('./config/database');

//server.js
const indexRouter = require('./routes/index');
const teamRouter = require('./routes/team');
const playerRouter = require('./routes/players');
const scheduleRouter = require('./routes/schedule')



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/teams', teamRouter);
app.use('/players', playerRouter);
app.use('/schedule', scheduleRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  const errorMessage = err.message || 'An error occurred';
  res.locals.message = errorMessage;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Log the error for debugging
  console.error('Error:', err);

  // Render the error page
  res.status(err.status || 500);
  res.render('error', { title: 'Error', message: errorMessage, error: err });
});
module.exports = app;

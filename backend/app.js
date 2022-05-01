var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var patientRouter = require('./routes/patient');
var ficheMedicaleRouter = require('./routes/ficheMedicale');

var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


//db settings connections****************

var mongoose = require('mongoose');
var config = require('./config/config');

mongoose.connect(config.mongo.uri)
.then( () =>{
  console.log("database connection successfull ");
})  //in case of success
.catch( (err) =>{
  console.log("database connection error "+ err);
}) 

//*****************************


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');// a modifier avec twig apres avoir cree les vues

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/************ROUTAGE *****************/

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/patient', patientRouter);
app.use('/fiche_med', ficheMedicaleRouter);

/********************FIN ROUTAGE****************** */

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
  res.render('error');
});

module.exports = app;

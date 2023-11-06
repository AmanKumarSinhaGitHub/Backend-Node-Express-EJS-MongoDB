// Import necessary modules
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Import routes for the application
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// Require Passport for Authentication
const passport = require('passport');
const expressSession = require("express-session")

// Create an instance of the Express application
var app = express();

// Configure view engine and view folder
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



// ------------- Session and Passport Configuration ------------ //

// Configure Express session to enable session management

app.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret: "hello hello baye baaye"
}))

// Initialize Passport
app.use(passport.initialize());

// Enable Passport to create and save sessions
app.use(passport.session());
passport.serializeUser(usersRouter.serializeUser());
passport.deserializeUser(usersRouter.deserializeUser());

// ------------- End of Session and Passport Configuration ------------ //



// Middleware setup for request handling
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Define routes for the application
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Catch 404 errors and forward them to the error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler for the application
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Export the Express app
module.exports = app;
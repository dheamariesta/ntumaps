import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import Debug from 'debug';
import express from 'express';
import logger from 'morgan';
import dotenv from 'dotenv';
dotenv.load( {path: '.env'} )

// import favicon from 'serve-favicon';
import path from 'path';
import lessMiddleware from 'less-middleware';
import mongoose from 'mongoose';
import pathController from './controllers/pathController';


const errorHandler = require('errorhandler');
const flash = require('express-flash');
// import index from './routes/index';
var session = require('express-session');
var passport = require('passport');

const app = express();
// const debug = Debug('ntumaps:app');


// Connect to mongoose
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
app.use(session( {secret : 'secret-name'}));
app.use(passport.initialize())
app.use(passport.session())
require('./config/passportConfig')(passport);
app.use(flash());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', index);
app.get('/', (req, res, next) => {
  res.render('index', {
    title: 'NTU Maps'
  })
});

app.post('/', pathController.getRoute);


//app.use('/', require('./routes/index'));
app.use('/', require('./routes/login'))
app.use('/', require('./routes/signup'))
app.use('/', require('./routes/dashboard'))
// app.use('/login', require('./routes/login'))


// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
/* eslint no-unused-vars: 0 */
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// Handle uncaughtException
process.on('uncaughtException', (err) => {
  console.log(err);
  // debug('Caught exception: %j', err);
  process.exit(1);
});

export default app;

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var debug = require('debug')('vsohelper:app');

var fs = require('fs');

var routes = require('./routes/index');
var users = require('./routes/users');


checkconfig();
var gitsetup = require('./routes/gitsetup');
var gitnotify = require('./routes/gitnotify');
var vsostatus = require('./routes/vsostatus');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);


app.use('/gitnotify', gitnotify);
app.use('/vsostatus', vsostatus);
app.use('/gitsetup', gitsetup);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

function checkconfig(){
  var vsoPrivate = './vso.private.json';
  var gitPrivate = './git.private.json';
  debug('checking for config');
  
  if ( ! fs.existsSync(vsoPrivate)) {
    debug('VSO config file doesn\'t exists creating a sample');
    fs.writeFileSync(vsoPrivate, JSON.stringify({
    "username": "YOUR VSO USERNAME",
    "password": "YOUR VSO PASSWORD",
    "serverurl": "https://YOUR VSO ACCOUNT.visualstudio.com/DefaultCollection",
    "projectname": "TBD",
    "buildname": "updatestatus"
    }));
  }
  
  if ( ! fs.existsSync(gitPrivate)) {
    debug('GIT config file doesn\'t exists creating a sample');
    fs.writeFileSync(gitPrivate,JSON.stringify( {
    "username": "YOUR GIT USERNAME",
    "password": "YOUR GIT PASSWORD OR PERSONAL ACCESS TOKEN",
    }));
  }
}


module.exports = app;

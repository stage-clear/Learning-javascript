var express = require('express');
var path = require('path');
var http = require('http');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var routes = require('./routes/index');
//var users = require('./routes/users');

// 経路のロジックを require する
var register = require('./routes/register');
var login = require('./routes/login');
var messages = require('./lib/messages');
var user = require('./lib/middleware/user');
var entries = require('./routes/entries');
var validate = require('./lib/middleware/validate');
var page = require('./lib/middleware/page');
var Entry = require('./lib/entry');
var api = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.set('port', process.env.PORT || 3000);

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser('your secret here'));
app.use(session({
  secret: 'your secret here',
  proxy: true,
  resave: true,
  saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', api.auth);
app.use(user);
app.use(messages);
app.use(app.router);
app.use(routes.notfound);
app.use(routes.error)

// 経路を追加
app.get('/login', login.form);
app.post('/login', login.submit);
app.get('/logout', login.logout);
app.get('/register', register.form);
app.post('/register', register.submit);
app.get('/post', entries.form);
app.post('/post',
  validate.required('entry[title]'), // タイトルのチェック
  validate.lengthAbove('entry[title]', 4), // フィールド長のチェック
  entries.submit);

// api の設計
app.get('/api/user/:id', api.user);
app.post('/api/entry', entries.submit);
app.get('/api/entries/:page?', page(Entry.count), api.entries);


app.get('/:page?', page(Entry.count, 5), entries.list);


if (process.env.ERROR_ROUTE) {
  app.get('/dev/error', function(req, res, next) {
    var err = new Error('database connection faild.');
    err.type = 'database';
    next(err);
  });
}


/*
/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: '[B]' + err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: '[A]' + err.message,
        error: {}
    });
});
*/

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port. ' + app.get('port'));
});

module.exports = app;

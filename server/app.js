'use strict';

let express     = require('express');
let bodyParser  = require('body-parser');
let path        = require('path');
let cookieParser= require('cookie-parser');
let logger      = require('morgan');

let indexController = require('./controllers/indexController');

// setup express
let app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('views engine', 'hbs');
app.use(logger('dev'));
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));



app.use('/', indexController);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    // res.render('error');
    res.send(err);
});


module.exports = app;
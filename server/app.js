var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var RedisStore = require('connect-redis')(session);
var csurf = require('csurf');
var cors       = require('cors')
var validator  = require('express-validator');
var RateLimit = require('express-rate-limit');
var compression = require('compression');
var helmet = require('helmet');

var index = require('./routes/index');
var users = require('./routes/users');

var config = require('./config');
var { isLoggedIn } = require('./middlewares/auth');

var app = express();

var tenYears = 10 * 365 * 24 * 3600 * 1000;
var limiter = new RateLimit({
  windowMs: config.rate_limit_ms || 3600000,
  max: config.rate_limit || 5000, // limit each IP to X requests per windowMs
  delayMs: 0 // disable delaying - full speed until the max limit is reached
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//gzip,security
app.use(compression());
app.use(helmet());
app.use(limiter);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/css', express.static(path.join(__dirname, 'public/stylesheets'), { maxAge: tenYears }));
app.use('/js', express.static(path.join(__dirname, 'public/javascript'), { maxAge: tenYears }));
app.use(express.static(path.join(__dirname, 'public')));
//app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(session({
  name: 'sid',
  secret: config.session_secret,
  store: new RedisStore({
    port: config.redis_port,
    host: config.redis_host,
    db: config.redis_db,
    pass: config.redis_password,
    keyPrefix: 'sess:'
  }),
  cookie: {
    maxAge: config.session_max_age
  },
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//setup passport
require('./passport')();

//app.use(cors());
app.use(validator());
app.use('/v', isLoggedIn);
app.use('/v', csurf({ cookie: true }));
app.use('/v', function (req, res, next) {
  res.locals._csrf = req.csrfToken ? req.csrfToken() : '';
  next();
});

//setup routes
app.use('/', index);
app.use('/users', users);
app.get('*', function (req, res) {
  res.send('404');
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
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
  res.render('error');
});

app.listen(config.listen_port || process.env.PORT, function () {
  var port = config.listen_port || process.env.PORT;
  console.log('node start: listen on port ' + port);
});

module.exports = app;

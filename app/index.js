// import Promise from 'bluebird';

let express = require('express'),
  path = require('path'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  authRoutes = require('./routes/auth'),
  apiRoutes = require('./routes/api'),
  errorRoutes = require('./routes/error'),
  passport = require('passport'),
  TwitterStrategy = require('passport-twitter').Strategy,
  app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// uncomment after placing your favicon in /public
app.use(express.static(path.join(__dirname, '../public')));
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/v1.0', apiRoutes);
app.use('/oauth', authRoutes);
app.use(errorRoutes);

var server = app.listen(3000,() => {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
//displayId(-2, true);
displaySampleIds();

function displaySampleIds() {
  exchangeValue(2, false)
    .then((data)=>{console.log(data); return exchangeValue(-1, false);})
    .then((data)=>{console.log(data); return exchangeValue(700, false);})
    .then((data)=>{console.log(data); return exchangeValue(7, false);})
    .then((data)=>{console.log(data);})
    .catch((error)=>{console.log(error.message)});
}


function displayId(id, error) {
  exchangeValue(id, error)
    .then((data)=>{console.log(data);})
    .catch((error)=>{console.log(error.message)});
}

function exchangeValue(id, error) {
  if (id < 0) {
    return Promise.resolve("そんなidはないです");
  } else {
    return getSamplePromise(id, error)
      .then((data) => {return Promise.resolve("idは"+data+"です");})
      .catch((error) => {return Promise.reject(error);});
  }
}

function getSamplePromise(id, error) {
  return new Promise((resolve, reject) => {
    if (error) {
      reject(new Error("でーた取得できませんでした"));
    }
    resolve('00'+id);
  });
}
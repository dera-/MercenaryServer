let express = require('express'),
  path = require('path'),
  commonRoutes = require('./app/routes/common'),
  apiRoutes = require('./app/routes/api'),
  app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(commonRoutes);
app.use('/v1.0', apiRoutes);

var server = app.listen(3000,() => {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});


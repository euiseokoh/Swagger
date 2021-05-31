let express = require('express');
let morgan = require('morgan'); // 미들 웨어 로그
const logger = require('./common/logger');
let bodyParser = require('body-parser');
let helmet = require('helmet');
const common = require('./common/common');
const response = require('./config/response');

var app = express();
global.WEBROOT = __dirname;

logger.info("Starting Server");
logger.info("Server Env : " + process.env.NODE_ENV);

// API 문서 관련
const { swaggerUi, specs, customOptions } = require('./swagger/swagger');
const specsAuth = require('./swagger/swaggerAuth');
const specsLogin = require('./swagger/swaggerLogin');

// secure app for xss
app.use(helmet());

app.use(morgan('dev', { "stream": logger.stream}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// for CORS
app.use(function(req, res, next) {
  var origin = req.headers.origin;
  res.header("Access-Control-Allow-Origin", origin);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", true)
  next();
});

// 전체 API 문서
app.use('/v1/api-docs', swaggerUi.serveFiles(specs, {}), swaggerUi.setup(specs, customOptions));

// 특정 api 문서
app.use('/v1/api-doc/auth', swaggerUi.serveFiles(specsAuth, {}) , swaggerUi.setup(specsAuth, customOptions));
app.use('/v1/api-doc/login', swaggerUi.serveFiles(specsLogin, {}) , swaggerUi.setup(specsLogin, customOptions));


// API
app.use('/v1/jwttest', setJSON, require('./routes/testRoute'));

// health check
app.get('/v1/', async function (req, res, next) {
  res.status(200).send({
    message: "health Check successfully"
  })
});

// health check
app.get('/', async function (req, res, next) {
  res.status(200).send({
    message: "health Check successfully"
  })
});

function setJSON(req, res, next) {
  res.setHeader('content-type', 'application/json; charset=utf-8');
  next();
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {

  logger.info(req.originalUrl + " :: 404 Not Found");
  let message = common.setResultInfo(response.Http404.code, response.Http404.message, "404 Not Found");
  res.status(response.Http404.code).end(message)
});


// error handler
app.use(function(err, req, res, next) {

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'local' ? err : {};
  console.log("error : " + err.code + ", message : " + err.message);
  let message = common.setResultInfo(err.status || response.Http500.code, err.message || response.Http500.message, "Page Error");
  // render the error page
  res.status(err.status || response.Http500.code).send(message)
  
});

module.exports = app;
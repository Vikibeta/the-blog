var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var router = require('./routes/router');
var users = require('./routes/users');

//数据库实例
var settings = require('./settings');

var flash = require('connect-flash');


var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

//express上传插件
// var multer  = require('multer')
// var upload = multer({ dest: 'uploads/' })

var app = express();

app.use(session({
	resave: false,   //解除启动时的警告
    saveUninitialized: true,    //解除启动时的警告
	secret: settings.cookieSecret,
	key: settings.db, //cookie name
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 30
	}, //30 days
	store: new MongoStore({
		db: settings.db,
		host: settings.host,
		port: settings.port,
		url: 'mongodb://localhost/blog'  //需要添加url，不添加无法启动
	})
}));

// 设置模版视图目录
app.set('views', path.join(__dirname, 'views'));
// 设置是否启试图编译缓存
app.set('view cache', true);
// 设置运行何种模板引擎
app.set('view engine', 'ejs');

app.use(flash());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(router);
app.use('/users', users);

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

module.exports = app;
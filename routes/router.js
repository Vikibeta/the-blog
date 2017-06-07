var express = require('express');
var router = express.Router();

//中间件
var middleware_checklogin = require('../middleware/checkLogin');
var middleware_checkUnlogin = require('../middleware/checkUnlogin');

//首页控制器
var index = require("../controller/index");

//注册控制器
var reg = require("../controller/reg");
var reg_json = require("../controller/reg_json");

//登录控制器
var login = require("../controller/login");
var login_json = require("../controller/login_json");

//post,发表文章控制器
var post = require("../controller/post");
var post_json = require("../controller/post_json");

//上传控制器
var upload = require("../controller/upload");
var upload_json = require("../controller/upload_json");

//登出控制器
var logout = require("../controller/logout");


//首页界面
router.get("/",index);

//注册界面
router.get('/reg',middleware_checklogin, reg);
router.post('/reg',middleware_checklogin, reg_json);

//登录界面
router.get('/login',middleware_checklogin, login);
router.post('/login',middleware_checklogin, login_json);

//post界面
router.get('/post',middleware_checkUnlogin, post);
router.post('/post',middleware_checkUnlogin, post_json);

//上传界面
router.get('/upload',middleware_checkUnlogin, upload);
router.post('/upload',middleware_checkUnlogin, upload_json);

//登出界面
router.get('/logout',middleware_checkUnlogin, logout);


module.exports = router;

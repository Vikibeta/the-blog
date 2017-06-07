var crypto = require('crypto'),
	User = require('../models/user');

var login = function(req,res){
	//生成密码的md5值
	var md5 = crypto.createHash('md5'),
		password = md5.update(req.body.password).digest('hex');

	//检查用户是否存在
	User.get(req.body.name, function(err, user){
		if(!user){
			req.flash('error', '用户不存在!');
			return res.redirect('/login');//用户不存在，跳转到登录页
		}
		//检查密码是否一致
		if(user.password != password){
			req.flash('error', '密码错误!');
			return res.redirect('/login');//密码错误，跳转到登录页
		}
		//用户名和密码都匹配后，将用户信息存入session
		req.session.user = user;
		req.flash('success', '登录成功!');
		res.redirect('/');//登录成功后跳转到主页
	})

}

module.exports = login;
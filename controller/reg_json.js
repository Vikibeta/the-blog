var crypto = require('crypto'), //引入nodejs加密模块
	User = require('../models/user');

var reg = function(req,res){
	var name = req.body.name,
		password = req.body.password,
		password_re = req.body['password-repeat'];

	//判断不能为空
	if(!name){
		req.flash('error', '用户名不能为空!');
		return res.redirect('/reg');
	}
	if(!password){
		req.flash('error', '密码不能为空!');
		return res.redirect('/reg');
	}
	if(!password_re){
		req.flash('error', '密码不能为空!');
		return res.redirect('/reg');
	}
	//检验用户两次输入的密码是否一致
	if(password_re != password){
		req.flash('error', '两次输入的密码不一致!');
		return res.redirect('/reg');//返回注册页
	}

	//生成密码的md5值
	var md5 = crypto.createHash('md5'),//调用crypto的createHash方法，通过md5算法对明文进行哈希化
		password = md5.update(req.body.password).digest('hex'); //在上面的基础上添加明文password，更新之后将更新的内容进行十六制的吸收消化

	var newUser = new User({
		name: name,
		password: password,
		email: req.body.email
	})

	//检查用户名是否存在
	User.get(newUser.name, function(err, user){
		if(err){
			req.flash('error', err);
			return res.redirect('/');
		}
		if(user){
			req.flash('error', '用户名已存在!');
			return res.redirect('/reg');
		}
		//如果不存在则新增用户
		newUser.save(function(err, user){
			if(err){
				req.flash('error', err);
				return redirect('/reg');//注册失败，返回注册页
			}
			req.session.user = user; //用户信息存入session
			req.flash('success', '注册成功!');
			res.redirect('/');//注册成功后返回主页
		})
	})
}

module.exports = reg;
function checkLogin(req,res,next){
	//通过req.session保存用户信息
	if (req.session.user) {
		req.flash('error', '已登录!');
		res.redirect('back');//返回之前的页面
	}
	next();
}

module.exports = checkLogin;
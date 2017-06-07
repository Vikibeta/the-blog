function checkUnlogin(req,res,next){
	//通过req.session保存用户信息
	if(!req.session.user){
		req.flash('error', '未登录！');
		res.redirect('/login');//返回到登录页面
	}
	next();
}

module.exports = checkUnlogin;
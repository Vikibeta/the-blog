module.exports = function(req,res){
	res.render('login', {
		title: '登录页',
		user: req.session.user,
		success: req.flash('success').toString(),
		error: req.flash('error').toString()
	});
};
module.exports = function(req,res,next){
	res.render('post', {
		title: '发布页',
		user: req.session.user,
		success: req.flash('success').toString(),
		error: req.flash('error').toString()
	});
};
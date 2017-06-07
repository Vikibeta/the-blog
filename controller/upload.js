module.exports = function(req,res){
	res.render('upload', {
		title: '上传',
		user: req.session.user,
		success: req.flash('success').toString(),
		error: req.flash('error').toString()
	});
};
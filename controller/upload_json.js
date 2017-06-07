module.exports = function(req,res){
	req.flash('success', '文件上传成功!');
	res.redirect('/');
};
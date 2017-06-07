var Post = require('../models/post.js');

module.exports = function(req,res){
  var currentUser = req.session.user.ops[0],
      post = new Post(currentUser.name, req.body.title, req.body.post);

  post.save(function (err) {
    if (err) {
      req.flash('error', err);
      return res.redirect('/');
    }
    req.flash('success', '发布成功!');
    res.redirect('/');//发表成功跳转到主页
  });
};
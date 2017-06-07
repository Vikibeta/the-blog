var Post = require("../models/post");

module.exports = function(req,res,next){
  var name = '';
  if(req.session.user){
    if(req.session.user.ops){
      name = req.session.user.ops[0].name;
    }else{
      name = req.session.user.name;
    }
  }else{
    name = null;
  }

  Post.getAll(name, function (err, posts) {
    if (err) {
      posts = [];
    }
    res.render('index', {
      title: '主页',
      user: req.session.user,
      posts: posts,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });
};
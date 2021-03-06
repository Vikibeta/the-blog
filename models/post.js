//获取数据库实例
var MongoClient = require('./db'),
    assert = require('assert');
//引入markdown方法
var markdown = require('markdown').markdown;

function Post(name, title, post) {
    this.name = name;
    this.title = title;
    this.post = post;
}
module.exports = Post;

//读取文章及其相关信息
Post.getAll = function(name, callback) {
    MongoClient('posts', function(db, collection) {
        var query = {};
        if (name) {
            query.name = name;
        }

        if (name === null) {
            return callback(null); //失败！返回 err
        }

        //根据 query 对象查询文章
        collection.find(query).sort({
            time: -1 //根据时间排序，正数升序，负数降序
        }).toArray(function(err, docs) {
            if (err) {
                return callback(err); //失败！返回 err
            }
            docs.forEach(function(doc) {
                doc.post = markdown.toHTML(doc.post);
            })
            callback(null, docs); //成功！以数组形式返回查询的结果

            db.close();
        });
    })
}

//存储一篇文章及其相关信息
Post.prototype.save = function(callback) {
    var date = new Date();
    //存储各种时间格式，方便以后扩展
    var time = {
            date: date,
            year: date.getFullYear(),
            month: date.getFullYear() + "-" + (date.getMonth() + 1),
            day: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
            minute: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
                date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
        }
        //要存入数据库的文档
    var post = {
        name: this.name,
        time: time,
        title: this.title,
        post: this.post
    };
    //打开数据库
    //读取 posts 集合
    MongoClient('posts', function(db, collection) {
        //将文档插入 posts 集合
        collection.insert(post, {
            safe: true
        }, function(err) {
            db.close();
            if (err) {
                return callback(err); //失败！返回 err
            }
            callback(null); //返回 err 为 null
        });
    });
};
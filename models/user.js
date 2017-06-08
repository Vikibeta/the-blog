//数据库实例
var MongoClient = require('./db');

function User(user) {
    this.name = user.name;
    this.password = user.password;
    this.email = user.email;
}

module.exports = User;

//存储用户信息
User.prototype.save = function(callback) {
        //要存入数据库的用户文档
        var user = {
            name: this.name,
            password: this.password,
            email: this.email
        };

        //打开数据库
        //读取users集合
        MongoClient('users', function(db, collection) {
            // if (err) {
            //     db.close();
            //     return callback(err); //错误返回err信息
            // }
            //将用户数据插入users集合
            collection.insert(user, {
                safe: true
            }, function(err, user) {
                db.close();
                if (err) {
                    return callback(err); //错误 返回err信息
                }
                callback(null, user); //成功 err为null，并返回存储后的用户文档
            })
        })
    }
    //读取用户信息
User.get = function(name, callback) {
    //打开数据库
    //读取users集合
    MongoClient('users', function(db, collection) {
        // if (err) {
        //     db.close();
        //     return callback(err); //错误 返回err信息
        // }
        //查找用户名(name键)值为name的一个文档
        collection.findOne({
            name: name
        }, function(err, user) {
            db.close();
            if (err) {
                callback(err); //失败，返回err信息
            }
            callback(null, user); //成功，返回查询的用户信息
        })
    })
}
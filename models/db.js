var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

var url = "mongodb://localhost:27017/blog"

module.exports = function(name, callback) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err)

        var collection = db.collection(name)
        if (typeof collection === 'undefined') {
            db.createCollection(name)
            collection = db.collection(name)
        }
        if (typeof callback === 'function') {
            callback(db, collection)
        }
    })
}
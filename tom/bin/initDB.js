const entries = require('./data');

const mongo = require('mongodb').MongoClient;

mongo.connect('mongodb://10.172.3.201:27017/local').then(db => {
    const collection = db.collection('users');
    entries.forEach(entry => {
        console.log('Processing', entry);
        collection.insertOne(entry);
    });
    db.close();
    process.exit();
});

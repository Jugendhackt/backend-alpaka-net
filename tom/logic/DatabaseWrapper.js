const MongoClient = require('mongodb').MongoClient;
const Db = require('mongodb').Db;

const URI = 'mongodb://10.172.14.70:27017/local';

var instance = null;

/**
 * @returns {Promise<Db>}
 */
async function getInstance() {
    if(!instance) {
        instance = await MongoClient.connect(URI);
    }

    return instance;
}
exports.getInstance = getInstance;
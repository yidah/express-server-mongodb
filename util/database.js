// Mongo db
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
//private variable signal by _
let _db;
const mongoConnect = (callback) => {
  // connection string from cluster in MongoDB site
  MongoClient.connect(
    'mongodb+srv://yidah:yidah@cluster0.ym4dc.mongodb.net/shopdb?retryWrites=true&w=majority'
  )
    .then((client) => {
      console.log('connection successful!');
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};
// We return the connection but connect just once
const getDb= ()=>{
  if(_db){
    return _db;
  }
  throw 'No database found!!'
}
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

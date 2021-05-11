const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// needs to know how the data should look like 
// _id gets added automatically  
const productSchema = new Schema({
  title:{
    type:String,
    required: true
  },
  price: {
    type: Number,
    required:true
  },
  description: {
    type: String,
    required:true
  },
  imageUrl: {
    type: String,
    required:true
  }
})

// mongoose use the name of the model Product transforms it to products in Mongo db
module.exports = mongoose.model('Product', productSchema);

// const mongodb = require('mongodb');
// const getDb = require('../util/database').getDb;

// class Product {
//   constructor(title, price, description, imageUrl, id, userId) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this._id = id ? new mongodb.ObjectId(id): null;
//     this.userId = userId;
//   }
//   save() {
//     // database access
//     const db = getDb();
//     let dbOp;

//     if (this._id) {
//       // if id was passed then update
//       dbOp = db
//         .collection('products')
//         .updateOne({ _id: this._id }, { $set: this });
//     } else {
//       // create new document (similar to row in sql language) if not id passed
//       // if the collection  (similar to tables in sql) does not exist gets created
//       dbOp = db.collection('products').insertOne(this);
//     }
//     return dbOp
//       .then((result) => {
//         console.log(result);
//       })
//       .catch((err) => console(err));
//   }

//   static fetchAll() {
//     const db = getDb();
//     return db
//       .collection('products')
//       .find()
//       .toArray()
//       .then((products) => {
//         console.log(products);
//         return products;
//       })
//       .catch((err) => console.log(err));
//   }

//   static findById(prodId) {
//     const db = getDb();
//     // as mongo does not know there is only one item
//     // with this id returs "next" that gives us the last document return by find
//     // As mongoDB saves id as ObjectId{"6092969d71539b050c564df1"} we need to use ObjectId to convert it
//     return db
//       .collection('products')
//       .find({ _id: new mongodb.ObjectId(prodId) })
//       .next()
//       .then((product) => {
//         console.log(product);
//         return product;
//       })
//       .catch((err) => console.log(err));
//   }

//   static deleteById(prodId) {
//     const db = getDb();
//     return db
//       .collection('products')
//       .deleteOne({ _id: new mongodb.ObjectId(prodId) })
//       .then((result) => {
//         console.log('deleted!!');
//       })
//       .catch((err) => console.log(err));
//   }
// }

// module.exports = Product;

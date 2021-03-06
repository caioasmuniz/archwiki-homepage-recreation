// const { MongoClient, ServerApiVersion } = require('mongodb');
let client = require('mongodb').MongoClient;

module.exports = class Users { 
  static find(user) {
    return client
      .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
      })
      .then((client) => {
        let db = client.db("projeto3");
        return db.collection("users").findOne({ username: user });
      });
  } 

  static findEmail(email) {
    return client
      .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
      })
      .then((client) => {
        let db = client.db("projeto3");
        return db.collection("users").findOne({ email: email });
      });
  }
};

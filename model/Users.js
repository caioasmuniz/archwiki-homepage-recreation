// const { MongoClient, ServerApiVersion } = require('mongodb');
let client = require('mongodb').MongoClient;

module.exports = class Users { 
    
    static find() {
        return client
          .connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
          })
          .then((client) => {
            let db = client.db("projeto3");
            return db.collection("users").find().toArray();
          });
        
        
        // const uri = process.env.MONGODB_URI;
        // const client = new MongoClient(uri, {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        //     serverApi: ServerApiVersion.v1,
        // });
        // client.connect((err) => {
        //     const collection = client.db("projeto3").collection("users");
        //     // perform actions on the collection object
        //     client.close();
        // });
    }
}
  
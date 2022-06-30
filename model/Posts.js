let client = require('mongodb').MongoClient;
const { createHash } = require('crypto');

module.exports = class Posts{
    
    static postContent(content, nPublicacoes, id){ 
        return client
          .connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
          })
          .then((client) => {
            let db = client.db("projeto3");
            return db.collection("users").updateOne(
                {_id: id},
                { 
                    $push: { publicacoes: content},
                    $set: { numPublicacoes: nPublicacoes }                    
                }                
            );
          });             
    }

    static findNpublic() {
        return client
          .connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
          })
          .then((client) => {
            let db = client.db("projeto3");
            return db.collection("users").findOne();
          });
    }
    
} 


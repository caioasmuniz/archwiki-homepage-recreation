let client = require('mongodb').MongoClient;
const { createHash } = require('crypto');

module.exports = class Posts{
    
    static postContent(content){         
        let id;
        return client
          .connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
          })
          .then((client) => {
            let db = client.db("projeto3");
            db.collection("users").findOne()
            .then((user) => {
              id = user._id;              
              db.collection("users").updateOne(
                {_id: id},
                { 
                    $push: { publicacoes: content}                                        
                }                
              ).then(() => {
                client.close();
              })              
            })
          });             
    }

    static findPosts() {
      return client
        .connect(process.env.MONGODB_URI, {
          useNewUrlParser: true,
        })
        .then((client) => {
          let db = client.db("projeto3");
          db.collection("users").findOne()
          .then((user) => {
            client.close();
            return user.publicacoes;
          })
        });
      }
      
      static findUser() {
        return client
        .connect(process.env.MONGODB_URI, {
          useNewUrlParser: true,
        })
        .then((client) => {
          let db = client.db("projeto3");
          db.collection("users").findOne().then((users)=>{
            client.close();
            return users;
          });
          });
    }
    
    static findPosts(busca) {
        let result;
        return client
          .connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
          })
          .then((client) => {
            let db = client.db("projeto3");
            if(busca)
                db.collection("users").findOne({publicacoes: new RegExp('^' + busca)})
                  .then((user) => {
                    result = user.publicacoes
                    console.log(result + 'achou');
                    client.close();
                    return result;
                  });
            db.collection("users").findOne().then((users)=>{
              client.close();
              return users;
            });
          });
    }

    // static async findPosts(busca) {
    //   const conn = await client.connect(process.env.MONGODB_URI, {
    //     useNewUrlParser: true,
    //   })
    //   const db = conn.db();
    //   let result;
    //   if(busca){
    //     result = await db.collection('users').find({publicacoes: new RegExp('^' + busca)}).toArray();
    //     console.log(result + 'achou');
    //   }else{
    //     result = await db.collection("users").findOne();
    //     console.log(result + 'nao achou');
    //   }
    //   conn.close();
    //   return result;
      
    // }
    
} 


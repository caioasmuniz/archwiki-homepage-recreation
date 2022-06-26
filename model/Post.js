let client = require('mongodb').MongoClient;
const { createHash } = require('crypto');

module.exports = class Post{

    static hash(string) {
        return createHash('sha256').update(string).digest('hex');
      }
    
    static insert(data){

        return client.connect("mongodb+srv://admin:n6vxXNG4oC9LI60P@cluster-trabalho-web.pzrykdc.mongodb.net/?retryWrites=true&w=majority", {
            useNewUrlParser: true,                
        }).then((client) => {
            let db = client.db('projeto3');
            return db.collection('users').insertOne({                
                username: data.username,
                email: data.email,
                senha: this.hash(data.senha),                
                publicacoes: 0
            });
        })        
    }
}
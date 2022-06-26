let client = require('mongodb').MongoClient;
const { createHash } = require('crypto');

module.exports = class Post{

    static hash(string) {
        return createHash('sha256').update(string).digest('hex');
      }

    static ValidateUserCadastro(email, senha, user) {
      let error = false;
      const re =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if (!email.match(re) || email.length < 3) {
        error = true;
      }
      if (senha.length < 3) {
        error = true;
      }
      if(user == null){
        error = true;
      }
    
      return error;
    }
      
    
    static insert(data){
      let error = this.ValidateUserCadastro(data.email, data.senha, data.username);
      if(!error){
        return client
          .connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
          })
          .then((client) => {
            let db = client.db("projeto3");
            return db.collection("users").insertOne({
              username: data.username,
              email: data.email,
              senha: this.hash(data.senha),
              publicacoes: 0,
            });
          });
      }        
  }
} 
let client = require('mongodb').MongoClient;
const { createHash } = require('crypto');

module.exports = class Cadastro{

    static hash(string) {
        return createHash('sha256').update(string).digest('hex');
      }

    static ValidateUserCadastro(email, senha, user) {
      let error = false;
      const re =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if (!email.match(re) || email.length < 3) {
        console.log("Email inválido!!");
        error = true;
      }
      if (senha.length < 3) {
        console.log("A senha deve ter 6 caracteres no mínimo");
        error = true;
      }
      if(user == null){
        console.log("Insira um usuário válido");
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
              publicacoes: [],
              numPublicacoes: 0,
            });
          });
      }        
    }    
} 
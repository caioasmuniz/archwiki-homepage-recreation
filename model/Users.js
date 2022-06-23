const { MongoClient, ServerApiVersion } = require('mongodb');
// const MongoClient = require('mongodb').MongoClient;

module.exports = class Users { 
    
    static async find() {
        const conn = await MongoClient.connect("mongodb+srv://admin:n6vxXNG4oC9LI60P@cluster-trabalho-web.pzrykdc.mongodb.net/?retryWrites=true&w=majority");
        const db= conn.db('projeto3');
        return await db.collection('users').find().toArray()

        
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

    /* método do professor
    static async find() {
        const uri = "mongodb://mongo/exemplo01";
        const conn = await MongoClient.connect("mongodb://127.0.0.1:27017/exemplo01");
        const db= conn.db();
        return await db.collection('posts').find().toArray()

    }
    */
}
  
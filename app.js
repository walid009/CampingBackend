const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://127.0.0.1:27017'

const dbName = 'campingdb';

const client = new MongoClient(url);

client.connect(function(err){
    assert.equal(null,err)
    console.log("connexion etablie");
    const db = client.db(dbName);
    client.close();
})

/*const { MongoClient } = require("mongodb");

// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://dbWalidCamping:1234@campingdb.nslug.mongodb.net/dbWalidCamping?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    const database = client.db('camping');
    console.log("connexion etablie")
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);*/


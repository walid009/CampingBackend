const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://127.0.0.1:27017'

const dbName = 'campingdb';

const client = new MongoClient(url);

client.connect(function(err){
    assert.equal(null,err)
    const db = client.db(dbName);
    console.log("connexion etablie");
    insertDocumentsUtilisateur(db, function(){
    })
    insertDocumentsEvenement(db,function(){
    })
    insertDocumentsFeedBack(db,function(){
    })
    insertDocumentsFavorite(db,function(){
      client.close();
    })
})

const insertDocumentsUtilisateur = function(db, callback) {
  const collection = db.collection('utilisateur');
  collection.insertMany([
    {
      nom: "chek",
      prenom: "walid",
      email: "walid@gmail.com",
      password: "123",
      telephone: 5555555,
      role: "campeur",
      evenements: [
        {
          titre: "camping aindrahem",
          description: "1 nuit dans aindrahem",
          position:{
            Longitude: 123.0,
            Latitude: 34.0
          },
          createur:{
            nom: "org",
            prenom: "org",
            email: "org@gmail.com",
            password: "123",
            telephone: 66666666,
            role: "campeur"
          },
          participants:[
            {
              nom: "chek",
              prenom: "walid",
              email: "walid@gmail.com",
              password: "123",
              telephone: 5555555,
              role: "campeur"
            }
          ],
        }
      ]
    },
    {
      nom: "org",
      prenom: "org",
      email: "org@gmail.com",
      password: "123",
      telephone: 66666666,
      role: "organisateur",
      evenements: [
        {
          titre: "camping aindrahem",
          description: "1 nuit dans aindrahem",
          position:{
            Longitude: 123.0,
            Latitude: 34.0
          },
          createur:{
            nom: "org",
            prenom: "org",
            email: "org@gmail.com",
            password: "123",
            telephone: 66666666,
            role: "organisateur"
          },
          participants:[
            {
              nom: "chek",
              prenom: "walid",
              email: "walid@gmail.com",
              password: "123",
              telephone: 5555555,
              role: "campeur"
            }
          ],
        }
      ]
    },
    {
      nom: "adm",
      prenom: "adm",
      email: "adm@gmail.com",
      password: "123",
      telephone: 7777777,
      role: "admin"
    }
  ],function(err, result){
    assert.equal(err,null);
    //assert.equal(3, result.result.n);
    //assert.equal(3, result.ops.length);
    console.log("insertion de 3 utilisateurs");
    callback(result);
  });
}

const insertDocumentsEvenement = function(db, callback) {
  const collection = db.collection('evenement');
  collection.insertOne(
    {
      titre: "camping aindrahem",
      description: "1 nuit dans aindrahem",
      position:{
        Longitude: 123.0,
        Latitude: 34.0
      },
      createur:{
        nom: "org",
        prenom: "org",
        email: "org@gmail.com",
        password: "123",
        telephone: 66666666,
        role: "organisateur"
      },
      participants:[
        {
          nom: "chek",
          prenom: "walid",
          email: "walid@gmail.com",
          password: "123",
          telephone: 5555555,
          role: "campeur"
        }
      ]
    },function(err, result){
    assert.equal(err,null);
    //assert.equal(3, result.result.n);
    //assert.equal(3, result.ops.length);
    console.log("insertion d un evenement");
    callback(result);
  });
}
const insertDocumentsFeedBack = function(db, callback) {
  const collection = db.collection('feedback');
  collection.insertOne(
    {
      evenement:{
        titre: "camping aindrahem",
        description: "1 nuit dans aindrahem",
        position:{
          Longitude: 123.0,
          Latitude: 34.0
        },
        createur:{
          nom: "org",
          prenom: "org",
          email: "org@gmail.com",
          password: "123",
          telephone: 66666666,
          role: "organisateur"
        },
        participants:[
          {
            nom: "chek",
            prenom: "walid",
            email: "walid@gmail.com",
            password: "123",
            telephone: 5555555,
            role: "campeur"
          }
        ],
      },
      campeurs:[
        {
          nom: "chek",
          prenom: "walid",
          email: "walid@gmail.com",
          password: "123",
          telephone: 5555555,
          role: "campeur",
          commentaire: "j apprecie cette evenement",
          evaluation: 3
        }
      ]
    },function(err, result){
    assert.equal(err,null);
    //assert.equal(3, result.result.n);
    //assert.equal(3, result.ops.length);
    console.log("insertion d un feedback");
    callback(result);
  });
}

const insertDocumentsFavorite = function(db, callback) {
  const collection = db.collection('favorite');
  collection.insertOne(
    {
      evenements:[
        {
          titre: "camping aindrahem",
          description: "1 nuit dans aindrahem",
          position:{
            Longitude: 123.0,
            Latitude: 34.0
          },
          createur:{
            nom: "org",
            prenom: "org",
            email: "org@gmail.com",
            password: "123",
            telephone: 66666666,
            role: "organisateur"
          },
          participants:[
            {
              nom: "chek",
              prenom: "walid",
              email: "walid@gmail.com",
              password: "123",
              telephone: 5555555,
              role: "campeur"
            }
          ],
        }
      ],
      partager: false
    },function(err, result){
    assert.equal(err,null);
    //assert.equal(3, result.result.n);
    //assert.equal(3, result.ops.length);
    console.log("favorisation d un evenement");
    callback(result);
  });
}

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


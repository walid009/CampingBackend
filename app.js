const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
//const date = require(__dirname + "date.js")

const app = express()

//app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({ type: 'application/json' }))
//app.use(express.json)

const https = require('https');
const { response } = require('express');
//mongoose
mongoose.connect("mongodb://127.0.0.1:27017/campingDB", { useNewUrlParser: true });

const userSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  email: String,
  password: String,
  role: String,
  telephone: String,
  valid: Boolean
});
const eventSchema = new mongoose.Schema({
  titre: String,
  description: String,
  date: Date,
  position:{
    Longitude: Number,
    Latitude: Number
  },
  createur:userSchema,
  participants:[
   // {
      //campeur:
       userSchema
   // }
  ]
});

const Event = mongoose.model("Event", eventSchema)
const User = mongoose.model("User", userSchema)

app.listen(3000, function(){
  const today = new Date()
  console.log("Server started on port 3000 "+today);
})

app.get("/",function(request,response){
  response.send("secure")
});
//user
app.get("/users",function(request,response){
  User.find(function(err, users){
    if(err){
      console.log(err);
    }else{
      response.send(users);
    }
  });
})

app.post("/user/create",function(request,response){
  //console.log(request)
  const user = new User(request.body)
  user.save()
  console.log(user)
});

app.put("/user/confirm/:id",function(request,response){
  const { id } = request.params;
  console.log(request.body)
  User.updateOne({_id: id}, {valid: request.body.valid}
    ,function(err){
      if(err){
        console.log("failed");
      }else{
        console.log("success update");
      }
    })
  return response.send("update")
});

app.get("/login/:email",function(request,response){
  User.findOne({email: request.params.email},function(err, user){
    if(err){
      console.log(err);
    }else{
      //mongoose.connection.close();
      //events.forEach(function(event){
        //console.log(event.createur.nom);
      //});
      console.log(user)
      if(user === null){
        response.status(400);
      }else{
        response.status(200);
      }
      response.send(user)
    }
  });
});
//event
app.get("/events",function(request,response){
  Event.find(function(err, events){
    if(err){
      console.log(err);
    }else{
      //mongoose.connection.close();
      //events.forEach(function(event){
        //console.log(event.createur.nom);
      //});
      response.send(events);
    }
  });
});

app.post("/event/create",function(request,response){
  //console.log(request)
  const event = new Event(request.body)
  event.save()
  response.send(event)
});

app.put("/event/update/:id",function(request,response){
  const { id } = request.params;
  console.log(request.body)
  Event.updateOne({_id: id}, {titre: request.body.titre, description: request.body.description}
    ,function(err){
      if(err){
        console.log("failed");
      }else{
        console.log("success update");
      }
    })
  return response.send("update")
});

app.delete("/event/delete/:id" , function(req,res){
  console.log("en cour")
  const { id } = req.params;
  console.log(id)
  Event.findByIdAndRemove(id, function(err){
    if(!err){
      console.log("success")
    }else{
      console.log("failed")
    }
  })
  return res.send("deleted")
})
//camper participate to event
app.put("/event/participate/:id",function(request,response){
  const { id } = request.params;
  console.log(request.body)
  Event.updateOne({_id: id}, {participants: request.body}
    ,function(err){
      if(err){
        console.log("failed");
      }else{
        console.log("success update");
      }
    })
  return response.send("update")
});
app.put("/event/unparticipate/:id/:campeur",function(request,response){
  const { id } = request.params;
  console.log(request.body)
  Event.updateOne({_id: id}, {participants: []}
    ,function(err){
      if(err){
        console.log("failed");
      }else{
        console.log("success update");
      }
    })
  return response.send("update")
});
//shareEvent
const ShareEventSchema = new mongoose.Schema({
  titre: String,
  description: String,
  date: Date,
  position:{
    Longitude: Number,
    Latitude: Number
  }
});
const ShareEvent = mongoose.model("ShareEvent", ShareEventSchema)

app.get("/share/events",function(request,response){
  ShareEvent.find(function(err, shareevents){
    if(err){
      console.log(err);
    }else{
      //mongoose.connection.close();
      //events.forEach(function(event){
        //console.log(event.createur.nom);
      //});
      response.send(shareevents);
    }
  });
});

app.post("/share/event/create",function(request,response){
  console.log(request.body)
  const shareevent = new ShareEvent(request.body)
  shareevent.save()
  response.send(shareevent)
  return 
});
//Commentaire
const commentaireSchema = new mongoose.Schema({
  idEvent: String,
  idCampeur: String,
  commentaire: String
});
const Commentaire = mongoose.model("Commentaire", commentaireSchema)

app.get("/share/events/commentaires",function(request,response){
  Commentaire.find(function(err, commentaires){
    if(err){
      console.log(err);
    }else{
      //mongoose.connection.close();
      //events.forEach(function(event){
        //console.log(event.createur.nom);
      //});
      response.send(commentaires);
    }
  });
});

app.post("/share/event/commentaire/create",function(request,response){
  console.log(request.body)
  const commentaire = new Commentaire(request.body)
  commentaire.save()
  response.send(commentaire)
  return 
});

/*
mongoose.connect("mongodb://127.0.0.1:27017/campingDB", { useNewUrlParser: true });

const userSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  email: String,
  password: String,
  telephone: Number,
  role: String
})

const eventSchema = new mongoose.Schema({
    titre: String,
    description: String,
    position:{
      Longitude: Number,
      Latitude: Number
    },
    createur:{
      nom: String,
      prenom: String,
      email: String,
      password: String,
      telephone: Number,
      role: String
    },
    participants:[
      {
        campeur: userSchema
      }
    ]
});

const Event = mongoose.model("Event", eventSchema)
const User = mongoose.model("User", userSchema)

const user = new User({
  nom: "chek",
  prenom: "walid",
  email: "walid@gmail.com",
  password: "123",
  telephone: 5555555,
  role: "campeur"
})
//user.save()
const organisateur = new User({
  nom: "organisa",
  prenom: "organisa updated",
  email: "org@gmail.com",
  password: "123",
  telephone: 66666666,
  role: "organisateur"
})

const event = new Event({
  titre: "camping aindrahem new",
  description: "1 nuit dans aindrahem",
  position:{
      Longitude: 123.5,
      Latitude: 34.76
    }, 
  createur: organisateur,
      participants:[
        {
          campeur: user
        }
      ]
})
//event.save();

/*Event.updateOne({name: "org"}, {createur: organisateur}, function(err){
  if(err){
    console.log(err);
  }else{
    console.log("Succesfully updated")
  }
})*/
/*
Event.find(function(err, events){
  if(err){
    console.log(err);
  }else{
    mongoose.connection.close();
    events.forEach(function(event){
      console.log(event.createur.nom);
    });
  }
})

/*Event.deleteMany({titre: "camping aindrahem"}, function(err){
  if(err){
    console.log(err);
  } else {
    console.log("delete succcefully")
  }
})*/

/*
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

const { MongoClient } = require("mongodb");

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


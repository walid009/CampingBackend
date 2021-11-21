const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    nom: String,
    prenom: String,
    email: String,
    password: String,
    role: String,
    telephone: String,
    valid: Boolean,
  },
  {
    timestamps: true,
  }
);

const eventSchema = new mongoose.Schema(
  {
    titre: String,
    description: String,
    date: Date,
    position: {
      Longitude: Number,
      Latitude: Number,
    },
    createur: userSchema,
    participants: [userSchema],
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", eventSchema);

module.exports = { Event };

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
    resetpwd: String
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema)

module.exports = { User }
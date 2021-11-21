const { User } = require("../models/user.model")
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')
const md5 = require("md5")

module.exports = {
  getAllUser: async (req, res) => {
    const users = await User.find();
    res.send(users);
  },
  EmailExist: async(req, res) => {
    const { email } = req.params
    const isUserFound = await User.findOne({ email });

    if (isUserFound) {
      return res.json({ exist: true });
    }
    return res.json({ exist: false });
  },
  createUser: async (req, res) => {
    const { nom, prenom, email, role, telephone, valid } = req.body;
    const mdp = req.body.password

    const isUserFound = await User.findOne({ email });

    if (isUserFound) {
      return res.status(404).json({ created: false, message: "Alredy exist" });
    }

    const user = new User({
      nom,
      prenom,
      email,
      password: md5(mdp),
      role,
      telephone,
      valid,
    });

    await user.save();
    res.json(user);
  },

  updateUser: async (req, res) => {
    const { id } = req.params;
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const telephone = req.body.telephone;
    User.updateOne({ _id: id }, { nom, prenom, telephone }, function (err) {
      if (err) {
        console.log("failed");
      } else {
        console.log("success update user");
      }
    });
    return res.send("update");
  },

  updateValidationOrginasateur: async (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    User.updateOne({ _id: id }, { valid: req.body.valid }, function (err) {
      if (err) {
        console.log("failed");
      } else {
        console.log("success update");
      }
    });
    return res.send("update");
  },

  findUserByEmail: async (req, res) => {
    const user = await User.findOne({ email: req.params.email });
    if (user) {
      return res.json(user);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  },
  login: async (req, res) => {
    const password = req.body.password;
    const email = req.body.email;
    const user = await User.findOne({ email: email });
    if (user) {
      if (md5(password) == user.password) {
        jwt.sign({ email }, "secretkey", (err, token) => {
          if (token) {
            return res.json({
              token,
            });
          }
        });
        //return res.json(user);
      } else {
        res.json({ message: "Authentication Failed", success: false });
      }
    } else {
      res.json({ message: "Authentication Failed", success: false });
    }
  },
  authenticate: (req, res, next) => {
    const headers = req.headers["authorization"];
    if (headers) {
      const bearer = headers.split(" ");
      const token = bearer[1];
      jwt.verify(token, "secretkey", (err, authData) => {
        if (err) {
          res.json({ message: "Invalid token" });
        } else {
          const email = authData.email;
          const user = User.findOne({ email: email }, function (err, user) {
            if (user) {
              next();
            } else {  
              res.json({message: "Unauthorized access",
            });
          }
            /*if (user) {
              if (id == user._id) {
                next();
              } else {
                res.json({
                  message: "you're token ne correspend pas a votre compte",
                });
              }
            }*/
          });
        }
      });
    } else {
      res.json({ message: "Unauthorized access header" });
    }
  },
};
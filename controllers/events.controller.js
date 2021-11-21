const { Event } = require("../models/event.model");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')

module.exports = {
  getAllEvent: async (req, res) => {
    const events = await Event.find();
    res.send(events);
  },
  createEvent: async (req, res) => {
    const { titre, description } = req.body;
    const event = new Event({ titre, description });
    await event.save();
    res.send(event);
  },
  updateEvent: (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    Event.updateOne(
      { _id: id },
      { titre: req.body.titre, description: req.body.description },
      function (err) {
        if (err) {
          console.log("failed");
        } else {
          console.log("success update");
        }
      }
    );
    return res.send("update");
  },

  deleteEvent: (req, res) => {
    console.log("en cour");
    const { id } = req.params;
    console.log(id);
    Event.findByIdAndRemove(id, function (err) {
      if (!err) {
        console.log("success");
      } else {
        console.log("failed");
      }
    });
    return res.send("deleted");
  },
};

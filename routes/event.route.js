const express = require("express");
const eventsController = require("../controllers/events.controller");
const router = express.Router();

const eventController = require("../controllers/events.controller");
const userController = require("../controllers/users.controller")

/**
 * @Path /events
 */
 router.get("/", userController.authenticate, eventController.getAllEvent)
 router.post("/create", eventController.createEvent)
 router.put("/update/:id", eventController.updateEvent)
 router.delete("/delete/:id", eventController.deleteEvent)
 router.put("/participate/:id",eventsController.participateToEvent)
 router.get("/UserAlreadyParticipate/:_id/:email",eventController.UserAlreadyParticipate)

 module.exports = router;
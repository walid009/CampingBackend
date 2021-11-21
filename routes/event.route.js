const express = require("express");
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
 
 module.exports = router;
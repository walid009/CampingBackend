const express = require("express");
const eventsController = require("../controllers/events.controller");
const router = express.Router();

const eventController = require("../controllers/events.controller");
const userController = require("../controllers/users.controller")
const upload = require('../midlleware/storage');

/**
 * @Path /events
 */

  /**
 * @swagger
 * /events/:
 *   get:
 *     summary: Get all events token required
 *     tags: [Events]
 *     description: use to get all events
 *     responses: 
 *       '200':
 *         description: A successful response
 */
 router.get("/", userController.authenticate, eventController.getAllEvent)
 router.post("/create",upload.single('image') ,eventController.createEvent)
 router.post("/createWithoutImage",eventController.createEventWithoutImage)
  router.put("/update/:id", eventController.updateEvent)
 /**
 * @swagger
 * /events/delete/{id}:
 *   delete:
 *     summary: Remove the event by id
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The event id
 * 
 *     responses:
 *       200:
 *         description: The book was deleted
 *       404:
 *         description: The book was not found
 */
 router.delete("/delete/:id", eventController.deleteEvent)
 router.put("/participate/:id",eventsController.participateToEvent)
  /**
 * @swagger
 * /events/UserAlreadyParticipate/{id}/{email}:
 *   get:
 *     summary: check if user already participate to event 
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The event id
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: The user email
 *     responses: 
 *       '200':
 *         description: A successful response
 */
 router.get("/UserAlreadyParticipate/:_id/:email",eventController.UserAlreadyParticipate)

 module.exports = router;
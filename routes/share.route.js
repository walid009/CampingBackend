const express = require("express");
const sharesController = require("../controllers/shares.controller");
const router = express.Router();

/**
 * @Path /shares
 */

 router.get("/", sharesController.getAllShareEvent)
 router.post("/create", sharesController.createEvent)
 router.patch("/LikeOrUnlike/:_id/:emailcampeur", sharesController.CheckLikeOrUnlikeAndUpdate)
 router.get("/likeReturnData/:_id/:emailcampeur", sharesController.countLikeAndReturnIsliked)
 module.exports = router;
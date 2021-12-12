const express = require("express");
const commentairesController = require("../controllers/commentaire.controller");
const router = express.Router();

/**
 * @Path /commentaires
 */
 router.get("/:idEvent", commentairesController.getAllCommentaireOfOneShareEvent)
 router.post("/create", commentairesController.createCommentaire)

 module.exports = router;
const express = require("express");
const router = express.Router();

const userController = require("../controllers/users.controller");


/**
 * @Path /users
 */

 router.get("/",userController.getAllUser)
 router.post("/create",userController.createUser)
 router.get("/confirm/:id",userController.updateValidationOrginasateur)
 router.get("/getUser/:email",userController.authenticate,userController.findUserByEmail)
 router.put("/update/:id",userController.authenticate,userController.updateUser)
 router.post("/login",userController.login)
 router.post("/loginGmail",userController.loginGmail)
 router.get("/emailexist/:email",userController.EmailExist)
 router.get("/getUserWithoutAuthenticate/:email",userController.findUserByEmail)
 router.put("/resetpassword/:email",userController.sendMailForgetPassword)
 router.get("/checkKeyReset/:email/:resetpwd",userController.checkKeyReset)
 router.put("/sendmodifiedpassword/:email/:password",userController.sendModifiedPassword)
 
 module.exports = router;
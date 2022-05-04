const router = require("express").Router();
const { signup, login } = require("../controllers/user.controller");
/**
 * @swagger
 * 
 */
router.post("/signup", (req, res) => signup(req, res));
/**
 * @swagger
 * 
 */
router.post("/login", (req, res) => login(req, res));
module.exports = router;

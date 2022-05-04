const router = require("express").Router();
const { signup, login } = require("../controllers/user.controller");
/**
 * @swagger
<<<<<<< HEAD
 * /user/signup:
 *  post:
 *   description: Signup a new user
 */
router.post("/signup", (req, res) => signup(req, res));
=======
 *
 */
router.post("/signup", (req, res) => signup(req, res));
/**
 * @swagger
 *
 */
>>>>>>> 431125d87ab63a55206bf215b51bd51080c33239
router.post("/login", (req, res) => login(req, res));
module.exports = router;

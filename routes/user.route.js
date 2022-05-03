const router = require("express").Router();
const { signup, login } = require("../controllers/user.controller");
const { auth } = require("../middlewares/auth.middleware");
// user
router.post("signup", signup);
router.post("login",auth, login);
module.exports = router;

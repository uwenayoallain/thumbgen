const router = require("express").Router();
const { signup, login } = require("../controllers/user.controller");
// user
router.post("user/signup", signup);
router.post("user/login", login);
module.exports = router;

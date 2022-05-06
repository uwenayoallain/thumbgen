const router = require("express").Router();
const { signup, login, patch } = require("../controllers/user.controller");
const { auth } = require("../middlewares/auth.middleware");

//user/signup
/**
 * @route POST /user/signup
 * @group User
 * @param {string} username.body.required - Username
 * @param {string} email.body.required - Email
 * @param {string} password.body.required - Password
 * @returns {object} 200 - User object
 * @returns {Error}  400 - Missing required fields
 * @returns {Error}  400 - User already exists
 * @returns {Error}  500 - Internal server error
 * @returns {Error}  500 - Validation error
 * @returns {Error}  500 - User not found
 */
router.post("/signup", (req, res) => signup(req, res));
router.get("/signup", (req, res) => res.send("Signup Route"));
//user/login
/**
 * @route POST /user/login
 * @group User
 * @param {string} email.body.required - Email
 * @param {string} password.body.required - Password
 * @returns {object} 200 - User object
 * @returns {Error}  400 - Missing required fields
 * @returns {Error}  400 - User not found
 * @returns {Error}  400 - Incorrect password
 * @returns {Error}  500 - Internal server error
 * @returns {Error}  500 - Validation error
 */
router.post("/login", (req, res) => login(req, res));
router.get("/login", (req, res) => res.send("Login Route"));

//user/patch
router.get("/patch", (req, res) => res.send("Patch Route"));
router.post("/patch", auth, (req, res) => patch(req, res));
//user/thumbnail
// router.get("/thumbnail", (req, res) => res.send("Thumbnail Route"));
// router.post("/thumbnail", auth, (req, res) => res.send("Thumbnail Route"));
module.exports = router;

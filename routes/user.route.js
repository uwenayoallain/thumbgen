const router = require("express").Router();
const { signup, login } = require("../controllers/user.controller");
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
module.exports = router;

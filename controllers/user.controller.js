const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const logger = require("../utils/Logging");
const { createToken } = require("../utils/jwt");
const { sendError } = require("../utils/utils");

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);
  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    if (await User.findOne({ username })) {
      return sendError(400, "Username already exists", res);
    }
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });
    const validationErrors = await user.validationErrors({
      username,
      email,
      password,
    });
    if (validationErrors) return res.status(400).send(validationErrors);
    await user.save();
    return res.status(201).json({
      message: "User created successfully",
    });
  } catch (e) {
    logger("error", e);
    return sendError(500, e, res);
  }
};

const login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user)
        return res.status(400).json({ message: "Email does not exist" });
      if (!user.checkPassword(password))
        return res.status(400).json({ message: "Password is incorrect" });
      res.json(createToken(user.toJSON()));
    })
    .catch((err) => res.json(err) && logger("error", err));
};

module.exports = {
  signup,
  login,
};

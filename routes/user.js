const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const logger = require("../utils/Logging");
const { createToken } = require("../utils/jwt");
const { sendError } = require("../utils/utils");

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
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
    const token = createToken(user.toJSON());
    return res.status(201).json({
      message: "User created successfully",
      token,
    });
  } catch (e) {
    logger("error", e);
    return sendError(500, e, res);
  }
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user)
        return res.status(400).json({ message: "Email does not exist" });
      if (!user.checkPassword(password))
        return res.status(400).json({ message: "Password is incorrect" });
      res.json(createToken(user));
    })
    .catch((err) => res.json(err) && logger("error", err));
});

module.exports.userRouter = router;

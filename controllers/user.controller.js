const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const logger = require("../utils/Logging");
const { createToken } = require("../utils/jwt");
const { sendError, sendMessage } = require("../utils/utils");
const _ = require("lodash");
const jsonPatch = require("jsonpatch");

const signup = async (req, res) => {
  const { username, email, password } = _.pick(req.body, [
    "username",
    "email",
    "password",
  ]);
  if (!username || !email || !password)
    return sendError(500, "Missing required fields", res);
  try {
    const hashedPassword = bcrypt.hashSync(password, 10);

    if ((await User.findOne({ username })) || (await User.findOne({ email }))) {
      return sendError(500, "User already exists", res);
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
    if (validationErrors) return sendError(500, validationErrors, res);
    await user.save();
    return sendMessage(201, "User created successfully", res);
  } catch (e) {
    logger("error", e);
    return sendError(500, e, res);
  }
};

const login = (req, res) => {
  const { email, password } = _.pick(req.body, ["email", "password"]);
  if (!email || !password)
    return sendError(500, "Missing required fields", res);
  User.findOne({ email })
    .then((user) => {
      if (!user) return sendError(500, "User not found", res);
      if (!user.checkPassword(password))
        return sendError(500, "Incorrect password", res);
      return sendMessage(
        200,
        "User logged in succcessfully",
        res,
        createToken(user.toJSON())
      );
    })
    .catch((e) => {
      logger("error", e);
      return sendError(500, e, res);
    });
};

const patch = (req, res) => {
  // apply json patch
  const { json, patch } = _.pick(req.body, ["json", "patch"]);
  if (!json || !patch) return sendError(500, "Missing required fields", res);
  const patchedJson = jsonPatch.apply_patch(json, patch);
  return sendMessage(200, "Patched successfully", res, patchedJson);
};

const generateThumbnail = (req, res) => {
  const { url } = _.pick(req.body, ["url"]);
  if (!url) return sendError(500, "Missing required fields", res);
};

module.exports = {
  signup,
  login,
  patch,
  generateThumbnail,
};

const resp = (code, message, res, type = "Error", restype = "json") => {
  return res.status(code)[restype]({ type, message });
};

const sendError = (code, e, res) => {
  return res.status(code).json({ type: "Error", message: e });
};

const sendMessage = (code, message, res, payload) => {
  return res.status(code).json({ type: "Success", message, payload });
};

module.exports = {
  resp,
  sendError,
  sendMessage,
};

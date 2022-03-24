const resp = (code, message, res, type = "Error", restype = "json") => {
  return res.status(code)[restype]({ type, message });
};

const sendError = (code, e, res) => {
  return resp(code, e, res);
};

const sendMessage = (code, message, res) => {
  return resp(code, message, res);
};

module.exports = {
  resp,
  sendError,
  sendMessage,
};

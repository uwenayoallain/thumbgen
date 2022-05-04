var bunyan = require("bunyan");
var log = bunyan.createLogger({
  name: "backend",
  streams: [
    {
      level: "info",
      path: "./logs/info.log",
    },
    {
      level: "error",
      path: "./logs/error.log",
    },
    {
      level: "debug",
      stream: process.stdout,
    },
  ],
});

function logger(type = "error", message) {
  if (process.env.NODE_ENV === "production") {
    log[type](message);
  } else {
    console[type](message);
  }
}

module.exports = logger;

const mongoose = require("mongoose");
const logger = require("../utils/Logging");
function connection() {
  return mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {})
    .catch((err) => {
      logger("error", err);
    });
}
module.exports = connection;

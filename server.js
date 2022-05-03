const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const userRoutes = require("./routes/user.route");
const port = process.env.PORT || 3000;
require("dotenv").config({ path: ".env" });
require("./utils/dbConnect")();
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ extended: true }));
app.use("/user", userRoutes);
app.listen(port, () => {
  console.log("Server started on port " + port);
});
module.exports = app;

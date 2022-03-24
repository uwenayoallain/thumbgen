const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./utils/dbConnect");
const morgan = require("morgan");
const {userRouter} = require("./routes/user");
require("dotenv").config({ path: ".env" });
const port = process.env.PORT || 8080;
connection();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ extended: true }));
app.use("/user", userRouter);
app.listen(port, () => {
  console.log("Server started on port " + port);
});

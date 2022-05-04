const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const userRoutes = require("./routes/user.route");
const swaggerUi = require("swagger-ui-express");
const port = process.env.PORT || 3000;
require("dotenv").config({ path: ".env" });
require("./utils/dbConnect")();
const app = express();
const swaggerDocs = require("./swagger.json");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(cors());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json({ extended: true }));
app.use("/user", userRoutes);
app.listen(port);
module.exports = app;

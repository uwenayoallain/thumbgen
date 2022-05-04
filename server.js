const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const userRoutes = require("./routes/user.route");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const port = process.env.PORT || 3000;
require("dotenv").config({ path: ".env" });
require("./utils/dbConnect")();
const app = express();
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "ThumbGen API",
      description: "ThumbGen API Information",
      contact: {
        name: "UWENAYO Alain Pacifique",
        email: "uwenayoallain@gmail.com",
        social: {
          github: "http://github.com/uwenayoallain",
          linkedin: "http://linkedin.com/in/uwenayoallain",
          twitter: "http://twitter.com/uwenayoallain",
        },
      },
      servers: [process.env.HOST + ":" + process.env.PORT],
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(cors());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json({ extended: true }));
app.use("/user", userRoutes);
app.listen(port, () => {
  console.log("Server started on port " + port);
});
module.exports = app;

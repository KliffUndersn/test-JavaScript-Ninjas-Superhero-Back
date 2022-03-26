const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();

const superheroes = require("./routes/api/superheroes");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/superheroes", superheroes);

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "SuperheroDB",
      description: "have fun",
      contact: {
        email: "KliffUndersn90@gmail.com",
      },
      servers: ["heroku"],
    },
  },
  apis: [".swagger.yaml"],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api/dev-superhero", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message: err.message });
});

module.exports = app;

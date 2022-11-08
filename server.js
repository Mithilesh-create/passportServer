require("dotenv").config();
require("./db");
const express = require("express");
const app = express();

const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const router = require("./Quote");
const auth = require("./Quote/auth");
const port = process.env.PORT || 4000;

app.use(auth);
app.use("/crud", router);
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "BackendSwag API",
      version: "1.0.0",
      description: "A simple intern project api backend API",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    // security: [
    //   {
    //     bearerAuth: [],
    //   },
    // ],
  },

  servers: [
    {
      url: "http://localhost:5000",
    },
  ],
  apis: ["./Quote/*.js"],
};

const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

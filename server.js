require("dotenv").config();
require("./db");
const express = require("express");
const app = express();

const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const router = require("./Quote");
const auth = require("./Quote/auth");
const port = process.env.PORT;

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
  },

  servers: [
    {
      url: "http://localhost:8080",
    },
  ],
  apis: ["./Quote/*.js"],
};

const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.get("/doc",(req,res)=>{
  res.status(200).send(specs)
})
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

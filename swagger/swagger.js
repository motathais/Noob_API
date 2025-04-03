const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Noob",
      version: "1.0.0",
      description: "Documentação API do Projeto Noob com Swagger",
    },
    servers: [
      {
        url: "http://localhost:8001", // Altere conforme necessário
        description: "Servidor local",
      },
    ],
  },
  apis: ["./routes/router.js"],
   // Caminho para os arquivos de rotas com a documentação
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;

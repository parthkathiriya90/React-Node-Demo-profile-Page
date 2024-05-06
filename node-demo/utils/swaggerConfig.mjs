import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "React Redux Demo",
      version: "1.0.0",
      description: "",
    },
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  apis: ["./routes/*.mjs"], // Path to the API routes folder
};

const specs = swaggerJsdoc(options);
export default specs;

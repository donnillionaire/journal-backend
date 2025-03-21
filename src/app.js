require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger.json");

const { connectDB } = require("./config/db");
// const journalRoutes = require("./routes/journalRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// 🛡️ Security Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// 🔹 API Documentation (Only in Development)
if (process.env.NODE_ENV !== "production") {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

// 📌 Routes
// app.use("/api/journals", journalRoutes);
app.use("/api/auth", authRoutes);

// 🛑 Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

module.exports = app;

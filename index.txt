require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const authRoutes = require("./routes/authRoutes");




const app = express();
app.use(express.json()); // Middleware to parse JSON
app.use("/api/auth", authRoutes);



// Swagger Definition
const swaggerOptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Journal API",
        version: "1.0.0",
        description: "API documentation for the Journal backend",
      },
      servers: [
        {
          url: "http://localhost:3000",
          description: "Local server",
        },
      ],
    },
    apis: ["./routes/*.js"], // Path to API docs
  };


  // Initialize Swagger Docs
const swaggerSpec = swaggerJsdoc(swaggerOptions);


// ✅ Enable Swagger only in Development
if (process.env.NODE_ENV !== "production") {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log("Swagger Docs available at http://localhost:3000/api-docs");

}







// Protected Route (Requires Authentication)
app.get('/dashboard', verifyToken, (req, res) => {
    res.json({ message: `Welcome, ${req.user.username}! This is a protected route.` });
});

// Middleware to Verify Token
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) return res.status(403).json({ error: 'Access denied' });

    jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(401).json({ error: 'Invalid token' });

        req.user = user;
        next();
    });
}

// Start the server
app.listen(3000, () => {
    console.log('Server running on PORT:3000');
});

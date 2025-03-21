const app = require("./src/app"); // ✅ Correct path to app.js
const { connectDB } = require("./src/config/db"); // ✅ Correct path to db.js

const PORT = process.env.PORT || 3000;

// 🚀 Connect to DB & Start Server
connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});

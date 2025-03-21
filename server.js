const app = require("./app");
const { connectDB } = require("./config/db");

const PORT = process.env.PORT || 3000;

// 🚀 Connect to DB & Start Server
connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});

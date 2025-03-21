const { Sequelize } = require("sequelize");

// Connect without specifying the DB (to create it)
const sequelize = new Sequelize("postgres", process.env.PG_USER, process.env.PG_PASSWORD, {
  host: process.env.PG_HOST,
  dialect: "postgres",
});

// Create DB if not exists
const createDatabase = async () => {
  try {
    await sequelize.query(`CREATE DATABASE ${process.env.PG_DATABASE}`);
    console.log(`✅ Database "${process.env.PG_DATABASE}" created (if not exists)`);
  } catch (error) {
    if (error.original?.code !== "42P04") {
      console.error("❌ Error creating database:", error);
    } else {
      console.log("✅ Database already exists");
    }
  }
};

// Connect to the actual database
const connectDB = async () => {
  await createDatabase();

  const sequelizeDB = new Sequelize(process.env.PG_DATABASE, process.env.PG_USER, process.env.PG_PASSWORD, {
    host: process.env.PG_HOST,
    dialect: "postgres",
    logging: false,
  });

  try {
    await sequelizeDB.authenticate();
    console.log("🚀 PostgreSQL connected successfully!");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
    process.exit(1);
  }
};

module.exports = { connectDB };

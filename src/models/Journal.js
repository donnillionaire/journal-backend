const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Journal = sequelize.define("Journal", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Journal;

const { Sequelize } = require("sequelize");

// Create a Sequelize instance and connect to your MySQL database
const sequelize = new Sequelize(
  "mysql://root:password@localhost:3306/inventory_management",
  {
    dialect: "mysql",
    logging: false, // Disable logging for clean output
  }
);

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

testConnection();

module.exports = sequelize;

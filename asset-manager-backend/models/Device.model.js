// Device.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig"); // Import without 'new Sequelize()'

const Device = sequelize.define("devices", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  asset_tag: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  location: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "Active",
    validate: {
      isIn: [
        [
          "Maintenance",
          "Active",
          "Inactive",
          "Unavailable",
          "Reserved",
          "Decommissioned",
        ],
      ],
    },
  },
  assigned_to: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  warranty_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  serial_number: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [10, 10], // Ensuring exactly 10 characters
      isNumeric: true,
    },
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Device;

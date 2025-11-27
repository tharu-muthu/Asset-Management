const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Asset = sequelize.define('Asset', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.ENUM('Hardware', 'Software', 'Furniture', 'Vehicle'),
        defaultValue: 'Hardware'
    },
    value: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('Available', 'In Use', 'Maintenance', 'Retired'),
        defaultValue: 'Available'
    },
    purchaseDate: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW
    }
});

module.exports = Asset;
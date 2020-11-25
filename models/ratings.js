const {DataTypes} = require('sequelize');
const db = require('../db');

const Rating = db.define('rating', {
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    movieId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    
})

module.exports = Rating
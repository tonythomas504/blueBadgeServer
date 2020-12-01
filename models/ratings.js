const {DataTypes} = require('sequelize');
const db = require('../db');

const Rating = db.define('rating', {
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
            max: 10
          }
    },
    movieId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER
}})

module.exports = Rating
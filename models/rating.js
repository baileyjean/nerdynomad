'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    static associate(models) {
      Rating.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      Rating.belongsTo(models.SciCenter, {
        foreignKey: 'scicenter_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }
  Rating.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id'
        }
      },
      scicenter_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'scicenters',
          key: 'id'
        }
      },
      stars: {
        type: DataTypes.ENUM,
        values: ['1', '2', '3', '4', '5'],
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Rating',
      tableName: 'ratings'
    }
  )
  return Rating
}
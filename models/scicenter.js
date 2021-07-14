'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class SciCenter extends Model {
    static associate(models) {
      SciCenter.belongsTo(models.User, {
        foreignKey: 'user_id',

        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      SciCenter.hasMany(models.Comment, {
        foreignKey: 'scicenter_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      SciCenter.hasMany(models.Rating, {
        foreignKey: 'scicenter_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }
  SciCenter.init(
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
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false
      },
      street: {
        type: DataTypes.STRING,
        allowNull: true
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false
      },
      zip: {
        type: DataTypes.STRING,
        allowNull: false
      },
      website: {
        type: DataTypes.STRING,
        allowNull: true
      },
      priceRange: {
        type: DataTypes.ENUM,
        values: [
                  'free/donation',
                  '$2 - $5',
                  '$6 - $10',
                  '$11 - $15',
                  '$16 - $20',
                  '$21 - $25',
                  '$26 - $30',
                  '$31 - $35',
                  '$36 - $40',
                  '$42+ per person'
                ],
        allowNull: false
      },
      description: {
        type: DataTypes.STRING(1000),
        allowNull: true
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'SciCenter',
      tableName: 'scicenters'
    }
  )
  return SciCenter
}
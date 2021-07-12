'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class SciCenter extends Model {
    static associate(models) {
      SciCenter.belongsTo(models.User, {
        foreignKey: 'owner_id',

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
        type: DataTypes.ENUM,
        values: [
          'Alabama',
          'Alaska',
          'Arizona',
          'Arkansas',
          'California',
          'Colorado',
          'Connecticut',
          'Delaware',
          'District of Columbia (DC)',
          'Florida',
          'Georgia',
          'Hawaii',
          'Idaho',
          'Illinois',
          'Indiana',
          'Iowa',
          'Kansas',
          'Kentucky',
          'Louisiana',
          'Maine',
          'Maryland',
          'Massachusettes',
          'Michigan',
          'Minnesota',
          'Mississippi',
          'Missouri',
          'Montana',
          'Nebraska',
          'Nevada',
          'New Hampshire',
          'New Jersey',
          'New Mexico',
          'New York',
          'North Carolina',
          'North Dakota',
          'Ohio',
          'Oklahoma',
          'Oregon',
          'Pennsylvania',
          'Rhode Island',
          'South Carolina',
          'South Dakota',
          'Tennessee',
          'Texas',
          'Utah',
          'Vermont',
          'Virginia',
          'Washington',
          'West Virginia',
          'Wisconsin',
          'Wyoming'
        ],
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
        type: DataTypes.INTEGER,
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
        type: DataTypes.STRING,
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
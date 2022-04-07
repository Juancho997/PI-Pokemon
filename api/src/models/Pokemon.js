const { DataTypes, UUIDV4 } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('pokemon', {
    
    id : {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    
    name: {
      type: DataTypes.STRING,
    },
    
    image:{
      type: DataTypes.STRING
    },

    hp:{
      type: DataTypes.INTEGER
    },
    
    attack:{
      type: DataTypes.INTEGER
    },

    defense:{
      type: DataTypes.INTEGER
    },

    speed:{
      type: DataTypes.INTEGER
    },

    height:{
      type: DataTypes.INTEGER
    },

    weight:{
      type: DataTypes.INTEGER
    },

    createdByUser:{
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    }

  });
};

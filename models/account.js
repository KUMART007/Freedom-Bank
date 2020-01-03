"use strict";
var sequelize = require("./index");
var User = require("./user");
module.exports = (sequelize, DataTypes) => {
  var Account = sequelize.define("Account", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    current_balance: {
      type: DataTypes.DECIMAL(10, 2),
      defauleValue: 0.00,
    },
    account_number: {
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    first_name: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type:DataTypes.STRING,
      allowNull: false,
    },
  }, {
    underscore: true
  })
  Account.associate = (models) => {
    Account.belongsTo(models.User, {
      foreignKey: "userId"
    });
  }
  return Account;
}
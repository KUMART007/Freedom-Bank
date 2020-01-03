"use strict";
var sequelize = require("./index");
var User = require("./user");
var Transaction = require("./transactions");
module.exports = (sequelize, DataTypes) => {
  var Account = sequelize.define("Account", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    current_balance: {
      type: DataTypes.DECIMAL(10, 2),
      defauleValue: 0.00,
    },
  }, {
    underscore: true
  })
  Account.associate = (models) => {
    Account.belongsTo(models.User, {
      as: "useraccount",
      foreignKey: "user_id"
    });
    // Account.hasMany(models.Transaction, {
    //   as: "usertrans",
    //   targetKey: "user_id",
    //   foreignKey: "account_id"
    // });
  }
  return Account;
}
"use strict";
var sequelize = require("./index");
var User = require("./user");
module.exports = (sequelize, DataTypes) => {
  var Account = sequelize.define("Account", {
    current_balance: {
      type: DataTypes.DECIMAL(10, 2),
      defauleValue: 0.00,
    }
  })
  Account.associate = (models) => {
    Account.belongsTo(models.User, {
      foreignKey: "userId"
    });
  }
  return Account;
}
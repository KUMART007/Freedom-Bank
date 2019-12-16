module.exports = function(sequelize, DataTypes) {
  var Account = sequelize.define("Account", {
    balance: {
      type: DataTypes.DECIMAL(10, 2)
    }
  });

  Account.associate = function(models) {
    Account.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Account;
};

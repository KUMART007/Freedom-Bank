module.exports = function(sequelize, DataTypes) {
  var Account = sequelize.define("Account", {
    accountnumber: {
      type: DataTypes.INT,
      validate: {
        allowNull: false,
        isNumeric: true,
        len: [12]
      }
    },
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

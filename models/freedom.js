module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define("user", {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8]
      }
    },
    description: DataTypes.TEXT
  });
  return user;
};

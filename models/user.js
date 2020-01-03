/*"use strict";
var Account = require("./account");

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("user", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      required: true
    },
    password: DataTypes.STRING
  });

  User.associate = function(models) {
    U, ser.hasOne(models.Account);
  User.hasOne(Account{
    as: "userAccount",
    foreignKey: "userId"
  });
  return User;
};*/

"use strict";
var sequelize = require("./index");
var Account = require("./account");
var bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define("User", {
    id: { 
      autoIncrement: true, 
      primaryKey: true, 
      type: DataTypes.INTEGER
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      // validate: {
      //   isUnique: (value, next) => {
      //     var self = this;
      //     User.find({
      //         where: {
      //           username: value
      //         }
      //       }).then((user) => {
      //         if (user && self.id !== user.id) {
      //           return next("username is not available, Try different username!");
      //         }
      //         return next();
      //       })
      //       .catch((err) => {
      //         return next(err);
      //       })
      //   }
      // }
    },
    // email: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   unique: true,
    //   validate: {
    //     isEmail:true
    //   }
      // validate: {
      //   isUnique: (value, next) => {
      //     var self = this;
      //     User.find({
      //         where: {
      //           email: value
      //         }
      //       }).then((user) => {
      //         if (user && self.id !== user.id) {
      //           return next("Account is already created with this email address! Try different email address")
      //         }
      //         return next();
      //       })
      //       .catch((err) => {
      //         return next(err)
      //       });
      //   }
      // }
    // },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  User.beforeCreate((user) => {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });

  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(this.password, password);
  };

  User.associate = (models) => {
    User.hasOne(models.Account, {
      as: "userAccount",
      foreignKey: "userId"
    })
  }

  return User;
}
"use strict";
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define("User", {
    uid: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    avatar: DataTypes.STRING
  });

  User.associate = function(models) {};

  User.prototype.toJSON = function() {
    var values = Object.assign({}, this.get());
    delete values.password;
    delete values.clear_password;
    return values;
  };

  return User;
};

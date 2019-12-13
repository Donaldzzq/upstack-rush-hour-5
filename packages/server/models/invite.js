"use strict";
module.exports = (sequelize, DataTypes) => {
  var Invite = sequelize.define(
    "Invite",
    {
      from_uid: DataTypes.STRING,
      to_address: DataTypes.STRING
    },
    {
      underscored: true,
      tableName: "invites"
    }
  );

  Invite.associate = function(models) {};

  return Invite;
};

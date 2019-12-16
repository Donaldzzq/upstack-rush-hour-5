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

  Invite.associate = function(models) {
    models.Invite.belongsTo(models.User, {
      foreignKey: "from_uid",
      targetKey: "uid",
      as: "fromUser"
    });

    models.Invite.belongsTo(models.User, {
      foreignKey: "to_address",
      targetKey: "uid",
      as: "toUser"
    });
  };

  return Invite;
};

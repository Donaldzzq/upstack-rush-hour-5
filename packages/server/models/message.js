"use strict";
module.exports = (sequelize, DataTypes) => {
  var Message = sequelize.define(
    "Message",
    {
      is_read: DataTypes.BOOLEAN,
      body: DataTypes.TEXT,
      from_uid: DataTypes.STRING,
      to_uid: DataTypes.STRING
    },
    {
      underscored: true,
      tableName: "messages"
    }
  );

  Message.associate = function(models) {
    models.Message.belongsTo(models.User, {
      foreignKey: "from_uid",
      targetKey: "uid",
      as: "fromUser"
    });

    models.Message.belongsTo(models.User, {
      foreignKey: "to_uid",
      targetKey: "uid",
      as: "toUser"
    });
  };

  return Message;
};

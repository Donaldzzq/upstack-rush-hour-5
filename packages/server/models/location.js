"use strict";
module.exports = (sequelize, DataTypes) => {
  var Location = sequelize.define(
    "Location",
    {
      user_uid: DataTypes.STRING,
      city: DataTypes.STRING,
      country: DataTypes.STRING,
      latitude: DataTypes.DOUBLE,
      longitude: DataTypes.DOUBLE,
      spare_rooms: DataTypes.NUMBER,
      postal_code: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      surfable: DataTypes.BOOLEAN
    },
    {
      underscored: true,
      tableName: "locations"
    }
  );

  Location.associate = function(models) {
    models.Location.belongsTo(models.User, {
      foreignKey: "user_uid",
      targetKey: "uid"
    });
  };

  return Location;
};

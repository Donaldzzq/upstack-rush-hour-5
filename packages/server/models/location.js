"use strict";
module.exports = (sequelize, DataTypes) => {
  var Location = sequelize.define(
    "Location",
    {
      user_id: DataTypes.STRING,
      city: DataTypes.STRING,
      country: DataTypes.STRING,
      lat: DataTypes.DOUBLE,
      lng: DataTypes.DOUBLE,
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
    models.Location.belongsTo(models.User, {});
  };

  return Location;
};

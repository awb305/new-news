module.exports = function(sequelize, DataTypes) {
  var Bundles = sequelize.define("bundles", {
    userid: {
      type: DataTypes.INT,
      allowNull: false
    },
    articleid: {
      type: DataTypes.INT,
      allowNull: false
    }
  });
  return Bundles;
};

module.exports = function(sequelize, DataTypes) {
  var Bundles = sequelize.define("bundles", {
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    articleid: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  return Bundles;
};

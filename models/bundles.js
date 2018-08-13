module.exports = function(sequelize, DataTypes) {
  var Bundle = sequelize.define("Bundle", {
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    articleid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bundleType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userBundleName: {
      type: DataTypes.STRING,
      allowNull: false
    }

  });
  return Bundle;
};

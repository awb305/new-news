module.exports = function(sequelize, DataTypes) {
  var Bundle = sequelize.define("Bundle", {
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userEmail: {
      type: DataTypes.STRING,
      allowNull: false
    },
    articleArray: {
      type: DataTypes.STRING,
      // allowNull: false
    },


  });
  return Bundle;
};

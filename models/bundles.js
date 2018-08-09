module.exports = function(sequelize, DataTypes) {  
var Bundles = sequelize.define("bundles", {
    user_id: {
      type: DataTypes.INT,
      allowNull: false,
    },
    article_id: {
      type: DataTypes.INT,
      allowNull: false,
    },


  });
    return Bundles;
}
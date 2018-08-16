module.exports = function(sequelize, DataTypes) {
  var Bundle = sequelize.define("Bundle", {
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    articles: {
      type: DataTypes.STRING
    }
  });
  return Bundle;
};

module.exports = function(sequelize, DataTypes) {
  var Articles = sequelize.define("articles", {
    articleUrl: {
      type: DataTypes.STRING,
      allowNull: false
    },
    articleHeadline: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    upNumber: {
      type: DataTypes.INTEGER
    },
    articleImg: {
      type: DataTypes.STRING
    }
  });
  return Articles;
};

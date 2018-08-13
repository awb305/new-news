module.exports = function(sequelize, DataTypes) {
  var Article = sequelize.define("Article", {
    publication: {
      type: DataTypes.STRING,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    headline: {
      type: DataTypes.STRING,
      allowNull: false
    },
    section: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subsection: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    byline: {
      type: DataTypes.STRING,
      allowNull: false
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    articleImg: {
      type: DataTypes.STRING
    },
    articleImgLg: {
      type: DataTypes.STRING,
      allowNull: false
    },
    worthyScore: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  return Article;
};
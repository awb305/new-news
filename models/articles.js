module.exports = function(sequelize, DataTypes) {
    var Articles = sequelize.define("articles", {
        article_url: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        article_headline: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        up_number: {
          type: DataTypes.INT,
        },
    
      });
        return Articles;
    }
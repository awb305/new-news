module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("user", {
    userName: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    userEmail: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });
  User.associate = function(models) {
    Author.hasMany(models.Bundles);
  };
  return User;
};
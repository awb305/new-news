module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("user", {
    user_name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_email: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
  return User;
};

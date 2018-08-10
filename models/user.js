module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("user", {
    userName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userEmail: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return User;
};

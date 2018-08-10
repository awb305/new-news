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
  return User;
};

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("user", {
    userNameFirst: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userNameLast: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userEmail: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userPassword: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return User;
};

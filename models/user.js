module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
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
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    userPassword: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastLogin: {
      type: DataTypes.DATE
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active"
    }
  });

  // User.associate = function(models) {
  //   User.hasMany(models.Bundle, {
  //     onDelete: "cascade"
  //   });
  // };
  return User;
};

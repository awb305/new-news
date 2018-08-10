module.exports = function(sequelize) {
  var Bundles = sequelize.define("bundles");
  Bundles.associate = function(models) {
  // Associating Author with Posts
  // When an Author is deleted, also delete any associated Posts
    Bundles.belongsTo(models.User);
  };
  return Author;
};


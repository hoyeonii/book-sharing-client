module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define("Follow", {
    follower: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    followed: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Follow;
};

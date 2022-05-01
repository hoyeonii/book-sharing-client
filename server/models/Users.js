module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: true,
      // default: "UX/UI",
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
      // default: "UX/UI",
    },
  });
  Users.associate = (models) => {
    Users.hasMany(models.Likes, {
      onDelete: "cascade", //post에서 post를 삭제하면 관련 comment도 다 삭제
    });
    Users.hasMany(models.Posts, {
      onDelete: "cascade", //post에서 post를 삭제하면 관련 comment도 다 삭제
    });
  };

  return Users;
};

module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define("Posts", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publisher: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isbn: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    genres: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    available: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Posts.associate = (models) => {
    Posts.hasMany(models.Comments, {
      onDelete: "cascade", //post에서 post를 삭제하면 관련 comment도 다 삭제
    });
    Posts.hasMany(models.Likes, {
      onDelete: "cascade", //post에서 post를 삭제하면 관련 comment도 다 삭제
    });
  };
  return Posts;
};

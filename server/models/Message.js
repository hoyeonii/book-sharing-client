module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define("Message", {
    send: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    receive: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });

  return Message;
};

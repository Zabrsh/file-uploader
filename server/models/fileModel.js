
  const { DataTypes } = require('sequelize');
  const { Sequelize } = require('sequelize');

  const sequelize = new Sequelize('file-uploader-dev', 'root', '12345', {
    host: 'localhost',
    dialect: 'mysql'
  });
  const File = sequelize.define('File', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    file_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    file_size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    upload_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
  
  module.exports = File;
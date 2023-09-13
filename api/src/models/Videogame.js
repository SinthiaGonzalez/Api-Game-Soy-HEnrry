const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    platforms: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    releasedate: {
      type: DataTypes.DATE,
    },
    rating: {
      type: DataTypes.INTEGER,
    },
  }, {
    timestamps: false, // Desactiva las marcas de tiempo
    createdAt: false,  // Desactiva la columna createdAt
    updatedAt: false   // Desactiva la columna updatedAt
  });
}
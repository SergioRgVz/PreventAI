import { DataTypes } from "sequelize";
import sequelize from "../../db/mariadb.js";  // Asegúrate de exportar sequelize correctamente desde mariadb.js

const User = sequelize.define(
  "User",
  {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    DNI: {
      type: DataTypes.STRING(9),
      allowNull: true,
    },
    Correo: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    Contrasenna: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    Nombre: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    Apellidos: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    Telefono: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    esTecnico: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    tableName: "usuario",
    timestamps: false,
  }
);

export default User;

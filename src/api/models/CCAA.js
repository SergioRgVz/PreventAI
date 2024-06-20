import { DataTypes } from "sequelize";
import sequelize from "../../db/mariadb.js";  // Asegúrate de exportar sequelize correctamente desde mariadb.js

const CCAA = sequelize.define(
  "CCAA",
  {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Nombre: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    
  },
  {
    tableName: "comunidadautonoma",
    timestamps: false,
  }
);

export default CCAA;

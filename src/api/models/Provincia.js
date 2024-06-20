import { DataTypes } from "sequelize";
import sequelize from "../../db/mariadb.js";

const Provincia = sequelize.define(
  "Provincia",
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
    tableName: "provincia",
    timestamps: false,
  }
);


export default Provincia;

import { DataTypes } from 'sequelize';
import sequelize from '../../db/mariadb.js';
import Provincia from './Provincia.js';

const Municipio = sequelize.define(
  'Municipio',
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
    ID_Provincia: {
      type: DataTypes.INTEGER,
      references: {
        model: Provincia,
        key: 'ID',
      }
    }
  },
  {
    tableName: 'municipio',
    timestamps: false,
  }
);

Municipio.belongsTo(Provincia, { foreignKey: 'ID_Provincia' });
Provincia.hasMany(Municipio, { foreignKey: 'ID_Provincia' });

export default Municipio;

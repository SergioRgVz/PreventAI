import { DataTypes } from 'sequelize';
import sequelize from '../../db/mariadb.js';
import Municipio from './Municipio.js';

const Empresa = sequelize.define(
  'Empresa',
  {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ID_Municipio: {
      type: DataTypes.INTEGER,
      references: {
        model: Municipio,
        key: 'ID',
      },
    },
    Nombre: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    CIF: {
      type: DataTypes.STRING(9),
      allowNull: false,
    },
  },
  {
    tableName: 'empresa',
    timestamps: false,
  }
);

Empresa.belongsTo(Municipio, { foreignKey: 'ID_Municipio' });
Municipio.hasMany(Empresa, { foreignKey: 'ID_Municipio' });

export default Empresa;

import { DataTypes } from 'sequelize';
import sequelize from '../../db/mariadb.js';
import Informe from './Informe.js';

const Imagen = sequelize.define(
    'Imagen',
    {
        ID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        URL: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        ID_Informe: {
            type: DataTypes.INTEGER,
            references: {
                model: Informe,
                key: 'ID',
            },
            allowNull: false,
        },
    },
    {
        tableName: 'imagen',
        timestamps: false,
    }
);

export default Imagen;

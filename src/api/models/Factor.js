import { DataTypes } from 'sequelize';
import sequelize from '../../db/mariadb.js';

const Factor = sequelize.define(
    'Factor',
    {
        ID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        Nombre: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        Tipo: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
    },
    {
        tableName: 'factor',
        timestamps: false,
    }
);

export default Factor;

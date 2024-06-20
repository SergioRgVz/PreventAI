import { DataTypes } from 'sequelize';
import sequelize from '../../db/mariadb.js';

const Usuario = sequelize.define(
    'Usuario',
    {
        ID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        DNI: {
            type: DataTypes.STRING(9),
            allowNull: false,
        },
        Correo: {
            type: DataTypes.STRING(90),
            allowNull: false,
        },
        Contrasenna: {
            type: DataTypes.STRING(300),
            allowNull: false,
        },
        Nombre: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        Apellidos: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        Telefono: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        esTecnico: {
            type: DataTypes.TINYINT,
            allowNull: false,
        },
    },
    {
        tableName: 'usuario',
        timestamps: false,
    }
);

export default Usuario;

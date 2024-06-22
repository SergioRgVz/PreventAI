import { DataTypes } from 'sequelize';
import sequelize from '../../db/mariadb.js';
import Company from './Empresa.js';

const Empleado = sequelize.define(
    'Empleado',
    {
        ID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        ID_Empresa: {
            type: DataTypes.INTEGER,
            references: {
                model: Company,
                key: 'ID',
            },
        },
        DNI: {
            type: DataTypes.STRING(9),
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
        Correo: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        Edad: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Sexo: {
            type: DataTypes.STRING(1),
            allowNull: false,
        },
        PuestoTrabajo: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        FechaNacimiento: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        tableName: 'empleado',
        timestamps: false,
    }
);


export default Empleado;

import { DataTypes } from 'sequelize';
import sequelize from '../../db/mariadb.js';
import Company from './Empresa.js';
import Usuario from './Usuario.js';

const UsuarioEmpresa = sequelize.define(
    'UsuarioEmpresa',
    {
        ID_Empresa: {
            type: DataTypes.INTEGER,
            references: {
                model: Company,
                key: 'ID',
            },
            primaryKey: true,
        },
        ID_Usuario: {
            type: DataTypes.INTEGER,
            references: {
                model: Usuario,
                key: 'ID',
            },
            primaryKey: true,
        },
    },
    {
        tableName: 'usuarioempresa',
        timestamps: false,
    }
);


export default UsuarioEmpresa;

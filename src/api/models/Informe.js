import { DataTypes } from 'sequelize';
import sequelize from '../../db/mariadb.js';
import User from './User.js';  
import Empleado from './Empleado.js';

const Informe = sequelize.define('Informe', {
    ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    ID_Usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'ID',
        },
    },
    ID_Empleado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Empleado,
            key: 'ID',
        },
    },
    Referencia: {
        type: DataTypes.STRING(40),
        allowNull: false,
    },
    Fecha: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    Indicaciones: {
        type: DataTypes.STRING(500),
        allowNull: true,
    },
    tipo: {
        type: DataTypes.ENUM('GINSHT', 'PVD', 'REBA'),
        allowNull: false,
    },
}, {
    tableName: 'informe',
    timestamps: false,
});


export default Informe;

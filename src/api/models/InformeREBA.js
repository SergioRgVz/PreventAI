import { DataTypes } from 'sequelize';
import sequelize from '../../db/mariadb.js';
import Informe from './Informe.js';

const Informe_REBA = sequelize.define('Informe_REBA', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    Desc_REBA: {
        type: DataTypes.STRING(300),
        allowNull: true,
    },
    PCuello: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    CCuello: {
        type: DataTypes.TINYINT,
        allowNull: true,
    },
    PTronco: {
        type: DataTypes.TINYINT,
        allowNull: true,
    },
    CTronco: {
        type: DataTypes.TINYINT,
        allowNull: true,
    },
    PPiernas: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    CPiernas1: {
        type: DataTypes.TINYINT,
        allowNull: true,
    },
    CPiernas2: {
        type: DataTypes.TINYINT,
        allowNull: true,
    },
    PBrazos: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    CAbducidos: {
        type: DataTypes.TINYINT,
        allowNull: true,
    },
    CHombrosLevantados: {
        type: DataTypes.TINYINT,
        allowNull: true,
    },
    CBrazosApoyados: {
        type: DataTypes.TINYINT,
        allowNull: true,
    },
    PAntebrazos: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    PMunnecas: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    CMunnecas: {
        type: DataTypes.TINYINT,
        allowNull: true,
    },
    PCarga: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    CCarga: {
        type: DataTypes.TINYINT,
        allowNull: true,
    },
    Agarre: {
        type: DataTypes.TINYINT,
        allowNull: true,
    },
    Estatismo: {
        type: DataTypes.TINYINT,
        allowNull: true,
    },
    AccionesRepetidas: {
        type: DataTypes.TINYINT,
        allowNull: true,
    },
    CambiosRapidos: {
        type: DataTypes.TINYINT,
        allowNull: true,
    },
}, {
    tableName: 'REBA',
    timestamps: false,
});

Informe_REBA.belongsTo(Informe, { foreignKey: 'ID' });
Informe.hasOne(Informe_REBA, { foreignKey: 'ID' });

export default Informe_REBA;

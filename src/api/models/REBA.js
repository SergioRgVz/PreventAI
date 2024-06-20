import { DataTypes } from 'sequelize';
import sequelize from '../../db/mariadb.js';
import Informe from './Informe.js';

const REBA = sequelize.define(
    'REBA',
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: Informe,
                key: 'ID',
            },
        },
        Desc_REBA: {
            type: DataTypes.STRING(300),
            allowNull: false,
        },
        PCuello: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        CCuello: {
            type: DataTypes.TINYINT,
            allowNull: false,
        },
        PTronco: {
            type: DataTypes.TINYINT,
            allowNull: false,
        },
        CTronco: {
            type: DataTypes.TINYINT,
            allowNull: false,
        },
        PPiernas: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        CPiernas1: {
            type: DataTypes.TINYINT,
            allowNull: false,
        },
        CPiernas2: {
            type: DataTypes.TINYINT,
            allowNull: false,
        },
        PBrazos: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        CAbducidos: {
            type: DataTypes.TINYINT,
            allowNull: false,
        },
        CHombrosLevantados: {
            type: DataTypes.TINYINT,
            allowNull: false,
        },
        CBrazosApoyados: {
            type: DataTypes.TINYINT,
            allowNull: false,
        },
        PAntebrazos: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        PMunnecas: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        CMunnecas: {
            type: DataTypes.TINYINT,
            allowNull: false,
        },
        PCarga: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        CCarga: {
            type: DataTypes.TINYINT,
            allowNull: false,
        },
        Agarre: {
            type: DataTypes.TINYINT,
            allowNull: false,
        },
        Estatismo: {
            type: DataTypes.TINYINT,
            allowNull: false,
        },
        AccionesRepetidas: {
            type: DataTypes.TINYINT,
            allowNull: false,
        },
        CambiosRapidos: {
            type: DataTypes.TINYINT,
            allowNull: false,
        },
    },
    {
        tableName: 'reba',
        timestamps: false,
    }
);

REBA.belongsTo(Informe, { foreignKey: 'ID' });

export default REBA;

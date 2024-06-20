import { DataTypes } from 'sequelize';
import sequelize from '../../db/mariadb.js';
import Informe from './Informe.js';

const GINSHT = sequelize.define(
    'GINSHT',
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: Informe,
                key: 'ID',
            },
        },
        Desc_Elevacion: {
            type: DataTypes.STRING(300),
            allowNull: false,
        },
        Desc_Transporte: {
            type: DataTypes.STRING(300),
            allowNull: false,
        },
        PesoReal: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        PesoTeorico: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        TipoAgarre: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        GiroTronco: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        DesplVertical: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        FrecManipulacion: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        PesoAceptable: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        IRElevacion: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        PosturaLevantamiento: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        AlturaLevantamiento: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        SeparacionLevantamiento: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        DuracionTarea: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        DuracionManipulacion: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        NDesplazamientos: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        DistanciaDesplazamientos: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        IRTransporte: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        tableName: 'ginsht',
        timestamps: false,
    }
);

GINSHT.belongsTo(Informe, { foreignKey: 'ID' });

export default GINSHT;

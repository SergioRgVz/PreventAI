import { DataTypes } from 'sequelize';
import sequelize from '../../db/mariadb.js';
import Informe from './Informe.js';

const Informe_GINSHT = sequelize.define('Informe_GINSHT', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    Desc_Elevacion: {
        type: DataTypes.STRING(300),
        allowNull: true,
    },
    Desc_Transporte: {
        type: DataTypes.STRING(300),
        allowNull: true,
    },
    PesoReal: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    PesoTeorico: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    TipoAgarre: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    GiroTronco: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    DesplVertical: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    FrecManipulacion: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    PesoAceptable: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    IRElevacion: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    PosturaLevantamiento: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    AlturaLevantamiento: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    SeparacionLevantamiento: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    DuracionTarea: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    DuracionManipulacion: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    NDesplazamientos: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    DistanciaDesplazamientos: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    IRTransporte: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
}, {
    tableName: 'GINSHT',
    timestamps: false,
});

Informe_GINSHT.belongsTo(Informe, { foreignKey: 'ID' });
Informe.hasOne(Informe_GINSHT, { foreignKey: 'ID' });

export default Informe_GINSHT;

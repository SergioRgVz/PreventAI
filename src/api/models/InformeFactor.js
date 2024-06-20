import { DataTypes } from 'sequelize';
import sequelize from '../../db/mariadb.js';
import Informe from './Informe.js';
import Factor from './Factor.js';

const InformeFactor = sequelize.define(
    'InformeFactor',
    {
        ID_Informe: {
            type: DataTypes.INTEGER,
            references: {
                model: Informe,
                key: 'ID',
            },
            primaryKey: true,
        },
        ID_Factor: {
            type: DataTypes.INTEGER,
            references: {
                model: Factor,
                key: 'ID',
            },
            primaryKey: true,
        },
        Tipo_Factor: {
            type: DataTypes.ENUM('ginsht', 'pvd'),
            allowNull: false,
            primaryKey: true,
        },
    },
    {
        tableName: 'informe_factor',
        timestamps: false,
    }
);

Informe.belongsToMany(Factor, { through: InformeFactor, foreignKey: 'ID_Informe' });
Factor.belongsToMany(Informe, { through: InformeFactor, foreignKey: 'ID_Factor' });

export default InformeFactor;

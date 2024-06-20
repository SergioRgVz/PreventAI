import { DataTypes } from 'sequelize';
import sequelize from '../../db/mariadb.js';
import Informe from './Informe.js';

const PVD = sequelize.define(
    'PVD',
    {
        ID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            references: {
                model: Informe,
                key: 'ID',
            },
        },
        DescROL: {
            type: DataTypes.STRING(300),
            allowNull: false,
        },
    },
    {
        tableName: 'pvd',
        timestamps: false,
    }
);

PVD.belongsTo(Informe, { foreignKey: 'ID' });

export default PVD;

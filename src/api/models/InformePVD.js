import { DataTypes } from 'sequelize';
import sequelize from '../../db/mariadb.js';
import Informe from './Informe.js';

const Informe_PVD = sequelize.define('Informe_PVD', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    DescROL: {
        type: DataTypes.STRING(300),
        allowNull: true,
    },
}, {
    tableName: 'PVD',
    timestamps: false,
});


export default Informe_PVD;

import { DataTypes } from 'sequelize';
import sequelize from '../../db/mariadb.js';
import User from './User.js';  // Asegúrate de que la ruta sea correcta
import Empleado from './Empleado.js';  // Asegúrate de que la ruta sea correcta
// import Imagen from './Imagen.js'; 

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

Informe.belongsTo(User, { foreignKey: 'ID_Usuario' });
User.hasMany(Informe, { foreignKey: 'ID_Usuario' });

Informe.belongsTo(Empleado, { foreignKey: 'ID_Empleado' });
Empleado.hasMany(Informe, { foreignKey: 'ID_Empleado' });


// Informe.hasMany(Imagen, { foreignKey: 'ID_Informe' });
// Imagen.belongsTo(Informe, { foreignKey: 'ID_Informe' });

export default Informe;

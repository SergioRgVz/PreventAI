import CCAA from "./CCAA.js";
import Empleado from "./Empleado.js";
import Empresa from "./Empresa.js";
import Imagen from "./Imagen.js";
import Informe from "./Informe.js";
import User from "./User.js";
import Factor from "./Factor.js";
import InformeFactor from "./InformeFactor.js";
import Informe_GINSHT from "./InformeGINSHT.js";
import Informe_PVD from "./InformePVD.js";
import Informe_REBA from "./InformeREBA.js";
import Provincia from "./Provincia.js";
import Municipio from "./Municipio.js";
import PVD from "./PVD.js";
import GINSHT from "./GINSHT.js";
import REBA from "./REBA.js";
import UsuarioEmpresa from "./UsuarioEmpresa.js";

Empleado.belongsTo(Company, { foreignKey: 'ID_Empresa' });
Company.hasMany(Empleado, { foreignKey: 'ID_Empresa' });

Empresa.belongsTo(Municipio, { foreignKey: 'ID_Municipio' });
Municipio.hasMany(Empresa, { foreignKey: 'ID_Municipio' });

GINSHT.belongsTo(Informe, { foreignKey: 'ID' });

Imagen.belongsTo(Informe, { foreignKey: 'ID_Informe' });

Informe.belongsTo(User, { foreignKey: 'ID_Usuario' });
User.hasMany(Informe, { foreignKey: 'ID_Usuario' });

Informe.belongsTo(Empleado, { foreignKey: 'ID_Empleado' });
Empleado.hasMany(Informe, { foreignKey: 'ID_Empleado' });

Informe.hasMany(Imagen, { foreignKey: 'ID_Informe' });
Imagen.belongsTo(Informe, { foreignKey: 'ID_Informe' });

Informe.belongsToMany(Factor, { through: InformeFactor, foreignKey: 'ID_Informe' });
Factor.belongsToMany(Informe, { through: InformeFactor, foreignKey: 'ID_Factor' });

Informe_GINSHT.belongsTo(Informe, { foreignKey: 'ID' });
Informe.hasOne(Informe_GINSHT, { foreignKey: 'ID' });

Informe_PVD.belongsTo(Informe, { foreignKey: 'ID' });
Informe.hasOne(Informe_PVD, { foreignKey: 'ID' });

Informe_REBA.belongsTo(Informe, { foreignKey: 'ID' });
Informe.hasOne(Informe_REBA, { foreignKey: 'ID' });

Municipio.belongsTo(Provincia, { foreignKey: 'ID_Provincia' });
Provincia.hasMany(Municipio, { foreignKey: 'ID_Provincia' });

PVD.belongsTo(Informe, { foreignKey: 'ID' });

REBA.belongsTo(Informe, { foreignKey: 'ID' });

Usuario.belongsToMany(Company, { through: UsuarioEmpresa, foreignKey: 'ID_Usuario' });
Company.belongsToMany(Usuario, { through: UsuarioEmpresa, foreignKey: 'ID_Empresa' });
// mariadb.js
import { Sequelize } from "sequelize";
const sequelize = new Sequelize("preventaidb", "root", "srv-2203", {
  host: "localhost",
  dialect: "mariadb",
});

// Autenticación y sincronización
sequelize
  .authenticate()
  .then(() => {
    console.log("Conectado a MariaDB");
    return sequelize.sync(); // Sincroniza los modelos con la base de datos
  })
  .then(() => {
    console.log("Modelos sincronizados con la base de datos");
  })
  .catch((err) => {
    console.error("Error al conectar o sincronizar con MariaDB:", err);
  });
export default sequelize;

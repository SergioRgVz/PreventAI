import { promises as fs } from 'fs';
import Provincia from '../../api/models/Provincia.js';
import Municipio from '../../api/models/Municipio.js';
import sequelize from '../../db/mariadb.js';

const importJSON = async (filePath, model, mappingFunction) => {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    const records = JSON.parse(data).map(mappingFunction);

    // Verificar los primeros registros
    console.log(`Primeros registros de ${filePath}:`, records.slice(0, 5));

    await model.bulkCreate(records);
  } catch (error) {
    console.error(`Error importing ${filePath}:`, error);
    throw error;
  }
};

const clearDatabase = async () => {
  try {
    await Municipio.destroy({ where: {}, truncate: true });
    await Provincia.destroy({ where: {}, truncate: true });
  } catch (error) {
    console.error('Error al limpiar la base de datos:', error);
  }
};

const populateDatabase = async () => {
  try {
    // await clearDatabase();

    // await sequelize.sync({ force: true }); // Esto eliminará y creará las tablas de nuevo
    // console.log('Tablas creadas');

    await importJSON('provincias.json', Provincia, record => ({
      ID: parseInt(record.id),
      Nombre: record.nm,
    }));
    console.log('Provincias importadas');

    await importJSON('municipios.json', Municipio, record => ({
      ID: parseInt(record.id),
      Nombre: record.nm,
      ID_Provincia: parseInt(record.id.substring(0, 2)), // Asumiendo que los dos primeros dígitos del ID del municipio corresponden al ID de la provincia
    }));
    console.log('Municipios importados');

    console.log('Base de datos poblada con éxito');
  } catch (error) {
    console.error('Error poblando la base de datos:', error);
  } finally {
    await sequelize.close();
  }
};

populateDatabase();

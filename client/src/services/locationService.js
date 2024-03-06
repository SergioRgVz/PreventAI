// Asumiendo que puedes importar los JSON directamente
import ccaa from '../utils/ccaa.json';
import provincias from '../utils/provincias.json';
import poblaciones from '../utils/poblaciones.json';

export function getComunidadAutonomaByCode(code) {
    const comunidad = ccaa.find(ccaa => ccaa.code === code);
    return comunidad ? comunidad.label : 'Comunidad no encontrada';
}


export function getProvinciaByCode(code) {
    const provincia = provincias.find(provincia => provincia.code === code);
    return provincia ? provincia.label : 'Provincia no encontrada';
}


export function getPoblacionByCode(code) {
    const poblacion = poblaciones.find(poblacion => poblacion.code === code);
    return poblacion ? poblacion.label : 'Población no encontrada';
}

export function getComunidadAutonomaByLabel(label) {
    const comunidad = ccaa.find(ccaa => ccaa.label === label);
    return comunidad ? comunidad.code : 'Comunidad no encontrada';
}

export function getProvinciaByLabel(label) {
    const provincia = provincias.find(provincia => provincia.label === label);
    return provincia ? provincia.code : 'Provincia no encontrada';
}

export function getPoblacionByLabel(label) {
    const poblacion = poblaciones.find(poblacion => poblacion.label === label);
    return poblacion ? poblacion.code : 'Población no encontrada';
}

export const getAllCCAAs = async () => {
    // Simulate fetching data
    return Promise.resolve(ccaa.map(({ code, label }) => ({ code, label })));
};

export const getProvincias = async (ccaaCode) => {
    const filteredProvincias = provincias
    .filter(provincia => provincia.parent_code === ccaaCode)
    .map(({ code, label }) => ({ code, label }));
    return Promise.resolve(filteredProvincias);
};

export const getMunicipios = async (provinciaCode) => {
    const filteredMunicipios = poblaciones
    .filter(municipio => municipio.parent_code === provinciaCode)
    .map(({ code, label }) => ({ code, label }));
    return Promise.resolve(filteredMunicipios);
};

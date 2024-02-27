// Asumiendo que puedes importar los JSON directamente
import ccaa from '../../utils/ccaa.json' assert { type: 'json' };
import provincias from '../../utils/provincias.json' assert { type: 'json' };
import poblaciones from '../../utils/poblaciones.json' assert { type: 'json' };

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
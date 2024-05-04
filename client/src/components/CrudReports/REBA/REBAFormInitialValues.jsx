import REBAForm from './REBAForm';
const {
    formField: {
        empleado,
        empresa,
        centroDeTrabajo,
        puestoDeTrabajo,
        fecha,
        referencia,
        puntuacionCuello,
        cambioCuello,
        puntuacionPiernas,
        cambioPiernas,
        puntuacionTronco,
        cambioTronco,
        cambioPiernas1,
        cambioPiernas2,
        puntuacionAntebrazos,
        puntuacionMunecas,
        cambioMunecas,
        puntuacionBrazos,
        cambioBrazosAbducido,
        cambioBrazosHombroLevantado,
        cambioBrazosApoyado,
        puntuacionCarga,
        cambioCarga,
        puntuacionAgarre,
        estatismo,
        accionesRepetidas,
        cambiosRapidos,
        descripcionTrabajoREBA,
        images
    }
} = REBAForm;

export default {
    [empleado.name]: '',
    [empresa.name]: '',
    [centroDeTrabajo.name]: '',
    [puestoDeTrabajo.name]: '',
    [fecha.name]: '',
    [referencia.name]: '',
    [puntuacionCuello.name]: 1,
    [cambioCuello.name]: 0,
    [puntuacionPiernas.name]: 1,
    [cambioPiernas.name]: 0,
    [puntuacionTronco.name]: 1,
    [cambioTronco.name]: 0,
    [cambioPiernas1.name]: 0,
    [cambioPiernas2.name]: 0,
    [puntuacionAntebrazos.name]: 1,
    [puntuacionMunecas.name]: 1,
    [cambioMunecas.name]: 0,
    [puntuacionBrazos.name]: 1,
    [cambioBrazosAbducido.name]: 0,
    [cambioBrazosHombroLevantado.name]: 0,
    [cambioBrazosApoyado.name]: 0,
    [puntuacionCarga.name]: 1,
    [cambioCarga.name]: 0,
    [puntuacionAgarre.name]: 1,
    [estatismo.name]: 0,
    [accionesRepetidas.name]: 0,
    [cambiosRapidos.name]: 0,
    [descripcionTrabajoREBA.name]: '',
    [images.name]: []
}
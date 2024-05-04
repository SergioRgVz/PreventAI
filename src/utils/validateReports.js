export const validateReportGINSHTData = (reportData) => {
    const errors = [];

    // Verifica si los campos requeridos están presentes y son válidos
    if (!reportData.empresa) {
        errors.push('El campo "empresa" es requerido.');
    }
    if (!reportData.empleado) {
        errors.push('El campo "empleado" es requerido.');
    }
    if (!reportData.centroDeTrabajo) {
        errors.push('El campo "centroDeTrabajo" es requerido.');
    }
    if (!reportData.puestoDeTrabajo) {
        errors.push('El campo "puestoDeTrabajo" es requerido.');
    }
    if (!reportData.fecha) {
        errors.push('El campo "fecha" es requerido.');
    } else if (isNaN(Date.parse(reportData.fecha))) {
        errors.push('El campo "fecha" debe ser una fecha válida.');
    }
    if (!reportData.referencia) {
        errors.push('El campo "referencia" es requerido.');
    }

    if(!reportData.descripcionDelTrabajo) {
        errors.push('El campo "descripcionDelTrabajo" es requerido.');
    }
    if(!reportData.descripcionDelTrabajo.datosDeElevacion) {
        errors.push('El campo "datosDeElevacion" es requerido.');
    }
    if(!reportData.descripcionDelTrabajo.datosDeTransporte) {
        errors.push('El campo "datosDeTransporte" es requerido.');
    }
    if(!reportData.evaluacionDeLaElevacion) {
        errors.push('El campo "evaluacionDeLaElevacion" es requerido.');
    }
    if(!reportData.evaluacionDeLaElevacion.pesoRealManejado) {
        errors.push('El campo "pesoRealManejado" es requerido.');
    }
    if(!reportData.evaluacionDeLaElevacion.pesoTeoricoRecomendado) {
        errors.push('El campo "pesoTeoricoRecomendado" es requerido.');
    }
    if(!reportData.evaluacionDeLaElevacion.factoresCorrectores) {
        errors.push('El campo "factoresCorrectores" es requerido.');
    }
    if(!reportData.evaluacionDeLaElevacion.factoresCorrectores.tipoDeAgarre) {
        errors.push('El campo "tipoDeAgarre" es requerido.');
    }
    if(!reportData.evaluacionDeLaElevacion.factoresCorrectores.giroDelTronco) {
        errors.push('El campo "giroDelTronco" es requerido.');
    }
    if(!reportData.evaluacionDeLaElevacion.factoresCorrectores.desplazamientoVertical) {
        errors.push('El campo "desplazamientoVertical" es requerido.');
    }
    if(!reportData.evaluacionDeLaElevacion.factoresCorrectores.frecuenciaDeManipulacion) {
        errors.push('El campo "frecuenciaDeManipulacion" es requerido.');
    }
    if(!reportData.evaluacionDeLaElevacion.factoresCorrectores.frecuenciaDeManipulacionRadio) {
        errors.push('El campo "frecuenciaDeManipulacionRadio" es requerido.');
    }
    if(!reportData.evaluacionDeLaElevacion.factoresCorrectores.valorFinalFrecuencia) {
        errors.push('El campo "valorFinalFrecuencia" es requerido.');
    }
    if(!reportData.evaluacionDeLaElevacion.pesoAceptable) {
        errors.push('El campo "pesoAceptable" es requerido.');
    }
    if(!reportData.evaluacionDeLaElevacion.indiceDeRiesgoElevacion) {
        errors.push('El campo "indiceDeRiesgoElevacion" es requerido.');
    }
    if(!reportData.evaluacionDeLaElevacion.posturaLevantamiento) {
        errors.push('El campo "posturaLevantamiento" es requerido.');
    }
    if(!reportData.evaluacionDeLaElevacion.alturaLevantamiento) {
        errors.push('El campo "postura" es requerido.');
    }
    if(!reportData.evaluacionDeLaElevacion.separacionLevantamiento) {
        errors.push('El campo "separacionLevantamiento" es requerido.');
    }
    if(!reportData.evaluacionDeLaElevacion.duracionTarea) {
        errors.push('El campo "duracionTarea" es requerido.');
    }
    if(!reportData.evaluacionDeLaElevacion.duracionManipulacion) {
        errors.push('El campo "duracionManipulacion" es requerido.');
    }
    if(!reportData.evaluacionDelTransporte) {
        errors.push('El campo "evaluacionDelTransporte" es requerido.');
    }
    if(!reportData.evaluacionDelTransporte.numeroDeDesplazamientos) {
        errors.push('El campo "numeroDeDesplazamientos" es requerido.');
    }
    if(!reportData.evaluacionDelTransporte.distanciaDeDesplazamientos) {
        errors.push('El campo "distanciaDeDesplazamientos" es requerido.');
    }
    if(!reportData.evaluacionDelTransporte.indiceRiesgoTransporte) {
        errors.push('El campo "indiceRiesgoTransporte" es requerido.');
    }

    // Agrega más validaciones según sea necesario

    return errors;
};

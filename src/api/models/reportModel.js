import { Schema } from 'mongoose';
import mongoose from '../../../config/db.js';

const reportBaseSchema = new Schema({
    tecnico_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    _id: { type: String, required: true },
    empleado: { type: Schema.Types.ObjectId, ref: 'Employee', required: true},
    empresa: { type: String, required: true },
    centroDeTrabajo: { type: String, required: true },
    puestoDeTrabajo: { type: String, required: true },
    fecha: { type: String, required: true },
    referencia: { type: String, required: true },
    indicacionesYMedidasPreventivas: {
        indicaciones: { type: String, required: true },
    },
});

const reportGINSHTSchema = new mongoose.Schema();
reportGINSHTSchema.add(reportBaseSchema.obj);
reportGINSHTSchema.add({
    descripcionDelTrabajo:
    {
        datosDeElevacion: { type: String, required: true },
        datosDeTransporte: { type: String, required: true }
    },
    evaluacionDeLaElevacion: {
        pesoRealManejado: { type: Number, required: true },
        pesoTeoricoRecomendado: { type: Number, required: true },
        factoresCorrectores: {
            tipoDeAgarre: { type: Number, required: true },
            giroDelTronco: { type: Number, required: true },
            desplazamientoVertical: { type: Number, required: true },
            frecuenciaDeManipulacion: { type: Number, required: true },
            frecuenciaDeManipulacionRadio: { type: Number },
            valorFinalFrecuencia: { type: Number, required: true }
        },
        pesoAceptable: { type: Number, required: true },
        indiceDeRiesgoElevacion: { type: Number, required: true },
        posturaLevantamiento: { type: Number, required: true },
        alturaLevantamiento: { type: Number, required: true },
        separacionLevantamiento: { type: Number, required: true },
        duracionTarea: { type: Number, required: true },
        duracionManipulacion: { type: Number, required: true },
    },
    evaluacionDelTransporte: {
        numeroDeDesplazamientos: { type: Number, required: true },
        distanciaDeDesplazamientos: { type: Number, required: true },
        indiceRiesgoTransporte: { type: Number, required: true }
    },
    factoresErgonomicosEIndividuales: {
        listaDeFactoresPuesto: { type: [String], required: true },
        listaDeFactoresTrabajador: { type: [String], required: true }
    },
});

const reportPWDSchema = new mongoose.Schema();
reportPWDSchema.add(reportBaseSchema.obj);
reportPWDSchema.add({
    descripcionTrabajoPVD: { type: String, required: true },
    aspectosPantalla: {type: [String], required: true},
    aspectosTeclado: {type: [String], required: true},
    aspectosMesa: {type: [String], required: true},
    aspectosSilla: {type: [String], required: true},
    aspectosEspacio: {type: [String], required: true},
    aspectosIluminacion: {type: [String], required: true},
    aspectosRuido: {type: [String], required: true},
    aspectosTemperatura: {type: [String], required: true},
    aspectosProgramas: {type: [String], required: true},
    aspectosOrganizacion: {type: [String], required: true},
    images: { type: [String], required: false }  // Un arreglo de rutas de imágenes
});

const reportREBASchema = new mongoose.Schema();
reportREBASchema.add(reportBaseSchema.obj);
reportREBASchema.add({
    descripcionTrabajoREBA: { type: String, required: true },
    puntuacionCuello: { type: Number, required: true },
    cambioCuello: { type: Number, required: true },
    puntuacionTronco: { type: Number, required: true },
    cambioTronco: { type: Number, required: true },
    puntuacionPiernas: { type: Number, required: true },
    cambioPiernas1: { type: Number, required: true },
    cambioPiernas2: { type: Number, required: true },
    puntuacionBrazos: { type: Number, required: true },
    cambioBrazosAbducido: { type: Number, required: true },
    cambioBrazosHombroLevantado: { type: Number, required: true },
    cambioBrazosApoyado: { type: Number, required: true },
    puntuacionAntebrazos: { type: Number, required: true },
    puntuacionMunecas: { type: Number, required: true },
    cambioMunecas: { type: Number, required: true },
    puntuacionCarga: { type: Number, required: true },
    cambioCarga: { type: Number, required: true },
    puntuacionAgarre: { type: Number, required: true },
    estatismo: { type: Number, required: true },
    accionesRepetidas: { type: Number, required: true },
    cambiosRapidos: { type: Number, required: true }
})


export const ReportREBA = mongoose.model('ReportREBA', reportREBASchema);
export const ReportPWD = mongoose.model('ReportPWD', reportPWDSchema);
const ReportGINSHT = mongoose.model('ReportGINSHT', reportGINSHTSchema);

export default ReportGINSHT;

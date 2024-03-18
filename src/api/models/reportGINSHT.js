import { Schema } from 'mongoose';
import mongoose from '../../../config/db.js';
import { Schema } from 'mongoose';
import mongoose from '../../../config/db.js';

const reportGINSHTSchema = new mongoose.Schema({
    tecnico_id:  { type: Schema.Types.ObjectId, ref: 'User', required: true },
    _id: { type: String, required: true },
    empresa: { type: String, required: true },
    centroDeTrabajo: { type: String, required: true },
    puestoDeTrabajo: { type: String, required: true },
    fecha: { type: String, required: true },
    referencia: { type: String, required: true },
    descripcionDelTrabajo: 
    {
        datosDeElevacion: { type: String, required: true },
        datosDeTransporte: { type: String, required: true }
    },
    evaluacionDeLaElevacion: {
        pesoRealManejado: { type: String, required: true },
        pesoTeoricoRecomendado: { type: String, required: true },
        factoresCorrectores: {
            desplazamientoVertical: { type: String, required: true},
            giroDelTronco: { type: String, required: true },
            tipoDeAgarre: { type: String, required: true },
            frecuenciaDeManipulacion: { type: String, required: true }
        },
        pesoAceptable: { type: String, required: true },
        indiceDeRiesgo: { type: String, required: true }
    },
    evaluacionDelTransporte: { 
        pesoRealDeLaCarga: { type: String, required: true },
        numeroDeDesplazamientos: { type: String, required: true },
        distanciaDeDesplazamientos: { type: String, required: true }
    },
    factoresErgonomicosEIndividuales: {
        listaDeFactores: { type: [String], required: true }
    },
});

export default mongoose.model('ReportGINSHT', reportGINSHTSchema);
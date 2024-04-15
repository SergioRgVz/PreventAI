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
        medidasPreventivasAdjuntas: { type: String, required: true },
    },
});
const reportPWDSchema = new mongoose.Schema();
reportPWDSchema.add(reportBaseSchema.obj);
reportPWDSchema.add({
    descripcionDelTrabajoConPantallas: { type: String, required: true },
    equipodeTrabajo: {
        pantalla: {
            imagenEstable: { type: Boolean, required: true },
            regulacionInclinacionGiro: { type: Boolean, required: true },
            ajusteAltura: { type: Boolean, required: true },
            ajusteDistancia: { type: Boolean, required: true }
        },
        teclado: {
            regulacionInclinacion: { type: Boolean, required: true }
        },
        mobiliario: {
            mesaSuperficieTrabajo: {
                dimensionesSuficientes: { type: Boolean, required: true },
                espacioApoyoManos: { type: Boolean, required: true },
                superficieMate: { type: Boolean, required: true },
                espacioBajoMesa: { type: Boolean, required: true },
                necesidadAtril: { type: Boolean, required: true },
                atrilRegulableEstable: { type: Boolean, required: true },
                atrilJuntoPantalla: { type: Boolean, required: true }
            },
            silla: {
                posicionEstable: { type: Boolean, required: true },
                cincoPuntosApoyo: { type: Boolean, required: true },
                disenoLibertadMovimientos: { type: Boolean, required: true },
                bordesRedondeados: { type: Boolean, required: true },
                materialTranspirable: { type: Boolean, required: true },
                alturaAsientoRegulable: { type: Boolean, required: true },
                inclinacionAsientoRegulable: { type: Boolean, required: true },
                alturaRespaldoRegulable: { type: Boolean, required: true },
                inclinacionRespaldoRegulable: { type: Boolean, required: true },
                estadoUso: { type: Boolean, required: true },
                reposapies: { type: Boolean, required: true },
                dimensionesReposapiesSuficientes: { type: Boolean, required: true }
            }
        }
    },
    entornoDeTrabajo: {
        espacioSuficiente: { type: Boolean, required: true },
        iluminacion: {
            luzSuficiente: { type: Boolean, required: true },
            luminosidadHomogenea: { type: Boolean, required: true },
            reflejosPantalla: { type: Boolean, required: true },
            reflejosOtrosElementos: { type: String, required: true },
            fuentesLuzMolestas: { type: Boolean, required: true },
            controlLuzDia: { type: Boolean, required: true },
            orientacionPuesto: { type: Boolean, required: true }
        },
        ruido: {
            nivelRuidoComunicacionAtencion: { type: Boolean, required: true },
        },
        condicionesTermohigrometricas: {
            temperaturaAgradable: { type: Boolean, required: true },
            sequedadAmbiente: { type: Boolean, required: true }
        }
    },
    programasDeOrdenador: {
        adecuacionTarea: { type: Boolean, required: true },
        facilidadUso: { type: Boolean, required: true },
        adaptacionConocimientosExperiencia: { type: Boolean, required: true },
        ayudaUtilizacion: { type: Boolean, required: true },
        facilitaCorreccionErrores: { type: Boolean, required: true },
        ritmoAdecuadoInformacion: { type: Boolean, required: true },
        formatoAdecuadoInformacion: { type: Boolean, required: true }
    },
    organizacionGestion: {
        presionTiempoExcesiva: { type: Boolean, required: true },
        repetitividadTarea: { type: Boolean, required: true },
        sobrecargaFatiga: {
            mental: { type: Boolean, required: true },
            visual: { type: Boolean, required: true },
            postural: { type: Boolean, required: true }
        },
        trabajoAislado: { type: Boolean, required: true },
        autonomiaPausas: { type: Boolean, required: true },
        formacionEspecifica: { type: Boolean, required: true },
        vigilanciaSalud: { type: Boolean, required: true }
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

const ReportPWD = mongoose.model('ReportPWD', reportPWDSchema);
const ReportGINSHT = mongoose.model('ReportGINSHT', reportGINSHTSchema);

export default { ReportPWD, ReportGINSHT };
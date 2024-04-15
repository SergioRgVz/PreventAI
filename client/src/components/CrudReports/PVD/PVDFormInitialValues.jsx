import PVDForm from './PVDForm';
const {
    formField: {
        empleado,
        empresa,
        centroDeTrabajo,
        puestoDeTrabajo,
        fecha,
        referencia,
        descripcionTrabajoPVD,
        aspectosPantalla,
        aspectosTeclado,
        aspectosMesa,
        aspectosSilla,
        aspectosEspacio,
        aspectosIluminacion,
        aspectosRuido,
        aspectosTemperatura,
        aspectosProgramas,
        aspectosOrganizacion,
        indicaciones
        
    }
} = PVDForm;

export default {
    [empleado.name]: '',
    [empresa.name]: '',
    [centroDeTrabajo.name]: '',
    [puestoDeTrabajo.name]: '',
    [fecha.name]: '',
    [referencia.name]: '',
    [descripcionTrabajoPVD.name]: '',
    [aspectosPantalla.name]: [],
    [aspectosTeclado.name]: [],
    [aspectosMesa.name]: [],
    [aspectosSilla.name]: [],
    [aspectosEspacio.name]: [],
    [aspectosIluminacion.name]: [],
    [aspectosRuido.name]: [],
    [aspectosTemperatura.name]: [],
    [aspectosProgramas.name]: [],
    [aspectosOrganizacion.name]: [],
    [indicaciones.name]: '', 
}
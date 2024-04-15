import React, { useEffect, useState } from 'react';
import { useFormikContext } from 'formik';
import { Grid, Typography, Card, CardContent } from '@mui/material';
import ListaConPuntos from '../../utils/ListaConPuntos';

const ResultGINSHTForm = (props) => {
    const { values, setFieldValue } = useFormikContext();
    const [pesoAceptablecalc, setPesoAceptablecalc] = useState(0);
    const [indiceElevacion, setIndiceElevacion] = useState(0);
    const [colorElevacion, setColorElevacion] = useState('#C0DF85'); // Verde para pesos bajos
    const [contentElevacion, setContentElevacion] = useState(''); // Verde para pesos bajos
    const [indiceTransporte, setIndiceTransporte] = useState(0);
    const [colorTransporte, setColorTransporte] = useState('#C0DF85'); // Verde para pesos bajos
    const [contentTransporte, setContentTransporte] = useState(''); // Verde para pesos bajos
    
    const {
        formField: {
            indiceRiesgoElevacion,
            indiceRiesgoTransporte,
            pesoAceptable
        }
    } = props;

    useEffect(() => {
        let pesoAceptablecalc = values.pesoTeoricoRecomendado * values.desplazamientoVertical * values.giroDelTronco * values.tipoDeAgarre * values.valorFinalFrecuencia;
        setPesoAceptablecalc(pesoAceptablecalc);
        setFieldValue(pesoAceptable.name, pesoAceptablecalc);

        let IRElevacion = values.pesoRealManejado / pesoAceptablecalc;
        setIndiceElevacion(IRElevacion);
        setFieldValue(indiceRiesgoElevacion.name, IRElevacion);

        let pesoDesplazado = values.pesoRealManejado * values.numeroDeDesplazamientos;
        if (values.distanciaDeDesplazamientos > 10) {
            setIndiceTransporte(pesoDesplazado / 60);
        } else {
            setIndiceTransporte(pesoDesplazado / 100);
        }
        setFieldValue(indiceRiesgoTransporte.name, pesoDesplazado);

        setColorElevacion(getColor(IRElevacion, values.pesoRealManejado));
        setColorTransporte(getColor(indiceTransporte));

        setContentElevacion(getContentIndex(colorElevacion));
        setContentTransporte(getContentIndex(colorTransporte));

    }, [indiceElevacion, indiceTransporte]);

    function getColor(valorIndice, pesoRealManejado = NaN) {
        if (pesoRealManejado < 3) {
            return '#C0DF85'; // Verde para pesos bajos
        }
        if (valorIndice >= 3) {
            return '#db162fbf'; // Rojo para índices altos
        } else if (valorIndice >= 1) {
            return '#f49636'; //Naranja para índices medios
        } else if (valorIndice >= 0.7) {
            return '#F8F272'; //Amarillo para índices bajos
        } else {
            return '#C0DF85'; // Verde para índices muy bajos
        }
    }

    function getContentIndex(value) {
        if (value === '#C0DF85') {
            return 0;
        } else if (value === '#F8F272') {
            return 1;
        } else if (value === '#f49636') {
            return 2;
        } else {
            return 3;
        }
    }

    const evaluacionesElevacion = [
        ["Bien", "Elevaciones manuales de carga que se consideran normales, sin riesgo de lesiones musculoesqueléticas y en las que no es necesaria ninguna acción."],
        ["Aceptable/Mejorable", "Elevaciones manuales de carga que se consideran normales, sin riesgo de lesiones musculoesqueléticas y en las que no es necesaria ninguna acción."],
        ["Deficiente", "Elevaciones manuales con riesgo alto de lesión. Se debe modificar el método de trabajo tan pronto como sea posible."],
        ["Muy deficiente", "Elevaciones con un riesgo extremo de lesión musculoesquelética. Deben tomarse medidas correctoras inmediatamente."]
    ];

    const evaluacionesTransporte = [
        ["Bien", "Transportes manuales de carga que se consideran normales, sin riesgo de lesiones musculoesqueléticas, y en las que no es necesaria ninguna acción."],
        ["Aceptable/Mejorable", "Transportes manuales con ligero riesgo de lesión musculoesquelética en que las mejoras que se puedan recomendar no requieren urgencia y que, por ejemplo, se pueden efectuar aprovechando renovación de equipos."],
        ["Deficiente", "Transportes manuales con riesgo alto de lesión. Se debe modificar el método de trabajo tan pronto como sea posible."],
        ["Muy deficiente", "Transportes manuales con un riesgo extremo de lesión musculoesquelética. Deben tomarse medidas correctoras inmediatamente."]
    ];

    console.log("Values:", values);


    return (
        <React.Fragment>
            <Typography variant="h4" gutterBottom>
                Resultados
            </Typography>
            <Typography variant="h5" gutterBottom>
                Resultados generales
            </Typography>
            <Grid container direction={"row"} spacing={3} paddingBottom={"10px"}>
                <Grid item xs={12} sm={4}>
                    <Card raised>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Peso Real
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>{values.pesoRealManejado} Kgs</strong>
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Card raised>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Peso teórico recomendado
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>{values.pesoTeoricoRecomendado} Kgs</strong>
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Card raised>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Peso aceptable
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>{parseFloat(pesoAceptablecalc).toFixed(2)} Kgs</strong>
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Typography variant="h5" gutterBottom>
                Riesgo de elevación de carga
            </Typography>
            <Grid container justifyContent={"center"} spacing={3} paddingBottom={'10px'}>
                <Grid item xs={12} sm={12}>
                    <Card style={{ backgroundColor: colorElevacion }}>
                        <CardContent >
                            <Typography variant="h6" style={{ display: 'flex', justifyContent: 'center' }} gutterBottom>
                                Índice de riesgo de elevación
                            </Typography>
                            <Typography variant="body1" style={{ display: 'flex', justifyContent: 'center' }} gutterBottom>
                                <strong>{parseFloat(indiceElevacion).toFixed(2)}</strong>
                            </Typography>
                            <Typography variant="body2" style={{ display: 'flex', justifyContent: 'center' }} gutterBottom>
                                {contentElevacion !== '' && evaluacionesElevacion[contentElevacion] ? `${evaluacionesElevacion[contentElevacion][0]}: ${evaluacionesElevacion[contentElevacion][1]}` : ''}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Typography variant="h5" gutterBottom>
                Riesgo de transporte de carga
            </Typography>
            <Grid container justifyContent={"center"} spacing={3} paddingBottom={'10px'}>
                <Grid item xs={12} sm={12} >
                    <Card style={{ backgroundColor: colorTransporte }}>
                        <CardContent>
                            <Typography variant="h6" style={{ display: 'flex', justifyContent: 'center' }} gutterBottom>
                                Índice de riesgo
                            </Typography>
                            <Typography variant="body1" style={{ display: 'flex', justifyContent: 'center' }} gutterBottom>
                                <strong>{parseFloat(indiceTransporte).toFixed(2)}</strong>
                            </Typography>
                            <Typography variant="body2" style={{ display: 'flex', justifyContent: 'center' }} gutterBottom>
                                {contentTransporte !== '' && evaluacionesTransporte[contentTransporte] ? `${evaluacionesTransporte[contentTransporte][0]}: ${evaluacionesTransporte[contentTransporte][1]}` : ''}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Typography variant="h5" gutterBottom>
                Factores ergonómicos del puesto
            </Typography>
            <Grid container spacing={3} paddingBottom={'10px'}>
                <Grid item xs={12} sm={12}>
                    <ListaConPuntos elementos={values.listaDeFactoresPuesto} />
                </Grid>
            </Grid>
            <Typography variant="h5" gutterBottom>
                Factores ergonómicos del trabajador
            </Typography>
            <Grid container spacing={3} paddingBottom={'10px'}>
                <Grid item xs={12} sm={12}>
                    <ListaConPuntos elementos={values.listaDeFactoresTrabajador} />
                </Grid>
            </Grid>

        </React.Fragment>
    );
};

export default ResultGINSHTForm;
import React, { useState } from 'react';
import { useFormikContext } from 'formik';
import { Grid, Typography } from '@mui/material';
import ListaConPuntos from '../../utils/ListaConPuntos';
import InputField from '../../FormFields/InputField';

const ResultsPVDForm = (props ) => {
    const { values, setFieldValue } = useFormikContext();
    const {
        formField: {
            indicaciones
        }
    } = props;
    return (
        <React.Fragment>
            <Typography variant="h4" gutterBottom>
                Estos son los aspectos seleccionados en el formulario:
            </Typography>
            <Typography variant="h5" gutterBottom>
                Aspectos de la pantalla
            </Typography>
            <Grid container spacing={3} paddingBottom={'10px'}>
                <Grid item xs={12} sm={12}>
                    <ListaConPuntos elementos={values.aspectosPantalla} />
                </Grid>
            </Grid>
            <Typography variant="h5" gutterBottom>
                Aspectos del teclado
            </Typography>
            <Grid container spacing={3} paddingBottom={'10px'}>
                <Grid item xs={12} sm={12}>
                    <ListaConPuntos elementos={values.aspectosTeclado} />
                </Grid>
            </Grid>
            <Typography variant="h5" gutterBottom>
                Aspectos de la mesa o superficie de trabajo
            </Typography>
            <Grid container spacing={3} paddingBottom={'10px'}>
                <Grid item xs={12} sm={12}>
                    <ListaConPuntos elementos={values.aspectosMesa} />
                </Grid>
            </Grid>
            <Typography variant="h5" gutterBottom>
                Aspectos de la silla
            </Typography>
            <Grid container spacing={3} paddingBottom={'10px'}>
                <Grid item xs={12} sm={12}>
                    <ListaConPuntos elementos={values.aspectosSilla} />
                </Grid>
            </Grid>
            <Typography variant="h5" gutterBottom>
                Aspectos de la iluminación en el espacio de trabajo
            </Typography>
            <Grid container spacing={3} paddingBottom={'10px'}>
                <Grid item xs={12} sm={12}>
                    <ListaConPuntos elementos={values.aspectosIluminacion} />
                </Grid>
            </Grid>
            <Typography variant="h5" gutterBottom>
                Aspectos del ruido
            </Typography>
            <Grid container spacing={3} paddingBottom={'10px'}>
                <Grid item xs={12} sm={12}>
                    <ListaConPuntos elementos={values.aspectosRuido} />
                </Grid>
            </Grid>
            <Typography variant="h5" gutterBottom>
                Aspectos de las condiciones térmicas
            </Typography>
            <Grid container spacing={3} paddingBottom={'10px'}>
                <Grid item xs={12} sm={12}>
                    <ListaConPuntos elementos={values.aspectosTemperatura} />
                </Grid>
            </Grid>
            <Typography variant="h5" gutterBottom>
                Aspectos de los programas de ordenador
            </Typography>
            <Grid container spacing={3} paddingBottom={'10px'}>
                <Grid item xs={12} sm={12}>
                    <ListaConPuntos elementos={values.aspectosProgramas} />
                </Grid>
            </Grid>
            <Typography variant="h5" gutterBottom>
                Aspectos de gestión y organización del trabajo
            </Typography>
            <Grid container spacing={3} paddingBottom={'10px'}>
                <Grid item xs={12} sm={12}>
                    <ListaConPuntos elementos={values.aspectosOrganizacion} />
                </Grid>
            </Grid>
            <Typography variant="h5" gutterBottom>
                Indicaciones
            </Typography>
            <Grid container spacing={3} paddingBottom={'10px'}>
                <Grid item xs={12} sm={12}>
                    <Typography>Indicaciones</Typography>
                </Grid>
            </Grid>
            <InputField name={indicaciones.name} multiline rows={7} label={indicaciones.label} fullWidth />
        </React.Fragment>
    );
};

export default ResultsPVDForm;
import { useFormikContext } from 'formik';
import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box, Stack } from '@mui/material';
import SelectField from '../../FormFields/SelectField';
import Divider from '@mui/material/Divider';
import RadioInputField from '../../FormFields/RadioInputField';
import { FormikCheckboxInt } from '../../FormFields/FormikCheckboxInt';


export default function GrupoAEvaluation(props) {
    const { values, setFieldValue } = useFormikContext();

    const [valueneckImage, setValueNeckImage] = useState('/REBA/GrupoA/Cuello_0_20.png');
    const [valuetrunkImage, setValueTrunkImage] = useState('/REBA/GrupoA/Tronco_0_20.png');
    const [valuelegsImage, setValueLegsImage] = useState('/REBA/GrupoA/flexion_rodilla_30.png');

    const {
        formField: {
            puntuacionCuello,
            puntuacionPiernas,
            puntuacionTronco,
        }
    } = props;

    useEffect(() => {
        let valores = ['/REBA/GrupoA/Cuello_0_20.png', '/REBA/GrupoA/Cuello_mayor_0_mayor_20.png'];

        setValueNeckImage(valores[values.puntuacionCuello - 1]);
    }, [values.puntuacionCuello]);

    useEffect(() => {
        let valores = ['/REBA/GrupoA/Tronco_recto.png', '/REBA/GrupoA/Tronco_0_20.png', '/REBA/GrupoA/Tronco_20_60.png', '/REBA/GrupoA/Tronco_mas_60.png'];
        setValueTrunkImage(valores[values.puntuacionTronco -1 ]);
    }, [values.puntuacionTronco]);

    useEffect(() => {
        let valores = ['/REBA/GrupoA/flexion_rodilla_30.png', '/REBA/GrupoA/flexion_rodilla_mas_60.png'];
        setValueLegsImage(valores[values.puntuacionPiernas -1]);
    }, [values.puntuacionPiernas]);



    return (
        <React.Fragment>
            <Typography variant="h4" gutterBottom>
                Datos de evaluación del grupo A
            </Typography>
            <Stack container spacing={3}>
                <Typography variant="h6" gutterBottom>
                    Se evaluará la postura del cuello, tronco y piernas.
                </Typography>
                <Divider />
                <Typography variant="body1" gutterBottom>
                    <b>Postura del cuello:</b> Se evaluará la postura del cuello en función de la flexión o extensión del mismo.
                </Typography>

                <Grid container item spacing={2} direction="row" flexWrap={"nowrap"} justifyContent="space-between" paddingRight={"5vh"} fullWidth
                    sx={{
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
                        padding: '16px',
                        marginBottom: '24px',
                        width: 'auto'
                    }}  >
                    <RadioInputField
                        name={puntuacionCuello.name}
                        label={puntuacionCuello.label}
                        row
                        data={[
                            { value: 1, label: 'El cuello está entre 0º y 20º de flexión' },
                            { value: 2, label: 'El cuello está extendido o flexionado más de 20º' }
                        ]}
                    />
                    <Box
                        component="img"
                        src={valueneckImage}
                        alt="Puntuacion Cuello"
                        sx={{ height: '22vh', width: 'auto' }}
                    />

                </Grid>
                <Typography variant="body1" gutterBottom>
                    <b>Indique la siguiente casilla si:</b>
                </Typography>
                <Grid container item spacing={2} direction="row" flexWrap={"nowrap"} justifyContent="space-between" paddingRight={"5vh"} fullWidth>
                    <FormikCheckboxInt name="cambioCuello" label="Existe torsión o inclinación lateral del cuello" />
                    <Box
                        component="img"
                        src={'/REBA/GrupoA/Torsion_cuello.png'}
                        alt="Torsión cuello"
                        sx={{ height: '22vh', width: 'auto' }}
                    />
                </Grid>
                <Divider />
                <Typography variant="body1" gutterBottom>
                    <b>Postura del tronco:</b> Se evaluará la postura del tronco en función de la flexión o extensión del mismo.
                </Typography>
                <Grid container item spacing={2} direction="row" flexWrap={"nowrap"} justifyContent="space-between" paddingRight={"5vh"} fullWidth
                    sx={{
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
                        padding: '16px',
                        marginBottom: '24px',
                        width: 'auto'
                    }}  >
                    <RadioInputField
                        name={puntuacionTronco.name}
                        label={puntuacionTronco.label}
                        row
                        data={[
                            { value: 1, label: 'El tronco está erguido' },
                            { value: 2, label: 'El tronco está entre 0º y 20º de flexión o 0º y 20º de extensión' },
                            { value: 3, label: 'El tronco está entre 20º y 60 de flexión o 20º y 60 de extensión' },
                            { value: 4, label: 'El tronco está flexionado más de 60º' }
                        ]}
                    />

                    <Box
                        component="img"
                        src={valuetrunkImage}
                        alt="Puntuacion Tronco"
                        sx={{ height: '22vh', width: 'auto' }}
                    />
                </Grid>
                <Typography variant="body1" gutterBottom>
                    <b>Indique la siguiente casilla si:</b>
                </Typography>
                <Grid container item spacing={2} direction="row" flexWrap={"nowrap"} justifyContent="space-between" paddingRight={"5vh"} fullWidth>
                    <FormikCheckboxInt name="cambioTronco" label="Existe torsión o inclinación lateral del tronco" />

                    <Box
                        component="img"
                        src={'/REBA/GrupoA/Torsion_tronco.png'}
                        alt="Torsión tronco"
                        sx={{ height: '22vh', width: 'auto' }}
                    />

                </Grid>
                <Divider />
                <Typography variant="body1" gutterBottom>
                    <b>Postura de las piernas:</b> Se evaluará la postura de las piernas en función de la flexión o extensión de las rodillas.
                </Typography>
                <Grid container item spacing={2} direction="row" flexWrap={"nowrap"} justifyContent="space-between" paddingRight={"5vh"} fullWidth
                    sx={{
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
                        padding: '16px',
                        marginBottom: '24px',
                        width: 'auto'
                    }}  >
                    <RadioInputField
                        name={puntuacionPiernas.name}
                        label={puntuacionPiernas.label}
                        row
                        data={[
                            { value: 1, label: 'Existe flexión de una o de ambas rodillas entre 30º y 60º' },
                            { value: 2, label: 'Existe flexión de una o de ambas rodillas de más de 60º (salvo postura sedente)' }
                        ]}
                    />

                    <Box
                        component="img"
                        src={valuelegsImage}
                        alt="Puntuacion Piernas"
                        sx={{ height: '22vh', width: 'auto' }}
                    />
                </Grid>
                <Typography variant="body1" gutterBottom>
                    <b>Indique las siguientes casillas si:</b>
                </Typography>
                <Grid container item spacing={2} direction="row" flexWrap={"nowrap"} justifyContent="space-between" paddingRight={"5vh"} fullWidth>
                    <FormikCheckboxInt name="cambioPiernas1" label="Soporte bilateral, andando o sentado" />
                    <Box
                        component="img"
                        src={'/REBA/GrupoA/Soporte_bilateral.png'}
                        alt="Puntuacion bilateral"
                        sx={{ height: '22vh', width: 'auto' }}
                    />
                </Grid>
                <Grid container item spacing={2} direction="row" flexWrap={"nowrap"} justifyContent="space-between" paddingRight={"5vh"} fullWidth>
                    <FormikCheckboxInt name="cambioPiernas2" label="Soporte unilateral, soporte ligero o postura inestable" />
                    <Box
                        component="img"
                        src={'/REBA/GrupoA/Soporte_unilateral.png'}
                        alt="Puntuacion bilateral"
                        sx={{ height: '22vh', width: 'auto' }}
                    />
                </Grid>

            </Stack>
        </React.Fragment >
    )
}
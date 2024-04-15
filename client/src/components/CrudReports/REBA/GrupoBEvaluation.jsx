import { useFormikContext } from 'formik';
import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box, Stack } from '@mui/material';
import SelectField from '../../FormFields/SelectField';
import Divider from '@mui/material/Divider';
import RadioInputField from '../../FormFields/RadioInputField';
import { FormikCheckboxInt } from '../../FormFields/FormikCheckboxInt';

export default function GrupoBEvaluation(props) {
    const { values, setFieldValue } = useFormikContext();

    const [valuearmsImage, setValueArmsImage] = useState('/REBA/GrupoB/flexion_brazo_20.png');
    const [valueforearmsImage, setValueForearmsImage] = useState('/REBA/GrupoB/flexion_antebrazo_60_100.png');
    const [valuewristsImage, setValueWristsImage] = useState('/REBA/GrupoB/muneca_0_15.png');

    const {
        formField: {
            puntuacionBrazos,
            puntuacionAntebrazos,
            puntuacionMunecas,
        }
    } = props;

    useEffect(() => {
        let valores = ['/REBA/GrupoB/flexion_brazo_20.png', '/REBA/GrupoB/flexion_brazo_20_45.png', '/REBA/GrupoB/flexion_brazo_45_90.png', '/REBA/GrupoB/flexion_brazo_mas_90.png'];

        setValueArmsImage(valores[values.puntuacionBrazos - 1]);
    }, [values.puntuacionBrazos]);

    useEffect(() => {
        let valores = ['/REBA/GrupoB/flexion_antebrazo_60_100.png', '/REBA/GrupoB/flexion_antebrazo_mas_100.png'];

        setValueForearmsImage(valores[values.puntuacionAntebrazos -1]);
    }, [values.puntuacionAntebrazos]);

    useEffect(() => {
        let valores = ['/REBA/GrupoB/muneca_0_15.png', '/REBA/GrupoB/muneca_mas_15.png'];

        setValueWristsImage(valores[values.puntuacionMunecas - 1]);
    }, [values.puntuacionMunecas]);


    return (
        <React.Fragment>
            <Typography variant="h4" gutterBottom>
                Datos de evaluación del grupo B
            </Typography>
            <Stack container spacing={3} paddingBottom={'10px'}>
                <Typography variant="h6" gutterBottom>
                    Se evaluará la postura de los brazos, antebrazos y muñecas.
                </Typography>
                <Divider />
                <Typography variant="body1" gutterBottom>
                    <b>Postura de los brazos:</b> Se evaluará la postura de los brazos en función de la flexión o extensión de los mismos.
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
                        name={puntuacionBrazos.name}
                        label={puntuacionBrazos.label}
                        row
                        data={[
                            { value: 1, label: 'El brazo está entre 20º de flexión y 20º de extensiónz' },
                            { value: 2, label: 'El brazo está entre 21º y 45º de flexión o más de 20º de extensión.' },
                            { value: 3, label: 'El brazo está entre 46º y 90º de flexión.' },
                            { value: 4, label: 'El brazo está flexionado más de 90º.' }
                        ]}
                    />
                    <Box
                        component="img"
                        src={valuearmsImage}
                        alt="Puntuacion brazos"
                        sx={{ height: '22vh', width: 'auto' }}
                    />
                </Grid>
                <Typography variant="body1" gutterBottom>
                    <b>Indique las siguientes casillas si:</b>
                </Typography>
                <Grid container item spacing={2} direction="row" flexWrap={"nowrap"} justifyContent="space-between" paddingRight={"5vh"} fullWidth>
                    <FormikCheckboxInt name="cambioBrazosAbducido" label="El brazo está abducido o rotado" />

                    <Box
                        component="img"
                        src={'/REBA/GrupoB/flexion_brazo_abducido_rotado.png'}
                        alt="Torsión brazo"
                        sx={{ height: '22vh', width: 'auto' }}
                    />
                </Grid>
                <Grid container item spacing={2} direction="row" flexWrap={"nowrap"} justifyContent="space-between" paddingRight={"5vh"} fullWidth>
                    <FormikCheckboxInt name="cambioBrazosHombroLevantado" label="El hombro está elevado" />

                    <Box
                        component="img"
                        src={'/REBA/GrupoB/hombros_elevados.png'}
                        alt="Hombros elevados imagen"
                        sx={{ height: '22vh', width: 'auto' }}
                    />
                </Grid>
                <Grid container item spacing={2} direction="row" flexWrap={"nowrap"} justifyContent="space-between" paddingRight={"5vh"} fullWidth>
                    <FormikCheckboxInt name="cambioBrazosApoyado" label="Existe apoyo o postura a favor de la gravedad" />

                    <Box
                        component="img"
                        src={'/REBA/GrupoB/apoyo_brazo.png'}
                        alt="Apoyo brazos"
                        sx={{ height: '22vh', width: 'auto' }}
                    />
                </Grid>
                <Divider />
                <Typography variant="body1" gutterBottom>
                    <b>Postura de los antebrazos:</b> Se evaluará la postura de los antebrazos en función de la flexión o extensión de los mismos.
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
                        name={puntuacionAntebrazos.name}
                        label={puntuacionAntebrazos.label}
                        row
                        data={[
                            { value: 1, label: 'El antebrazo está entre 60º y 100º de flexión.' },
                            { value: 2, label: 'El antebrazo está flexionado por debajo de 60º o por encima de 100º.' }
                        ]}
                    />

                    <Box
                        component="img"
                        src={valueforearmsImage}
                        alt="Puntuacion Antebrazos"
                        sx={{ height: '22vh', width: 'auto' }}
                    />
                </Grid>
                <Divider />
                <Typography variant="body1" gutterBottom>
                    <b>Postura de las muñecas:</b> Se evaluará la postura de las muñecas en función de la flexión o extensión de las mismas.
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
                        name={puntuacionMunecas.name}
                        label={puntuacionMunecas.label}
                        row
                        data={[
                            { value: 1, label: 'La muñeca está entre 0 y 15 grados de flexión o extensión.' },
                            { value: 2, label: 'La muñeca está flexionada o extendida más de 15 grados.' }
                        ]}
                    />

                    <Box
                        component="img"
                        src={valuewristsImage}
                        alt="aaa"
                        sx={{ height: '22vh', width: 'auto' }}
                    />
                </Grid>
                <Typography variant="body1" gutterBottom>
                    <b>Indique la siguiente casilla si:</b>
                </Typography>
                <Grid container item spacing={2} direction="row" flexWrap={"nowrap"} justifyContent="space-between" paddingRight={"5vh"} fullWidth>
                    <FormikCheckboxInt name="cambioMunecas" label="Existe torsión o desviación lateral de la muñeca." />

                    <Box
                        component="img"
                        src={'/REBA/GrupoB/muneca_torsion.png'}
                        alt="Torsión cuello"
                        sx={{ height: '22vh', width: 'auto' }}
                    />
                </Grid>


            </Stack>
        </React.Fragment >
    )
}
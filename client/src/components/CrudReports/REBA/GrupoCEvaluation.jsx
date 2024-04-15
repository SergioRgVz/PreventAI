import { useFormikContext } from 'formik';
import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box, Stack } from '@mui/material';
import SelectField from '../../FormFields/SelectField';
import RadioInputField from '../../FormFields/RadioInputField';
import { FormikCheckboxInt } from '../../FormFields/FormikCheckboxInt';
import Divider from '@mui/material/Divider';

export default function GrupoCEvaluation(props) {
    const { values, setFieldValue } = useFormikContext();

    const [valueholdImage, setValueHoldImage] = useState('/REBA/GrupoC/agarrebueno.png');


    const {
        formField: {
            puntuacionCarga,
            cambioCarga,
            puntuacionAgarre,
            estatismo,
            accionesRepetidas,
            cambiosRapidos
        }
    } = props;

    useEffect(() => {
        let valores = ['/REBA/GrupoC/agarrebueno.png', '/REBA/GrupoC/agarreregular.png', '/REBA/GrupoC/agarremalo.png'];
        if (values.puntuacionAgarre != 3)
            setValueHoldImage(valores[values.puntuacionAgarre]);
    }, [values.puntuacionAgarre]);

    return (
        <React.Fragment>
            <Typography variant="h4" gutterBottom>
                Datos de evaluación de las fuerzas y la actividad
            </Typography>
            <Stack container spacing={3} paddingBottom={'10px'}>

                <Typography variant="h6" gutterBottom>
                    Se evaluará la carga, la fuerza y la actividad.
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <b>Carga o fuerza:</b> Se evaluará la carga o fuerza que se aplica.
                </Typography>
                <RadioInputField
                    name={puntuacionCarga.name}
                    label={puntuacionCarga.label}
                    row
                    data={[
                        { value: 0, label: 'La carga o fuerza es menor de 5kg.' },
                        { value: 1, label: 'La carga o fuerza está entre 5 y 10 kgs.' },
                        { value: 2, label: 'La carga o fuerza es mayor de 10 kgs.' }
                    ]}
                />
                <FormikCheckboxInt name="cambioCarga" label="La fuerza se aplica bruscamente." />

                <Divider />
                <Typography variant="body1" gutterBottom>
                    <b>Agarre:</b> Se evaluará la calidad del agarre.
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
                        name={puntuacionAgarre.name}
                        label={puntuacionAgarre.label}
                        row
                        data={[
                            { value: 0, label: 'Agarre Bueno (el agarre es bueno y la fuerza de agarre de rango medio).' },
                            { value: 1, label: 'Agarre Regular (el agarre con la mano es aceptable pero no ideal o el agarre es aceptable utilizando otras partes del cuerpo).' },
                            { value: 2, label: 'Agarre Malo (el agarre es posible pero no aceptable).' },
                            { value: 3, label: 'Agarre Inaceptable (el agarre es torpe e inseguro, no es posible el agarre manual o el agarre es inaceptable utilizando otras partes del cuerpo).' }
                        ]}
                    />
                    <Box
                        component="img"
                        src={valueholdImage}
                        alt="Puntuacion agarre"
                        sx={{ height: '22vh', width: 'auto' }}
                    />
                </Grid>
                <Divider />
                <Typography variant="body1" gutterBottom>
                    <b>Actividad:</b> Se evaluará la actividad que se realiza.
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <b>Indique la siguiente casilla si:</b>
                </Typography>
                <Grid container item spacing={2}>
                    <FormikCheckboxInt name="estatismo" label="Una o más partes del cuerpo permanecen estáticas, por ejemplo soportadas durante más de 1 minuto. " />
                    <FormikCheckboxInt name="accionesRepetidas" label="Se producen movimientos repetitivos, por ejemplo repetidos más de 4 veces por minuto (excluyendo caminar)." />
                    <FormikCheckboxInt name="cambiosRapidos" label="Se producen cambios de postura importantes o se adoptan posturas inestables." />
                </Grid>
            </Stack>
        </React.Fragment>
    )
}
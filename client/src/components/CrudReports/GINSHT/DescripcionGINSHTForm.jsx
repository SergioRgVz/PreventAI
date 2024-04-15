import React from 'react';
import { Grid, Typography } from '@mui/material';
import { useFormikContext } from 'formik';
import InputField from '../../FormFields/InputField';

export default function DescripcionGINSHTForm(props) {
    const { values, setFieldValue } = useFormikContext();

    const {
        formField: {
            datosDeElevacion,
            datosDeTransporte
        }
    } = props;

    return (
        <React.Fragment>
            <Typography variant="h4" gutterBottom>
                Descripción del trabajo de manipulación manual de cargas
            </Typography>
            <Grid container spacing={3} paddingBottom={'20px'}>
                <Grid item xs={12}>
                    <InputField name={datosDeElevacion.name} multiline rows={7} label={datosDeElevacion.label} fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <InputField name={datosDeTransporte.name} multiline rows={7} label={datosDeTransporte.label} fullWidth />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

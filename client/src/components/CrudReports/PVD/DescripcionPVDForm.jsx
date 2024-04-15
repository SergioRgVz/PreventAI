import React from 'react';
import { Grid, Typography } from '@mui/material';
import { useFormikContext } from 'formik';
import InputField from '../../FormFields/InputField';

export default function DescripcionPVDForm(props) {
    const { values, setFieldValue } = useFormikContext();

    const {
        formField: {
            descripcionTrabajoPVD,
        }
    } = props;

    return (
        <React.Fragment>
            <Typography variant="h4" gutterBottom>
                Descripción del trabajo con pantallas
            </Typography>
            <Grid container spacing={3} paddingBottom={'20px'}>
                <Grid item xs={12}>
                    <InputField name={descripcionTrabajoPVD.name} multiline rows={7} label={descripcionTrabajoPVD.label} fullWidth />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

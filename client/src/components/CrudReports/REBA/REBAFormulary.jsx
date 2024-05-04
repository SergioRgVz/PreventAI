import React, { useState } from 'react';
import { Grid, Paper, Button, Stepper, Step, StepLabel, Typography } from '@mui/material';
import ImageUploadStep from '../ImageUploadStep';
import DatosIdentificativosForm from './DatosIdentificativosForm';
import InputField from '../../FormFields/InputField';
import GrupoAEvaluation from './GrupoAEvaluation';
import GrupoBEvaluation from './GrupoBEvaluation';
import GrupoCEvaluation from './GrupoCEvaluation';
import ResultREBAForm from './ResultREBAForm';
import REBAForm from './REBAForm';
import { CircularProgress } from '@mui/material';
import { Formik, Form } from "formik";
import formInitialValues from "./REBAFormInitialValues";
import ReportSuccess from '../ReportSuccess';
import { reportService } from '../../../hooks/useReports';

const steps = ['Datos identificativos', 'Imágenes', 'Descripción', 'Valoración grupo A', 'Valoración grupo B', 'Valoración de fuerzas y cargas', 'Resultados', 'Enviar'];
const { formId, formField } = REBAForm;

function _renderStepContent(step) {
    switch (step) {
        case 0:
            return <DatosIdentificativosForm formField={formField} />;
        case 1:
            return <ImageUploadStep formField={formField} />;
        case 2:
            return (
                <React.Fragment>
                    <Typography variant="h4" gutterBottom>
                        Descripción del trabajo con peso
                    </Typography>
                    <Grid container spacing={3} paddingBottom={'20px'}>
                        <Grid item xs={12}>
                            <InputField name={formField.descripcionTrabajoREBA.name} multiline rows={7} label={formField.descripcionTrabajoREBA.name} fullWidth />
                        </Grid>
                    </Grid>
                </React.Fragment>
            );
        case 3:
            return <GrupoAEvaluation formField={formField} />;
        case 4:
            return <GrupoBEvaluation formField={formField} />;
        case 5:
            return <GrupoCEvaluation formField={formField} />;
        case 6:
            return <ResultREBAForm formField={formField} />;
        case 7:
            return <Grid containter display={"flex"} justifyContent={"center"} spacing={4} paddingBottom={"30px"}>
                <Grid item xs={12} sm={4}>
                    <Button variant='contained' color='buttons' type="submit">Guardar PDF</Button>
                </Grid>
            </Grid>
        default:
            return <div>No encontrado</div>;
    }
}

function create_REBA_report(values) {
    const report = {
        empleado: values.DNI,
        fecha: values.fecha,
        empresa: values.CIF,
        centroDeTrabajo: values.centroDeTrabajo,
        puestoDeTrabajo: values.puestoDeTrabajo,
        referencia: values.referencia,
        descripcionTrabajoREBA: values.descripcionTrabajoREBA,
        puntuacionCuello: parseInt(values.puntuacionCuello),
        cambioCuello: parseInt(values.cambioCuello),
        puntuacionTronco: parseInt(values.puntuacionTronco),
        cambioTronco: parseInt(values.cambioTronco),
        puntuacionPiernas: parseInt(values.puntuacionPiernas),
        cambioPiernas1: parseInt(values.cambioPiernas1),
        cambioPiernas2: parseInt(values.cambioPiernas2),
        puntuacionBrazos: parseInt(values.puntuacionBrazos),
        cambioBrazosAbducido: parseInt(values.cambioBrazosAbducido),
        cambioBrazosHombroLevantado: parseInt(values.cambioBrazosHombroLevantado),
        cambioBrazosApoyado: parseInt(values.cambioBrazosApoyado),
        puntuacionAntebrazos: parseInt(values.puntuacionAntebrazos),
        puntuacionMunecas: parseInt(values.puntuacionMunecas),
        cambioMunecas: parseInt(values.cambioMunecas),
        puntuacionCarga: parseInt(values.puntuacionCarga),
        cambioCarga: parseInt(values.cambioCarga),
        puntuacionAgarre: parseInt(values.puntuacionAgarre),
        estatismo: parseInt(values.estatismo),
        accionesRepetidas: parseInt(values.accionesRepetidas),
        cambiosRapidos: parseInt(values.cambiosRapidos),
        indicacionesYMedidasPreventivas: {
            indicaciones: 'No hay indicaciones ni medidas preventivas'
        },
        images: values.images

    }
    return report;
};


export function REBAFormulary() {
    const [activeStep, setActiveStep] = useState(0);
    // const currentValidationSchema = validationSchema[activeStep]; //TODO: Implement validation schema
    const isLastStep = activeStep === steps.length - 1;

    function _sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function _submitForm(values, actions) {
        await _sleep(1000);
        alert(JSON.stringify(values, null, 2));
        console.log("VALUES REBA", values);
        let report = create_REBA_report(values);
        reportService.createReportREBA(report);
        actions.setSubmitting(false);

        setActiveStep(activeStep + 1);
    }

    function _handleSubmit(values, actions) {
        if (isLastStep) {
            _submitForm(values, actions);
        } else {
            setActiveStep(activeStep + 1);
            actions.setTouched({});
            actions.setSubmitting(false);
        }
    }

    function _handleBack() {
        setActiveStep(activeStep - 1);
    }
    function _handleHome() {
        window.location.href = '/home';
    }

    return (
        <React.Fragment>
            <Typography component="h1" variant="h2" align="center" paddingTop={'10px'}>
                Informe REBA
            </Typography>
            <Grid container spacing={2} paddingTop={'10px'} paddingLeft={'20px'} paddingRight={'30px'}>
                <Grid item xs={6} md={3} lg={3}>

                    <Stepper activeStep={activeStep} orientation='vertical'>
                        {steps.map((label, index) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Grid>
                <Grid item xs={6} md={9} lg={9}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        {
                            activeStep === steps.length ? (
                                <React.Fragment>
                                    <ReportSuccess />
                                    <Button onClick={_handleHome}>
                                        Volver a la página principal
                                    </Button>
                                </React.Fragment>
                            ) : (
                                <Formik
                                    initialValues={formInitialValues}
                                    // validationSchema={currentValidationSchema}
                                    onSubmit={_handleSubmit}
                                >
                                    {({ isSubmitting }) => (
                                        <Form id={formId}>
                                            {_renderStepContent(activeStep)}

                                            <div>
                                                {activeStep !== 0 && (
                                                    <Button onClick={_handleBack}>
                                                        Atrás
                                                    </Button>
                                                )}
                                                <div >
                                                    <Button
                                                        disabled={isSubmitting}
                                                        type="submit"
                                                        variant="contained"
                                                        color="primary"
                                                    >
                                                        {isLastStep ? "Subir informe" : "Siguiente"}
                                                    </Button>
                                                    {isSubmitting && (
                                                        <CircularProgress
                                                            size={24}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            )}
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

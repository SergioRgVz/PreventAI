import React, { useState } from 'react';
import { Grid, Paper, Button, Stepper, Step, StepLabel, Typography } from '@mui/material';
import ImageUploadStep from '../ImageUploadStep';
import DatosIdentificativosForm from './DatosIdentificativosForm';
import EvaluationPVDForm from './EvaluationPVDForm';
import DescripcionPVDForm from './DescripcionPVDForm';
import ResultsPVDForm from './ResultsPVDForm';
import PVDForm from './PVDForm';
import { CircularProgress } from '@mui/material';
import { Formik, Form } from "formik";
import formInitialValues from "../PVD/PVDFormInitialValues";
import ReportSuccess from '../ReportSuccess';
import {reportService} from '../../../hooks/useReports';

const steps = ['Datos identificativos', 'Imágenes', 'Descripción', 'Valoración', 'Resultados', 'Enviar'];
const { formId, formField } = PVDForm;

function _renderStepContent(step) {
  switch (step) {
    case 0:
      return <DatosIdentificativosForm formField={formField} />;
    case 1:
      return <ImageUploadStep formField={formField} />;
    case 2:
      return <DescripcionPVDForm formField={formField} />;
    case 3:
      return <EvaluationPVDForm formField={formField} />;
    case 4:
      return <ResultsPVDForm formField={formField} />;
    case 5:
      return <Grid containter display={"flex"} justifyContent={"center"} spacing={4} paddingBottom={"30px"}>
        <Grid item xs={12} sm={4}>
          <Button variant='contained' color='buttons' type="submit">Guardar PDF</Button>
        </Grid>
      </Grid>
    default:
      return <div>No encontrado</div>;
  }
}

function create_PVD_report(values) {
  const report = {
    empleado : values.DNI,
    fecha : values.fecha,
    empresa : values.CIF,
    centroDeTrabajo : values.centroDeTrabajo,
    puestoDeTrabajo : values.puestoDeTrabajo,
    referencia : values.referencia,
    descripcionTrabajoPVD: values.descripcionTrabajoPVD,
    aspectosPantalla: values.aspectosPantalla,
    aspectosTeclado: values.aspectosTeclado,
    aspectosMesa: values.aspectosMesa,
    aspectosSilla: values.aspectosSilla,
    aspectosEspacio: values.aspectosEspacio,
    aspectosIluminacion: values.aspectosIluminacion,
    aspectosRuido: values.aspectosRuido,
    aspectosTemeperatura: values.aspectosTemperatura,
    aspectosProgramas: values.aspectosProgramas,
    aspectosOrganizacion: values.aspectosOrganizacion,
    indicacionesYMedidasPreventivas : {
      indicaciones : values.indicaciones
    },
    images: values.images
  };
  return report;
}


export function PVDFormulary() {
  const [activeStep, setActiveStep] = useState(0);
  // const currentValidationSchema = validationSchema[activeStep]; //TODO: Implement validation schema
  const isLastStep = activeStep === steps.length - 1;

  function _sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function _submitForm(values, actions) {
    await _sleep(1000);
    let report = create_PVD_report(values);
    reportService.createReportPVD(report);
    // alert(JSON.stringify(values, null, 2));  
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
        Informe PVD
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

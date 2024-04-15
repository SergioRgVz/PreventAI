import React, { useState, useEffect } from 'react';
import { Grid, Paper, TextField, Button, Stepper, Step, StepLabel, Typography, Box } from '@mui/material';
import ImageUploadStep from '../ImageUploadStep';
import ElevacionCargaStep from './ElevacionCarga';
import { CompanySelector } from '../../CrudEmpresas/CompanySelector';
import { companyService } from '../../../hooks/useCompanies';

function getSteps() {
  return ['Datos identificativos', 'Descripción del trabajo de manipulación manual de cargas', 'Imagenes', 'Evaluación', 'Resumen', 'Enviar'];
}

function getStepContent(stepIndex, handleChange, companiesList) {
  switch (stepIndex) {
    case 0:
      return (
        <React.Fragment>
            <Typography variant="h6">Datos identificativos</Typography>
            <CompanySelector
        id="company"
        name="company"
        label="Empresa"
        onChange={handleChange} // Asegúrate de que handleChange actualiza correctamente formData
        options={companiesList}
      />
            <TextField margin="normal" label="Nombre" variant='filled' fullWidth />
            <TextField margin="normal" label="Apellidos" variant='filled' fullWidth />
            <TextField margin="normal" label="DNI" variant='filled' fullWidth />
            <TextField margin="normal" label="Empresa" variant='filled' fullWidth />
            <TextField margin="normal" label="Centro de trabajo" variant='filled' fullWidth />
            <TextField margin="normal" label="Puesto de trabajo" variant='filled' fullWidth />
            <TextField margin="normal" label="Fecha" variant='filled' fullWidth />
            <TextField margin="normal" label="Referencia" variant='filled' fullWidth />
        </React.Fragment>
      );
    case 1:
      return (
        <React.Fragment>
          <Typography variant="h6">Descripción del trabajo de manipulación manual de cargas</Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Datos de elevación"
            placeholder="Escribe aquí un resumen de la actividad de elevación"
            multiline
            variant='filled'
            rows={4}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Datos de transporte"
            placeholder="Escribe aquí un resumen de la actividad de transporte"
            multiline
            variant='filled'
            rows={4}
          />
        </React.Fragment>
      );
    case 2:
        return (
            <ImageUploadStep onBack={stepIndex-1} onNext={stepIndex+1}/>
        );
    case 3: 
    return (
        <ElevacionCargaStep onBack={stepIndex-1} onNext={stepIndex+1}/>
    );
    default:
      return 'Unknown step';
  }
}

export function GINSHTFormulary() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const [formData, setFormData] = useState({});
  const [companiesList, setCompaniesList] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await companyService.getCompanies();
        console.log('Companies:', response);
        setCompaniesList(response);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    fetchCompanies();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
      <Grid container spacing={2} paddingTop={'10px'} paddingLeft={'20px'} paddingRight={'30px'}>
        
        <Grid item xs={6} md={3} lg={3}>
          <Stepper orientation="vertical" activeStep={activeStep} nonLinear>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Grid>
        <Grid item xs={6} md={9} lg={9}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            {getStepContent(activeStep, handleChange, companiesList)}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  Atrás
                </Button>
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                sx={{ mt: 3, ml: 1 }}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Siguiente paso'}
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
  );
}
import  { useState } from 'react';
import { Box, FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, Typography, Grid } from '@mui/material';
import FrequencyInputTable from './frequencyInputData';

function ElevacionCargaStep() {
  const [values, setValues] = useState({
    desplazamientoVertical: '',
    // Add more fields as necessary...
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <Paper sx={{ p: 2, my: 2 }}>
      <Typography variant="h6">Elevación de la carga</Typography>
      <Grid container spacing={0}>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src="/Posturas.png"
            alt="Guía de Elevación de Carga"
            sx={{ width: '65%' }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Desplazamiento vertical</FormLabel>
            <RadioGroup
              aria-label="desplazamiento-vertical"
              name="desplazamientoVertical"
              value={values.desplazamientoVertical}
              onChange={handleChange}
            >
              <FormControlLabel value="1" control={<Radio />} label="Hasta 25 cm" />
              <FormControlLabel value="0.91" control={<Radio />} label="Hasta 50 cm" />
              <FormControlLabel value="0.87" control={<Radio />} label="Hasta 100 cm" />
              <FormControlLabel value="0.84" control={<Radio />} label="Hasta 175 cm" />
              <FormControlLabel value="0" control={<Radio />} label="Más de 175 cm" />
            </RadioGroup>
            <FormLabel component="legend">Giro del tronco</FormLabel>
            <RadioGroup
              aria-label="giro-tronco"
              name="giroTronco"
              value={values.giroTronco}
              onChange={handleChange}
            >
                <FormControlLabel value="1" control={<Radio />} label="Sin giro" />
                <FormControlLabel value="0.9" control={<Radio />} label="Poco girado (hasta 30º)" />
                <FormControlLabel value="0.8" control={<Radio />} label="Girado (hasta 60º)" />
                <FormControlLabel value="0.7" control={<Radio />} label="Muy girado (90º)" />
            </RadioGroup>
            <FormLabel component="legend">Tipo de agarre</FormLabel>
            <RadioGroup
              aria-label="tipo-agarre"
              name="tipoAgarre"
              value={values.tipoAgarre}
              onChange={handleChange}
            >
                <FormControlLabel value="1" control={<Radio />} label="Agarre bueno" />
                <FormControlLabel value="0.95" control={<Radio />} label="Agarre regular" />
                <FormControlLabel value="0.9" control={<Radio />} label="Agarre malo" />
            </RadioGroup>
            <FormLabel component="legend">Tipo de agarre</FormLabel>
            <RadioGroup
              aria-label="tipo-agarre"
              name="tipoAgarre"
              value={values.tipoAgarre}
              onChange={handleChange}
            >
                <FormControlLabel value="1" control={<Radio />} label="Agarre bueno" />
                <FormControlLabel value="0.95" control={<Radio />} label="Agarre regular" />
                <FormControlLabel value="0.9" control={<Radio />} label="Agarre malo" />
            </RadioGroup>
            <FormLabel component="legend">Frecuencia de manipulación</FormLabel>
            <FrequencyInputTable />
          </FormControl>
        </Grid>
      </Grid>

      {/* Risk index indicator */}
      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        Índice de riesgo obtenido: 2.5
    </Typography>
    </Paper>
  );
}

export default ElevacionCargaStep;

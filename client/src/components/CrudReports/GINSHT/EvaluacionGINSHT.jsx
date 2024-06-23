import React from "react";
import { useState, useEffect } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  Typography,
  Box,
  Stack,
  Alert,
} from "@mui/material";
import FactoresCheckList from "./FactoresChecklist";
import apiClient from "../../../hooks/useAxiosAuth";

const fetchFactors = async (tipo) => {
  try {
    const response = await apiClient.get(`/factor/type/${tipo}`);
    return response.data.factors;
  } catch (error) {
    console.error("Error fetching factors:", error);
    return [];
  }
};

const EvaluacionGINSHT = ({ formData, handleChange }) => {
  const [valueImage, setValueImage] = useState("/GINSHT/2.png");
  const [puestosFactors, setPuestosFactors] = useState([]);
  const [trabajadorFactors, setTrabajadorFactors] = useState([]);

  useEffect(() => {
    const fetchPuestosFactors = async () => {
      const factors = await fetchFactors("puestoGINSHT");
      setPuestosFactors(Array.isArray(factors) ? factors : []);
    };

    const fetchTrabajadorFactors = async () => {
      const factors = await fetchFactors("trabajadorGINSHT");
      setTrabajadorFactors(Array.isArray(factors) ? factors : []);
    };

    console.log("fetching factors: ", puestosFactors, trabajadorFactors);
    fetchPuestosFactors();
    fetchTrabajadorFactors();
  }, []);

  useEffect(() => {
    let valores = [
      ["/GINSHT/0.png", "/GINSHT/5.png"],
      ["/GINSHT/1.png", "/GINSHT/6.png"],
      ["/GINSHT/2.png", "/GINSHT/7.png"],
      ["/GINSHT/3.png", "/GINSHT/8.png"],
      ["/GINSHT/4.png", "/GINSHT/9.png"],
    ];

    if (
      formData.alturaLevantamiento >= 0 &&
      formData.alturaLevantamiento < valores.length &&
      formData.separacionLevantamiento >= 0 &&
      formData.separacionLevantamiento <
        valores[formData.alturaLevantamiento].length
    ) {
      setValueImage(
        valores[formData.alturaLevantamiento][formData.separacionLevantamiento]
      );
    }
  }, [formData.alturaLevantamiento, formData.separacionLevantamiento]);

  const handleChangeFrecuencia = (event) => {
    handleChange(event);
    const selectedRadioValue = event.target.value;
    handleChange({
      target: {
        name: "frecuenciaDeManipulacionRadio",
        value: selectedRadioValue,
      },
    });

    let valores = [
      [1, 0.95, 0.85],
      [0.94, 0.88, 0.75],
      [0.84, 0.72, 0.45],
      [0.52, 0.3, 0.0],
      [0.37, 0.0, 0.0],
      [0.0, 0.0, 0.0],
    ];

    const selectedValueIndex = parseInt(selectedRadioValue, 10);
    const duracionDeManipulacionIndex = parseInt(
      formData.duracionManipulacion,
      10
    );

    if (
      duracionDeManipulacionIndex >= 0 &&
      duracionDeManipulacionIndex < valores[0].length
    ) {
      const valorSeleccionado =
        valores[selectedValueIndex][duracionDeManipulacionIndex];
      handleChange({
        target: {
          name: "valorFinalFrecuencia",
          value: valorSeleccionado,
        },
      });
    }
  };

  const handleSeparacionRadioChange = (event) => {
    handleChange(event);
    handleChangeSeparacion(event);
  };

  const handleChangeSeparacion = (event) => {
    let valores = [
      [13, 19, 25, 20, 14], //TODO: tener en cuenta sexo
      [7, 11, 13, 12, 8],
    ];
    const selectedRadioValue = event.target.value;
    const alturaSelected = parseInt(formData.alturaLevantamiento, 10);
    handleChange({
      target: {
        name: "pesoTeoricoRecomendado",
        value: valores[selectedRadioValue][alturaSelected],
      },
    });
  };

  const handleAlturaRadioChange = (event) => {
    handleChange(event);
    handleChangeAltura(event);
  };

  const handleChangeAltura = (event) => {
    let valores = [
      [13, 19, 25, 20, 14], //TODO: tener en cuenta sexo
      [7, 11, 13, 12, 8],
    ];
    const selectedRadioValue = event.target.value;
    const separacionSelected = parseInt(formData.separacionLevantamiento, 10);

    handleChange({
      target: {
        name: "pesoTeoricoRecomendado",
        value: valores[separacionSelected][selectedRadioValue],
      },
    });
  };

  const handleFactorChange = (factorType, factorID) => {
    const updatedFactors = formData[factorType].includes(factorID)
      ? formData[factorType].filter((id) => id !== factorID)
      : [...formData[factorType], factorID];

    handleChange({
      target: {
        name: factorType,
        value: updatedFactors,
      },
    });
  };

  let alturaRellenadoModelo = false;
  let separacionRellenadoModelo = false;

  if (formData.deteccionAltura !== false) alturaRellenadoModelo = true;
  if (formData.deteccionSeparacion !== false) separacionRellenadoModelo = true;

  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom>
        Datos de la evaluación
      </Typography>
      <Grid container spacing={3} paddingBottom={"10px"}>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1" gutterBottom>
            Introduzca el peso real manejado.
          </Typography>
          <TextField
            name="pesoRealManejado"
            label="Peso Real Manejado (kg)"
            type="number"
            value={formData.pesoRealManejado}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1" gutterBottom>
            Introduzca la duración de la tarea.
          </Typography>
          <FormControl fullWidth margin="normal">
            <InputLabel id="duracion-tarea-label">
              Duración de la Tarea (horas)
            </InputLabel>
            <Select
              labelId="duracion-tarea-label"
              name="DuracionTarea"
              value={formData.DuracionTarea}
              onChange={handleChange}
            >
              {[...Array(8)].map((_, index) => (
                <MenuItem key={index + 1} value={index + 1}>
                  {index + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1" gutterBottom>
            Introduzca el número de desplazamientos.
          </Typography>
          <TextField
            name="NumeroDesplazamientos"
            label="Número de Desplazamientos"
            type="number"
            value={formData.NumeroDesplazamientos}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1" gutterBottom>
            Introduzca la postura de los levantamientos.
          </Typography>
          <FormControl component="fieldset" margin="normal">
            <RadioGroup
              name="PosicionLevantamiento"
              value={formData.PosicionLevantamiento}
              onChange={handleChange}
            >
              <FormControlLabel value={0} control={<Radio />} label="De pie" />
              <FormControlLabel value={1} control={<Radio />} label="Sentado" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1" gutterBottom>
            Introduzca la distancia de los desplazamientos.
          </Typography>
          <FormControl component="fieldset" margin="normal">
            <RadioGroup
              name="DistanciaDesplazamientos"
              value={formData.DistanciaDesplazamientos}
              onChange={handleChange}
            >
              <FormControlLabel
                value={0}
                control={<Radio />}
                label="Hasta 10 metros"
              />
              <FormControlLabel
                value={1}
                control={<Radio />}
                label="Más de 10 metros"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
      <Typography variant="h5" gutterBottom>
        Posición de levantamiento
      </Typography>
      <Typography variant="body1" gutterBottom>
        Por favor, seleccione la posición de levantamiento de la carga.
      </Typography>
      <Grid
        container
        direction="row"
        flexWrap={"nowrap"}
        justifyContent="space-evenly"
        alignItems="center"
        spacing={3}
        paddingBottom={"10px"}
      >
        <Grid item xs={12} sm={8}>
          <Box
            component="img"
            src={valueImage}
            alt="Guía de Elevación de Carga"
            sx={{ maxWidth: "100%", height: "auto", width: "20vw" }}
          />
        </Grid>
        {formData.imagenDeteccion && (
          <Grid item xs={12} sm={14}>
            <Box
              component="img"
              src={`data:image/jpeg;base64,${formData.imagenDeteccion}`}
              alt="Imagen de Detección"
              sx={{ maxWidth: "auto", height: "25vw"}}
            />
          </Grid>
        )}
        <Stack justifyContent="space-evenly" alignItems="center" spacing={3}>
          <Typography variant="body1" gutterBottom>
            Seleccione la altura de levantamiento.
          </Typography>
          <FormControl component="fieldset" margin="normal">
            <RadioGroup
              name="alturaLevantamiento"
              value={formData.alturaLevantamiento}
              onChange={handleAlturaRadioChange}
            >
              <FormControlLabel
                value={0}
                control={<Radio />}
                label="Altura de la vista"
              />
              <FormControlLabel
                value={1}
                control={<Radio />}
                label="Encima del codo"
              />
              <FormControlLabel
                value={2}
                control={<Radio />}
                label="Debajo del codo"
              />
              <FormControlLabel
                value={3}
                control={<Radio />}
                label="Altura del muslo"
              />
              <FormControlLabel
                value={4}
                control={<Radio />}
                label="Altura de la pantorrilla"
              />
            </RadioGroup>
          </FormControl>
          {alturaRellenadoModelo && (
            <Alert severity="warning" variant="outlined">
              Rellenado automáticamente desde la detección, revise si es
              correcto.
            </Alert>
          )}

          <Typography variant="body1" gutterBottom>
            Seleccione la separación de levantamiento.
          </Typography>
          <FormControl component="fieldset" margin="normal">
            <RadioGroup
              name="separacionLevantamiento"
              value={formData.separacionLevantamiento}
              onChange={handleSeparacionRadioChange}
            >
              <FormControlLabel
                value={0}
                control={<Radio />}
                label="Carga cerca del cuerpo"
              />
              <FormControlLabel
                value={1}
                control={<Radio />}
                label="Carga lejos del cuerpo"
              />
            </RadioGroup>
          </FormControl>
          {separacionRellenadoModelo && (
            <Alert severity="warning" variant="outlined">
              Rellenado automáticamente desde la detección, revise si es
              correcto.
            </Alert>
          )}
        </Stack>
      </Grid>
      <Typography variant="h5" gutterBottom>
        Factores de corrección
      </Typography>
      <Typography variant="body1" gutterBottom>
        Por favor, seleccione los factores de corrección.
      </Typography>
      <Stack spacing={2} paddingBottom={"10px"}>
        <Typography variant="body1" gutterBottom>
          Seleccione el desplazamiento vertical.
        </Typography>
        <FormControl component="fieldset" margin="normal">
          <RadioGroup
            name="desplazamientoVertical"
            row={true}
            value={formData.desplazamientoVertical}
            onChange={handleChange}
          >
            <FormControlLabel
              value={1}
              control={<Radio />}
              label="Hasta 25 cm"
            />
            <FormControlLabel
              value={0.91}
              control={<Radio />}
              label="Hasta 50 cm"
            />
            <FormControlLabel
              value={0.87}
              control={<Radio />}
              label="Hasta 100 cm"
            />
            <FormControlLabel
              value={0.84}
              control={<Radio />}
              label="Hasta 175 cm"
            />
            <FormControlLabel
              value={0}
              control={<Radio />}
              label="Más de 175 cm"
            />
          </RadioGroup>
        </FormControl>

        <Typography variant="body1" gutterBottom>
          Seleccione el giro del tronco.
        </Typography>
        <FormControl component="fieldset" margin="normal">
          <RadioGroup
            name="giroDelTronco"
            row={true}
            value={formData.giroDelTronco}
            onChange={handleChange}
          >
            <FormControlLabel value={1} control={<Radio />} label="Sin giro" />
            <FormControlLabel
              value={0.9}
              control={<Radio />}
              label="Poco girado (hasta 30º)"
            />
            <FormControlLabel
              value={0.8}
              control={<Radio />}
              label="Girado (hasta 60º)"
            />
            <FormControlLabel
              value={0.7}
              control={<Radio />}
              label="Muy girado (90º)"
            />
          </RadioGroup>
        </FormControl>
        <Typography variant="body1" gutterBottom>
          Seleccione el tipo de agarre.
        </Typography>
        <FormControl component="fieldset" margin="normal">
          <RadioGroup
            name="tipoDeAgarre"
            row={true}
            value={formData.tipoDeAgarre}
            onChange={handleChange}
          >
            <FormControlLabel
              value={1}
              control={<Radio />}
              label="Agarre bueno"
            />
            <FormControlLabel
              value={0.95}
              control={<Radio />}
              label="Agarre Regular"
            />
            <FormControlLabel
              value={0.9}
              control={<Radio />}
              label="Agarre malo"
            />
          </RadioGroup>
        </FormControl>
        <Typography variant="body1" gutterBottom>
          Seleccione la duración de la manipulación.
        </Typography>
        <FormControl component="fieldset" margin="normal">
          <RadioGroup
            name="duracionManipulacion"
            row={true}
            value={formData.duracionManipulacion}
            onChange={handleChange}
          >
            <FormControlLabel
              value={0}
              control={<Radio />}
              label="Menos de 1 hora al día"
            />
            <FormControlLabel
              value={1}
              control={<Radio />}
              label="Entre 1 y 2 horas al día"
            />
            <FormControlLabel
              value={2}
              control={<Radio />}
              label="Entre 2 y 8 horas al día"
            />
          </RadioGroup>
        </FormControl>
        <Typography variant="body1" gutterBottom>
          Seleccione la frecuencia de la manipulación.
        </Typography>
        <FormControl component="fieldset" margin="normal">
          <RadioGroup
            name="frecuenciaDeManipulacion"
            row={true}
            value={formData.frecuenciaDeManipulacion}
            onChange={handleChangeFrecuencia}
          >
            <FormControlLabel
              value={0}
              control={<Radio />}
              label="1 vez cada 5 minutos"
            />
            <FormControlLabel
              value={1}
              control={<Radio />}
              label="1 vez/minuto"
            />
            <FormControlLabel
              value={2}
              control={<Radio />}
              label="4 veces/minuto"
            />
            <FormControlLabel
              value={3}
              control={<Radio />}
              label="9 veces/minuto"
            />
            <FormControlLabel
              value={4}
              control={<Radio />}
              label="12 veces/minuto"
            />
            <FormControlLabel
              value={5}
              control={<Radio />}
              label="Más de 15 veces/minuto"
            />
          </RadioGroup>
        </FormControl>
      </Stack>
      <Typography variant="h5" gutterBottom>
        Factores de Puesto
      </Typography>
      <FactoresCheckList
        title="Factores de Puesto"
        factors={puestosFactors}
        selectedFactors={formData.factoresPuesto}
        handleFactorChange={(id) => handleFactorChange("factoresPuesto", id)}
      />
      <Typography variant="h5" gutterBottom>
        Factores de Trabajador
      </Typography>
      <FactoresCheckList
        title="Factores de Trabajador"
        factors={trabajadorFactors}
        selectedFactors={formData.factoresTrabajador}
        handleFactorChange={(id) =>
          handleFactorChange("factoresTrabajador", id)
        }
      />
    </React.Fragment>
  );
};

export default EvaluacionGINSHT;

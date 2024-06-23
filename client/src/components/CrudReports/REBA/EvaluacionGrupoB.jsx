import React, { useState, useEffect } from "react";
import {
  Grid,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Stack,
  Typography,
  Box,
  Checkbox,
  Alert,
} from "@mui/material";
import Divider from "@mui/material/Divider";

export default function EvaluacionGrupoB({ formData, handleChangeInt }) {
  const [valuearmsImage, setValueArmsImage] = useState(
    "/REBA/GrupoB/flexion_brazo_20.png"
  );
  const [valueforearmsImage, setValueForearmsImage] = useState(
    "/REBA/GrupoB/flexion_antebrazo_60_100.png"
  );
  const [valuewristsImage, setValueWristsImage] = useState(
    "/REBA/GrupoB/muneca_0_15.png"
  );

  useEffect(() => {
    if (formData.PBrazos === 1) {
      setValueArmsImage("/REBA/GrupoB/flexion_brazo_20.png");
    } else if (formData.PBrazos === 2) {
      setValueArmsImage("/REBA/GrupoB/flexion_brazo_20_45.png");
    } else if (formData.PBrazos === 3) {
      setValueArmsImage("/REBA/GrupoB/flexion_brazo_45_90.png");
    } else if (formData.PBrazos === 4) {
      setValueArmsImage("/REBA/GrupoB/flexion_brazo_mas_90.png");
    }
  }, [formData.PBrazos]);

  useEffect(() => {
    // Similar lógica para el valor de PAntebrazos
    switch (formData.PAntebrazos) {
      case 1:
        setValueForearmsImage("/REBA/GrupoB/flexion_antebrazo_60_100.png");
        break;
      case 2:
        setValueForearmsImage("/REBA/GrupoB/flexion_antebrazo_mas_100.png");
        break;
      default:
        setValueForearmsImage("/REBA/GrupoB/flexion_antebrazo_60_100.png");
        break;
    }
  }, [formData.PAntebrazos]);

  useEffect(() => {
    if (formData.PMunnecas === 1) {
      setValueWristsImage("/REBA/GrupoB/muneca_0_15.png");
    } else if (formData.PMunnecas === 2) {
      setValueWristsImage("/REBA/GrupoB/muneca_mas_15.png");
    }
  }, [formData.PMunnecas]);

  let brazosRellenadoModelo = false;
  let antebrazosRellenadoModelo = false;
  let munecasRellenadoModelo = false;
  if (formData.deteccionBrazos) brazosRellenadoModelo = true;
  if (formData.deteccionAntebrazos) antebrazosRellenadoModelo = true;
  if (formData.deteccionMunnecas) munecasRellenadoModelo = true;

  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom>
        Datos de evaluación del grupo B
      </Typography>
      <Stack spacing={3}>
        <Typography variant="h6" gutterBottom>
          Se evaluará la postura de los brazos, antebrazos y muñecas.
        </Typography>
        <Divider />
        <Typography variant="body1" gutterBottom>
          <b>Postura de los brazos:</b> Se evaluará la postura de los brazos en
          función de la flexión o extensión de los mismos.
        </Typography>
        <Grid
          container
          item
          spacing={2}
          direction="row"
          flexWrap={"nowrap"}
          justifyContent="space-between"
          paddingRight={"5vh"}
          sx={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
            padding: "16px",
            marginBottom: "24px",
            width: "auto",
          }}
        >
          <FormControl component="fieldset" margin="normal">
            <RadioGroup
              name="PBrazos"
              value={formData.PBrazos}
              onChange={handleChangeInt}
            >
              <FormControlLabel
                value={1}
                control={<Radio inputProps={{ value: 1 }} />}
                label="El brazo está entre 20º de flexión y 20º de extensión."
              />
              <FormControlLabel
                value={2}
                control={<Radio inputProps={{ value: 2 }} />}
                label="El brazo está entre 21º y 45º de flexión o más de 20º de extensión."
              />
              <FormControlLabel
                value={3}
                control={<Radio inputProps={{ value: 3 }} />}
                label="El brazo está entre 46º y 90º de flexión."
              />
              <FormControlLabel
                value={4}
                control={<Radio inputProps={{ value: 4 }} />}
                label="El brazo está flexionado más de 90º."
              />
            </RadioGroup>
          </FormControl>
          
          <Box
            component="img"
            src={valuearmsImage}
            alt="Puntuacion brazos"
            sx={{ height: "22vh", width: "auto" }}
          />
        </Grid>
        {brazosRellenadoModelo && (
            <Alert severity="warning" variant="outlined">
              Rellenado automáticamente desde la detección, revise si es
              correcto.
            </Alert>
          )}
        <Typography variant="body1" gutterBottom>
          <b>Indique las siguiente casillas si:</b>
        </Typography>
        <Grid
          container
          item
          spacing={2}
          direction="row"
          flexWrap={"nowrap"}
          justifyContent="space-between"
          paddingRight={"5vh"}
        >
          <FormControl component="fieldset" margin="normal">
            <FormControlLabel
              value={formData.CAbducidos}
              control={<Checkbox />}
              onChange={handleChangeInt}
              label="El brazo está abducido o rotado"
            ></FormControlLabel>
          </FormControl>

          <Box
            component="img"
            src={"/REBA/GrupoB/flexion_brazo_abducido_rotado.png"}
            alt="Torsión brazo"
            sx={{ height: "22vh", width: "auto" }}
          />
        </Grid>
        <Grid
          container
          item
          spacing={2}
          direction="row"
          flexWrap={"nowrap"}
          justifyContent="space-between"
          paddingRight={"5vh"}
        >
          <FormControl component="fieldset" margin="normal">
            <FormControlLabel
              value={formData.CHombrosLevantados}
              control={<Checkbox />}
              onChange={handleChangeInt}
              label="El hombro está elevado"
            ></FormControlLabel>
          </FormControl>

          <Box
            component="img"
            src={"/REBA/GrupoB/hombros_elevados.png"}
            alt="Hombros elevados imagen"
            sx={{ height: "22vh", width: "auto" }}
          />
        </Grid>
        <Grid
          container
          item
          spacing={2}
          direction="row"
          flexWrap={"nowrap"}
          justifyContent="space-between"
          paddingRight={"5vh"}
        >
          <FormControl component="fieldset" margin="normal">
            <FormControlLabel
              value={formData.CBrazosApoyados}
              control={<Checkbox />}
              onChange={handleChangeInt}
              label="Existe apoyo o postura a favor de la gravedad"
            ></FormControlLabel>
          </FormControl>

          <Box
            component="img"
            src={"/REBA/GrupoB/apoyo_brazo.png"}
            alt="Apoyo brazos"
            sx={{ height: "22vh", width: "auto" }}
          />
        </Grid>
        <Divider />
        <Typography variant="body1" gutterBottom>
          <b>Postura de los antebrazos:</b> Se evaluará la postura de los
          antebrazos en función de la flexión o extensión de los mismos.
        </Typography>
        <Grid
          container
          item
          spacing={2}
          direction="row"
          flexWrap={"nowrap"}
          justifyContent="space-between"
          paddingRight={"5vh"}
          sx={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
            padding: "16px",
            marginBottom: "24px",
            width: "auto",
          }}
        >
          <FormControl component="fieldset" margin="normal">
            <RadioGroup
              name="PAntebrazos"
              value={formData.PAntebrazos}
              onChange={handleChangeInt}
            >
              <FormControlLabel
                value={1}
                control={<Radio />}
                label="El antebrazo está entre 60º y 100º de flexión."
              />
              <FormControlLabel
                value={2}
                control={<Radio />}
                label="El antebrazo está flexionado por debajo de 60º o por encima de 100º."
              />
            </RadioGroup>
          </FormControl>
          
          <Box
            component="img"
            src={valueforearmsImage}
            alt="Puntuacion Antebrazos"
            sx={{ height: "22vh", width: "auto" }}
          />
        </Grid>
        {antebrazosRellenadoModelo && (
            <Alert severity="warning" variant="outlined">
              Rellenado automáticamente desde la detección, revise si es
              correcto.
            </Alert>
          )}
        <Typography variant="body1" gutterBottom>
          <b>Postura de las muñecas:</b> Se evaluará la postura de las muñecas
          en función de la flexión o extensión de las mismas.
        </Typography>
        <Grid
          container
          item
          spacing={2}
          direction="row"
          flexWrap={"nowrap"}
          justifyContent="space-between"
          paddingRight={"5vh"}
          sx={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
            padding: "16px",
            marginBottom: "24px",
            width: "auto",
          }}
        >
          <FormControl component="fieldset" margin="normal">
            <RadioGroup
              name="PMunnecas"
              value={formData.PMunnecas}
              onChange={handleChangeInt}
            >
              <FormControlLabel
                value={1}
                control={<Radio />}
                label="La muñeca está entre 0 y 15 grados de flexión o extensión."
              />
              <FormControlLabel
                value={2}
                control={<Radio />}
                label="La muñeca está flexionada o extendida más de 15 grados."
              />
            </RadioGroup>
          </FormControl>
          
          <Box
            component="img"
            src={valuewristsImage}
            alt="Puntuacion Muñecas"
            sx={{ height: "22vh", width: "auto" }}
          />
        </Grid>
        {munecasRellenadoModelo && (
            <Alert severity="warning" variant="outlined">
              Rellenado automáticamente desde la detección, revise si es
              correcto.
            </Alert>
          )}
        <Typography variant="body1" gutterBottom>
          <b>Indique la siguiente casilla si:</b>
        </Typography>
        <Grid
          container
          item
          spacing={2}
          direction="row"
          flexWrap={"nowrap"}
          justifyContent="space-between"
          paddingRight={"5vh"}
        >
          <FormControl component="fieldset" margin="normal">
            <FormControlLabel
              value={formData.CMunnecas}
              control={<Checkbox />}
              onChange={handleChangeInt}
              label="Existe torsión o desviación lateral de la muñeca."
            ></FormControlLabel>
          </FormControl>

          <Box
            component="img"
            src={"/REBA/GrupoB/muneca_torsion.png"}
            alt="Torsión cuello"
            sx={{ height: "22vh", width: "auto" }}
          />
        </Grid>
      </Stack>
    </React.Fragment>
  );
}

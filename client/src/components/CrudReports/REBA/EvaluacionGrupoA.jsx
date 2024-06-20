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
} from "@mui/material";
import Divider from "@mui/material/Divider";

export default function EvaluacionGrupoA({
  formData,
  handleChangeInt,
}) {
  const [valueneckImage, setValueNeckImage] = useState(
    "/REBA/GrupoA/Cuello_0_20.png"
  );
  const [valuetrunkImage, setValueTrunkImage] = useState(
    "/REBA/GrupoA/Tronco_0_20.png"
  );
  const [valuelegsImage, setValueLegsImage] = useState(
    "/REBA/GrupoA/flexion_rodilla_30.png"
  );

  useEffect(() => {
    if (formData.PCuello === 1) {
      setValueNeckImage("/REBA/GrupoA/Cuello_0_20.png");
    } else if (formData.PCuello === 2) {
      setValueNeckImage("/REBA/GrupoA/Cuello_mayor_0_mayor_20.png");
    }
  }, [formData.PCuello]);

  useEffect(() => {
    // Similar lógica para el valor de PTronco
    switch (formData.PTronco) {
      case 1:
        setValueTrunkImage("/REBA/GrupoA/Tronco_recto.png");
        break;
      case 2:
        setValueTrunkImage("/REBA/GrupoA/Tronco_0_20.png");
        break;
      case 3:
        setValueTrunkImage("/REBA/GrupoA/Tronco_20_60.png");
        break;
      case 4:
        setValueTrunkImage("/REBA/GrupoA/Tronco_mas_60.png");
        break;
      default:
        setValueTrunkImage("/REBA/GrupoA/Tronco_0_20.png");
        break;
    }
  }, [formData.PTronco]);

  useEffect(() => {
    if (formData.PPiernas === 1) {
      setValueLegsImage("/REBA/GrupoA/flexion_rodilla_30.png");
    } else if (formData.PPiernas === 2) {
      setValueLegsImage("/REBA/GrupoA/flexion_rodilla_mas_60.png");
    }
  }, [formData.PPiernas]);

  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom>
        Datos de evaluación del grupo A
      </Typography>
      <Stack spacing={3}>
        <Typography variant="h6" gutterBottom>
          Se evaluará la postura del cuello, tronco y piernas.
        </Typography>
        <Divider />
        <Typography variant="body1" gutterBottom>
          <b>Postura del cuello:</b> Se evaluará la postura del cuello en
          función de la flexión o extensión del mismo.
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
              name="PCuello"
              value={formData.PCuello}
              onChange={handleChangeInt}
            >
              <FormControlLabel
                value={1}
                control={<Radio inputProps={{ value: 1 }} />}
                label="El cuello está entre 0º y 20º de flexión"
              />
              <FormControlLabel
                value={2}
                control={<Radio inputProps={{ value: 2 }} />}
                label="El cuello está extendido o flexionado más de 20º"
              />
            </RadioGroup>
          </FormControl>
          <Box
            component="img"
            src={valueneckImage}
            alt="Puntuacion Cuello"
            sx={{ height: "22vh", width: "auto" }}
          />
        </Grid>
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
              value={formData.CCuello}
              control={<Checkbox />}
              onChange={handleChangeInt}
              label="Existe torsión o inclinación lateral del cuello"
            ></FormControlLabel>
          </FormControl>

          <Box
            component="img"
            src={"/REBA/GrupoA/Torsion_cuello.png"}
            alt="Torsión cuello"
            sx={{ height: "22vh", width: "auto" }}
          />
        </Grid>
        <Divider />
        <Typography variant="body1" gutterBottom>
          <b>Postura del tronco:</b> Se evaluará la postura del tronco en
          función de la flexión o extensión del mismo.
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
              name="PTronco"
              value={formData.PTronco}
              onChange={handleChangeInt}
            >
              <FormControlLabel
                value={1}
                control={<Radio />}
                label="El tronco está erguido"
              />
              <FormControlLabel
                value={2}
                control={<Radio />}
                label="El tronco está entre 0º y 20º de flexión o 0º y 20º de extensión"
              />
              <FormControlLabel
                value={3}
                control={<Radio />}
                label="El tronco está entre 20º y 60 de flexión o 20º y 60 de extensión"
              />
              <FormControlLabel
                value={4}
                control={<Radio />}
                label="El tronco está flexionado más de 60º"
              />
            </RadioGroup>
          </FormControl>
          <Box
            component="img"
            src={valuetrunkImage}
            alt="Puntuacion Tronco"
            sx={{ height: "22vh", width: "auto" }}
          />
        </Grid>
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
              value={formData.CTronco}
              control={<Checkbox />}
              onChange={handleChangeInt}
              label="Existe torsión o inclinación lateral del tronco"
            ></FormControlLabel>
          </FormControl>

          <Box
            component="img"
            src={"/REBA/GrupoA/Torsion_tronco.png"}
            alt="Torsión tronco"
            sx={{ height: "22vh", width: "auto" }}
          />
          <Divider />
        </Grid>
          <Typography variant="body1" gutterBottom>
            <b>Postura de las piernas:</b> Se evaluará la postura de las piernas
            en función de la flexión o extensión de las rodillas.
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
              name="PPiernas"
              value={formData.PPiernas}
              onChange={handleChangeInt}
            >
              <FormControlLabel
                value={1}
                control={<Radio />}
                label="Existe flexión de una o de ambas rodillas entre 30º y 60º"
              />
              <FormControlLabel
                value={2}
                control={<Radio />}
                label="Existe flexión de una o de ambas rodillas de más de 60º (salvo postura sedente)"
              />
            </RadioGroup>
          </FormControl>
          <Box
            component="img"
            src={valuelegsImage}
            alt="Puntuacion Piernas"
            sx={{ height: "22vh", width: "auto" }}
          />
        </Grid>
        <Typography variant="body1" gutterBottom>
          <b>Indique las siguientes casillas si:</b>
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
              value={formData.CPiernas1}
              control={<Checkbox />}
              onChange={handleChangeInt}
              label="Soporte bilateral, andando o sentado"
            ></FormControlLabel>
          </FormControl>

          <Box
            component="img"
            src={"/REBA/GrupoA/Soporte_bilateral.png"}
            alt="Puntuacion bilateral"
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
              value={formData.CPiernas2}
              control={<Checkbox />}
              onChange={handleChangeInt}
              label="Soporte unilateral, soporte ligero o postura inestable"
            ></FormControlLabel>
          </FormControl>

          <Box
            component="img"
            src={"/REBA/GrupoA/Soporte_unilateral.png"}
            alt="Puntuacion bilateral"
            sx={{ height: "22vh", width: "auto" }}
          />
        </Grid>
      </Stack>
    </React.Fragment>
  );
}

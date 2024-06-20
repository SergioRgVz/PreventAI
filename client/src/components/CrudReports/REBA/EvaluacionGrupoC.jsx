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

export default function EvaluacionGrupoB({ formData, handleChangeInt }) {
  const [valueholdImage, setValueHoldImage] = useState(
    "/REBA/GrupoC/agarrebueno.png"
  );

  useEffect(() => {
    switch (formData.Agarre) {
      case 1:
        setValueHoldImage("/REBA/GrupoC/agarrebueno.png");
        break;
      case 2:
        setValueHoldImage("/REBA/GrupoC/agarreregular.png");
        break;
      case 3:
        setValueHoldImage("/REBA/GrupoC/agarremalo.png");
        break;
      default:
        setValueHoldImage("/REBA/GrupoC/agarrebueno.png");
    }
  }, [formData.Agarre]);

  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom>
        Datos de evaluación de las fuerzas y la actividad
      </Typography>
      <Stack spacing={3}>
        <Typography variant="h6" gutterBottom>
          Se evaluará la carga, la fuerza y la actividad.
        </Typography>
        <Typography variant="body1" gutterBottom>
          <b>Carga o fuerza:</b> Se evaluará la carga o fuerza que se aplica.
        </Typography>
        <Grid
          container
          item
          spacing={2}
          direction="column"
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
              name="PCarga"
              value={formData.PCarga}
              onChange={handleChangeInt}
            >
              <FormControlLabel
                value={0}
                control={<Radio inputProps={{ value: 0 }} />}
                label="La carga o fuerza es menor de 5kg."
              />
              <FormControlLabel
                value={1}
                control={<Radio inputProps={{ value: 1 }} />}
                label="La carga o fuerza está entre 5 y 10 kgs."
              />
              <FormControlLabel
                value={2}
                control={<Radio inputProps={{ value: 2 }} />}
                label="La carga o fuerza es mayor de 10 kgs."
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Typography variant="body1" gutterBottom>
          <b>Agarre:</b> Se evaluará la calidad del agarre.
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
              name="Agarre"
              value={formData.Agarre}
              onChange={handleChangeInt}
            >
              <FormControlLabel
                value={0}
                control={<Radio />}
                label="Agarre Bueno (el agarre es bueno y la fuerza de agarre de rango medio)."
              />
              <FormControlLabel
                value={1}
                control={<Radio />}
                label="Agarre Regular (el agarre con la mano es aceptable pero no ideal o el agarre es aceptable utilizando otras partes del cuerpo)."
              />
              <FormControlLabel
                value={2}
                control={<Radio />}
                label="Agarre Malo (el agarre es posible pero no aceptable)."
              />
              <FormControlLabel
                value={3}
                control={<Radio />}
                label="Agarre Inaceptable (el agarre es torpe e inseguro, no es posible el agarre manual o el agarre es inaceptable utilizando otras partes del cuerpo)."
              />
            </RadioGroup>
          </FormControl>
          <Box
            component="img"
            src={valueholdImage}
            alt="Puntuacion agarre"
            sx={{ height: "22vh", width: "auto" }}
          />
        </Grid>
        <Divider />
        <Typography variant="body1" gutterBottom>
        <b>Actividad:</b> Se evaluará la actividad que se realiza.
        </Typography>
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
              value={formData.Estatismo}
              control={<Checkbox />}
              onChange={handleChangeInt}
              label="Una o más partes del cuerpo permanecen estáticas, por ejemplo soportadas durante más de 1 minuto."
            ></FormControlLabel>
          </FormControl>
          <FormControl component="fieldset" margin="normal">
            <FormControlLabel
              value={formData.AccionesRepetidas}
              control={<Checkbox />}
              onChange={handleChangeInt}
              label="Se producen movimientos repetitivos, por ejemplo repetidos más de 4 veces por minuto (excluyendo caminar)."
            ></FormControlLabel>
          </FormControl>
          <FormControl component="fieldset" margin="normal">
            <FormControlLabel
              value={formData.CambiosRapidos}
              control={<Checkbox />}
              onChange={handleChangeInt}
              label="Se producen cambios de postura importantes o se adoptan posturas inestables."
            ></FormControlLabel>
          </FormControl>

        </Grid>
      </Stack>
    </React.Fragment>
  );
}

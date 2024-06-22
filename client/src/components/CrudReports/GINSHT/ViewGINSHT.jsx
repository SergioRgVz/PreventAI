import {
  Typography,
  Grid,
  Paper,
  Box,
  ListItem,
  ListItemText,
  List,
} from "@mui/material";

const ViewGINSHT = ({ informe }) => {
  const { GINSHT, Imagens } = informe;
  const getPosicionLevantamientoText = (value) => {
    const mapping = {
      0: "De pie",
      1: "Sentado",
    };
    return mapping[value] || "Desconocido";
  };

  const getDistanciaLevantamientoText = (value) => {
    const mapping = {
      0: "Hasta 10 metros",
      1: "Más de 10 metros",
    };
    return mapping[value] || "Desconocido";
  };

  const getAlturaLevantamientoText = (value) => {
    const mapping = {
      0: "Altura de la vista",
      1: "Encima del codo",
      2: "Debajo del codo",
      3: "Altura del muslo",
      4: "Altura de la pantorrilla",
    };
    return mapping[value] || "Desconocido";
  };

  const getSeparacionLevantamientoText = (value) => {
    const mapping = {
      0: "Cuerpo pegado a la carga",
      1: "Cuerpo separado de la carga",
    };
    return mapping[value] || "Desconocido";
  };

  const getDesplazamientoLevantamientoText = (value) => {
    const mapping = {
      1: "Hasta 25 cm.",
      0.91: "Hasta 50 cm.",
      0.87: "Hasta 100 cm.",
      0.84: "Hasta 175 cm.",
      0: "Más de 175 cm.",
    };
    return mapping[value] || "Desconocido";
  };

  const getGiroDelTroncoText = (value) => {
    const mapping = {
      1: "Sin giro",
      0.91: "Poco girado (hasta 30º)",
      0.8: "Girado (hasta 60º)",
      0.7: "Muy girado (hasta 90º)",
    };
    return mapping[value] || "Desconocido";
  };

  const getTipoDeAgarreText = (value) => {
    const mapping = {
      1: "Bueno",
      0.95: "Regular",
      0.9: "Malo",
    };
    return mapping[value] || "Desconocido";
  };

  const getDuracionManipulacionText = (value) => {
    const mapping = {
      0: "Menos de 1 hora al día",
      1: "Entre 1 y 2 horas al día",
      2: "Entre 2 y 8 horas al día",
    };
    return mapping[value] || "Desconocido";
  };

  const getFrecuenciaManipulacionText = (value) => {
    const mapping = {
      0: "1 vez cada 5 minutos",
      1: "1 vez/minuto",
      2: "4 veces/minuto",
      3: "9 veces/minuto",
      4: "12 veces/minuto",
      5: "Más de15 veces/minuto",
    };
    return mapping[value] || "Desconocido";
  };

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Datos Identificativos</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            <strong>Referencia:</strong> {informe.Referencia}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            <strong>Fecha:</strong> {informe.Fecha}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Datos del Empleado</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            <strong>DNI:</strong> {informe.Empleado.DNI}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            <strong>Nombre:</strong> {informe.Empleado.Nombre}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            <strong>Sexo:</strong> {informe.Empleado.Sexo}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            <strong>Puesto de Trabajo:</strong> {informe.Empleado.PuestoTrabajo}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Datos de la Empresa</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            <strong>CIF:</strong> {informe.Empleado.Empresa.CIF}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            <strong>Nombre:</strong> {informe.Empleado.Empresa.Nombre}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Indicaciones</Typography>
        </Grid>
        <Grid item xs={12}>
          {informe.Indicaciones ? (
            <Typography variant="body1">{informe.Indicaciones}</Typography>
          ) : (
            <div>No hay indicaciones dadas.</div>
          )}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Detalles GINSHT</Typography>
        </Grid>
        <Grid item xs={6}>
          {GINSHT.Desc_Elevacion ? (
            <Typography variant="body1">
              <strong>Descripción de Elevación:</strong> {GINSHT.Desc_Elevacion}
            </Typography>
          ) : (
            <div>No se ha dado descripción del transporte.</div>
          )}
        </Grid>
        <Grid item xs={6}>
          {GINSHT.Desc_Transporte ? (
            <Typography variant="body1">
              <strong>Descripción de Transporte:</strong>{" "}
              {GINSHT.Desc_Transporte}
            </Typography>
          ) : (
            <div>No se ha dado descripción del transporte.</div>
          )}
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            <strong>Peso Real:</strong> {GINSHT.PesoReal} kg
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            <strong>Duración de la tarea:</strong> {GINSHT.DuracionTarea} horas
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            <strong>Número de desplazamientos:</strong>{" "}
            {GINSHT.NDesplazamientos} kg
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            <strong>Posición de Levantamiento:</strong>{" "}
            {getPosicionLevantamientoText(GINSHT.PosturaLevantamiento)}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            <strong>Distancia de Levantamiento:</strong>{" "}
            {getDistanciaLevantamientoText(GINSHT.DistanciaDesplazamientos)} cm
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            <strong>Altura de Levantamiento:</strong>{" "}
            {getAlturaLevantamientoText(GINSHT.AlturaLevantamiento)}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            <strong>Separación de Levantamiento:</strong>{" "}
            {getSeparacionLevantamientoText(GINSHT.SeparacionLevantamiento)}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            <strong>Desplazamiento vertical:</strong>{" "}
            {getDesplazamientoLevantamientoText(GINSHT.DesplVertical)}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            <strong>Giro del tronco:</strong>{" "}
            {getGiroDelTroncoText(GINSHT.GiroTronco)}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            <strong>Tipo de agarre:</strong>{" "}
            {getTipoDeAgarreText(GINSHT.TipoAgarre)}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            <strong>Duración de la manipulación:</strong>{" "}
            {getDuracionManipulacionText(GINSHT.DuracionManipulacion)}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            <strong>Frecuencia de la manipulación:</strong>{" "}
            {getFrecuenciaManipulacionText(GINSHT.FrecManipulacion)}
          </Typography>
        </Grid>
        {/* <Grid item xs={12}>
          <Typography variant="h6">Factores de Riesgo</Typography>
        </Grid>
           */}

        <Grid item xs={12}>
          <Typography variant="h6">Imágenes Relacionadas</Typography>
        </Grid>
        <Grid item xs={12}>
          {Imagens.length > 0 ? (
            <Grid container spacing={2} justifyContent="center">
              {Imagens.map((imagen, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={index}
                  display="flex"
                  justifyContent="center"
                >
                  <Box
                    component="img"
                    src={imagen.base64}
                    alt={`Imagen ${index}`}
                    sx={{ width: "100%", maxWidth: "100%", height: "auto" }}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body" textAlign="center" sx={{ marginTop: 2 }}>
              No hay imágenes disponibles
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Resumen de Factores</Typography>
        {informe.Factors.length > 0 ? (
          <List>
            {informe.Factors.map((factor, index) => (
              <ListItem key={index}>
                <ListItemText primary={factor.Nombre} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body" textAlign="center" sx={{ marginTop: 2 }}>
            No hay factores disponibles
          </Typography>
        )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ViewGINSHT;

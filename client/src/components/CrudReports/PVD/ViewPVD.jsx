import {
  Typography,
  Grid,
  Paper,
  Box,
  ListItem,
  ListItemText,
  List,
} from "@mui/material";
import ResumenFactores from "../GINSHT/ResumenFactores";

const ViewPVD = ({ informe }) => {
  const { REBA, Imagens } = informe;
  let a = 1;

  const removeInterrogations = (text) => {
    return text.replace(/^\¿+|\?+$/g, '');
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
          <Typography variant="h6">Detalles PVD</Typography>
        </Grid>
        

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
                  <ListItemText primary={removeInterrogations(factor.Nombre)} />
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

export default ViewPVD;

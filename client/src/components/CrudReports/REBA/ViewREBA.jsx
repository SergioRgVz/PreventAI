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

const ViewREBA = ({ informe }) => {
  const { REBA, Imagens } = informe;
  let a = 1;
  const getPosturaCuelloText = (value) => {
    const mapping = {
      1: "El cuello está entre 0º y 20º de flexión",
      2: "El cuello está extendido o flexionado más de 20º",
    };
    return mapping[value] || "Desconocido";
  };

  const getPosturaTroncoText = (value) => {
    const mapping = {
      1: "El tronco está erguido",
      2: "El tronco está entre 0º y 20º de flexión o 0º y 20º de extensión",
      3: "El tronco está entre 20º y 60 de flexión o 20º y 60 de extensión",
      4: "El tronco está flexionado más de 60º",
    };
    return mapping[value] || "Desconocido";
  };

  const getPosturaPiernasText = (value) => {
    const mapping = {
      1: "Existe flexión de una o de ambas rodillas entre 30º y 60º",
      2: "Existe flexión de una o de ambas rodillas de más de 60º",
    };
    return mapping[value] || "Desconocido";
  };

  const getPosturaBrazosText = (value) => {
    const mapping = {
      1: "El brazo está entre 20º de flexión y 20º de extensión",
      2: "El brazo está entre 21º y 45º de flexión o más de 20º de extensión",
      3: "El brazo está entre 46º y 90º de flexión",
      4: "El brazo está flexionado más de 90º",
    };
    return mapping[value] || "Desconocido";
  };

  const getPosturaAntebrazosText = (value) => {
    const mapping = {
        1: "El antebrazo está entre 60º y 100º de flexión",
        2: "El antebrazo está flexionado por debajo de 60º o por encima de 100º",
        };
    return mapping[value] || "Desconocido";
    };

    const getPosturaMunnecaText = (value) => {
        const mapping = {
            1: "La muñeca está entre 0 y 15 grados de flexión o extensión",
            2: "La muñeca está flexionada o extendida más de 15 grados",
        };
        return mapping[value] || "Desconocido";
    };

    const getCargaText = (value) => {
        const mapping = {
            0: "La carga o fuerza es menor de 5kg",
            1: "La carga o fuerza está entre 5 y 10 kgs",
            2: "La carga o fuerza es mayor de 10 kgs",
        };
        return mapping[value] || "Desconocido";
    };

    const getAgarreText = (value) => {
        const mapping = {
            0: "Agarre Bueno (el agarre es bueno y la fuerza de agarre de rango medio).",
            1: "Agarre Regular (el agarre con la mano es aceptable pero no ideal o el agarre es aceptable utilizando otras partes del cuerpo).",
            2: "Agarre Malo (el agarre es posible pero no aceptable).",
            3: "Agarre Inaceptable (el agarre es torpe e inseguro, no es posible el agarre manual o el agarre es inaceptable utilizando otras partes del cuerpo).",
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
          <Typography variant="h5">Detalles REBA</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Datos de evaluación del grupo A</Typography>
        </Grid>
        <Grid item xs={6}>
          {REBA.Desc_Elevacion ? (
            <Typography variant="body1">
              <strong>Descripción de Elevación:</strong> {REBA.Desc_REBA}
            </Typography>
          ) : (
            <div>No se ha dado descripción de la elevación.</div>
          )}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            <strong>Postura del cuello:</strong>{" "}
            {getPosturaCuelloText(REBA.PCuello)}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {REBA.CCuello === 1 ? (
            <Typography variant="body1">
              Se indica que existe torsión o inclinación lateral del cuello
            </Typography>
          ) : (
            <Typography variant="body1">
              No se indica la existencia de torsión o inclinación lateral del
              cuello
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            <strong>Postura del tronco:</strong>{" "}
            {getPosturaTroncoText(REBA.PTronco)}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {REBA.CTronco === 1 ? (
            <Typography variant="body1">
              Se indica que existe torsión o inclinación lateral del tronco
            </Typography>
          ) : (
            <Typography variant="body1">
              No se indica la existencia de torsión o inclinación lateral del
              tronco
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            <strong>Postura de las piernas:</strong>{" "}
            {getPosturaPiernasText(REBA.PPiernas)}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {REBA.CPiernas1 === 1 ? (
            <Typography variant="body1">
              Se indica que existe soporte bilateral, andando o sentado
            </Typography>
          ) : (
            <Typography variant="body1">
              No se indica la existencia de soporte bilateral, andando o sentado
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          {REBA.CPiernas2 === 1 ? (
            <Typography variant="body1">
              Se indica que existe soporte unilateral, soporte ligero o postura
              inestable
            </Typography>
          ) : (
            <Typography variant="body1">
              No se indica la existencia de soporte unilateral, soporte ligero o
              postura inestable
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Datos de evaluación del grupo B</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            <strong>Postura de los brazos:</strong>{" "}
            {getPosturaBrazosText(REBA.PBrazos)}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {REBA.CAbducidos === 1 ? (
            <Typography variant="body1">
              Se indica que existe abducción o rotación de los brazos
            </Typography>
          ) : (
            <Typography variant="body1">
              No se indica la existencia de abducción o rotación de los brazos
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          {REBA.CHombrosLevantados === 1 ? (
            <Typography variant="body1">
              Se indica que existe elevación de los hombros
            </Typography>
          ) : (
            <Typography variant="body1">
              No se indica la existencia de elevación de los hombros
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          {REBA.CBrazosApoyados === 1 ? (
            <Typography variant="body1">
              Se indica que existe apoyo para los brazos
            </Typography>
          ) : (
            <Typography variant="body1">
              No se indica la existencia de apoyo para los brazos
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            <strong>Postura de los antebrazos:</strong>{" "}
            {getPosturaAntebrazosText(REBA.PAntebrazos)}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            <strong>Postura de las muñecas:</strong>{" "}
            {getPosturaMunnecaText(REBA.PMunnecas)}
          </Typography>
        </Grid> 
        <Grid item xs={12}>
          {REBA.CMunnecas === 1 ? (
            <Typography variant="body1">
              Se indica que existe torsión o desviación lateral de la muñeca
            </Typography>
          ) : (
            <Typography variant="body1">
              No se indica la existencia de torsión o desviación lateral de la muñeca.
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Datos de evaluación del grupo C</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            <strong>Puntuación de la carga:</strong>{" "}
            {getCargaText(REBA.PCarga)}
          </Typography>
        </Grid> 
        <Grid item xs={12}>
          {REBA.CCarga === 1 ? (
            <Typography variant="body1">
              Se indica que existe la fuerza se aplica a la carga de forma robusta
            </Typography>
          ) : (
            <Typography variant="body1">
              No se indica la existencia de aplicación robusta de la fuerza a la carga
            </Typography>
          )}
        </Grid>
        
        <Grid item xs={12}>
          <Typography variant="body1">
            <strong>Puntuación del agarre de la carga:</strong>{" "}
            {getAgarreText(REBA.Agarre)}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          {REBA.Estatismo === 1 ? (
            <Typography variant="body1">
              Se indica que durante la actividad, una o más partes del cuerpo permanecen estáticas, por ejemplo soportadas durante más de 1 minuto.
            </Typography>
          ) : (
            <Typography variant="body1">
              No se indica la existencia de estatismo durante la actividad.
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          {REBA.AccionesRepetidas === 1 ? (
            <Typography variant="body1">
              Se indica que durante la actividad, se producen movimientos repetitivos, por ejemplo repetidos más de 4 veces por minuto (excluyendo caminar).
            </Typography>
          ) : (
            <Typography variant="body1">
              No se indica la existencia de movimientos repetitivos durante la actividad.
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          {REBA.CambiosRapidos === 1 ? (
            <Typography variant="body1">
              Se indica que durante la actividad, se producen cambios de postura importantes o se adoptan posturas inestables
            </Typography>
          ) : (
            <Typography variant="body1">
              No se indica la existencia de cambios bruscos de postura durante la actividad.
            </Typography>
          )}
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
      </Grid>
    </Paper>
  );
};

export default ViewREBA;

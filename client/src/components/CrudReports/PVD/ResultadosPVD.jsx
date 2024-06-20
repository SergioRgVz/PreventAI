import React, { useEffect, useState } from "react";
import { Grid, Typography, Card, CardContent } from "@mui/material";
import ResumenFactores from "../GINSHT/ResumenFactores";
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

const ResultadosPVD = ({ formData, handleChange }) => {
  const [pantallaFactors, setPantallaFactors] = useState([]);
  const [tecladoFactors, setTecladoFactors] = useState([]);
  const [mesa1Factors, setMesa1Factors] = useState([]);
  const [mesa2Factors, setMesa2Factors] = useState([]);
  const [sillaFactors, setSillaFactors] = useState([]);
  const [iluminacionFactors, setIluminacionFactors] = useState([]);
  const [ruidoFactors, setRuidoFactors] = useState([]);
  const [temperaturaFactors, setTemperaturaFactors] = useState([]);
  const [programasFactors, setProgramasFactors] = useState([]);
  const [organizacionFactors, setOrganizacionFactors] = useState([]);

  useEffect(() => {
    fetchFactors("pantallaPVD").then((factors) => setPantallaFactors(factors));
    fetchFactors("tecladoPVD").then((factors) => setTecladoFactors(factors));
    fetchFactors("mesa1PVD").then((factors) => setMesa1Factors(factors));
    fetchFactors("mesa2PVD").then((factors) => setMesa2Factors(factors));
    fetchFactors("sillaPVD").then((factors) => setSillaFactors(factors));
    fetchFactors("iluminacionPVD").then((factors) =>
      setIluminacionFactors(factors)
    );
    fetchFactors("ruidoPVD").then((factors) => setRuidoFactors(factors));
    fetchFactors("temperaturaPVD").then((factors) =>
      setTemperaturaFactors(factors)
    );
    fetchFactors("programasPVD").then((factors) =>
      setProgramasFactors(factors)
    );
    fetchFactors("organizacionPVD").then((factors) =>
      setOrganizacionFactors(factors)
    );
  }, []);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Estos son los aspectos seleccionados en el formulario:
      </Typography>
      <Grid container spacing={3} paddingBottom={"10px"}>
        <Grid item xs={12} sm={12}>
          <ResumenFactores
            title="Factores de riesgo de la pantalla seleccionados"
            selectedFactors={formData.factoresPantalla}
            allFactors={pantallaFactors}
          />
        </Grid>
      </Grid>
        <Grid container spacing={3} paddingBottom={"10px"}>
            <Grid item xs={12} sm={12}>
            <ResumenFactores
                title="Factores de riesgo del teclado seleccionados"
                selectedFactors={formData.factoresTeclado}
                allFactors={tecladoFactors}
            />
            </Grid>
        </Grid>
        <Grid container spacing={3} paddingBottom={"10px"}>
            <Grid item xs={12} sm={12}>
            <ResumenFactores
                title="Factores de riesgo de la mesa seleccionados"
                selectedFactors={formData.factoresMesa}
                allFactors={mesa1Factors || mesa2Factors}
            />
            </Grid>
        </Grid>
        <Grid container spacing={3} paddingBottom={"10px"}>
            <Grid item xs={12} sm={12}>
            <ResumenFactores
                title="Factores de riesgo de la silla seleccionados"
                selectedFactors={formData.factoresSilla}
                allFactors={sillaFactors}
            />
            </Grid>
        </Grid>
        <Grid container spacing={3} paddingBottom={"10px"}>
            <Grid item xs={12} sm={12}>
            <ResumenFactores
                title="Factores de riesgo de la iluminación seleccionados"
                selectedFactors={formData.factoresIluminacion}
                allFactors={iluminacionFactors}
            />
            </Grid>
        </Grid>
        <Grid container spacing={3} paddingBottom={"10px"}>
            <Grid item xs={12} sm={12}>
            <ResumenFactores
                title="Factores de riesgo del ruido seleccionados"
                selectedFactors={formData.factoresRuido}
                allFactors={ruidoFactors}
            />
            </Grid>
        </Grid>
        <Grid container spacing={3} paddingBottom={"10px"}>
            <Grid item xs={12} sm={12}>
            <ResumenFactores
                title="Factores de riesgo de la temperatura seleccionados"
                selectedFactors={formData.factoresTemperatura}
                allFactors={temperaturaFactors}
            />
            </Grid>
        </Grid>
        <Grid container spacing={3} paddingBottom={"10px"}>
            <Grid item xs={12} sm={12}>
            <ResumenFactores
                title="Factores de riesgo de los programas informáticos seleccionados"
                selectedFactors={formData.factoresProgramas}
                allFactors={programasFactors}
            />
            </Grid>
        </Grid>
        <Grid container spacing={3} paddingBottom={"10px"}>
            <Grid item xs={12} sm={12}>
            <ResumenFactores
                title="Factores de riesgo de la organización del trabajo seleccionados"
                selectedFactors={formData.factoresOrganizacion}
                allFactors={organizacionFactors}
            />
            </Grid>
        </Grid>
    </>
  );
};

export default ResultadosPVD;

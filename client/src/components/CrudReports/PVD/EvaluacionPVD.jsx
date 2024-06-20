import  { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import FactoresCheckList from "../GINSHT/FactoresChecklist";
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

export default function EvaluacionPVD({ formData, handleChange }) {
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

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Datos de la evaluación
      </Typography>
      <Typography variant="h6" gutterBottom>
        Marque los siguientes aspectos según los considere para el trabajador
        evaluado:
      </Typography>
      <FactoresCheckList
        title="Factores de riesgo de la pantalla"
        factors={pantallaFactors}
        selectedFactors={formData.factoresPantalla}
        handleFactorChange={(id) => handleFactorChange("factoresPantalla", id)}
      />
        <FactoresCheckList
            title="Factores de riesgo del teclado"
            factors={tecladoFactors}
            selectedFactors={formData.factoresTeclado}
            handleFactorChange={(id) => handleFactorChange("factoresTeclado", id)}
        />
        <FactoresCheckList
            title="Factores de riesgo de la mesa"
            factors={mesa1Factors}
            selectedFactors={formData.factoresMesa}
            handleFactorChange={(id) => handleFactorChange("factoresMesa", id)}
        />
        <Typography variant="h6" gutterBottom>
          ¿Considera necesario un atril o portadocumentos en su puesto de
          trabajo? En caso de disponer en su puesto de trabajo de este elemento
          conteste a los siguientes apartados:
        </Typography>
        <FactoresCheckList
            
            factors={mesa2Factors}
            selectedFactors={formData.factoresMesa}
            handleFactorChange={(id) => handleFactorChange("factoresMesa", id)}
        />
        <FactoresCheckList
            title="Factores de riesgo de la silla"
            factors={sillaFactors}
            selectedFactors={formData.factoresSilla}
            handleFactorChange={(id) => handleFactorChange("factoresSilla", id)}
        />
        <FactoresCheckList
            title="Factores de riesgo de la iluminación"
            factors={iluminacionFactors}
            selectedFactors={formData.factoresIluminacion}
            handleFactorChange={(id) => handleFactorChange("factoresIluminacion", id)}
        />
        <FactoresCheckList
            title="Factores de riesgo del ruido"
            factors={ruidoFactors}
            selectedFactors={formData.factoresRuido}
            handleFactorChange={(id) => handleFactorChange("factoresRuido", id)}
        />
        <FactoresCheckList
            title="Factores de riesgo de la temperatura"
            factors={temperaturaFactors}
            selectedFactors={formData.factoresTemperatura}
            handleFactorChange={(id) => handleFactorChange("factoresTemperatura", id)}
        />
        <FactoresCheckList
            title="Factores de riesgo de los programas informáticos"
            factors={programasFactors}
            selectedFactors={formData.factoresProgramas}
            handleFactorChange={(id) => handleFactorChange("factoresProgramas", id)}
        />
        <FactoresCheckList
            title="Factores de riesgo de la organización del trabajo"
            factors={organizacionFactors}
            selectedFactors={formData.factoresOrganizacion}
            handleFactorChange={(id) => handleFactorChange("factoresOrganizacion", id)}
        />


    </>
  );
}

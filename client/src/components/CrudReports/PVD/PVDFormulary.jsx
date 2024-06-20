import { useState, useEffect } from "react";
import Identificacion from "../GINSHT/Identificacion";
import SubirImagenes from "../GINSHT/SubirImagenes";
import EvaluacionPVD from "./EvaluacionPVD";
import ResultadosPVD from "./ResultadosPVD";
import {
  Grid,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Paper,
  TextField,
} from "@mui/material";

import { useParams } from "react-router-dom";
import { companyService } from "../../../hooks/useCompanies";
import jsPDF from "jspdf";
import apiClient from "../../../hooks/useAxiosAuth";
import { reportService } from "../../../hooks/useReports";

const steps = [
  "Datos identificativos",
  "Imágenes",
  "Descripción",
  "Valoración",
  "Resultados",
  "Enviar",
];

const fetchFactors = async (tipo) => {
  try {
    const response = await apiClient.get(`/factor/type/${tipo}`);
    return response.data.factors;
  } catch (error) {
    console.error("Error fetching factors:", error);
    return [];
  }
};

export const PVDFormulary = () => {
  const { reportId } = useParams();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    CIF_Empresa: "",
    ID_Empresa: "",
    DNI_Empleado: "",
    ID_Empleado: "",
    Sexo: "",
    PuestoTrabajo: "",
    Fecha: null,
    Referencia: "",
    Desc_TrabajoPVD: "",
    factoresPantalla: [],
    factoresTeclado: [],
    factoresMesa: [],
    factoresSilla: [],
    factoresIluminacion: [],
    factoresRuido: [],
    factoresTemperatura: [],
    factoresProgramas: [],
    factoresOrganizacion: [],
    indicaciones: "",
  });

  const [images, setImages] = useState([]);
  const [employeesList, setEmployeesList] = useState([]);
  const [pantallaFactors, setPantallaFactors] = useState([]);
  const [tecladoFactors, setTecladoFactors] = useState([]);
  const [mesaFactors, setMesaFactors] = useState([]);
  const [sillaFactors, setSillaFactors] = useState([]);
  const [iluminacionFactors, setIluminacionFactors] = useState([]);
  const [ruidoFactors, setRuidoFactors] = useState([]);
  const [temperaturaFactors, setTemperaturaFactors] = useState([]);
  const [programasFactors, setProgramasFactors] = useState([]);
  const [organizacionFactors, setOrganizacionFactors] = useState([]);

  useEffect(() => {
    const fetchReportData = async () => {
      if (reportId) {
        // const reportData = await reportService.getReportById(reportId);
        // setFormData(reportData);
      }
    };

    fetchReportData();
  }, [reportId]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCompanyChange = async (event) => {
    const selectedCompanyId = event.target.value;
    const companiesList = await companyService.getCompanies();
    const selectedCompany = companiesList.find(
      (company) => company.ID === selectedCompanyId
    );

    setFormData((prevFormData) => ({
      ...prevFormData,
      ID_Empresa: selectedCompany.ID,
      CIF_Empresa: selectedCompany.CIF,
    }));

    const employeesResponse = await companyService.getEmployees(
      selectedCompany.ID
    );
    setEmployeesList(employeesResponse);
  };

  const handleEmployeeChange = (event) => {
    const selectedEmployeeDNI = event.target.value;
    const selectedEmployee = employeesList.find(
      (employee) => employee.DNI === selectedEmployeeDNI
    );
    setFormData((prevFormData) => ({
      ...prevFormData,
      DNI_Empleado: selectedEmployee.DNI,
      ID_Empleado: selectedEmployee.ID,
    }));
  };

  const handleReset = () => {
    setActiveStep(0);
    setFormData({
      CIF_Empresa: "",
      ID_Empresa: "",
      DNI_Empleado: "",
      ID_Empleado: "",
      Sexo: "",
      PuestoTrabajo: "",
      Fecha: null,
      Referencia: "",
      Desc_TrabajoPVD: "",
      factoresPantalla: [],
      factoresTeclado: [],
      factoresMesa: [],
      factoresSilla: [],
      factoresIluminacion: [],
      factoresRuido: [],
      factoresTemperatura: [],
      factoresProgramas: [],
      factoresOrganizacion: [],
      indicaciones: "",
    });
    setEmployeesList([]);
    setImages([]);
}

// TODO: Implementar la función para guardar el PDF
const handleSavePDF = () => {
};

      // Función para convertir imagen a base64
  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const convertirDatosInforme = (formData) => {
    return {
    ID_Empresa: formData.ID_Empresa,
    ID_Empleado: formData.ID_Empleado,
    Referencia: formData.Referencia,
    Fecha: formData.Fecha,
    Indicaciones: formData.indicaciones, // Agrega aquí cualquier indicación adicional si es necesario
    tipo: "PVD", // Define el tipo si es necesario
    detalles: {
      DescROL: formData.Desc_TrabajoPVD,
    },
      imagenes: formData.imagenes,  
      factores: {
        pantalla: formData.factoresPantalla,
        teclado: formData.factoresTeclado,
        mesa: formData.factoresMesa,
        silla: formData.factoresSilla,
        iluminacion: formData.factoresIluminacion,
        ruido: formData.factoresRuido,
        temperatura: formData.factoresTemperatura,
        programas: formData.factoresProgramas,
        organizacion: formData.factoresOrganizacion
      },
    };
  };

  const subirImagen = async (image) => {
    const formData = new FormData();
    formData.append("image", image.file);

    try {
      const response = await apiClient.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data.filename;
    } catch (error) {
      console.error("Error subiendo la imagen:", error);
      throw error;
    }
  };

  const handleSave = async () => {
    try {
      // Subir imágenes y obtener las rutas
      const imagenesRutas = await Promise.all(
        images.map(async (image) => {
          const ruta = await subirImagen(image);
          return ruta;
        })
      );

      // Convertir datos del formulario
      const datosInforme = convertirDatosInforme(formData);

      // Incluir las rutas de las imágenes en los datos del informe
      datosInforme.imagenes = imagenesRutas;

      console.log(datosInforme);

      if (reportId) {
        // await reportService.updateReport(reportId, datosInforme);
      } else {
        await reportService.createReport(datosInforme);
      }

      console.log("Informe creado exitosamente");
    } catch (error) {
      console.error("Error creando el informe:", error);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Identificacion
            formData={formData}
            handleChange={handleChange}
            handleCompanyChange={handleCompanyChange}
            employeesList={employeesList}
            handleEmployeeChange={handleEmployeeChange}
          />
        );
      case 1:
        return <SubirImagenes images={images} setImages={setImages} />;
    case 2: 
    return (
        <Grid container spacing={2}>
          <Typography variant="h6" gutterBottom>
            Descripción del trabajo de pantallas
          </Typography>
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom>
            Introduzca una breve descripción de los datos referentes al trabajo con pantallas.
            </Typography>
            <TextField
              name="DescripcionTrabajoPVD"
              label="Descripción de trabajo con Pantallas"
              value={formData.Desc_TrabajoPVD}
              onChange={handleChange}
              fullWidth
              margin="normal"
              multiline
              rows={4}
            />
          </Grid>
        </Grid>
      );
    case 3:
        return (
            <EvaluacionPVD formData={formData} handleChange={handleChange} />
        );

    case 4:
        return (
            <ResultadosPVD formData={formData} handleChange={handleChange} />
        );
    case 5:
        return (
            <>
              <Typography variant="h6" gutterBottom>
                Enviar
              </Typography>
              <Grid
                containter
                display={"flex"}
                justifyContent={"center"}
                spacing={4}
                paddingBottom={"30px"}
              >
                <Button
                  variant="contained"
                  color="buttons"
                  onClick={handleSavePDF}
                >
                  Guardar PDF
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleSave}
                >
                  Enviar
                </Button>
              </Grid>
            </>
          );
        default:
            return "Paso no encontrado";
    }
};

return (
    <div>
      <Typography
        component="h1"
        variant="h2"
        align="center"
        paddingTop={"10px"}
      >
        Informe GINSHT
      </Typography>
      <Grid
        container
        spacing={2}
        paddingTop={"10px"}
        paddingLeft={"20px"}
        paddingRight={"30px"}
      >
        <Grid item xs={6} md={3} lg={3}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Grid>
        <Grid item xs={6} md={9} lg={9}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <div>
              {activeStep === steps.length ? (
                <div>
                  <Typography variant="h6" gutterBottom>
                    Todos los pasos completados
                  </Typography>
                  <Button onClick={handleReset}>Resetear</Button>
                </div>
              ) : (
                <div>
                  {getStepContent(activeStep)}
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mt: 2 }}
                    >
                      Atrás
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 2, ml: 2 }}
                    >
                      {activeStep === steps.length - 1
                        ? "Finalizar"
                        : "Siguiente"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default PVDFormulary;
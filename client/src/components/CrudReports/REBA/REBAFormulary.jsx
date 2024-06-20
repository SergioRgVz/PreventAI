import { useState, useEffect } from "react";
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
import Identificacion from "../GINSHT/Identificacion";
import SubirImagenes from "../GINSHT/SubirImagenes";
import EvaluacionGrupoA from "./EvaluacionGrupoA";
import EvaluacionGrupoB from "./EvaluacionGrupoB";
import EvaluacionGrupoC from "./EvaluacionGrupoC";
import ResultadosREBA from "./ResultadosREBA";

import { useParams } from "react-router-dom";
import { companyService } from "../../../hooks/useCompanies";
import jsPDF from "jspdf";
import apiClient from "../../../hooks/useAxiosAuth";
import { reportService } from "../../../hooks/useReports";

const steps = [
  "Datos identificativos",
  "Imágenes",
  "Descripción",
  "Valoración grupo A",
  "Valoración grupo B",
  "Valoración de fuerzas y cargas",
  "Resultados",
  "Enviar",
];

export const REBAFormulary = () => {
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
    Desc_REBA: "",
    PCuello: 1,
    CCuello: 0,
    PTronco: 1,
    CTronco: 0,
    PPiernas: 1,
    CPiernas1: 0,
    CPiernas2: 0,
    PBrazos: 1,
    CAbducidos: 0,
    CHombrosLevantados: 0,
    CBrazosApoyados: 0,
    PAntebrazos: 1,
    PMunnecas: 1,
    CMunnecas: 0,
    PCarga: 1,
    CCarga: 0,
    Agarre: 0,
    Estatismo: 0,
    AccionesRepetidas: 0,
    CambiosRapidos: 0,
  });

  const [images, setImages] = useState([]);
  const [employeesList, setEmployeesList] = useState([]);

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
    let a = 1;
  };

  const handleChangeInt = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: isNaN(value) ? value : parseInt(value, 10),
    }));
    let a = 1; // Esta línea es innecesaria, pero la dejo porque la mencionaste.
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
      Desc_REBA: "",
      PCuello: 1,
      CCuello: 0,
      PTronco: 0,
      CTronco: 0,
      PPiernas: 0,
      CPiernas1: 0,
      CPiernas2: 0,
      PBrazos: 0,
      CAbducidos: 0,
      CHombrosLevantados: 0,
      CBrazosApoyados: 0,
      PAntebrazos: 0,
      PMunnecas: 0,
      CMunnecas: 0,
      PCarga: 0,
      CCarga: 0,
      Agarre: 0,
      Estatismo: 0,
      AccionesRepetidas: 0,
      CambiosRapidos: 0,
    });
    setEmployeesList([]);
    setImages([]);
  };

  const handleSavePDF = async () => {
    const doc = new jsPDF();
  
    // Título del documento
    doc.setFontSize(18);
    doc.text("Informe REBA", 20, 20);
  
    // Datos identificativos
    doc.setFontSize(16);
    doc.text("Datos identificativos", 20, 30);
  
    doc.setFontSize(12);
    doc.text(`CIF Empresa: ${formData.CIF_Empresa}`, 20, 40);
    doc.text(`ID Empresa: ${formData.ID_Empresa}`, 20, 50);
    doc.text(`DNI Empleado: ${formData.DNI_Empleado}`, 20, 60);
    doc.text(`ID Empleado: ${formData.ID_Empleado}`, 20, 70);
    doc.text(`Sexo: ${formData.Sexo}`, 20, 80);
    doc.text(`Puesto de Trabajo: ${formData.PuestoTrabajo}`, 20, 90);
    doc.text(`Fecha: ${formData.Fecha}`, 20, 100);
    doc.text(`Referencia: ${formData.Referencia}`, 20, 110);
  
    // Descripción del trabajo con peso
    doc.text("Descripción del trabajo con peso:", 20, 120);
    doc.text(formData.Desc_REBA, 20, 130);
  
    // Datos de la evaluación del grupo A
    doc.setFontSize(16);
    doc.text("Datos de la evaluación del grupo A:", 20, 140);
    doc.setFontSize(12);
  
    let yPosition = 150;
    doc.text(
      `Puntuación del cuello: ${
        formData.PCuello === 1
          ? "El cuello está entre 0º y 20º de flexión"
          : "El cuello está extendido o flexionado más de 20º"
      }`,
      20,
      yPosition
    );
    yPosition += 10;
  
    if (formData.CCuello !== 0) {
      doc.text(
        `Se indica que existe torsión o inclinación lateral del cuello`,
        20,
        yPosition
      );
      yPosition += 10;
    }
  
    doc.text(
      `Puntuación de tronco: ${
        [
          "El tronco está erguido",
          "El tronco está entre 0º y 20º de flexión o 0º y 20º de extensión",
          "El tronco está entre 20º y 60 de flexión o 20º y 60 de extensión",
          "El tronco está flexionado más de 60º",
        ][formData.PTronco - 1]
      }`,
      20,
      yPosition
    );
    yPosition += 10;
  
    if (formData.CTronco !== 0) {
      doc.text(
        `Se indica que existe torsión o inclinación lateral del tronco`,
        20,
        yPosition
      );
      yPosition += 10;
    }
  
    doc.text(
      `Puntuación de piernas: ${
        [
          "Existe flexión de una o de ambas rodillas entre 30º y 60º",
          "Existe flexión de una o de ambas rodillas de más de 60º (salvo postura sedente)",
        ][formData.PPiernas - 1]
      }`,
      20,
      yPosition
    );
    yPosition += 10;
  
    if (formData.CPiernas1 !== 0) {
      doc.text(
        `Se indica que existe soporte bilateral, andando o sentado`,
        20,
        yPosition
      );
      yPosition += 10;
    }
  
    if (formData.CPiernas2 !== 0) {
      doc.text(
        `Se indica que existe soporte unilateral, soporte ligero o postura inestable.`,
        20,
        yPosition
      );
      yPosition += 10;
    }
  
    // Datos de la evaluación del grupo B
    doc.setFontSize(16);
    yPosition += 10;
    doc.text("Datos de la evaluación del grupo B:", 20, yPosition);
    doc.setFontSize(12);
    yPosition += 10;
  
    doc.text(
      `Puntuación de brazos: ${
        [
          "El brazo está entre 20º de flexión y 20º de extensión.",
          "El brazo está entre 21º y 45º de flexión o más de 20º de extensión.",
          "El brazo está entre 46º y 90º de flexión.",
          "El brazo está flexionado más de 90º.",
        ][formData.PBrazos - 1]
      }`,
      20,
      yPosition
    );
    yPosition += 10;
  
    if (formData.CAbducidos !== 0) {
      doc.text(`Se indica que el brazo está abducido o rotado`, 20, yPosition);
      yPosition += 10;
    }
  
    if (formData.CHombrosLevantados !== 0) {
      doc.text(`Se indica que los hombros están elevados o encogidos`, 20, yPosition);
      yPosition += 10;
    }
  
    if (formData.CBrazosApoyados !== 0) {
      doc.text(
        `Se indica que los brazos están apoyados o en una postura a favor de la gravedad`,
        20,
        yPosition
      );
      yPosition += 10;
    }
  
    doc.text(
      `Puntuación de antebrazos: ${
        formData.PAntebrazos === 1
          ? "El antebrazo está entre 60º y 100º de flexión."
          : "El antebrazo está flexionado por debajo de 60º o por encima de 100º."
      }`,
      20,
      yPosition
    );
    yPosition += 10;
  
    doc.text(
      `Puntuación de muñecas: ${
        formData.PMunnecas === 1
          ? "La muñeca está entre 0 y 15 grados de flexión o extensión."
          : "La muñeca está flexionada o extendida más de 15 grados."
      }`,
      20,
      yPosition
    );
    yPosition += 10;
  
    if (formData.CMunnecas !== 0) {
      doc.text(
        `Se indica que la muñeca está en una postura de desviación radial o cubital.`,
        20,
        yPosition
      );
      yPosition += 10;
    }
  
    // Datos de la evaluación del grupo C
    doc.setFontSize(16);
    yPosition += 10;
    doc.text("Datos de la evaluación del grupo C:", 20, yPosition);
    doc.setFontSize(12);
    yPosition += 10;
  
    doc.text(
      `Puntuación de carga: ${
        [
          "La carga o fuerza es menor de 5kg.",
          "La carga o fuerza está entre 5 y 10 kgs.",
          "La carga o fuerza es mayor de 10 kgs.",
        ][formData.PCarga]
      }`,
      20,
      yPosition
    );
    yPosition += 10;
  
    doc.text(
      `Puntuación de agarre: ${
        [
          "Agarre Bueno (el agarre es bueno y la fuerza de agarre de rango medio).",
          "Agarre Regular (el agarre con la mano es aceptable pero no ideal o el agarre es aceptable utilizando otras partes del cuerpo).",
          "Agarre Malo (el agarre es posible pero no aceptable).",
          "Agarre Inaceptable (el agarre es torpe e inseguro, no es posible el agarre manual o el agarre es inaceptable utilizando otras partes del cuerpo).",
        ][formData.Agarre]
      }`,
      20,
      yPosition
    );
    yPosition += 10;
  
    if (formData.Estatismo !== 0) {
      doc.text(
        `Se indica que una o más partes del cuerpo permanecen estáticas, por ejemplo soportadas durante más de 1 minuto.`,
        20,
        yPosition
      );
      yPosition += 10;
    }
  
    if (formData.AccionesRepetidas !== 0) {
      doc.text(
        `Se indica que se realizan acciones repetidas, por ejemplo más de 4 veces por minuto.`,
        20,
        yPosition
      );
      yPosition += 10;
    }
  
    if (formData.CambiosRapidos !== 0) {
      doc.text(
        `Se indica que se realizan cambios rápidos de postura.`,
        20,
        yPosition
      );
      yPosition += 10;
    }
  
    doc.save("informe_reba.pdf");
  };
  

  // Guardar el documento
  const convertirDatosInforme = (formData) => {
    return {
      ID_Empresa: formData.ID_Empresa,
      ID_Empleado: formData.ID_Empleado,
      Referencia: formData.Referencia,
      Fecha: formData.Fecha,
      Indicaciones: formData.indicaciones,
      tipo: "REBA",
      detalles: {
        Desc_REBA: formData.Desc_REBA,
        PCuello: formData.PCuello,
        CCuello: formData.CCuello,
        PTronco: formData.PTronco,
        CTronco: formData.CTronco,
        PPiernas: formData.PPiernas,
        CPiernas1: formData.CPiernas1,
        CPiernas2: formData.CPiernas2,
        PBrazos: formData.PBrazos,
        CAbducidos: formData.CAbducidos,
        CHombrosLevantados: formData.CHombrosLevantados,
        CBrazosApoyados: formData.CBrazosApoyados,
        PAntebrazos: formData.PAntebrazos,
        PMunnecas: formData.PMunnecas,
        CMunnecas: formData.CMunnecas,
        PCarga: formData.PCarga,
        CCarga: formData.CCarga,
        Agarre: formData.Agarre,
        Estatismo: formData.Estatismo,
        AccionesRepetidas: formData.AccionesRepetidas,
        CambiosRapidos: formData.CambiosRapidos,
      },
    };
  }; //TODO: Implement convert data

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
              Descripción del trabajo con peso
            </Typography>
            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom>
                Introduzca una breve descripción de los datos referentes al
                trabajo con peso.
              </Typography>
              <TextField
                name="DescripcionTrabajoREBA"
                label="Descripción de trabajo con peso"
                value={formData.Desc_REBA}
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
          <EvaluacionGrupoA
            formData={formData}
            handleChangeInt={handleChangeInt}
          />
        );

      case 4:
        return (
          <EvaluacionGrupoB
            formData={formData}
            handleChangeInt={handleChangeInt}
          />
        );
      case 5:
        return (
          <EvaluacionGrupoC
            formData={formData}
            handleChangeInt={handleChangeInt}
          />
        );

      case 6:
        return <ResultadosREBA formData={formData} />;
      case 7:
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
        Informe REBA
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

export default REBAFormulary;
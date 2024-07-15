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
import dayjs from "dayjs";

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

export const REBAFormulary = (report) => {
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
    deteccionCuello: false,
    CCuello: 0,
    PTronco: 1,
    deteccionTronco: false,
    CTronco: 0,
    PPiernas: 1,
    deteccionPiernas: false,
    CPiernas1: 0,
    CPiernas2: 0,
    PBrazos: 1,
    deteccionBrazos: false,
    CAbducidos: 0,
    CHombrosLevantados: 0,
    CBrazosApoyados: 0,
    PAntebrazos: 1,
    deteccionAntebrazos: false,
    PMunnecas: 1,
    deteccionMunnecas: false,
    CMunnecas: 0,
    PCarga: 1,
    CCarga: 0,
    Agarre: 0,
    Estatismo: 0,
    AccionesRepetidas: 0,
    CambiosRapidos: 0,
    imagenDeteccion: false,
  });

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

  const populateFormData = (report) => {
    // Procesar imágenes
    const processedImages = report.report.Imagens
      ? report.report.Imagens.map((image) => {
          return {
            file: null,
            preview: image.url || `${image.base64}`,
          };
        })
      : [];
    setFormData({
      CIF_Empresa: report.report.Empleado.Empresa.CIF || "",
      ID_Empresa: report.report.Empleado.Empresa.ID || "",
      DNI_Empleado: report.report.Empleado.DNI || "",
      ID_Empleado: report.report.ID_Empleado || "",
      Sexo: report.report.Empleado.Sexo || "",
      PuestoTrabajo: report.report.Empleado.PuestoTrabajo || "",
      Fecha: report.report.Fecha ? dayjs(report.report.Fecha) : null,
      Referencia: report.report.Referencia || "",
      Desc_REBA: report.report.REBA.Desc_REBA || "",
      PCuello: report.report.REBA.Desc_REBA || 1,
      CCuello: report.report.REBA.CCuello || 0,
      PTronco: report.report.REBA.PTronco || 1,
      CTronco: report.report.REBA.CTronco || 0,
      PPiernas: report.report.REBA.PPiernas || 1,
      CPiernas1: report.report.REBA.CPiernas1 || 0,
      CPiernas2: report.report.REBA.CPiernas2 || 0,
      PBrazos: report.report.REBA.PBrazos || 1,
      CAbducidos: report.report.REBA.CAbducidos || 0,
      CHombrosLevantados: report.report.REBA.CHombrosLevantados || 0,
      CBrazosApoyados: report.report.REBA.CBrazosApoyados || 0,
      PAntebrazos: report.report.REBA.PAntebrazos || 1,
      PMunnecas: report.report.REBA.PMunnecas || 1,
      CMunnecas: report.report.REBA.CMunnecas || 0,
      PCarga: report.report.REBA.PCarga || 1,
      CCarga: report.report.REBA.CCarga || 0,
      Agarre: report.report.REBA.Agarre || 0,
      Estatismo: report.report.REBA.Estatismo || 0,
      AccionesRepetidas: report.report.REBA.AccionesRepetidas || 0,
      CambiosRapidos: report.report.REBA.CambiosRapidos || 0,
      indicaciones: report.report.Indicaciones || "",
    });
    setImages(processedImages);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (report.report) {
        // Una vez que los factores están cargados, establecer los datos del formulario
        populateFormData(report);

        // Obtener empleados de la empresa seleccionada
        if (report.report.Empleado.Empresa.ID) {
          const employeesResponse = await companyService.getEmployees(
            report.report.Empleado.Empresa.ID
          );
          setEmployeesList(employeesResponse);
        }
      }
    };

    fetchData();
  }, [report]);

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
  };

  const handleChangeInt = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: isNaN(value) ? value : parseInt(value, 10),
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
      deteccionCuello: false,
      CCuello: 0,
      PTronco: 0,
      deteccionTronco: false,
      CTronco: 0,
      PPiernas: 0,
      deteccionPiernas: false,
      CPiernas1: 0,
      CPiernas2: 0,
      PBrazos: 0,
      deteccionBrazos: false,
      CAbducidos: 0,
      CHombrosLevantados: 0,
      CBrazosApoyados: 0,
      PAntebrazos: 0,
      deteccionAntebrazos: false,
      PMunnecas: 0,
      deteccionMunnecas: false,
      CMunnecas: 0,
      PCarga: 0,
      CCarga: 0,
      Agarre: 0,
      Estatismo: 0,
      AccionesRepetidas: 0,
      CambiosRapidos: 0,
      imagenDeteccion: false,
    });
    setEmployeesList([]);
    setImages([]);
  };

  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSavePDF = async () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    let yPosition = 20;
  
    const addText = (text, fontSize = 12, isBold = false) => {
      if (yPosition > pageHeight - 20) {
        doc.addPage();
        yPosition = 20;
      }
      doc.setFontSize(fontSize);
      doc.setFont(undefined, isBold ? 'bold' : 'normal');
      doc.text(text, 20, yPosition);
      yPosition += fontSize * 0.5 + 5;
    };
  
    addText("Informe REBA", 24, true);
    yPosition += 10;
  
    addText("1. Datos Identificativos", 16, true);
    addText(`CIF Empresa: ${formData.CIF_Empresa}`);
    addText(`ID Empresa: ${formData.ID_Empresa}`);
    addText(`DNI Empleado: ${formData.DNI_Empleado}`);
    addText(`ID Empleado: ${formData.ID_Empleado}`);
    addText(`Sexo: ${formData.Sexo}`);
    addText(`Puesto de Trabajo: ${formData.PuestoTrabajo}`);
    addText(`Fecha: ${formData.Fecha}`);
    addText(`Referencia: ${formData.Referencia}`);
    yPosition += 10;
  
    addText("2. Descripción del Trabajo con Peso", 16, true);
    const splitDesc = doc.splitTextToSize(formData.Desc_REBA, pageWidth - 40);
    doc.text(splitDesc, 20, yPosition);
    yPosition += splitDesc.length * 5 + 10;
  
    addText("3. Datos de la Evaluación del Grupo A", 16, true);
    addText(
      `Puntuación del cuello: ${
        formData.PCuello === 1
          ? "El cuello está entre 0º y 20º de flexión"
          : "El cuello está extendido o flexionado más de 20º"
      }`
    );
    if (formData.CCuello !== 0) {
      addText(`Se indica que existe torsión o inclinación lateral del cuello`);
    }
    addText(
      `Puntuación de tronco: ${
        [
          "El tronco está erguido",
          "El tronco está entre 0º y 20º de flexión o 0º y 20º de extensión",
          "El tronco está entre 20º y 60 de flexión o 20º y 60 de extensión",
          "El tronco está flexionado más de 60º",
        ][formData.PTronco - 1]
      }`
    );
    if (formData.CTronco !== 0) {
      addText(`Se indica que existe torsión o inclinación lateral del tronco`);
    }
    addText(
      `Puntuación de piernas: ${
        [
          "Existe flexión de una o de ambas rodillas entre 30º y 60º",
          "Existe flexión de una o de ambas rodillas de más de 60º (salvo postura sedente)",
        ][formData.PPiernas - 1]
      }`
    );
    if (formData.CPiernas1 !== 0) {
      addText(`Se indica que existe soporte bilateral, andando o sentado`);
    }
    if (formData.CPiernas2 !== 0) {
      addText(`Se indica que existe soporte unilateral, soporte ligero o postura inestable.`);
    }
    yPosition += 10;
  
    addText("4. Datos de la Evaluación del Grupo B", 16, true);
    addText(
      `Puntuación de brazos: ${
        [
          "El brazo está entre 20º de flexión y 20º de extensión.",
          "El brazo está entre 21º y 45º de flexión o más de 20º de extensión.",
          "El brazo está entre 46º y 90º de flexión.",
          "El brazo está flexionado más de 90º.",
        ][formData.PBrazos - 1]
      }`
    );
    if (formData.CAbducidos !== 0) {
      addText(`Se indica que el brazo está abducido o rotado`);
    }
    if (formData.CHombrosLevantados !== 0) {
      addText(`Se indica que los hombros están elevados o encogidos`);
    }
    if (formData.CBrazosApoyados !== 0) {
      addText(`Se indica que los brazos están apoyados o en una postura a favor de la gravedad`);
    }
    addText(
      `Puntuación de antebrazos: ${
        formData.PAntebrazos === 1
          ? "El antebrazo está entre 60º y 100º de flexión."
          : "El antebrazo está flexionado por debajo de 60º o por encima de 100º."
      }`
    );
    addText(
      `Puntuación de muñecas: ${
        formData.PMunnecas === 1
          ? "La muñeca está entre 0 y 15 grados de flexión o extensión."
          : "La muñeca está flexionada o extendida más de 15 grados."
      }`
    );
    if (formData.CMunnecas !== 0) {
      addText(`Se indica que la muñeca está en una postura de desviación radial o cubital.`);
    }
    yPosition += 10;
  
    addText("5. Datos de la Evaluación del Grupo C", 16, true);
    addText(
      `Puntuación de carga: ${
        [
          "La carga o fuerza es menor de 5kg.",
          "La carga o fuerza está entre 5 y 10 kgs.",
          "La carga o fuerza es mayor de 10 kgs.",
        ][formData.PCarga]
      }`
    );
    addText(
      `Puntuación de agarre: ${
        [
          "Agarre Bueno (el agarre es bueno y la fuerza de agarre de rango medio).",
          "Agarre Regular (el agarre con la mano es aceptable pero no ideal o el agarre es aceptable utilizando otras partes del cuerpo).",
          "Agarre Malo (el agarre es posible pero no aceptable).",
          "Agarre Inaceptable (el agarre es torpe e inseguro, no es posible el agarre manual o el agarre es inaceptable utilizando otras partes del cuerpo).",
        ][formData.Agarre]
      }`
    );
    if (formData.Estatismo !== 0) {
      addText(`Se indica que una o más partes del cuerpo permanecen estáticas, por ejemplo soportadas durante más de 1 minuto.`);
    }
    if (formData.AccionesRepetidas !== 0) {
      addText(`Se indica que se realizan acciones repetidas, por ejemplo más de 4 veces por minuto.`);
    }
    if (formData.CambiosRapidos !== 0) {
      addText(`Se indica que se realizan cambios rápidos de postura.`);
    }
    yPosition += 10;
  
    if (formData.imagenDeteccion && images.length > 0) {
      doc.addPage();
      yPosition = 20;
      addText("6. Imágenes", 16, true);
      yPosition += 10;
  
      const maxImageWidth = 80;
      const maxImageHeight = 80;
  
      try {
        const uploadedImgData = await toBase64(images[0].file);
  
        // Create a temporary image element to get the original dimensions
        const uploadedImg = new Image();
        uploadedImg.src = uploadedImgData;
        await new Promise(resolve => uploadedImg.onload = resolve);
  
        // Calculate the aspect ratio
        const uploadedAspectRatio = uploadedImg.width / uploadedImg.height;
  
        // Determine the final dimensions
        let uploadedFinalWidth = uploadedImg.width;
        let uploadedFinalHeight = uploadedImg.height;
  
        if (uploadedFinalWidth > maxImageWidth) {
          uploadedFinalWidth = maxImageWidth;
          uploadedFinalHeight = uploadedFinalWidth / uploadedAspectRatio;
        }
  
        if (uploadedFinalHeight > maxImageHeight) {
          uploadedFinalHeight = maxImageHeight;
          uploadedFinalWidth = uploadedFinalHeight * uploadedAspectRatio;
        }
  
        // Add the uploaded image to the PDF
        doc.addImage(uploadedImgData, "JPEG", 20, yPosition, uploadedFinalWidth, uploadedFinalHeight);
        doc.text("Imagen subida", 20, yPosition + uploadedFinalHeight + 5);
  
        let detectionImgData;
  
        if (typeof formData.imagenDeteccion === 'string') {
          // If imagenDeteccion is a base64 string, use it directly
          detectionImgData = formData.imagenDeteccion;
        } else {
          // If imagenDeteccion is a Blob or File, convert it to base64
          detectionImgData = await toBase64(formData.imagenDeteccion);
        }
  
        // Create a temporary image element to get the original dimensions
        const detectionImg = new Image();
        detectionImg.src = 'data:image/jpeg;base64,' + detectionImgData;
        await new Promise(resolve => detectionImg.onload = resolve);
  
        // Calculate the aspect ratio
        const detectionAspectRatio = detectionImg.width / detectionImg.height;
  
        // Determine the final dimensions
        let detectionFinalWidth = detectionImg.width;
        let detectionFinalHeight = detectionImg.height;
  
        if (detectionFinalWidth > maxImageWidth) {
          detectionFinalWidth = maxImageWidth;
          detectionFinalHeight = detectionFinalWidth / detectionAspectRatio;
        }
  
        if (detectionFinalHeight > maxImageHeight) {
          detectionFinalHeight = maxImageHeight;
          detectionFinalWidth = detectionFinalHeight * detectionAspectRatio;
        }
  
        // Add the detection image to the PDF
        doc.addImage(detectionImgData, "JPEG", 110, yPosition, detectionFinalWidth, detectionFinalHeight);
        doc.text("Imagen detectada", 110, yPosition + detectionFinalHeight + 5);
  
        yPosition += Math.max(uploadedFinalHeight, detectionFinalHeight) + 20;
  
      } catch (error) {
        console.error("Error adding images to PDF:", error);
        addText("Error al cargar las imágenes", 10);
        yPosition += 10;
      }
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
      let ruta = null;
      let imagenesRutas = await Promise.all(
        images.map(async (image) => {
          try {
            ruta = await subirImagen(image);
          } catch (error) {
            console.error("Error subiendo la imagen:", error);
            return null;
          }
          return ruta;
        })
      );
      if (imagenesRutas.some((ruta) => ruta === null)) {
        imagenesRutas = null;
      }

      // Convertir datos del formulario
      const datosInforme = convertirDatosInforme(formData);

      // Incluir las rutas de las imágenes en los datos del informe
      datosInforme.imagenes = imagenesRutas;

      console.log(datosInforme);

      if (report.report.ID) {
        await reportService.updateReport(report.report.ID, datosInforme);
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
        return <SubirImagenes images={images} setImages={setImages} handleChange={handleChange} REBA />;
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
                name="Desc_REBA"
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
              container
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

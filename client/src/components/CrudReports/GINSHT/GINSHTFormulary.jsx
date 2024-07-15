import { useState, useEffect } from "react";
import Identificacion from "./Identificacion";
import SubirImagenes from "./SubirImagenes";
import EvaluacionGINSHT from "./EvaluacionGINSHT";
import ResultadosGINSHT from "./ResultadosGINSHT";
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
import dayjs from "dayjs";

const steps = [
  "Datos Identificativos",
  "Imágenes",
  "Descripción del trabajo de manipulación manual de cargas",
  "Evaluación",
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

export const GINSHTFormulary = (report) => {
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
    DescripcionElevacion: "",
    DescripcionTransporte: "",
    pesoRealManejado: 0,
    DuracionTarea: 0,
    NumeroDesplazamientos: 0,
    PosicionLevantamiento: 0,
    DistanciaDesplazamientos: 0,
    alturaLevantamiento: 0,
    separacionLevantamiento: 0,
    desplazamientoVertical: 0,
    giroDelTronco: 0,
    tipoDeAgarre: 0,
    duracionManipulacion: 0,
    frecuenciaDeManipulacion: 0,
    frecuenciaDeManipulacionRadio: 0,
    pesoTeoricoRecomendado: 0,
    valorFinalFrecuencia: 0,
    factoresPuesto: [],
    factoresTrabajador: [],
    indiceRiesgoElevacion: 0,
    indiceRiesgoTransporte: 0,
    pesoAceptable: 0,
    indicaciones: "",
    deteccionAltura: false,
    deteccionSeparacion: false,
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
    const factorsPuesto = report.report.Factors
      ? report.report.Factors.map((factor) => factor.ID)
      : [];
    const factorsTrabajador = report.report.Factors
      ? report.report.Factors.map((factor) => factor.ID)
      : [];

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
      DescripcionElevacion: report.report.GINSHT?.Desc_Elevacion || "",
      DescripcionTransporte: report.report.GINSHT?.Desc_Transporte || "",
      pesoRealManejado: report.report.GINSHT?.PesoReal || 0,
      DuracionTarea: report.report.GINSHT?.DuracionTarea || 0,
      NumeroDesplazamientos: report.report.GINSHT?.NDesplazamientos || 0,
      PosicionLevantamiento: report.report.GINSHT?.PosturaLevantamiento || 0,
      DistanciaDesplazamientos:
        report.report.GINSHT?.DistanciaDesplazamientos || 0,
      alturaLevantamiento: report.report.GINSHT?.AlturaLevantamiento || 0,
      separacionLevantamiento:
        report.report.GINSHT?.SeparacionLevantamiento || 0,
      desplazamientoVertical: report.report.GINSHT?.DesplVertical || 0,
      giroDelTronco: report.report.GINSHT?.GiroTronco || 0,
      tipoDeAgarre: report.report.GINSHT?.TipoAgarre || 0,
      duracionManipulacion: report.report.GINSHT?.DuracionManipulacion || 0,
      frecuenciaDeManipulacion: report.report.GINSHT?.FrecManipulacion || 0,
      frecuenciaDeManipulacionRadio:
        report.report.GINSHT?.FrecManipulacionRadio || 0,
      pesoTeoricoRecomendado: report.report.GINSHT?.PesoTeorico || 0,
      valorFinalFrecuencia: report.report.GINSHT?.ValorFinalFrecuencia || 0,
      factoresPuesto: factorsPuesto,
      factoresTrabajador: factorsTrabajador, // Si hay una distinción específica entre los factores, ajústala aquí
      indiceRiesgoElevacion: report.report.GINSHT?.IRElevacion || 0,
      indiceRiesgoTransporte: report.report.GINSHT?.IRTransporte || 0,
      pesoAceptable: report.report.GINSHT?.PesoAceptable || 0,
      indicaciones: report.report.Indicaciones || "",
    });
    setImages(processedImages);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (report.report) {
        // Obtener factores de puesto y trabajador
        const puestosFactors = await fetchFactors("puestoGINSHT");
        const trabajadorFactors = await fetchFactors("trabajadorGINSHT");

        setPuestosFactors(puestosFactors);
        setTrabajadorFactors(trabajadorFactors);

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
  const [puestosFactors, setPuestosFactors] = useState([]);
  const [trabajadorFactors, setTrabajadorFactors] = useState([]);

  useEffect(() => {
    const fetchPuestosFactors = async () => {
      const factors = await fetchFactors("puestoGINSHT");
      setPuestosFactors(Array.isArray(factors) ? factors : []);
    };

    const fetchTrabajadorFactors = async () => {
      const factors = await fetchFactors("trabajadorGINSHT");
      setTrabajadorFactors(Array.isArray(factors) ? factors : []);
    };
    console.log("fetching factors: ", puestosFactors, trabajadorFactors);
    fetchPuestosFactors();
    fetchTrabajadorFactors();
  }, []);

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
      DescripcionElevacion: "",
      DescripcionTransporte: "",
      pesoRealManejado: 0,
      DuracionTarea: 1,
      NumeroDesplazamientos: 0,
      PosicionLevantamiento: 0,
      DistanciaDesplazamientos: 0,
      alturaLevantamiento: 0,
      separacionLevantamiento: 0,
      desplazamientoVertical: 0,
      giroDelTronco: 0,
      tipoDeAgarre: 0,
      duracionManipulacion: 0,
      frecuenciaDeManipulacion: 0,
      frecuenciaDeManipulacionRadio: 0,
      pesoTeoricoRecomendado: 0,
      valorFinalFrecuencia: 0,
      factoresPuesto: [],
      factoresTrabajador: [],
      indiceRiesgoElevacion: 0,
      indiceRiesgoTransporte: 0,
      pesoAceptable: 0,
      indicaciones: "",
      deteccionAltura: false,
      deteccionSeparacion: false,
    });
    setEmployeesList([]);
    setImages([]);
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
  
    addText("Informe GINSHT", 24, true);
    yPosition += 10;
  
    addText("1. Datos Identificativos", 16, true);
    addText(`CIF Empresa: ${formData.CIF_Empresa}`);
    addText(`ID Empresa: ${formData.ID_Empresa}`);
    addText(`DNI Empleado: ${formData.DNI_Empleado}`);
    addText(`ID Empleado: ${formData.ID_Empleado}`);
    addText(`Sexo: ${formData.Sexo}`);
    addText(`Puesto de Trabajo: ${formData.PuestoTrabajo}`);
    addText(`Fecha: ${formData.Fecha ? formData.Fecha.format('DD/MM/YYYY') : 'No especificada'}`);
    addText(`Referencia: ${formData.Referencia}`);
    yPosition += 10;
  
    addText("2. Descripción del Trabajo", 16, true);
    addText("Descripción de Elevación:");
    const splitElevacion = doc.splitTextToSize(formData.DescripcionElevacion, pageWidth - 40);
    doc.text(splitElevacion, 20, yPosition);
    yPosition += splitElevacion.length * 5 + 10;
    
    addText("Descripción de Transporte:");
    const splitTransporte = doc.splitTextToSize(formData.DescripcionTransporte, pageWidth - 40);
    doc.text(splitTransporte, 20, yPosition);
    yPosition += splitTransporte.length * 5 + 10;
  
    addText("3. Datos de la Evaluación", 16, true);
    addText(`Peso Real Manejado: ${formData.pesoRealManejado} kg`);
    addText(`Duración de la Tarea: ${formData.DuracionTarea} horas`);
    addText(`Número de Desplazamientos: ${formData.NumeroDesplazamientos}`);
    addText(`Posición de Levantamiento: ${formData.PosicionLevantamiento === 0 ? "De pie" : "Sentado"}`);
    addText(`Distancia de Desplazamientos: ${formData.DistanciaDesplazamientos === 0 ? "Hasta 10 metros" : "Más de 10 metros"}`);
    
    const alturas = ["Altura de la vista", "Encima del codo", "Debajo del codo", "Altura del muslo", "Altura de la pantorrilla"];
    addText(`Altura de Levantamiento: ${alturas[formData.alturaLevantamiento]}`);
    
    addText(`Separación de Levantamiento: ${formData.separacionLevantamiento === 0 ? "Carga cerca del cuerpo" : "Carga lejos del cuerpo"}`);
    addText(`Peso Teórico Recomendado: ${formData.pesoTeoricoRecomendado} kg`);
    
    const desplazamientos = ["Hasta 25 cm", "Hasta 50 cm", "Hasta 100 cm", "Hasta 175 cm", "Más de 175 cm"];
    addText(`Desplazamiento Vertical: ${desplazamientos[formData.desplazamientoVertical]}`);
    
    const giros = ["Sin giro", "Poco girado (hasta 30º)", "Girado (hasta 60º)", "Muy girado (90º)"];
    addText(`Giro del Tronco: ${giros[formData.giroDelTronco]}`);
    
    const agarres = ["Bueno", "Regular", "Malo"];
    addText(`Tipo de Agarre: ${agarres[formData.tipoDeAgarre]}`);
    
    const duraciones = ["Menos de 1 hora al día", "Entre 1 y 2 horas al día", "Entre 2 y 8 horas al día"];
    addText(`Duración de la Manipulación: ${duraciones[formData.duracionManipulacion]}`);
    
    const frecuencias = ["1 vez cada 5 minutos", "1 vez/minuto", "4 veces/minuto", "9 veces/minuto", "12 veces/minuto", "Más de 15 veces/minuto"];
    addText(`Frecuencia de la Manipulación: ${frecuencias[formData.frecuenciaDeManipulacion]}`);
    
    addText(`Valor Final de Frecuencia: ${formData.valorFinalFrecuencia}`);
    yPosition += 10;
  
    addText("4. Factores", 16, true);
    addText("Factores de Puesto:", 14, true);
    formData.factoresPuesto.forEach((factorID) => {
      const factor = puestosFactors.find((f) => f.ID === factorID);
      if (factor) {
        addText(`• ${factor.Nombre}`);
      }
    });
    yPosition += 5;
    addText("Factores de Trabajador:", 14, true);
    formData.factoresTrabajador.forEach((factorID) => {
      const factor = trabajadorFactors.find((f) => f.ID === factorID);
      if (factor) {
        addText(`• ${factor.Nombre}`);
      }
    });
  
    if (images.length > 0 || formData.imagenDeteccion) {
      doc.addPage();
      yPosition = 20;
      addText("5. Imágenes", 16, true);
      yPosition += 10;
    
      const maxImageWidth = 80;  // Maximum width of each image
      const maxImageHeight = 60; // Maximum height of each image
    
      if (formData.imagenDeteccion && images.length > 0) {
        addText("Imagen subida y detección realizada:", 14, true);
        yPosition += 10;
    
        try {
          const imgData = await toBase64(images[0].file);
    
          // Create a temporary image element to get the original dimensions
          const img = new Image();
          img.src = imgData;
          await new Promise(resolve => img.onload = resolve);
    
          // Calculate the aspect ratio
          const aspectRatio = img.width / img.height;
    
          // Determine the final dimensions
          let finalWidth = img.width;
          let finalHeight = img.height;
    
          if (finalWidth > maxImageWidth) {
            finalWidth = maxImageWidth;
            finalHeight = finalWidth / aspectRatio;
          }
    
          if (finalHeight > maxImageHeight) {
            finalHeight = maxImageHeight;
            finalWidth = finalHeight * aspectRatio;
          }
    
          // Add the uploaded image to the PDF
          doc.addImage(imgData, "JPEG", 20, yPosition, finalWidth, finalHeight);
          doc.text("Imagen subida", 20, yPosition + finalHeight + 5);
    
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
          doc.text("Detección realizada", 110, yPosition + detectionFinalHeight + 5);
    
          // Update yPosition for the next image or text
          yPosition += Math.max(finalHeight, detectionFinalHeight) + 20;
    
        } catch (error) {
          console.error("Error adding images to PDF:", error);
          addText("Error al cargar las imágenes", 10);
          yPosition += 10;
        }
      }
    }
    doc.save("informe_ginsht.pdf");
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
      tipo: "GINSHT", // Define el tipo si es necesario
      detalles: {
        Desc_Elevacion: formData.DescripcionElevacion,
        Desc_Transporte: formData.DescripcionTransporte,
        PesoReal: formData.pesoRealManejado,
        PesoTeorico: formData.pesoTeoricoRecomendado,
        TipoAgarre: formData.tipoDeAgarre,
        GiroTronco: formData.giroDelTronco,
        DesplVertical: formData.desplazamientoVertical,
        FrecManipulacion: formData.frecuenciaDeManipulacion,
        PesoAceptable: formData.pesoAceptable,
        IRElevacion: formData.indiceRiesgoElevacion,
        PosturaLevantamiento: formData.PosicionLevantamiento,
        AlturaLevantamiento: formData.alturaLevantamiento,
        SeparacionLevantamiento: formData.separacionLevantamiento,
        DuracionTarea: formData.DuracionTarea,
        DuracionManipulacion: formData.duracionManipulacion,
        NDesplazamientos: formData.NumeroDesplazamientos,
        DistanciaDesplazamientos: formData.DistanciaDesplazamientos,
        IRTransporte: formData.indiceRiesgoTransporte,
      },
      imagenes: formData.imagenes, // Suponiendo que las imágenes se han añadido aquí
      factores: {
        factoresPuesto: formData.factoresPuesto,
        factoresTrabajador: formData.factoresTrabajador,
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
        return (
          <SubirImagenes
            images={images}
            setImages={setImages}
            handleChange={handleChange}
            showText="GINSHT"
            GINSHT
          />
        );
      case 2:
        return (
          <Grid container spacing={2}>
            <Typography variant="h6" gutterBottom>
              Descripción del trabajo de manipulación manual de cargas
            </Typography>
            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom>
                Introduzca una breve descripción de los datos referentes a la
                elevación de la carga.
              </Typography>
              <TextField
                name="DescripcionElevacion"
                label="Descripción de Elevación"
                value={formData.DescripcionElevacion}
                onChange={handleChange}
                fullWidth
                margin="normal"
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom>
                Introduzca una breve descripción de los datos referentes al
                transporte de la carga.
              </Typography>
              <TextField
                name="DescripcionTransporte"
                label="Descripción de Transporte"
                value={formData.DescripcionTransporte}
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
          <EvaluacionGINSHT formData={formData} handleChange={handleChange} />
        );
      case 4:
        return (
          <ResultadosGINSHT formData={formData} handleChange={handleChange} />
        );
      case 5:
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
        return "Paso desconocido";
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

export default GINSHTFormulary;

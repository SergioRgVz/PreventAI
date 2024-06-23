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
import dayjs from 'dayjs';

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
    const factorsPuesto = report.report.Factors ? report.report.Factors.map(factor => factor.ID) : [];
    const factorsTrabajador = report.report.Factors ? report.report.Factors.map(factor => factor.ID) : [];


     // Procesar imágenes
    const processedImages = report.report.Imagens ? report.report.Imagens.map(image => {
    return {
      file: null,
      preview: image.url || `${image.base64}`
    };
     }) : [];
    setFormData({
      CIF_Empresa: report.report.Empleado.Empresa.CIF || "",
      ID_Empresa: report.report.Empleado.Empresa.ID || "",
      DNI_Empleado: report.report.Empleado.DNI || "",
      ID_Empleado: report.report.ID_Empleado || "",
      Sexo: report.report.Empleado.Sexo  || "",
      PuestoTrabajo: report.report.Empleado.PuestoTrabajo || "",
      Fecha: report.report.Fecha ? dayjs(report.report.Fecha) : null,
      Referencia: report.report.Referencia || "",
      DescripcionElevacion: report.report.GINSHT?.Desc_Elevacion || "",
      DescripcionTransporte: report.report.GINSHT?.Desc_Transporte || "",
      pesoRealManejado: report.report.GINSHT?.PesoReal || 0,
      DuracionTarea: report.report.GINSHT?.DuracionTarea || 0,
      NumeroDesplazamientos: report.report.GINSHT?.NDesplazamientos || 0,
      PosicionLevantamiento: report.report.GINSHT?.PosturaLevantamiento || 0,
      DistanciaDesplazamientos: report.report.GINSHT?.DistanciaDesplazamientos || 0,
      alturaLevantamiento: report.report.GINSHT?.AlturaLevantamiento || 0,
      separacionLevantamiento: report.report.GINSHT?.SeparacionLevantamiento || 0,
      desplazamientoVertical: report.report.GINSHT?.DesplVertical || 0,
      giroDelTronco: report.report.GINSHT?.GiroTronco || 0,
      tipoDeAgarre: report.report.GINSHT?.TipoAgarre || 0,
      duracionManipulacion: report.report.GINSHT?.DuracionManipulacion || 0,
      frecuenciaDeManipulacion: report.report.GINSHT?.FrecManipulacion || 0,
      frecuenciaDeManipulacionRadio: report.report.GINSHT?.FrecManipulacionRadio || 0,
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

    // // Título del documento
    doc.setFontSize(18);
    doc.text("Informe GINSHT", 20, 20);

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

    // Datos del informe
    doc.text("Descripción de Elevación:", 20, 120);
    doc.text(formData.DescripcionElevacion, 20, 130);
    doc.text("Descripción de Transporte:", 20, 140);
    doc.text(formData.DescripcionTransporte, 20, 150);

    // Datos de la evaluación
    doc.setFontSize(16);
    doc.text("Datos de la evaluación", 20, 160);

    doc.setFontSize(12);
    doc.text(`Peso Real Manejado: ${formData.pesoRealManejado} kg`, 20, 170);
    doc.text(`Duración de la Tarea: ${formData.DuracionTarea} horas`, 20, 180);
    doc.text(
      `Número de Desplazamientos: ${formData.NumeroDesplazamientos}`,
      20,
      190
    );
    doc.text(
      `Posición de Levantamiento: ${
        formData.PosicionLevantamiento === 0 ? "De pie" : "Sentado"
      }`,
      20,
      200
    );
    doc.text(
      `Distancia de Desplazamientos: ${
        formData.DistanciaDesplazamientos === 0
          ? "Hasta 10 metros"
          : "Más de 10 metros"
      }`,
      20,
      210
    );
    doc.text(
      `Altura de Levantamiento: ${
        [
          "Altura de la vista",
          "Encima del codo",
          "Debajo del codo",
          "Altura del muslo",
          "Altura de la pantorrilla",
        ][formData.alturaLevantamiento]
      }`,
      20,
      220
    );
    doc.text(
      `Separación de Levantamiento: ${
        formData.separacionLevantamiento === 0
          ? "Carga cerca del cuerpo"
          : "Carga lejos del cuerpo"
      }`,
      20,
      230
    );
    doc.text(
      `Peso Teórico Recomendado: ${formData.pesoTeoricoRecomendado} kg`,
      20,
      240
    );
    doc.text(
      `Desplazamiento Vertical: ${formData.desplazamientoVertical}`,
      20,
      250
    );
    doc.text(`Giro del Tronco: ${formData.giroDelTronco}`, 20, 260);
    doc.text(`Tipo de Agarre: ${formData.tipoDeAgarre}`, 20, 270);
    doc.text(
      `Duración de la Manipulación: ${
        [
          "Menos de 1 hora al día",
          "Entre 1 y 2 horas al día",
          "Entre 2 y 8 horas al día",
        ][formData.duracionManipulacion]
      }`,
      20,
      280
    );
    doc.text(
      `Frecuencia de la Manipulación: ${
        [
          "1 vez cada 5 minutos",
          "1 vez/minuto",
          "4 veces/minuto",
          "9 veces/minuto",
          "12 veces/minuto",
          "Más de 15 veces/minuto",
        ][formData.frecuenciaDeManipulacion]
      }`,
      20,
      290
    );
    doc.text(
      `Valor Final de Frecuencia: ${formData.valorFinalFrecuencia}`,
      20,
      300
    );
    // Añadir Factores de Puesto
    doc.text("Factores de Puesto:", 20, 310);
    let yPosition = 320;
    formData.factoresPuesto.forEach((factorID) => {
      const factor = puestosFactors.find((f) => f.ID === factorID);
      if (factor) {
        doc.text(`Factor seleccionado: ${factor.Nombre}`, 20, yPosition);
        yPosition += 10;
      }
    });

    // Añadir Factores de Trabajador
    doc.text("Factores de Trabajador:", 20, yPosition + 10);
    yPosition += 20;
    formData.factoresTrabajador.forEach((factorID) => {
      const factor = trabajadorFactors.find((f) => f.ID === factorID);
      if (factor) {
        doc.text(`Factor seleccionado: ${factor.Nombre}`, 20, yPosition);
        yPosition += 10;
      }
    });

    // Añadir las imágenes al PDF
    for (const image of images) {
      const imgData = await toBase64(image.file);
      if (yPosition > 270) {
        // Crear una nueva página si la posición Y es demasiado grande
        doc.addPage();
        yPosition = 20;
      }
      doc.addImage(imgData, "JPEG", 20, yPosition, 160, 90);
      yPosition += 100; // Espacio entre imágenes
    }

    // Guardar el documento
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
          try{ 
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
        return <SubirImagenes images={images} setImages={setImages} handleChange={handleChange} showText="GINSHT" GINSHT/>;
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

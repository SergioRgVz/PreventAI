import { useState, useEffect } from "react";
import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { companyService } from "../../../hooks/useCompanies";

const Identificacion = ({
  formData,
  handleChange,
  handleCompanyChange,
  employeesList,
  handleEmployeeChange,
}) => {
  const [companiesList, setCompaniesList] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await companyService.getCompanies();
        setCompaniesList(response);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Datos identificativos
      </Typography>
      <Typography variant="h6" gutterBottom>
        Por favor, rellene los siguientes campos para identificar la evaluación.
      </Typography>
      <Typography variant="body2" gutterBottom>
        Datos de la empresa
      </Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel id="empresa-label">Empresa</InputLabel>
        <Select
          labelId="empresa-label"
          name="ID_Empresa"
          value={formData.ID_Empresa}
          onChange={handleCompanyChange}
        >
          {companiesList.map((company) => (
            <MenuItem key={company.ID} value={company.ID}>
              {company.CIF} - {company.Nombre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        name="CIF_Empresa"
        label="CIF Empresa"
        value={formData.CIF_Empresa}
        fullWidth
        margin="normal"
        disabled
      />
      <Typography variant="body2" gutterBottom>
        Datos del empleado
      </Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel id="dni-empleado-label">DNI Empleado</InputLabel>
        <Select
          labelId="dni-empleado-label"
          name="DNI_Empleado"
          value={formData.DNI_Empleado}
          onChange={handleEmployeeChange}
        >
          {employeesList.map((employee) => (
            <MenuItem key={employee.ID} value={employee.DNI}>
              {employee.DNI} - {employee.Nombre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel id="sexo-label">Sexo</InputLabel>
        <Select
          labelId="sexo-label"
          name="Sexo"
          value={
            formData.Sexo === "M"
              ? "Masculino"
              : formData.Sexo === "F"
              ? "Femenino"
              : formData.Sexo === "O"
              ? "Otro"
              : ""
          }
          onChange={handleChange}
        >
          <MenuItem value="Masculino">Masculino</MenuItem>
          <MenuItem value="Femenino">Femenino</MenuItem>
          <MenuItem value="Otro">Otro</MenuItem>
        </Select>
      </FormControl>

      <Typography variant="body2" gutterBottom>
        Datos del puesto de trabajo
      </Typography>
      <TextField
        name="PuestoTrabajo"
        label="Puesto de Trabajo"
        value={formData.PuestoTrabajo}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Typography variant="body2" gutterBottom>
        Fecha del informe
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Fecha"
          value={formData.Fecha}
          onChange={(newValue) => {
            handleChange({ target: { name: "Fecha", value: newValue } });
          }}
          slotProps={{ textField: { fullWidth: true, margin: "normal" } }}
        />
      </LocalizationProvider>
      <Typography variant="body2" gutterBottom>
        Referencia
      </Typography>
      <TextField
        name="Referencia"
        label="Referencia"
        value={formData.Referencia}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
    </>
  );
};

export default Identificacion;

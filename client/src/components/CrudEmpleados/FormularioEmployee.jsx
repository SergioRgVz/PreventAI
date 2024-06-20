import { Button, TextField, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CompanySelector } from '../CrudEmpresas/CompanySelector';
import { DatePicker } from '@mui/x-date-pickers';
import { companyService } from '../../hooks/useCompanies';
import dayjs from 'dayjs';

export const FormularioEmployee = ({ onSubmit, employee = {} }) => {
  const [date, setDate] = useState(dayjs(employee.FechaNacimiento) || dayjs());
  const [formData, setFormData] = useState({
    DNI: employee.DNI || '',
    Nombre: employee.Nombre || '',
    Apellidos: employee.Apellidos || '',
    Telefono: employee.Telefono || '',
    Correo: employee.Correo || '',
    Edad: employee.Edad || '',
    Sexo: employee.Sexo || '',
    PuestoTrabajo: employee.PuestoTrabajo || '',
    FechaNacimiento: dayjs(employee.FechaNacimiento) || dayjs(),
    ID_Empresa: employee.ID_Empresa || '',
  });

  const [companiesList, setCompaniesList] = useState([]);

  useEffect(() => {
    setFormData({
      DNI: employee.DNI || '',
      Nombre: employee.Nombre || '',
      Apellidos: employee.Apellidos || '',
      Telefono: employee.Telefono || '',
      Correo: employee.Correo || '',
      Edad: employee.Edad || '',
      Sexo: employee.Sexo || '',
      PuestoTrabajo: employee.PuestoTrabajo || '',
      FechaNacimiento: dayjs(date) || '',
      ID_Empresa: employee.ID_Empresa || '',
    });
  }, [employee, date]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formattedDate = date.toISOString(); // Convierte la fecha a una cadena ISO 8601
    const formDataToSend = {
      ...formData,
      FechaNacimiento: formattedDate,
    };

    try {
      onSubmit(formData.DNI, formDataToSend);
    } catch (error) {
      console.error('Error al actualizar el empleado', error.response ? error.response.data : error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setFormData((prevFormData) => ({
      ...prevFormData,
      FechaNacimiento: newDate,
    }));
  };

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await companyService.getCompanies();
        console.log('Companies:', response);
        setCompaniesList(response);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    fetchCompanies();
  }, []);

  const handleCompanyChange = (e) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      ID_Empresa: value,
    }));
  };

  return (
    <Box component="form" display="flex" flexDirection="column" justifyContent="center" alignItems="center" onSubmit={handleSubmit} sx={{ overflow: 'auto', mt: 2 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="Nombre"
        label="Nombre"
        name="Nombre"
        autoComplete="name"
        onChange={handleChange}
        value={formData.Nombre}
        autoFocus
        variant='filled'
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="Apellidos"
        label="Apellidos"
        name="Apellidos"
        autoComplete="surname"
        onChange={handleChange}
        value={formData.Apellidos}
        variant='filled'
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="DNI"
        label="DNI"
        name="DNI"
        autoComplete="DNI"
        onChange={handleChange}
        value={formData.DNI}
        variant='filled'
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="Telefono"
        label="Teléfono"
        name="Telefono"
        autoComplete="telephone"
        onChange={handleChange}
        value={formData.Telefono}
        variant='filled'
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="Correo"
        label="Correo"
        name="Correo"
        autoComplete="email"
        onChange={handleChange}
        value={formData.Correo}
        variant='filled'
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="Edad"
        label="Edad"
        name="Edad"
        autoComplete="age"
        onChange={handleChange}
        value={formData.Edad}
        variant='filled'
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="Sexo"
        label="Sexo"
        name="Sexo"
        autoComplete="sex"
        onChange={handleChange}
        value={formData.Sexo}
        variant='filled'
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          margin="normal"
          required
          fullWidth
          label="Fecha de Nacimiento"
          value={date}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} variant='filled' />}
        />
      </LocalizationProvider>
      <TextField
        margin="normal"
        required
        fullWidth
        id="PuestoTrabajo"
        label="Puesto de Trabajo"
        name="PuestoTrabajo"
        autoComplete="position"
        onChange={handleChange}
        value={formData.PuestoTrabajo}
        variant='filled'
      />
      <CompanySelector
        id="ID_Empresa"
        name="ID_Empresa"
        label="Empresa"
        value={formData.ID_Empresa}
        onChange={handleCompanyChange}
        options={companiesList.map((company) => ({
          code: company.ID,
          label: company.Nombre,
        }))}
      />
    
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Enviar
      </Button>
    </Box>
  );
};

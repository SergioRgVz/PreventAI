import { Button, TextField, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CompanySelector } from '../CrudEmpresas/CompanySelector';
import { DatePicker } from '@mui/x-date-pickers';
import { companyService } from '../../hooks/useCompanies';
import dayjs from 'dayjs';
// import 'dayjs/locale/es';


export const FormularioEmployee = ({ onSubmit, employee }) => {
  const [date, setDate] = useState(null);
  const [formData, setFormData] = useState({
    DNI: employee.DNI || '',
    name: employee.name || '',
    surname: employee.surname || '',
    birth_date: dayjs(employee.birth_date) || dayjs(),
    age: employee.age || '',
    telephone: employee.telephone || '',
    company: employee.company.CIF || '',
    work_center: employee.work_center || '',
    position: employee.position || '',
  });

  // Actualiza formData cuando company cambia
  useEffect(() => {
    setFormData({
      DNI: employee.DNI || '',
      name: employee.name || '',
      surname: employee.surname || '',
      birth_date: dayjs(date) || '',
      age: employee.age || '',
      telephone: employee.telephone || '',
      company: employee.company.CIF || '',
      work_center: employee.work_center || '',
      position: employee.position || '',
    });
  }, [employee, date]);

  const [companiesList, setCompaniesList] = useState([]);

  const handleSubmit = async (event) => {
    const formattedDate = date.toISOString(); // Convierte la fecha a una cadena ISO 8601

    setFormData(prevFormData => ({
      ...prevFormData,
      birth_date: formattedDate,
    }));
    event.preventDefault();
    try {
      onSubmit(formData.DNI, formData);
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



  // cargar compañias
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

  return (
    <Box component="form" display="flex" flexDirection="column" justifyContent="center" alignItems="center" onSubmit={handleSubmit} sx={{ overflow: 'auto', mt: 2 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="Nombre"
        name="name"
        autoComplete="name"
        onChange={handleChange}
        value={formData.name}
        autoFocus
        variant='filled'
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="surname"
        label="Apellidos"
        name="surname"
        autoComplete="surname"
        onChange={handleChange}
        value={formData.surname}
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
      <LocalizationProvider margin="normal" required fullWidth dateAdapter={AdapterDayjs}>
        <DatePicker margin="normal" required defaultValue={formData.birth_date} fullWidth onChange={(newValue) => setDate(newValue)} /> {/*Esto se puede optimizar seguro*/}
      </LocalizationProvider>
      <TextField
        margin="normal"
        required
        fullWidth
        id="age"
        label="Edad"
        name="age"
        autoComplete="age"
        onChange={handleChange}
        value={formData.age}
        variant='filled'
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="telephone"
        label="Teléfono"
        name="telephone"
        autoComplete="telephone"
        onChange={handleChange}
        value={formData.telephone}
        variant='filled'
      />
      <CompanySelector
        id="company"
        name="company"
        label="Empresa"
        value={formData.company}
        onChange={handleChange} // Asegúrate de que handleChange actualiza correctamente formData
        options={companiesList}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="work_center"
        label="Centro de trabajo"
        name="work_center"
        autoComplete="work_center"
        onChange={handleChange}
        value={formData.work_center}
        variant='filled'
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="position"
        label="Puesto"
        name="position"
        autoComplete="position"
        onChange={handleChange}
        value={formData.position}
        variant='filled'
      />

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Enviar
      </Button>
    </Box>
  );
};

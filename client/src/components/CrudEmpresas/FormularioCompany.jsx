import { Button, TextField, Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { LocationSelector } from '../CrudReports/LocationSelector';
import { companyService } from '../../hooks/useCompanies';
import { getProvincias, getAllMunicipiosInProvincia } from '../../services/locationService';
import { useDebounce } from '../../hooks/debounce';

export const FormularioCompany = ({ onSubmit, company }) => {
  const [formData, setFormData] = useState({
    CIF: '',
    Nombre: '',
    municipio: '',
  });
  const [provincia, setProvincia] = useState('');
  const [errors, setErrors] = useState({});
  const [provinciasList, setProvinciasList] = useState([]);
  const [municipiosList, setMunicipiosList] = useState([]);
  const debouncedProvincia = useDebounce(provincia, 500);

  // Actualiza formData cuando company cambia
  useEffect(() => {
    setFormData({
      CIF: company.CIF || '',
      Nombre: company.Nombre || '',
      municipio: company.municipio || '',
    });
    setProvincia(company.provincia || '');
  }, [company]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.CIF) newErrors.CIF = 'El CIF es obligatorio';
    if (!formData.Nombre) newErrors.Nombre = 'El nombre es obligatorio';
    if (!provincia) newErrors.provincia = 'La provincia es obligatoria';
    if (!formData.municipio) newErrors.municipio = 'El municipio es obligatorio';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const fetchProvincias = async () => {
      try {
        const response = await getProvincias();
        setProvinciasList(response);
      } catch (error) {
        console.error('Error fetching provincias:', error);
      }
    };

    fetchProvincias();
  }, []);

  useEffect(() => {
    const fetchMunicipios = async () => {
      if (debouncedProvincia) {
        try {
          const response = await getAllMunicipiosInProvincia(debouncedProvincia);
          setMunicipiosList(response);
        } catch (error) {
          console.error('Error fetching municipios:', error);
        }
      }
    };

    fetchMunicipios();
  }, [debouncedProvincia]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleChangeSelect = (e) => {
    const { name, value } = e.target;
    let newFormData = { ...formData, [name]: value };

    if (name === 'provincia') {
      setProvincia(value);
      newFormData = { ...newFormData, municipio: '' };
      setMunicipiosList([]);
    } else {
      setFormData(newFormData);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        await companyService.updateCompany(formData.CIF, { ...formData, provincia });
        onSubmit();
      } catch (error) {
        console.error('Error al actualizar la empresa', error.response ? error.response.data : error);
      }
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ overflow: 'auto' }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Editar Empresa
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        id="Nombre"
        label="Nombre"
        name="Nombre"
        autoComplete="Nombre"
        onChange={handleChange}
        value={formData.Nombre}
        autoFocus
        variant='filled'
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="CIF"
        label="CIF"
        name="CIF"
        autoComplete="CIF"
        onChange={handleChange}
        value={formData.CIF}
        variant='filled'
      />
      <LocationSelector
        id="provincia"
        name="provincia"
        label="Provincia"
        onChange={handleChangeSelect}
        value={provincia}
        options={provinciasList.map((provincia) => ({ code: provincia.ID, label: provincia.Nombre }))}
        error={errors.provincia}
      />
      <LocationSelector
        id="municipio"
        name="municipio"
        label="Municipio"
        value={formData.municipio}
        onChange={handleChangeSelect}
        options={municipiosList.map((municipio) => ({ code: municipio.ID, label: municipio.Nombre }))}
        error={errors.municipio}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mb: 2 }}>
        Enviar
      </Button>
    </Box>
  );
};

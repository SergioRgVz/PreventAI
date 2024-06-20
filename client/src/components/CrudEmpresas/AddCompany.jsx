import { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { companyService } from '../../hooks/useCompanies';
import { LocationSelector } from '../CrudReports/LocationSelector';
import { getProvincias, getAllMunicipiosInProvincia } from '../../services/locationService';
import { useDebounce } from '../../hooks/debounce';

export function AddCompany() {
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

  const onButtonClick = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        await companyService.createCompany({ ...formData });
      } catch (error) {
        console.error('Error al añadir la empresa:', error);
        setErrors({ apiError: error.response?.data?.message || 'Error al conectar con el servicio' });
      }
    }
  };

  return (
    <>
      <Typography variant="h3" component="h1" gutterBottom sx={{ mt: 2 }}>
        Añadir Empresa
      </Typography>
      <TextField
        key="CIF"
        error={!!errors.CIF}
        helperText={errors.CIF}
        name="CIF"
        label="CIF"
        onChange={handleChangeSelect}
        value={formData.CIF}
        sx={{ m: 1, mt: 3 }}
        variant='filled'
        fullWidth
      />
      <TextField
        key="Nombre"
        error={!!errors.Nombre}
        helperText={errors.Nombre}
        name="Nombre"
        label="Nombre"
        onChange={handleChangeSelect}
        value={formData.Nombre}
        sx={{ m: 1, mt: 3 }}
        variant='filled'
        fullWidth
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

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 2 }}>
        <Button color="info" variant="contained" type="submit" onClick={onButtonClick}>
          Añadir Empresa
        </Button>
      </Box>
    </>
  );
}

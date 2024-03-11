import { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { companyService } from '../hooks/useCompanies';
import { LocationSelector } from './LocationSelector';
import { getAllCCAAs, getProvincias, getMunicipios } from '../services/locationService';


export function AddCompany() {
  const [formData, setFormData] = useState({
    CIF: '',
    name: '',
    technician: '',
    ccaa: '',
    provincia: '',
    municipio: '',
  });
  const [errors, setErrors] = useState({});
  const [ccaaList, setCcaaList] = useState([]);
  const [provinciasList, setProvinciasList] = useState([]);
  const [municipiosList, setMunicipiosList] = useState([]);
  // const { createCompany, error, loading } = useCreateCompany();
  const navigate = useNavigate();



  const validateForm = () => {
    const newErrors = {};
    if (!formData.CIF) newErrors.CIF = 'El CIF es obligatorio';
    if (!formData.name) newErrors.name = 'El nombre es obligatorio';
    if (!formData.ccaa) newErrors.ccaa = 'La comunidad autónoma es obligatoria';
    if (!formData.technician) newErrors.technician = 'El técnico es obligatorio';
    if (!formData.provincia) newErrors.provincia = 'La provincia es obligatoria';
    if (!formData.municipio) newErrors.municipio = 'El municipio es obligatorio';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //cargar CCAAs
  useEffect(() => {
    const fetchCCAAs = async () => {
      try {
        const response = await getAllCCAAs();
        setCcaaList(response);
      } catch (error) {
        console.error('Error fetching CCAA:', error);
      }
    };

    fetchCCAAs();
  }, []);

  //cargar provincias
  useEffect(() => {
    const fetchProvincias = async () => {
      if (formData.ccaa) {
        try {
          const response = await getProvincias(formData.ccaa);
          setProvinciasList(response);
        } catch (error) {
          console.error('Error fetching provincias:', error);
        }
      }
    };

    fetchProvincias();
  }, [formData.ccaa]);

  useEffect(() => {
    const fetchMunicipios = async () => {
      if (formData.provincia) {
        try {
          const response = await getMunicipios(formData.provincia);
          setMunicipiosList(response);
        } catch (error) {
          console.error('Error fetching municipios:', error);
        }
      }
    };

    fetchMunicipios();
  }, [formData.provincia]);


  const handleChangeSelect = (e) => {
    const { name, value } = e.target;
    let newFormData = { ...formData, [name]: value };

    if (name === 'ccaa') {
      newFormData = { ...newFormData, provincia: '', municipio: '' };
      setProvinciasList([]);
      setMunicipiosList([]);
    } else if (name === 'provincia') {
      newFormData = { ...newFormData, municipio: '' };
      setMunicipiosList([]);
    }

    setFormData(newFormData);
  };

  const onButtonClick = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        console.log("onButtonClick", formData);
        const response = await companyService.createCompany(formData);
        console.log("onButtonClick", response);
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
        error={errors.CIF}
        helperText={errors.CIF}
        name="CIF"
        label="CIF"
        onChange={handleChangeSelect}
        value={formData.CIF}
        sx={{ m: 1, mt: 3, width: 'calc(100% - 16px)' }}
      />
      <TextField
        key="name"
        error={errors.name}
        helperText={errors.name}
        name="name"
        label="Nombre"
        onChange={handleChangeSelect}
        value={formData.name}
        sx={{ m: 1, mt: 3, width: 'calc(100% - 16px)' }}
      />
      <TextField
        key="technician"
        error={errors.technician}
        helperText={errors.technician}
        name="technician"
        label="Técnico"
        onChange={handleChangeSelect}
        value={formData.technician}
        sx={{ m: 1, mt: 3, width: 'calc(100% - 16px)' }}
      />

      {/* Selectores de Localización */}
      <LocationSelector
        id="ccaa"
        name="ccaa"
        label="Comunidad Autónoma"
        value={formData.ccaa}
        onChange={handleChangeSelect}
        options={ccaaList.map((ccaa) => ({ code: ccaa.code, label: ccaa.label }))}
        error={errors.ccaa}
        sx={{ width: 'calc(100% - 16px)', mb: 2 }}
      />
      <LocationSelector
        id="provincia"
        name="provincia"
        label="Provincia"
        value={formData.provincia}
        onChange={handleChangeSelect}
        options={provinciasList.map((provincia) => ({ code: provincia.code, label: provincia.label }))}
        error={errors.provincia}
        sx={{ width: 'calc(100% - 16px)', mb: 2 }}
      />
      <LocationSelector
        id="municipio"
        name="municipio"
        label="Municipio"
        value={formData.municipio}
        onChange={handleChangeSelect}
        options={municipiosList.map((municipio) => ({ code: municipio.code, label: municipio.label }))}
        error={errors.municipio}
        sx={{ width: 'calc(100% - 16px)', mb: 2 }}
      />

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 2 }}>
        <Button color="info" variant="contained" type="submit" onClick={onButtonClick}>
          Añadir Empresa
        </Button>
      </Box>
    </>
  );
}

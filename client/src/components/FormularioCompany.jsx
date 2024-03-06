import { Button, TextField, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { LocationSelector } from './LocationSelector';
import { updateCompanyData } from '../services/companyService'; // Usa el servicio de actualización
import {
  getAllCCAAs,
  getProvincias,
  getMunicipios,
  getComunidadAutonomaByLabel,
  getProvinciaByLabel,
  getPoblacionByLabel,
} from '../services/locationService';


export const FormularioCompany = ({ onSubmit, company }) => {
  const [formData, setFormData] = useState({
    CIF: '',
    name: '',
    technician: '',
    ccaa: '',
    provincia: '',
    municipio: '',
  });

  // Actualiza formData cuando company cambia
  useEffect(() => {
    setFormData({
      CIF: company.CIF || '',
      name: company.name || '',
      technician: company.User || '',
      ccaa: getComunidadAutonomaByLabel(company.ccaa) || '',
      provincia: getProvinciaByLabel(company.provincia) || '',
      municipio: getPoblacionByLabel(company.municipio) || '',
    });
  }, [company]);

  const [ccaaList, setCcaaList] = useState([]);
  const [provinciasList, setProvinciasList] = useState([]);
  const [municipiosList, setMunicipiosList] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateCompanyData(formData.CIF, formData);
      onSubmit();
    } catch (error) {
      console.error('Error al actualizar la empresa', error.response ? error.response.data : error);
    }


  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Maneja cambios en el select de CCAA
  const handleCcaaChange = async (e) => {
    const ccaaSelected = e.target.value;
    setFormData({ ...formData, ccaa: ccaaSelected, provincia: '', municipio: '' });
    try {
      const response = await getProvincias(ccaaSelected);
      setProvinciasList(response);
      setMunicipiosList([]);
    } catch (error) {
      console.error('Error fetching provincias:', error);
    }
  };

  // Maneja cambios en el select de provincia
  const handleProvinciaChange = async (e) => {
    const provinciaSelected = e.target.value;
    setFormData({ ...formData, provincia: provinciaSelected, municipio: '' });
    try {
      const response = await getMunicipios(provinciaSelected);
      setMunicipiosList(response);
    } catch (error) {
      console.error('Error fetching municipios:', error);
    }
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

  // Maneja cambios en el select de municipio
  const handleMunicipioChange = (e) => {
    const municipioSelected = e.target.value;
    setFormData({ ...formData, municipio: municipioSelected });
  };

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


  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ overflow: 'auto', mt: 2 }}>
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
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="technician"
        label="Técnico"
        name="technician"
        autoComplete="tecnico"
        onChange={handleChange}
        value={formData.technician}
      />
      <LocationSelector
        id="ccaa"
        name="ccaa"
        label="Comunidad Autónoma"
        value={formData.ccaa}
        onChange={handleCcaaChange}
        options={ccaaList.map((ccaa) => ({ code: ccaa.code, label: ccaa.label }))}
        sx={{ width: 'calc(100% - 16px)', mb: 2 }}
      />
      <LocationSelector
        id="provincia"
        name="provincia"
        label="Provincia"
        value={formData.provincia}
        onChange={handleProvinciaChange}
        options={provinciasList.map((provincia) => ({ code: provincia.code, label: provincia.label }))}
        sx={{ width: 'calc(100% - 16px)', mb: 2 }}
      />
      <LocationSelector
        id="municipio"
        name="municipio"
        label="Municipio"
        value={formData.municipio}
        onChange={handleMunicipioChange}
        options={municipiosList.map((municipio) => ({ code: municipio.code, label: municipio.label }))}
        sx={{ width: 'calc(100% - 16px)', mb: 2 }}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleSubmit}>
        Enviar
      </Button>
    </Box>
  );
};

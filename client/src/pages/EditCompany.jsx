import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import AppBarHome from "../components/utils/AppBarHome";
import { TranslucentBox } from "../components/utils/TranslucentBox";
import { Box, Typography, TextField, Button } from "@mui/material";
import { companyService } from "../hooks/useCompanies";
import { LocationSelector } from "../components/CrudReports/LocationSelector";
import {
  getProvincias,
  getAllMunicipiosInProvincia,
  getProvinciaById,
} from "../services/locationService";
import { useDebounce } from "../hooks/debounce";

const pageToRouteMapping = {
  'Inicio': '/home',
  'Nueva evaluación': '/create-report',
  'Abrir evaluación': '/view-reports',
  'Gestionar': '/management',
};
const settings = ['Perfil', 'Cerrar sesión'];

export const EditCompany = () => {
  const { CIF } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    CIF: "",
    Nombre: "",
    municipio: "",
  });
  const [provincia, setProvincia] = useState({ ID: "", Nombre: "" });
  const [municipio, setMunicipio] = useState({ ID: "", Nombre: "" });
  const [errors, setErrors] = useState({});
  const [provinciasList, setProvinciasList] = useState([]);
  const [municipiosList, setMunicipiosList] = useState([]);
  const debouncedProvincia = useDebounce(provincia.ID, 500);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const companyData = await companyService.getCompanyByCIF(CIF);
        setFormData({
          CIF: companyData.CIF,
          Nombre: companyData.Nombre,
          municipio: companyData.Municipio.ID,
        });
        const idProvincia = companyData.Municipio.ID_Provincia;
        const Provincia = await getProvinciaById(idProvincia);
        setProvincia(Provincia);
        setMunicipio({ ID: companyData.ID_Municipio, Nombre: companyData.Municipio.Nombre });
      } catch (error) {
        console.error("Error fetching company:", error);
      }
    };

    fetchCompany();
  }, [CIF]);

  useEffect(() => {
    const fetchProvincias = async () => {
      try {
        const response = await getProvincias();
        setProvinciasList(response);
      } catch (error) {
        console.error("Error fetching provincias:", error);
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
          console.error("Error fetching municipios:", error);
        }
      }
    };

    fetchMunicipios();
  }, [debouncedProvincia]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.CIF) newErrors.CIF = "El CIF es obligatorio";
    if (!formData.Nombre) newErrors.Nombre = "El nombre es obligatorio";
    if (!provincia.ID) newErrors.provincia = "La provincia es obligatoria";
    if (!municipio.ID) newErrors.municipio = "El municipio es obligatorio";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleChangeSelect = (e) => {
    const { name, value } = e.target;
    if (name === "provincia") {
      const selectedProvincia = provinciasList.find(prov => prov.ID === parseInt(value));
      setProvincia(selectedProvincia);
      setFormData((prevFormData) => ({
        ...prevFormData,
        municipio: ""
      }));
      setMunicipiosList([]);
    } else if (name === "municipio") {
      const selectedMunicipio = municipiosList.find(mun => mun.ID === parseInt(value));
      setMunicipio(selectedMunicipio);
      setFormData((prevFormData) => ({
        ...prevFormData,
        municipio: selectedMunicipio.ID
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        await companyService.updateCompany(formData.CIF, {
          ...formData,
          provincia: provincia.Nombre,
        });
        navigate("/management/view-companies"); // Redirigir a la lista de empresas después de editar
      } catch (error) {
        console.error(
          "Error al actualizar la empresa:",
          error.response ? error.response.data : error
        );
      }
    }
  };

  return (
    <>
      <AppBarHome
        pageToRouteMapping={pageToRouteMapping}
        settings={settings}
        logged
      />
      <TranslucentBox maxWidth={"600px"} sx={{ overflow: "auto" }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ overflow: "auto" }}>
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
            variant="filled"
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
            variant="filled"
          />
          <LocationSelector
            id="provincia"
            name="provincia"
            label="Provincia"
            onChange={handleChangeSelect}
            value={provincia.ID}
            options={provinciasList.map((provincia) => ({
              code: provincia.ID,
              label: provincia.Nombre,
            }))}
            error={errors.provincia}
          />
          <LocationSelector
            id="municipio"
            name="municipio"
            label="Municipio"
            value={municipio.ID}
            onChange={handleChangeSelect}
            options={municipiosList.map((municipio) => ({
              code: municipio.ID,
              label: municipio.Nombre,
            }))}
            error={errors.municipio}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mb: 2 }}>
            Enviar
          </Button>
        </Box>
      </TranslucentBox>
    </>
  );
};

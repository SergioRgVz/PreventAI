import { useState, useEffect } from 'react';
import { Box, Typography, FormControl, TextField, Button, Select, MenuItem, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {getAllCCAAs, getProvincias, getMunicipios} from '../services/locationService';

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

    useEffect(() => {
        // Assume locationService.getAllCCAAs() returns a promise
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

    useEffect(() => {
        const fetchProvincias = async () => {
            if (formData.ccaa) {
                try {
                    // Assuming locationService.getProvincias(ccaa) exists and returns a promise
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
                    // Assuming locationService.getMunicipios(provincia) exists and returns a promise
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
        console.log(newFormData); // Añade esto para depurar
    };
    
    // const handleChangeSelect = (e) => {
    //     const { name, value } = e.target;
    //     const resets = {
    //         ccaa: { provincia: '', municipio: '', provinciasList: [], municipiosList: [] },
    //         provincia: { municipio: '', municipiosList: [] }
    //     };
    
    //     const newState = resets[name] ? { ...formData, [name]: value, ...resets[name].reduce((acc, key) => ({ ...acc, [key]: '' }), {}) } : { ...formData, [name]: value };
    //     setFormData(newState);
    
    //     if (resets[name]) {
    //         Object.keys(resets[name]).forEach(listName => {
    //             if (listName.includes('List')) {
    //                 this[listName]([]);
    //             }
    //         });
    //     }
    // };
    

    const onButtonClick = async (event) => {
        event.preventDefault();
        if (validateForm()) {
        try {
            const response = await axios.post('/company/create', formData);
            navigate('/management');
        } catch (error) {
            console.error('Error al añadir la empresa:', error);
            setErrors({ apiError: error.response?.data?.message || 'Error al conectar con el servicio' });
        }
        }
    };

    return (
<>
    <Typography variant="h3" component="h1" gutterBottom sx={{ mt: 2, zIndex: 'tooltip' }}>
        Añadir Empresa
    </Typography>
    {Object.keys(formData).map((key) => {
        if (key === 'ccaa' || key === 'provincia' || key === 'municipio') {
            return (
                <FormControl key={key} variant="outlined" fullWidth required sx={{ m: 1, mt: 3 }}>
                    <InputLabel id={`${key}-label`}>{key.charAt(0).toUpperCase() + key.slice(1)}</InputLabel>
                    <Select
                        labelId={`${key}-label`}
                        id={key}
                        name={key}
                        value={formData[key]}
                        label={key.charAt(0).toUpperCase() + key.slice(1)}
                        onChange={handleChangeSelect}
                        sx={{ width: '500px', mb: 2 }}
                        error={!!errors[key]}
                    >
                        {key === 'ccaa' && ccaaList.map((item) => (
                            <MenuItem key={item.code} value={item.code}>{item.label}</MenuItem>
                        ))}
                        {key === 'provincia' && provinciasList.map((item) => (
                            <MenuItem key={item.code} value={item.code}>{item.label}</MenuItem>
                        ))}
                        {key === 'municipio' && municipiosList.map((item) => (
                            <MenuItem key={item.code} value={item.code}>{item.label}</MenuItem>
                        ))}
                    </Select>
                    {errors[key] && <Typography color="error" sx={{ mt: 1 }}>{errors[key]}</Typography>}
                </FormControl>
            );
        } else {
            return (
                <TextField 
                    key={key}
                    error={!!errors[key]}
                    helperText={errors[key]}
                    name={key}
                    variant="outlined"
                    label={key.charAt(0).toUpperCase() + key.slice(1)} // Capitaliza la etiqueta
                    onChange={handleChangeSelect}
                    required
                    value={formData[key]}
                    fullWidth
                    sx={{ m: 1, mt: 3, width: 'calc(100% - 16px)' }} // Ajusta el ancho según necesites
                />
            );
        }
    })}
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 2 }}>
        <Button color="info" variant="contained" type="submit" onClick={onButtonClick}>
            Añadir Empresa
        </Button>
    </Box>
</>
    );
}

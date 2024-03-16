// import React, { useState, useEffect } from 'react';
// import { Box, Button, TextField } from '@mui/material';
// import { LocationSelector } from './LocationSelector';
// import { getAllCCAAs, getProvincias, getMunicipios } from '../services/locationService';

// export const FormularioEmpresa = ({ initialFormData, onSubmit }) => {
//     const [formData, setFormData] = useState(initialFormData);
//     const [errors, setErrors] = useState({});
//     const [ccaaList, setCcaaList] = useState([]);
//     const [provinciasList, setProvinciasList] = useState([]);
//     const [municipiosList, setMunicipiosList] = useState([]);

//     useEffect(() => {
//         // Cargar CCAA
//         const fetchCCAAs = async () => {
//             try {
//                 const response = await getAllCCAAs();
//                 setCcaaList(response);
//             } catch (error) {
//                 console.error('Error fetching CCAA:', error);
//             }
//         };
//         fetchCCAAs();
//     }, []);

//     useEffect(() => {
//         // Cargar provincias
//         const fetchProvincias = async () => {
//             if (formData.ccaa) {
//                 try {
//                     const response = await getProvincias(formData.ccaa);
//                     setProvinciasList(response);
//                     setMunicipiosList([]);
//                 } catch (error) {
//                     console.error('Error fetching provincias:', error);
//                 }
//             }
//         };
//         fetchProvincias();
//     }, [formData.ccaa]);

//     useEffect(() => {
//         // Cargar municipios
//         const fetchMunicipios = async () => {
//             if (formData.ccaa) {
//                 if (formData.provincia) {
//                     try {
//                         const response = await getMunicipios(formData.provincia);
//                         setMunicipiosList(response);
//                     } catch (error) {
//                         console.error('Error fetching municipios:', error);
//                     }
//                 }
//             }
//         };
//         fetchMunicipios();
//     }, [formData.provincia]);

//     const handleChange = (event) => {
//         const { name, value } = event.target;
//         setFormData({ ...formData, [name]: value });

//         // Lógica adicional para manejar cambios de selects dependientes
//         if (name === 'ccaa') {
//             setFormData({ ...formData, provincia: '', municipio: '', [name]: value });
//             setProvinciasList([]);
//             setMunicipiosList([]);
//         } else if (name === 'provincia') {
//             setFormData({ ...formData, municipio: '', [name]: value });
//             setMunicipiosList([]);
//         }
//     };

//     const handleSubmitWrapper = () => {
//         onSubmit(formData);
//     };

//     return (
//         <Box component="form" onSubmit={handleSubmitWrapper} sx={{ mt: 2 }}>
//             <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="CIF"
//                 label="CIF"
//                 name="CIF"
//                 autoComplete="CIF"
//                 value={formData.CIF}
//                 onChange={handleChange}
//             />
//             <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="name"
//                 label="Nombre"
//                 name="name"
//                 autoComplete="name"
//                 value={formData.name}
//                 onChange={handleChange}
//             />
//             <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="technician"
//                 label="Técnico"
//                 name="technician"
//                 autoComplete="technician"
//                 value={formData.technician}
//                 onChange={handleChange}
//             />
//             <LocationSelector
//                 id="ccaa"
//                 name="ccaa"
//                 label="Comunidad Autónoma"
//                 value={formData.ccaa}
//                 onChange={handleChange}
//                 options={ccaaList.map((ccaa) => ({ code: ccaa.code, label: ccaa.label }))}
//                 sx={{ width: '100%', mb: 2 }}
//             />
//             <LocationSelector
//                 id="provincia"
//                 name="provincia"
//                 label="Provincia"
//                 value={formData.provincia}
//                 onChange={handleChange}
//                 options={provinciasList.map((provincia) => ({ code: provincia.code, label: provincia.label }))}
//                 sx={{ width: '100%', mb: 2 }}
//             />
//             <LocationSelector
//                 id="municipio"
//                 name="municipio"
//                 label="Municipio"
//                 value={formData.municipio}
//                 onChange={handleChange}
//                 options={municipiosList.map((municipio) => ({ code: municipio.code, label: municipio.label }))}
//                 sx={{ width: '100%', mb: 2 }}
//             />
//             <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
//                 Enviar
//             </Button>
//         </Box>
//     );
// };

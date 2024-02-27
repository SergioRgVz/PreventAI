// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material';

// export const CompaniesList = () => {
//   const [companies, setCompanies] = useState([]);

//   useEffect(() => {
//     const fetchCompanies = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/company/');
//         setCompanies(response.data.companies); // Guardamos las compañías en el estado
//       } catch (error) {
//         console.error("Error al cargar las compañías:", error);
//       }
//     };

//     fetchCompanies();
//   }, []);

//   return (
//     <Paper style={{ padding: '20px', margin: '20px' }}>
//       <Typography variant="h4" gutterBottom>
//         Lista de Compañías
//       </Typography>
//       <List>
//         {companies.map(company => (
//           <ListItem key={company.CIF} divider>
//             <ListItemText 
//               primary={company.name}
//               secondary={`CIF: ${company.CIF} - CCAA: ${company.ccaa} - Provincia: ${company.provincia} - Municipio: ${company.municipio}`}
//             />
//           </ListItem>
//         ))}
//       </List>
//     </Paper>
//   );
// };

import React, { useEffect, useState } from 'react';
import { CompanyCard } from './CompanyCard';
import axios from 'axios';
import Stack from '@mui/material/Stack';

export const CompaniesList = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      const response = await axios.get('/company/'); // Asume que esta función devuelve las compañías con localizaciones
      setCompanies(response.data.companies);
    };

    fetchCompanies();
  }, []);

  if (Array.isArray(companies)) {
    return (
      <Stack spacing={2}>
        {companies.map((company) => (
          <CompanyCard company={company} key={company._id} />
        ))}
      </Stack>
    );
  } else {
    return <div>Error: La respuesta no es un array.</div>;
  }
};
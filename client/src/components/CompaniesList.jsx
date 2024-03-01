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

  const handleRemoveCompany = (CIF) => {
    setCompanies(companies.filter(company => company.CIF !== CIF));
  };


  if (Array.isArray(companies)) {
    return (
      <Stack spacing={2}>
        {companies.map((company) => (
          <CompanyCard company={company} key={company._id} onRemoveCompany={handleRemoveCompany}/>
        ))}
      </Stack>
    );
  } else {
    return <div>Error: La respuesta no es un array.</div>;
  }
};
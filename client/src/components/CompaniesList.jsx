import { CompanyCard } from './CompanyCard';
import Stack from '@mui/material/Stack';
import { useState, useEffect } from 'react';
import { companyService } from '../hooks/useCompanies';

export const CompaniesList = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const handleRemoveCompany = (CIF) => {
    setCompanies(companies.filter(company => company.CIF !== CIF));
  };

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      try {
        const data = await companyService.getCompanies();
        setCompanies(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (Array.isArray(companies)) {
    return (
      <Stack spacing={2}>
        {companies.map((company) => (
          <CompanyCard company={company} key={company._id} onRemoveCompany={handleRemoveCompany} />
        ))}
      </Stack>
    );
  } else {
    return <div>Error: La respuesta no es un array.</div>;
  }
};
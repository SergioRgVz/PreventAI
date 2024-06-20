// CompaniesListButton.js
import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import { DataListButton } from '../utils/DataListButton'; 
import { companyService } from '../../hooks/useCompanies';
import { useNavigate } from 'react-router-dom';


export const CompaniesListButton = ({ onCompanySelect, children }) => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (Array.isArray(companies) && companies.length === 0) {
    return <div>No se encuentran empresas.</div>;
  }

  const handleCompanyClick = (company) => {
    if (company) {
      onCompanySelect(company);
      navigate(`/management/modify-company/${company.CIF}`);
    }
  };

  const companyConfig = {
    identifierKey: 'CIF',
    fields: [
      { name: 'Nombre', label: 'Nombre', gutterBottom: true },
      { name: 'CIF', label: 'CIF', gutterBottom: false },
    ],
  };

  return (
    <Stack spacing={2}>
      <DataListButton
        onItemSelect={handleCompanyClick} 
        service={{ getItems: async () => companies }}
        config={companyConfig}
      >
        {children}
      </DataListButton>
    </Stack>
  );
};

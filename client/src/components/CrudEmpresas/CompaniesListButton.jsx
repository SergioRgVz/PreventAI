// This component is a button that when clicked, it shows a list of companies to select from.
// CompaniesListButton.js
import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import { DataListButton } from '../utils/DataListButton'; 
import { companyService } from '../../hooks/useCompanies';

export const CompaniesListButton = ({ onCompanySelect, children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      try {
        await companyService.getCompanies();
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

  const companyConfig = {
    identifierKey: 'CIF',
    fields: [
      { name: 'name', label: 'Nombre', gutterBottom: true, variant: 'h5' },
      { name: 'CIF', label: 'CIF', gutterBottom: false, variant: 'body2' },
    ],
  };

  return (
    <Stack spacing={2}>
      <DataListButton
        onItemSelect={onCompanySelect} 
        service={{ getItems: companyService.getCompanies }}
        config={companyConfig}
      >
        {children}
      </DataListButton>
    </Stack>
  );
};

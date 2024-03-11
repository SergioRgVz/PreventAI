// CompaniesListButton.js
import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import { CompanyButton } from './CompanyButton';
import { companyService } from '../hooks/useCompanies';

export const CompaniesListButton = ({ onCompanySelect, children }) => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  return (
    <Stack spacing={2}>
      {Array.isArray(companies) ? (
        
        companies.map((company) => (
          <>
            <CompanyButton
              key={company.CIF}
              title={company.name}
              CIF={company.CIF}
              onClick={() => onCompanySelect(company)}
            />
            {children}
          </>
        ))
      ) : (
        <div>Error: La respuesta no es un array.</div>
      )}
    </Stack>
  );
};

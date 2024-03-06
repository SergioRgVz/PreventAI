// CompaniesListButton.js
import { useCompanies } from '../hooks/useCompanies';
import Stack from '@mui/material/Stack';
import { CompanyButton } from './CompanyButton';

export const CompaniesListButton = ({ onCompanySelect, children }) => {
  const companies = useCompanies();

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

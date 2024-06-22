import { DataCard } from '../utils/DataCard'; // Asegúrate de actualizar el import a DataCard
import Stack from '@mui/material/Stack';
import { useState, useEffect } from 'react';
import { companyService } from '../../hooks/useCompanies';

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

  const companyConfig = {
    identifierKey: 'CIF',
    fields: [
      { name: 'Nombre', label: 'Nombre' },
      { name: 'CIF', label: 'CIF' },
      { name: 'Municipio.Nombre', label: 'Municipio' }
    ],
    onView: (company) => {
      console.log("Viendo empresa", company);
    },
    onEdit: (company) => {
      console.log("Editando empresa", company);
    },
    deleteService: async (CIF) => {
      await companyService.deleteCompany(CIF);
    },
    viewEnabled: false,
    editEnabled: false,
    deleteEnabled: true,
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (Array.isArray(companies) && companies.length === 0) {
    return <div>No se encuentran empresas.</div>;
  }

  if (Array.isArray(companies) && companies.length !== 0) {
    return (
      <Stack spacing={2}>
        {companies.map((company) => (
          <DataCard
            item={company}
            key={company._id}
            config={companyConfig}
            onRemove={() => handleRemoveCompany(company.CIF)}
          />
        ))}
      </Stack>
    );
  } else {
    return <div>Error: La respuesta no es un array.</div>;
  }
};

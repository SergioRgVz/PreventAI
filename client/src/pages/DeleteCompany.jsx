import AppBarHome from '../components/utils/AppBarHome';
import { TranslucentBox } from '../components/utils/TranslucentBox';
import { useState, useEffect } from 'react';
import { GoBackButton } from '../components/utils/GoBackButton';
import Stack from '@mui/material/Stack';
import { companyService } from '../hooks/useCompanies';
import { EntityCardDelete } from '../components/utils/EntityCardDelete';
import { Typography } from '@mui/material';

const pageToRouteMapping = {
  'Inicio': '/home',
  'Nueva evaluación': '/create-report',
  'Abrir evaluación': '/view-reports',
  'Gestionar': '/management',
};
const settings = ['Perfil', 'Cerrar sesión'];

export function DeleteCompany() {
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

  const handleRemoveCompany = (CIF) => {
    setCompanies(companies.filter(company => company.CIF !== CIF));
  };
  return (
    <>
      <AppBarHome pageToRouteMapping={pageToRouteMapping} settings={settings} logged />
      <TranslucentBox maxWidth={'600px'}>
        <Typography variant="h4" align="center" gutterBottom>
          Eliminar empresas
        </Typography>
        <Stack spacing={2}>
          {companies.map((company) => (
            <EntityCardDelete
              key={company.CIF} // Add key prop with a unique value
              entity={company}
              onRemoveEntity={handleRemoveCompany}
              deleteService={companyService.deleteCompany}
              entityIdentifier="CIF"
              entityDisplayFields={[
                { key: 'name', label: 'Nombre' },
                { key: 'CIF', label: 'CIF' },
                { key: 'ccaa', label: 'Comunidad Autónoma' },
                { key: 'provincia', label: 'Provincia' },
                { key: 'municipio', label: 'Municipio' },
              ]}
            />
          ))}
          <GoBackButton />
        </Stack>
      </TranslucentBox>
    </>
  );
}
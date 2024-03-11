import AppBarHome from '../components/AppBarHome';
import { TranslucentBox } from '../components/TranslucentBox';
import { useState, useEffect } from 'react';
import { GoBackButton } from '../components/GoBackButton';
import Stack from '@mui/material/Stack';
import { companyService } from '../hooks/useCompanies';
import { CompanyCardDelete } from '../components/CompanyCardDelete';

const pageToRouteMapping = {
  'Inicio': '/home',
  'Nueva evaluación': '/new-report',
  'Abrir evaluación': '/open-report',
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
        <Stack spacing={2}>
          {companies.map((company) => (
            <CompanyCardDelete company={company} key={company._id} onRemoveCompany={handleRemoveCompany} />
          ))}
          <GoBackButton />
        </Stack>
      </TranslucentBox>
    </>
  );
}
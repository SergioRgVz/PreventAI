import AppBarHome from '../components/AppBarHome';
import { TranslucentBox } from '../components/TranslucentBox';
import { useState, useEffect } from 'react';
import { GoBackButton } from '../components/GoBackButton';
import Stack from '@mui/material/Stack';
import { CompanyCardDelete } from '../components/CompanyCardDelete';
import axios from 'axios';

const pageToRouteMapping = {
  'Inicio': '/home',
  'Nueva evaluación': '/new-report',
  'Abrir evaluación': '/open-report',
  'Gestionar': '/management',
};
const settings = ['Perfil', 'Cerrar sesión'];

export function DeleteEmployee() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      const response = await axios.get('/company/'); // Este endpoint no sirve para empleados #TODO
      setCompanies(response.data.companies);
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
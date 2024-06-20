// ModifyCompany.js
import { useState } from 'react';
import AppBarHome from '../components/utils/AppBarHome';
import { TranslucentBox } from '../components/utils/TranslucentBox';
import { GoBackButton } from '../components/utils/GoBackButton';
import { CompaniesListButton } from '../components/CrudEmpresas/CompaniesListButton';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const pageToRouteMapping = {
  'Inicio': '/home',
  'Nueva evaluación': '/create-report',
  'Abrir evaluación': '/view-reports',
  'Gestionar': '/management',
};
const settings = ['Perfil', 'Cerrar sesión'];

export function ModifyCompany() {
  const navigate = useNavigate();
  const [selectedCompany, setSelectedCompany] = useState(null);

  const handleCompanySelect = (company) => {
    if (company.CIF) {
      setSelectedCompany(company);
      console.log("Company selected: ", selectedCompany);
      navigate(`/management/modify-company/${company.CIF}`);
    }
  }

  // const handleFormSubmit = () => {
  //   setSelectedCompany(null);
  // };

  return (
    <>
      <AppBarHome pageToRouteMapping={pageToRouteMapping} settings={settings} logged />
      <TranslucentBox maxWidth={'600px'} sx={{ overflow: 'auto' }}>
        <Typography variant="h4" component="h4" gutterBottom>
          Tus empresas
        </Typography>
        <CompaniesListButton onCompanySelect={handleCompanySelect} />
        <GoBackButton />
      </TranslucentBox>
    </>
  );
}

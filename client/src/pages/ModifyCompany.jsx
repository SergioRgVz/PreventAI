// ModifyCompany.js
import { useState } from 'react';
import AppBarHome from '../components/utils/AppBarHome';
import { TranslucentBox } from '../components/utils/TranslucentBox';
import { GoBackButton } from '../components/utils/GoBackButton';
import { CompaniesListButton } from '../components/CrudEmpresas/CompaniesListButton';
import { FormularioCompany } from '../components/CrudEmpresas/FormularioCompany';
import Typography from '@mui/material/Typography';

const pageToRouteMapping = {
  'Inicio': '/home',
  'Nueva evaluación': '/create-report',
  'Abrir evaluación': '/open-report',
  'Gestionar': '/management',
};
const settings = ['Perfil', 'Cerrar sesión'];

export function ModifyCompany() {
  const [selectedCompany, setSelectedCompany] = useState(null);

  const handleCompanySelect = (company) => {
    setSelectedCompany(company);
  };

  const handleFormSubmit = () => {
    setSelectedCompany(null);
  };

  return (
    <>
      <AppBarHome pageToRouteMapping={pageToRouteMapping} settings={settings} logged />
      <TranslucentBox maxWidth={'600px'} sx={{ overflow: 'auto' }}>
        <Typography variant="h4" component="h4" gutterBottom>
          Tus empresas
        </Typography>
        <CompaniesListButton onCompanySelect={handleCompanySelect} />
        {selectedCompany && <FormularioCompany company={selectedCompany} onSubmit={handleFormSubmit} sx={{}} />}
        <GoBackButton />
      </TranslucentBox>
    </>
  );
}

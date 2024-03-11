// ModifyCompany.js
import { useState } from 'react';
import AppBarHome from '../components/AppBarHome';
import { TranslucentBox } from '../components/TranslucentBox';
import { GoBackButton } from '../components/GoBackButton';
import { CompaniesListButton } from '../components/CompaniesListButton';
import { FormularioCompany } from '../components/FormularioCompany';
import Typography from '@mui/material/Typography';

const pageToRouteMapping = {
  'Inicio': '/home',
  'Nueva evaluación': '/new-report',
  'Abrir evaluación': '/open-report',
  'Gestionar': '/management',
};
const settings = ['Perfil', 'Cerrar sesión'];

export function ModifyEmployee() {
  const [selectedCompany, setSelectedCompany] = useState(null);

  const handleCompanySelect = (company) => {
    setSelectedCompany(company);
  };

  const handleFormSubmit = () => {
    // Aquí puedes manejar la lógica después de enviar el formulario, como cerrarlo
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

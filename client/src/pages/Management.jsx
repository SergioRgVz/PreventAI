import React from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import AppBarHome from '../components/utils/AppBarHome';
import { TranslucentBox } from '../components/utils/TranslucentBox';
import { ButtonForm } from '../components/utils/ButtonForm';
import { GoBackButton } from '../components/utils/GoBackButton';


const pageToRouteMapping = {
  'Inicio': '/home',
  'Nueva evaluación': '/create-report',
  'Abrir evaluación': '/open-report',
  'Gestionar': '/management',
};
const settings = ['Perfil', 'Cerrar sesión'];

export function ManagementPage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <AppBarHome pageToRouteMapping={pageToRouteMapping} settings={settings} logged />
      <TranslucentBox maxWidth={'475px'}>
        <Tabs color="secondary" value={value} onChange={handleChange} centered >
          <Tab color="secondary" label="Empresas" />
          <Tab color="secondary" label="Empleados" />
        </Tabs>
        {value === 0 && (
          <Box sx={{ mt: 2 }}>
            <ButtonForm url='/management/view-companies'>Ver Empresas</ButtonForm>
            <ButtonForm url='/management/create-company'>Crear Empresa</ButtonForm>
            <ButtonForm url='/management/modify-company'>Modificar Empresa</ButtonForm>
            <ButtonForm url='/management/delete-company'>Eliminar Empresa</ButtonForm>
          </Box>
        )}
        {value === 1 && (
          <Box sx={{ mt: 2 }}>
            <ButtonForm url='/management/view-employees'>Ver Empleados</ButtonForm>
            <ButtonForm url='/management/create-employee'>Crear Empleado</ButtonForm>
            <ButtonForm url='/management/modify-employee'>Modificar Empleado</ButtonForm>
            <ButtonForm url='/management/delete-employee'>Eliminar Empleado</ButtonForm>
          </Box>
        )}
        <GoBackButton />
      </TranslucentBox>
    </>
  );
}
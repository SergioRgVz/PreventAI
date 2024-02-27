import React from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import AppBarHome from '../components/AppBarHome';
import { TranslucentBox } from '../components/TranslucentBox';
import { ButtonForm } from '../components/ButtonForm';
import { GoBackButton } from '../components/GoBackButton';


const pageToRouteMapping = {
  'Inicio': '/home',
  'Nueva evaluación': '/new-report',
  'Abrir evaluación': '/open-report',
  'Gestionar': '/management',
};
const settings = ['Perfil', 'Cerrar sesión'];

export function ManagementPage(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = ( _, newValue) => {
    setValue(newValue);
  };

  return (
    <>
			<AppBarHome pageToRouteMapping={pageToRouteMapping} settings={settings} logged />
        <TranslucentBox maxWidth={'475px'}>
            <Tabs color="info" value={value} onChange={handleChange} centered >
              <Tab color="info" label="Empresas" />
              <Tab color="info" label="Empleados" />
            </Tabs>
              {value === 0 && (
                <Box sx={{ mt: 2 }}>
                  <ButtonForm url='/management/view-companies'>Ver Empresas</ButtonForm>
                  <ButtonForm url='/create-company'>Crear Empresa</ButtonForm>
                  <ButtonForm url='/edit-company'>Modificar Empresa</ButtonForm>
                  <ButtonForm url='/delete-company'>Eliminar Empresa</ButtonForm>
                </Box>
              )}
              {value === 1 && (
                <Box sx={{ mt: 2 }}>
                  <ButtonForm url='/view-employees'>Ver Empleados</ButtonForm>
                  <ButtonForm url='/create-employee'>Crear Empleado</ButtonForm>
                  <ButtonForm url='/edit-employee'>Modificar Empleado</ButtonForm>
                  <ButtonForm url='/delete-employee'>Eliminar Empleado</ButtonForm>
                </Box>
              )}
              <GoBackButton/>
			</TranslucentBox>
		</>
  );
}
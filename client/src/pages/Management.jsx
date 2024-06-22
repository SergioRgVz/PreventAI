import { useState, useEffect } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import AppBarHome from '../components/utils/AppBarHome';
import { TranslucentBox } from '../components/utils/TranslucentBox';
import { ButtonForm } from '../components/utils/ButtonForm';
import { GoBackButton } from '../components/utils/GoBackButton';
import axios from 'axios';

const pageToRouteMapping = {
  'Inicio': '/home',
  'Nueva evaluación': '/create-report',
  'Abrir evaluación': '/view-reports',
  'Gestionar': '/management',
};
const settings = ['Cerrar sesión'];

export function ManagementPage() {
  const [value, setValue] = useState(0);
  const [isTechnician, setIsTechnician] = useState(false);

  useEffect(() => {
    const checkIfTechnician = async () => {
      try {
        // Asegúrate de cambiar el endpoint por el correcto
        const response = await axios.get('/auth/check-role'); 
        setIsTechnician(response.data.isTechnician);
      } catch (error) {
        console.error('Error checking if user is technician:', error);
      }
    };

    checkIfTechnician();
  }, []);

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
          <Tab color="secondary" label="Informes" />
          {isTechnician && <Tab color="secondary" label="Usuarios" />}
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
        {value === 2 && (
          <Box sx={{ mt: 2 }}>
            <ButtonForm url='/management/view-reports'>Ver Informes</ButtonForm>
            <ButtonForm url='/create-report'>Crear Informe</ButtonForm>
            <ButtonForm url='/management/modify-report'>Modificar Informe</ButtonForm>
            <ButtonForm url='/management/delete-report'>Eliminar Informe</ButtonForm>
          </Box>
        )}
        {isTechnician && value === 3 && (
          <Box sx={{ mt: 2 }}>
            <ButtonForm url='/management/view-user'>Ver Usuarios</ButtonForm>
            <ButtonForm url='/management/create-user'>Crear Usuario</ButtonForm>
            <ButtonForm url='/management/modify-user'>Modificar Usuario</ButtonForm>
            <ButtonForm url='/management/delete-user'>Eliminar Usuario</ButtonForm>
          </Box>
        )}
        <GoBackButton />
      </TranslucentBox>
    </>
  );
}

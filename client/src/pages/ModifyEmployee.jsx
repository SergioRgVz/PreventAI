// ModifyEmployee.js
import { useState } from 'react';
import AppBarHome from '../components/AppBarHome';
import { TranslucentBox } from '../components/TranslucentBox';
import { GoBackButton } from '../components/GoBackButton';
import { EmployeesListButton } from '../components/EmployeesListButton';
import { FormularioEmployee } from '../components/FormularioEmployee';
import { employeeService } from '../hooks/useEmployees';
import Typography from '@mui/material/Typography';

const pageToRouteMapping = {
  'Inicio': '/home',
  'Nueva evaluación': '/new-report',
  'Abrir evaluación': '/open-report',
  'Gestionar': '/management',
};
const settings = ['Perfil', 'Cerrar sesión'];

export function ModifyEmployee() {
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleFormSubmit = async (DNI, formData) => {
    await employeeService.updateEmployee(DNI, formData);
    // Aquí puedes manejar la lógica después de enviar el formulario, como cerrarlo
    setSelectedEmployee(null);
  };

  return (
    <>
      <AppBarHome pageToRouteMapping={pageToRouteMapping} settings={settings} logged />
      <TranslucentBox maxWidth={'600px'} sx={{ overflow: 'auto' }}>
        <Typography variant="h4" component="h4" gutterBottom>
          Tus empleados
        </Typography>
        <EmployeesListButton onEmployeeSelect={handleEmployeeSelect} />
        {selectedEmployee && <FormularioEmployee employee={selectedEmployee} onSubmit={handleFormSubmit} />}
        <GoBackButton />
      </TranslucentBox>
    </>
  );
}

import { useState } from 'react';
import AppBarHome from '../components/utils/AppBarHome';
import { TranslucentBox } from '../components/utils/TranslucentBox';
import { GoBackButton } from '../components/utils/GoBackButton';
import { EmployeesListButton } from '../components/CrudEmpleados/EmployeesListButton';
import { FormularioEmployee } from '../components/CrudEmpleados/FormularioEmployee';
import { employeeService } from '../hooks/useEmployees';
import Typography from '@mui/material/Typography';

const pageToRouteMapping = {
  'Inicio': '/home',
  'Nueva evaluación': '/create-report',
  'Abrir evaluación': '/view-reports',
  'Gestionar': '/management',
};
const settings = [ 'Cerrar sesión'];

export function ModifyEmployee() {
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleFormSubmit = async (employeeDNI, formData) => {
    await employeeService.updateEmployee(employeeDNI, formData);
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

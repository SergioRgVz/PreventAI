import AppBarHome from '../components/utils/AppBarHome';
import { TranslucentBox } from '../components/utils/TranslucentBox';
import { useState, useEffect } from 'react';
import { GoBackButton } from '../components/utils/GoBackButton';
import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { employeeService } from '../hooks/useEmployees';
import axios from 'axios';

import { EntityCardDelete } from '../components/utils/EntityCardDelete';

const pageToRouteMapping = {
  'Inicio': '/home',
  'Nueva evaluación': '/create-report',
  'Abrir evaluación': '/view-reports',
  'Gestionar': '/management',
};
const settings = [ 'Cerrar sesión'];

export function DeleteEmployee() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('/employee'); // Asegúrate de que este endpoint es correcto
        const modifiedEmployees = response.data.map(employee => ({
          ...employee,
          fullName: `${employee.Nombre} ${employee.Apellidos}`,
          companyName: employee.Empresa ? employee.Empresa.Nombre : 'Sin Empresa',
        }));
        setEmployees(modifiedEmployees);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleRemoveEmployee = (DNI) => {
    setEmployees(employees.filter(employee => employee.DNI !== DNI));
  };

  return (
    <>
      <AppBarHome pageToRouteMapping={pageToRouteMapping} settings={settings} logged />
      <TranslucentBox maxWidth={'600px'}>
        <Typography variant="h4" align="center" gutterBottom>
          Eliminar empleados
        </Typography>
        <Stack spacing={2}>
          {employees.map((employee) => (
            <EntityCardDelete
              key={employee.DNI}
              entity={employee}
              onRemoveEntity={handleRemoveEmployee}
              deleteService={employeeService.deleteEmployee}
              entityIdentifier="DNI"
              entityDisplayFields={[
                { key: 'fullName', label: 'Nombre Completo' },
                { key: 'DNI', label: 'DNI' },
                { key: 'Telefono', label: 'Teléfono' },
                { key: 'Edad', label: 'Edad' },
                { key: 'companyName', label: 'Empresa' },
                { key: 'work_center', label: 'Centro de trabajo' },
                { key: 'PuestoTrabajo', label: 'Puesto' },
              ]}
            />
          ))}
          <GoBackButton />
        </Stack>
      </TranslucentBox>
    </>
  );
}

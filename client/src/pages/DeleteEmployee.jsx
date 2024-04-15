import AppBarHome from '../components/utils/AppBarHome';
import { TranslucentBox } from '../components/utils/TranslucentBox';
import { useState, useEffect } from 'react';
import { GoBackButton } from '../components/utils/GoBackButton';
import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { employeeService } from '../hooks/useEmployees';

import { EntityCardDelete } from '../components/utils/EntityCardDelete';
import axios from 'axios';

const pageToRouteMapping = {
  'Inicio': '/home',
  'Nueva evaluación': '/create-report',
  'Abrir evaluación': '/open-report',
  'Gestionar': '/management',
};
const settings = ['Perfil', 'Cerrar sesión'];

export function DeleteEmployee() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await axios.get('/employee/'); // Este endpoint no sirve para empleados #TODO
      const modifiedEmployees = response.data.employees.map(employee => ({
        ...employee, 
        company: employee.company.name,
      }));
      setEmployees(modifiedEmployees);
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
              { key: 'name', label: 'Nombre' },
              { key: 'surname', label: 'Apellidos'},
              { key: 'DNI', label: 'DNI' },
              { key: 'telephone', label: 'Teléfono' },
              { key: 'age', label: 'Edad'},
              { key: 'company', label: 'Empresa'},
              { key: 'work_center', label: 'Centro de trabajo'},
              { key: 'position', label: 'Puesto' },
            ]}
          />
          ))}
          <GoBackButton />
        </Stack>
      </TranslucentBox>
    </>
  );
}
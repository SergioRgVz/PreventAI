import { DataCard } from '../utils/DataCard'; 
import Stack from '@mui/material/Stack';
import { useState, useEffect } from 'react';
import { employeeService } from '../../hooks/useEmployees';

export const EmployeesList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRemoveEmployee = (DNI) => {
    setEmployees(employees.filter(employee => employee.DNI !== DNI));
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const data = await employeeService.getEmployees();
        console.log(data);
        const processedEmployees = data.map(employee => ({
          ...employee,
          fullName: `${employee.name} ${employee.surname}`,
          company: `${employee.company.name} (${employee.company.CIF})`
        }));
        
        setEmployees(processedEmployees);
      } catch (err) {
        setError(err);
        console.log('Error: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const employeeConfig = {
    identifierKey: 'DNI',
    fields: [
      { name: 'fullName', label: 'Nombre completo' },
      { name: 'DNI', label: 'DNI' },
      { name: 'telephone', label: 'Teléfono' },
      { name: 'age', label: 'Edad' },
      { name: 'birth_date', label: 'Fecha de Nacimiento' },
      { name: 'company', label: 'Compañía' },
      { name: 'work_center', label: 'Centro de trabajo' },
      { name: 'position', label: 'Puesto' },
    ],
    onView: (employee) => {
      console.log("Viendo empleado", employee);
    },
    onEdit: (employee) => {
      console.log("Editando empleado", employee);
    },
    deleteService: async (DNI) => {
      await employeeService.deleteEmployee(DNI);
    },
    viewEnabled: true,
    editEnabled: true,
    deleteEnabled: true,
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (Array.isArray(employees)) {
    return (
      <Stack spacing={2}>
        {employees.map((employee) => (
          <DataCard
            key={employee.DNI}
            item={employee}
            config={employeeConfig}
            onRemove={handleRemoveEmployee}
          />
        ))}
      </Stack>
    );
  } else {
    return <div>Error: La respuesta no es un array.</div>;
  }
};
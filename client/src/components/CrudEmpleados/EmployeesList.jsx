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
          fullName: `${employee.Nombre} ${employee.Apellidos}`,
          company: employee.Empresa ? `${employee.Empresa.Nombre} (${employee.Empresa.CIF})` : 'Sin Empresa',
          birth_date: new Date(employee.FechaNacimiento).toLocaleDateString(),
          position: employee.PuestoTrabajo || '',
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
      { name: 'DNI', label: 'DNI' },
      { name: 'Nombre', label: 'Nombre' },
      { name: 'Apellidos', label: 'Apellidos' },
      { name: 'Telefono', label: 'Teléfono' },
      { name: 'Correo', label: 'Correo' },
      { name: 'Edad', label: 'Edad' },
      { name: 'Sexo', label: 'Sexo' },
      { name: 'PuestoTrabajo', label: 'Puesto de Trabajo' },
      { name: 'birth_date', label: 'Fecha de Nacimiento' },
      { name: 'company', label: 'Empresa' },
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
    viewEnabled: false,
    editEnabled: false,
    deleteEnabled: true,
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (Array.isArray(employees)) {
    return (
      <Stack spacing={2}>
        {employees.map((employee) => (
          <DataCard
            key={employee.DNI}
            item={employee}
            config={employeeConfig}
            onRemove={() => handleRemoveEmployee(employee.DNI)}
          />
        ))}
      </Stack>
    );
  } else {
    return <div>Error: La respuesta no es un array.</div>;
  }
};

import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import { DataListButton } from '../utils/DataListButton';
import { employeeService } from '../../hooks/useEmployees';

export const EmployeesListButton = ({ onEmployeeSelect, children }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            setLoading(true);
            try {
                const data = await employeeService.getEmployees();
                const processedEmployees = data.map(employee => ({
                    ...employee,
                    fullName: `${employee.Nombre} ${employee.Apellidos}`,
                    companyName: employee.Empresa ? employee.Empresa.Nombre : 'Sin Empresa',
                }));
                setEmployees(processedEmployees);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const employeeConfig = {
        identifierKey: 'DNI',
        fields: [
            { name: 'Nombre', label: 'Nombre completo', gutterBottom: true, variant: 'h5' },
            { name: 'Apellidos', label: 'Apellidos', gutterBottom: false, variant: 'body2' },
            { name: 'DNI', label: 'DNI', gutterBottom: false, variant: 'body2' },
            { name: 'PuestoTrabajo', label: 'Puesto de Trabajo', gutterBottom: false, variant: 'body2' },
        ],
    };

    return (
        <Stack spacing={2}>
            <DataListButton
                onItemSelect={onEmployeeSelect}
                items={employees}
                service={{ getItems: employeeService.getEmployees }} // Asegúrate de pasar el servicio aquí
                config={employeeConfig}
            >
                {children}
            </DataListButton>
        </Stack>
    );
};

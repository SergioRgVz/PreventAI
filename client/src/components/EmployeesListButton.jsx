// This component is a button that when clicked, it shows a list of employees to select from.
// EmployeesListButton.js
import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import { DataListButton } from './DataListButton';
import { employeeService } from '../hooks/useEmployees';

export const EmployeesListButton = ({ onEmployeeSelect, children }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmployees = async () => {
            setLoading(true);
            try {
                await employeeService.getEmployees();
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
        identifierKey: 'CIF',
        fields: [
            { name: 'name', label: 'Nombre', gutterBottom: true, variant: 'h5' },
            { name: 'CIF', label: 'CIF', gutterBottom: false, variant: 'body2' },
        ],
    };

    return (
        <Stack spacing={2}>
            <DataListButton
                onItemSelect={onEmployeeSelect}
                service={{ getItems: employeeService.getEmployees }}
                config={employeeConfig}
            >
                {children}
            </DataListButton>
        </Stack>
    );
};

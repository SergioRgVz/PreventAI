import { CompanyCard } from './CompanyCard';
import Stack from '@mui/material/Stack';
import { useState, useEffect } from 'react';
import { employeeService } from '../hooks/useEmployees';

export const EmployeesList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const handleRemoveEmployee = (CIF) => {
    setEmployees(employees.filter(company => company.CIF !== CIF));
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const data = await employeeService.getEmployees();
        setEmployees(data);
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

  if (Array.isArray(employees)) {
    return (
      <Stack spacing={2}>
        {/* {companies.map((company) => (
          <CompanyCard company={company} key={company._id} onRemoveCompany={handleRemoveCompany} />
        ))} */}
      </Stack>
    );
  } else {
    return <div>Error: La respuesta no es un array.</div>;
  }
};
import AppBarHome from '../components/AppBarHome';
import { TranslucentBox } from '../components/TranslucentBox';
import { GoBackButton } from '../components/GoBackButton';
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

export function AddEmployee() {
  const handleFormSubmit = async (DNI, formData) => {
    await employeeService.createEmployee(formData);
  };

  const employee = {
    DNI: '',
    name: '',
    surname: '',
    email: '',
    phone: '',
    address: '',
    role: '',
    company: '',
  };

  return (
    <>
      <Typography variant="h3" component="h1" gutterBottom sx={{ mt: 2 }}>
        Añadir Empleado
      </Typography>
        <FormularioEmployee  employee={employee } onSubmit={handleFormSubmit} />
    </>
  );
}

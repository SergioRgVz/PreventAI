import AppBarHome from '../utils/AppBarHome';
import { TranslucentBox } from '../utils/TranslucentBox';
import { GoBackButton } from '../utils/GoBackButton';
import { FormularioEmployee } from '../CrudEmpleados/FormularioEmployee';
import { employeeService } from '../../hooks/useEmployees';
import Typography from '@mui/material/Typography';


const pageToRouteMapping = {
  'Inicio': '/home',
  'Nueva evaluación': '/create-report',
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
    work_center: '',
    position: '',
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

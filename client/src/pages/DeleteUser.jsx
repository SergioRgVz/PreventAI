import AppBarHome from '../components/utils/AppBarHome';
import { TranslucentBox } from '../components/utils/TranslucentBox';
import { useState, useEffect } from 'react';
import { GoBackButton } from '../components/utils/GoBackButton';
import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { userService } from '../hooks/useUsers';
import { EntityCardDelete } from '../components/utils/EntityCardDelete';

const pageToRouteMapping = {
  'Inicio': '/home',
  'Nueva evaluación': '/create-report',
  'Abrir evaluación': '/view-reports',
  'Gestionar': '/management',
};
const settings = [ 'Cerrar sesión'];

export function DeleteUser() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await userService.getUsers();
        const processedUsers = data.map(user => ({
          ...user,
          fullName: `${user.Nombre} ${user.Apellidos}`,
          role: user.esTecnico ? 'Técnico' : 'Administrador',
        }));
        setUsers(processedUsers);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };

    fetchUsers();
  }, []);

  const handleRemoveUser = (DNI) => {
    setUsers(users.filter(user => user.DNI !== DNI));
  };

  return (
    <>
      <AppBarHome pageToRouteMapping={pageToRouteMapping} settings={settings} logged />
      <TranslucentBox maxWidth={'600px'}>
        <Typography variant="h4" align="center" gutterBottom>
          Eliminar usuarios
        </Typography>
        <Stack spacing={2}>
          {users.map((user) => (
            <EntityCardDelete
              key={user.DNI}
              entity={user}
              onRemoveEntity={handleRemoveUser}
              deleteService={userService.deleteUser}
              entityIdentifier="Correo"
              entityDisplayFields={[
                { key: 'fullName', label: 'Nombre Completo' },
                { key: 'DNI', label: 'DNI' },
                { key: 'Correo', label: 'Correo' },
                { key: 'Telefono', label: 'Teléfono' },
                { key: 'role', label: 'Rol' },
              ]}
            />
          ))}
          <GoBackButton />
        </Stack>
      </TranslucentBox>
    </>
  );
}
